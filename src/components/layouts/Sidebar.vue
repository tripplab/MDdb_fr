<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link" href="/">
          <i class="mdi mdi-home menu-icon"></i>
          <span class="menu-title">Dashboard</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/users">
          <i class="mdi mdi-account menu-icon"></i>
          <span class="menu-title">Usuarios</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/info">
          <i class="mdi mdi-file-document-box-outline menu-icon"></i>
          <span class="menu-title">Acerca de</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      open: false
    }
  },
  computed: {
    username: function () {
      return this.$store.getters.getUsername
    }
  }
}
</script>
