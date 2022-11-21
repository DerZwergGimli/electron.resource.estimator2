<template>
  <div class="navigation">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl"
        >Resource Capacity Estimator</a
      >
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal p-0">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/import">Import</router-link></li>
        <li><router-link to="/export">Export</router-link></li>
        <li><router-link to="/host">Host</router-link></li>
        <li><router-link to="/vm">VM</router-link></li>
        <li><router-link to="/assignment">Assignment</router-link></li>
        <li><router-link to="/printout">Print</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><switch-theme /></li>
      </ul>
    </div>
  </div>
</template>
<script>
import SwitchTheme from '~/components/button/SwitchTheme.vue'
export default {
  components: { SwitchTheme },
}
</script>
