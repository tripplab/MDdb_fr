<template>
  <!--Begin::Section-->
  <div class="card mb-5">
    <div class="card-header" v-if="title">
      <div class="card-title">
        <fai :icon="icon"/>&nbsp; {{ title }}
      </div>
      <div class="card-btn text-right">
        <button class="btn btn-link" @click="exportCSV">
          <fai icon="file-export"/>&nbsp; Exportar XLS
        </button>
      </div>
      <div class="card-btn text-right" v-if="create_route">
        <button class="btn btn-primary" @click="goToCreate">
          <fai icon="plus"/>&nbsp; Registrar
        </button>
      </div>
    </div>
    <div class="card-body">
      <!--begin: Search -->
      <div class="row justify-content-end">
        <div class="col col-sm-6 col-lg-4 table-search">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Búsqueda"
            single-line
            hide-details
          ></v-text-field>
        </div>
      </div>
      <!--end: Search -->
      <!--begin: Datatable -->
      <v-data-table
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        :search="search"
      >
        <!--begin: Headers Slot -->
        <template slot="headers" slot-scope="props">
          <tr>
            <th v-if="selectable"> <input class="form-control" v-model="selectAll" type="checkbox" @click="selectAllRows()"/> </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
            <th v-if="detail_route && items.length > 0" :class="['column sortable']"> Detalle </th>
            <th v-if="edit_action && items.length > 0" :class="['column sortable']"> Editar </th>
            <th v-if="update_route && items.length > 0" :class="['column sortable']"> Editar </th>
            <th v-if="delete_action && items.length > 0" :class="['column sortable']"> Borrar </th>
          </tr>
        </template>
        <!--end: Headers Slot -->

        <!--begin: Items Slot -->
        <template slot="items" slot-scope="props">
          <tr>
            <td v-if="selectable">
              <input class="form-control" type="checkbox" :name="'selectable[]'" :value="props.item.id" v-model="selected"/>
            </td>
            <td v-bind:class="[column.class ? column.class : 'text-left']" v-for="(column,key) in headers" :key="key">
              <a v-if="column.link == true && getPropFromItem(props.item, column.value, column.filter) !== null" target="_blank" v-bind:href="getPropFromItem(props.item, column.value, column.filter)">
                <fai icon="file-pdf"/>
              </a>
              <fai v-else-if="column.link" style="opacity: 0.5;" icon="file-pdf"/>
              <div v-if="!column.link"> {{ getPropFromItem(props.item, column.value, column.filter) }}</div>
            </td>
            <td class="text-center detail-icon" v-if="detail_route">
              <fai icon="eye" @click="goToDetail(props.item.id)"/>
            </td>
            <td class="text-center detail-icon" v-if="contract_detail_route">
              <fai icon="eye" @click="goToContract(props.item.contract_id)"/>
            </td>
            <td class="text-center detail-icon" v-if="edit_action">
              <fai icon="eye" @click="edit_action(props.item.id)"/>
            </td>
            <td class="text-center detail-icon" v-if="update_route">
              <fai :icon="['far', 'edit']" @click="goToUpdate(props.item.id)"/>
            </td>
            <td class="text-center danger-icon" v-if="delete_action">
              <fai icon="trash" @click="delete_action(props.item.id)"/>
            </td>
            <td class="text-center" v-if="custom_action">
             <fai v-if="custom_action_condition(props.item)" :icon="custom_action_icon" @click="custom_action(props.item)"/>
            </td>
          </tr>
        </template>
        <!--end: Items Slot -->

        <!--begin: No-data Slot -->
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">
            <span v-if="error_message">{{ error_message }}</span>
            <span v-else>{{ default_error_message }}</span>
          </v-alert>
        </template>
        <!--end: No-data Slot -->
      </v-data-table>
      <!--end: Datatable -->
    </div>
  </div>
  <!--End::Section-->
</template>

<script>
import Vue from 'vue'
import Papa from 'papaparse'
import saveAs from 'file-saver'

export default {

  name: 'SysTable',

  props: {
    title: { type: String, required: false },
    headers: { type: Array, required: true },
    items: { type: Array, required: true },
    error_message: { type: String, required: false },
    detail_route: { type: String, required: false },
    contract_detail_route: { type: String, required: false },
    update_route: { type: String, required: false },
    create_route: { type: String, required: false },
    delete_action: { type: Function, required: false },
    edit_action: { type: Function, required: false },
    custom_action: { type: Function, required: false },
    custom_action_condition: { type: Function, required: false },
    custom_action_icon: { type: String, required: false },
    create_route_params: { type: Object, required: false, default: () => {} },
    detail_route_params: { type: Object, required: false, default: () => {} },
    update_route_params: { type: Object, required: false, default: () => {} },
    title_icon: { type: String | Array, required: false },
    selectable: { type: Boolean, required: false }
  },

  data () {
    return {
      pagination: { sortBy: 'name', rowsPerPage: 10 },
      default_error_message: 'Sorry, there is nothing to display',
      search: '',
      title_icon_default: 'users',
      selectAll: false,
      selected: []
    }
  },

  methods: {
    /**
    * Get the value of an attribute from a given object's prop.
    * @param {object} item
    * @param {string} property
    * @param {string | function} filter
    * @returns {*}
    */
    getPropFromItem (item, property, filter) {
      let value = property.split('.').reduce((previousValue, currentValue) => {
        return (typeof previousValue !== 'object') ? '' : previousValue[currentValue]
      }, item)

      if (filter) value = (typeof filter === 'string') ? Vue.filter(filter)(value) : filter(value)

      return value
    },

    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },

    format (value, filter) {
      if (filter) return Vue.filter(filter)(value)
      return value
    },

    goToDetail (id) {
      this.$router.push({ name: this.detail_route, params: { id } })
    },

    goToContract (id) {
      this.$router.push({ name: this.contract_detail_route, params: { id } })
    },

    exportCSV () {
      let data = []
      let array = {}
      let results = this.items
      let headers = this.headers
      Object.keys(results).forEach(function (key) {
        array = {}
        Object.keys(headers).forEach(function (value) {
          if (results[key][headers[value].value]) {
            array[headers[value].text] = results[key][headers[value].value]
          }
        })
        data.push(array)
      })
      let title = this.title
      const csv = Papa.unparse(data, {
        header: true
      })
      const blob = new Blob(['\ufeff', csv])
      saveAs(blob, 'reporte-' + title + '.csv')
    },

    goToUpdate (id) {
      this.$router.push({ name: this.update_route, params: { ...this.update_route_params, ...{id} } })
    },

    goToCreate () {
      this.$router.push({ name: this.create_route, params: this.create_route_params })
    },

    selectAllRows () {
      this.selected = []
      if (!this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i].id)
        }
      }
    }
  },

  computed: {
    icon: function () {
      return (this.title_icon) ? this.title_icon : this.title_icon_default
    }
  }
}
</script>

<style lang='scss' scoped>
  thead > tr > th > .form-control {
    width: 20px;
  }
  .btn-csv {
    background-color: white !important;
    color: #3D89DB;
  }
  .btn-csv:hover {
    background-color: gray !important;
    color: white;
  }
</style>
