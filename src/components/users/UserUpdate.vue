<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <fai icon="user"/>&nbsp;Editar Usuario
        </div>
      </div>
      <div class="card-body pb-5">
        <!--begin: Details -->
          <div class="row mt-4">
            <div class="col-sm-6">
              <h4 class="font-info">Datos Generales</h4>
            </div>
          </div>
          <sys-form :inputs="user_details"/>
        <!--end: Details -->
        <hr class="mt-4"/>
      </div>
      <div class="card-footer text-right">
        <button class="btn btn-secondary" @click="$router.push({ name: 'user', params: { id: user.id } })">
          <fai icon="reply"/> Cancelar
        </button>
        <button class="btn btn-success" :class="{ 'disabled': form.isSaving }" @click="saveForm">
          <fai :icon="['far','edit']"/> Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import usersService from '@/services/users'
import SysForm from '@/components/shared/Form'
import formMixin from '@/mixins/form'

export default {
  name: 'UserUpdate',

  components: { SysForm },

  mixins: [ formMixin ],

  data () {
    return {
      user: {},
      user_details: {
        name: {
          name: 'Nombre',
          hint: 'Nombre',
          value: '',
          type: 'text',
          size: 6,
          validate: 'required'
        },
        username: {
          name: 'Usuario',
          hint: 'Usuario',
          value: '',
          type: 'text',
          size: 6,
          validate: 'required'
        },
        email: {
          name: 'Correo Electrónico',
          hint: 'Email',
          value: '',
          type: 'email',
          size: 6,
          validate: 'required'
        },
        role: {
          name: 'Rol',
          hint: 'Selecciona un rol',
          value: '',
          type: 'select',
          options: [
            { value: 1, text: 'Admin' }
          ],
          size: 6,
          validate: 'required'
        },
        password: {
          name: 'Contraseña',
          hint: '**********',
          value: '',
          type: 'password',
          size: 12
        }
      }
    }
  },

  created: function () {
    this.loaded = false
    const id = this.$route.params.id
    usersService.getById(id).then(res => {
      this.user = res.data
      Object.keys(this.user_details).forEach(key => {
        this.user_details[key].value = this.user[key]
      })
      this.user_details.role.value = { value: this.user.role[0].id, text: this.user.role[0].name }
      this.loaded = true
    })
  },

  methods: {
    saveForm: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // this.user_details.password = (this.user_details.password === '') ? undefined : this.user_details.password
          let body = this.processForm(this.user_details)
          let service = usersService.updateById(this.user.id, body)

          this.sendForm(service).then(res => {
            this.$router.push({ name: 'user', params: { id: this.user.id } })
          }).catch(err => {
            console.log(JSON.stringify(err.statusText))
          })
        }
      })
    }
  }
}
</script>
