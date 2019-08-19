<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <fai icon="user"/>&nbsp;Registrar Usuario
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
      </div>
      <div class="card-footer text-right">
        <button class="btn btn-secondary" @click="$router.push({ name: 'users' })">
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
  name: 'UserCreate',

  components: { SysForm },

  mixins: [ formMixin ],

  data () {
    return {
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
          size: 12,
          validate: 'required'
        }
      }
    }
  },

  created: function () {},

  methods: {
    saveForm: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let body = this.processForm(this.user_details)
          let service = usersService.post(body)

          this.sendForm(service).then(res => {
            this.$router.push({ name: 'users', props: { user: res } })
          }).catch(err => {
            console.log(JSON.stringify(err))
          })
        }
      })
    }
  }
}
</script>
