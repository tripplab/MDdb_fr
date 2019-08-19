<template>
  <!--Begin::Section-->
  <form action="">
  <div class="card mb-5">
    <div class="card-header">
      <div class="card-title">
        <fai icon="filter"/>&nbsp; Filtros
      </div>
    </div>
    <div class="card-body">
      <!--begin: Filter Fields -->
      <div class="form-group row">
        <div v-for="filter in filters" :key="filter.id" class="col-sm-6 mt-4" :class="'col-md-' + [(filter.size || '4')]">
          <label for="input">{{ filter.name }}</label>
          <div class="input-group">
            <!--begin: Input Text -->
            <input class="form-control"
              :id="filter.id" :name="filter.id" :placeholder="filter.hint" v-model="filter.value"
              type="text"
              v-if="filter.type == 'text'"
            />
            <!--end: Input Text -->

            <!--begin: Date -->
            <input class="form-control"
              :id="filter.id" :name="filter.id" :placeholder="filter.hint" v-model="filter.value"
              type="date"
              v-if="filter.type == 'date'"
            />
            <!--end: Date -->

            <!--begin: Range -->
            <input class="form-control"
              :id="filter.id" :name="filter.id" :placeholder="filter.hint" v-model="filter.value"
              type="number" min="0"
              v-if="filter.type == 'number'"
            />
            <!--end: Range -->

            <!--begin: Select -->
            <select class="custom-select"
              :id="filter.id" :name="filter.id" v-model="filter.value"
              v-if="filter.type == 'select'"
            >
              <option value="">{{ filter.hint }}</option>
              <option :value="option.value" v-for="option in filter.options" :key="option.value">{{ option.text }}</option>
            </select>
            <!--end: Select -->

            <div class="input-group-append" v-if="filter.icon">
              <span class="input-group-text"><fai :icon="filter.icon"/></span>
            </div>
          </div>
        </div>
      </div>
      <!--end: Filter Fields -->
    </div>
    <div class="card-footer text-right">
      <button type="reset" class="btn btn-outline-secondary" @click="reset"><fai icon="eraser"/>&nbsp;Clear</button>
      <button class="btn btn-primary" @click.stop.prevent="search">
        <fai icon="search"/>&nbsp;Buscar
      </button>
    </div>
  </div>
  </form>
  <!--End::Section-->
</template>

<script>
export default {
  name: 'SysFilter',

  props: {
    filters: { type: Array, required: true },
    items: { type: Array, required: true },
    filtered_items: { type: Array, required: true }
  },

  methods: {
    search: function () {
      let filtersToApply = this.getFilters()

      if (filtersToApply.length == 0) this.$emit('update:filtered_items', this.items)
      else {
        this.$emit('update:filtered_items', this.items.filter(item => {
          return filtersToApply.reduce((isValid, filter) => {
            if ('validator' in filter) return (filter.validator(item, filter.value)) ? isValid : false
            return (item[filter.id] == filter.value) ? isValid : false
          }, true)
        }))
      }
    },

    getFilters: function () {
      return this.filters.reduce((arr, filter) => {
        if (filter.value.length > 0) {
          arr.push(filter)
        }
        return arr
      }, [])
    },

    reset: function () {
      this.$emit('update:filters', this.filters.map(filter => {
        filter.value = ''
        return filter
      }))
      this.$emit('update:filtered_items', this.items)
    }
  }
}
</script>
