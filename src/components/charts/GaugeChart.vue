<template>
  <div id="chart" class="flex flex-col bg-base-200 m-2 rounded-lg">
    <p>{{ name }}</p>
    <div class="flex flex-row justify-center pb-2">
      <p>{{ used }}</p>
      <p class="px-2">of</p>
      <p>{{ total }}</p>
    </div>
    <apexchart
      type="radialBar"
      :options="chartOptions"
      :series="value"
    ></apexchart>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "None",
  },
  used: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

const value = [((props.used / props.total) * 100).toFixed(1)];
</script>

<script>
import apexchart from "vue3-apexcharts";

export default {
  name: "GaugeChart",
  components: { apexchart },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "22px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91],
          },
        },
        labels: ["Result"],
      },
    };
  },
};
</script>

<style scoped></style>
