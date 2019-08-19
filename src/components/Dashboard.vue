<template>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <sys-table :headers="headers" :items="filtered_items" :title="title" :error_message="error_message" />
    </div>
  </div>
</div>
</template>

<script>
import researchesService from '@/services/researches'
import SysTable from '@/components/shared/Table'
import SysFilter from '@/components/shared/Filter'
import SysForm from '@/components/shared/Form'
import SysWidget from '@/components/shared/Widget'

export default {
  name: 'Dashboard',

  components: { SysTable, SysFilter, SysWidget, SysForm },

  data () {
    return {
      title: 'Estudios',
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Uuid', value: 'id' },
        { text: 'Nombre', value: 'fullname' },
        { text: 'Descripcion', value: 'description' },
        { text: 'Positions', value: 'investments_count' },
        { text: 'Ns', value: 'investments_count' }
      ],
      items: [],
      filtered_items: [],
      items_sum: 0,
      error_message: 'There\'s nothing to show :c'
    }
  },
  beforeCreate: function () {
    researchesService.list().then(res => {
      this.items = this.filtered_items = res.data
      this.items.forEach(item => {
        if (item.corporate_name) {
          item.fullname = item.corporate_name
        }
      })
    })
  },
  computed: {
    itemsSum () {
      return this.filtered_items.reduce((sum, item) => sum + parseFloat(item.investments_amount), 0)
    }
  },
  methods: {
    search: function () {
      console.log('searching')
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
    },
    date_now: function () {
      let now = new Date()
      now = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
      return now
    },
    first_day: function () {
      let now = new Date()
      now = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + '01'
      return now
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
