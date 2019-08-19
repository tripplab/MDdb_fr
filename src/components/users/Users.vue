<template>
  <div class="container">
    <sys-filter :filters.sync="filters" :items="items" :filtered_items.sync="filtered_items"/>
    <sys-table :headers="headers" :items="filtered_items" :title="title" :error_message="error_message" :detail_route="detail_route" :create_route="create_route"/>
  </div>
</template>

<script>
import usersService from '@/services/users'
import SysTable from '@/components/shared/Table'
import SysFilter from '@/components/shared/Filter'
import SysWidget from '@/components/shared/Widget'

export default {
  name: 'Users',

  components: { SysTable, SysFilter, SysWidget },

  data () {
    return {
      title: 'Usuarios',
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Nombre', value: 'name' },
        { text: 'Usuario', value: 'username' },
        { text: 'Correo Electrónico', value: 'email' }
      ],
      items: [],
      filtered_items: [],
      error_message: 'There\'s nothing to show :c',
      detail_route: 'user',
      create_route: 'user_create',
      filters: [
        {
          id: 'name',
          name: 'Nombre Usuario',
          hint: 'Usuario',
          icon: 'user',
          type: 'text',
          value: '',
          validator: (item, value) => item.name.toLowerCase().includes(value.toLowerCase())
        },
        {
          id: 'email',
          name: 'Correo Electrónico',
          hint: 'Email',
          icon: 'envelope',
          type: 'text',
          value: '',
          validator: (item, value) => item.email.toLowerCase().includes(value.toLowerCase())
        },
        {
          id: 'role',
          name: 'Rol',
          hint: 'Rol',
          icon: 'users',
          value: '',
          type: 'select',
          options: [
            { value: 'Admin', text: 'Admin' }
          ],
          validator: (item, value) => item.role == value
        }
      ]
    }
  },
  beforeCreate: function () {
    usersService.list().then(res => {
      this.items = this.filtered_items = res.data.map(user => {
        user.role = user.role[0].name
        return user
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
