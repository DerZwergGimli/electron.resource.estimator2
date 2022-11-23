<template>
  <div class="home flex flex-col">
    <div class="base-headline">Home</div>
    <div class="divider"></div>
    <div class="flex flex-row justify-center space-x-2">
      <ul class="basis-1/2 steps steps-vertical">
        <li class="step step-primary">
          'Import' your own config or use the default
        </li>
        <li class="step step-primary">
          Check you imported config in the 'Export' section
        </li>
        <li class="step step-primary">
          Modify your hosts in the 'Host' section
        </li>
        <li class="step step-primary">Modify your VMs in the 'VM' section</li>
        <li class="step step-primary">
          Assign your VMs to the host in the 'Assignment' section
        </li>
        <li class="step step-primary">Create a PDF in the 'Print' section</li>
      </ul>
      <img
        class="object-contain w-96"
        src="/public/logo.png"
        alt="app-logo"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
