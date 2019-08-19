<template>
  <div class="container">
    <h1 class="mb-4">{{ user.name }}</h1>

    <div class="details">
      <div class="details__head">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" role="tab" href="#details">
              <fai icon="info"/>&nbsp;Generales
            </a>
          </li>
        </ul>
      </div>
      <div class="details__body mt-4">
        <div class="tab-content">
          <!--begin: Details -->
          <div id="details" class="tab-pane fade show active" role="tabpanel" v-if="user.id">
            <div class="row">
              <div class="col-sm-6">
                <h4 class="m--font-info">Datos Generales</h4>
              </div>
              <div class="col-sm-6 text-right">
                <button class="btn btn-primary" @click="goToEdit">
                  <fai :icon="['far','edit']"/> Editar
                </button>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-sm-6">
                  <h5>Nombre</h5>
                  <span>{{ user.name }}</span>
              </div>
              <div class="col-sm-6">
                  <h5>Usuario</h5>
                  <span>{{ user.username }}</span>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-sm-6">
                  <h5>Rol</h5>
                  <span>{{ user.rol }}</span>
              </div>
              <div class="col-sm-6">
                  <h5>Email</h5>
                  <span>{{ user.email }}</span>
              </div>
            </div>
            <hr class="mt-4"/>
          </div>
          <!--end: Details -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersService from '@/services/users'
import SysTable from '@/components/shared/Table'

export default {
  name: 'UserDetail',

  components: { SysTable },

  data () {
    return {
      user: {}
    }
  },
  created: function () {
    const id = this.$route.params.id
    let element = this.$store.getters.getSelectedElement

    if (element.type === 'user' && element.data.id === id) this.user = element.data
    else {
      let includesString = 'rol'
      let params = { include: includesString }

      usersService.getById(id, params)
        .then(res => {
          this.user = res.data
          this.user.rol = this.user.role[0].name
        })
        .catch(res => {
          console.log(res)
          this.$router.push({ name: 'user', params: { id } })
        })
    }
  },
  methods: {
    goToEdit () {
      const id = this.$route.params.id
      this.$router.push({ name: 'user_update', params: { id } })
    }
  }
}
</script>
