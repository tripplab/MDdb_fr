<template>
  <div class="container-scroller">
    <sys-header/>
    <div class="container-fluid page-body-wrapper">
      <sys-sidebar/>
      <div class="main-panel">
        <div class="content-wrapper">
          <slot />
        </div>
        <sys-footer/>
      </div>
    </div>
  </div>
</template>

<script>
import SysHeader from '@/components/layouts/Header'
import SysFooter from '@/components/layouts/Footer'
import SysSidebar from '@/components/layouts/Sidebar'

export default {
  components: {
    SysHeader,
    SysFooter,
    SysSidebar
  }
}
</script>

<style lang="scss" scoped>
</style>
