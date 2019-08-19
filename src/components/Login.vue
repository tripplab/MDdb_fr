<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <img src="@/assets/logo.png" class="img-responsive full-width" alt="logo">
              </div>
              <h4>MDDB</h4>
              <h6 class="font-weight-light">Ingresa tus datos para continuar</h6>
              <form class="pt-3" @submit.prevent="signin">
                <div class="form-group">
                  <input type="email" placeholder="email" v-model="email" class="form-control form-control-lg" >
                </div>
                <div class="form-group">
                  <input type="password" placeholder="password" v-model="password" class="form-control form-control-lg" >
                </div>
                <div class="mt-3">
                  <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Entrar</button>
                </div>
                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input">
                      Recordarme
                    </label>
                  </div>
                  <a href="#" class="auth-link text-black">¿Olvidaste tu contraseña? </a>
                </div>
                <div class="mb-2">
                </div>
                <div class="text-center mt-4 font-weight-light">
                  ¿No tienes cuenta? <a href="register.html" class="text-primary">Crear</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signin () {
      this.$store.dispatch({
        type: 'signin',
        email: this.email,
        password: this.password
      }).then(res => {
        if (res) {
          this.$toasted.show('Usuario y contraseña correctos, bienvenido', {
            type: 'success',
            icon: 'error_outline',
            duration: 3000,
            fullWidth: true,
            position: 'bottom-center',
            fitToScreen: true
          })
          this.email = ''
          this.password = ''
          this.$router.push('dashboard')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "src/scss/variables";
  @import "src/scss/landing-screens/auth";
  .full-width {
    width: 100%;
    height: auto;
  }
</style>
