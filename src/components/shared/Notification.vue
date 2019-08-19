<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="notification is-success" v-if="status == 'success'">
          <slot name="message">
            Everything looks fine!!
          </slot>
        </div>
        <div class="notification is-info" v-else-if="status == 'info'">
          <slot name="message">
            Hello there
          </slot>
        </div>
        <div class="notification is-danger" v-else>
          <slot name="message">
            Ups! Something is wrong :(
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../scss/_colors';

  .is-success {
    background-color: $color-primary;
  }
</style>
