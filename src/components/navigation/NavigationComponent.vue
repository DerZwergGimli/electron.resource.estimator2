<script setup lang="ts">
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink } from 'flowbite-vue'
import SwitchTheme from '~/components/button/SwitchTheme.vue'
</script>

<template>
  <Navbar solid class="mb-5 border-b-2 border-purple-600">
    <template #logo>
      <NavbarLogo link="#" alt="RCE_Logo" image-url="/public/logo.png">
        Resource Capacity Estimator
      </NavbarLogo>
    </template>
    <template #default="{ isShowMenu }">
      <NavbarCollapse :isShowMenu="isShowMenu">
        <router-link to="/">Home</router-link>
        <router-link to="/import">Import</router-link>
        <router-link to="/export">Export</router-link>
        <router-link to="/host">Host</router-link>
        <router-link to="/vm">VM</router-link>
        <router-link to="/assignment">Assignment</router-link>
        <router-link to="/printout">PDF</router-link>
        <router-link to="/about">About</router-link>
      </NavbarCollapse>
      <div class="w-4">
        <switch-theme />
      </div>
    </template>
  </Navbar>
</template>

<style scoped>
.router-link-active {
  color: grey;
}
</style>
