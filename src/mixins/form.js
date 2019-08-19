const FormMixin = {
  data () {
    return {
      form: {
        isSaving: false
      }
    }
  },

  methods: {
    processForm (inputs) {
      return Object.keys(inputs).reduce((obj, key) => {
        let input = inputs[key]

        if (input.value && input.value != '' && !(input.disabled)) {
          if (input.type == 'select') obj[key] = (input.value) ? input.value.value : null
          else obj[key] = input.value
        }

        return obj
      }, {})
    },

    sendForm (service) {
      this.form.isSaving = true
      return service
        .then(res => {
          this.$toasted.show(' Información guardada satisfactoriamente ', {
            type: 'success',
            icon: 'error_outline',
            duration: 3000,
            fullWidth: true,
            position: 'bottom-center',
            fitToScreen: true
          })
          return res
        })
        .catch(err => {
          console.log(err.data)
          let msg = 'Ocurrió un problema al guardar los datos'
          if (err.data.error.status_code == 422) {
            msg = err.data.error.message
          }
          this.$toasted.show(msg, {
            type: 'error',
            icon: 'error_outline',
            duration: 3000,
            fullWidth: true,
            position: 'top-center',
            fitToScreen: true
          })
          throw err
        })
        .finally(() => { this.form.isSaving = false })
    }
  }
}

export default FormMixin
