<template>
  <div class="tabs justify-center">
    <a
      v-for="system_recommendation_enum of SystemRecommendationEnums"
      :key="system_recommendation_enum"
      v-bind:class="
        'tab tab-lifted uppercase text-md ' +
        (system_recommendation_enum === storage.system_recommendation
          ? 'tab-active'
          : '')
      "
      @click="clk_selectSystemDimensions(system_recommendation_enum)"
      >{{ system_recommendation_enum }}</a
    >
  </div>
</template>

<script setup lang="ts">
import { useAppStorage } from '../../store/AppStorage'
import { SystemRecommendationEnums } from '../../store/types/enums'
const storage = useAppStorage()

function clk_selectSystemDimensions(
  system_recommendation: SystemRecommendationEnums
) {
  storage.system_recommendation = system_recommendation
}
</script>
