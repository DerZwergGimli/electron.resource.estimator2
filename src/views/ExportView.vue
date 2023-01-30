<template>
  <div class="base-content flex flex-col space-y-3">
    <Accordion>
      <accordion-panel>
        <accordion-header
          ><div class="flex flex-row items-center">
            <p>Config</p>
            <div class="flex w-full justify-end pr-5">
              <Button color="default" @click="clk_download()">Download</Button>
            </div>
          </div>
        </accordion-header>
        <accordion-content>
          <div>
            <div class="mx-4 p-2">
              <vue-json-pretty
                :path="'res'"
                :data="store.export()"
              ></vue-json-pretty>
            </div>
          </div>
        </accordion-content>
      </accordion-panel>
      <accordion-panel> </accordion-panel>
      <accordion-panel>
        <accordion-header>Presets</accordion-header>
        <accordion-content>
          <div>NOT-IMPLEMNTED</div>
        </accordion-content>
      </accordion-panel>
    </Accordion>
  </div>
</template>

<script setup>
import {
  Accordion,
  AccordionPanel,
  AccordionHeader,
  AccordionContent,
  Button,
} from 'flowbite-vue'

import VueJsonPretty from 'vue-json-pretty'
import { createToast } from 'mosha-vue-toastify'
import 'vue-json-pretty/lib/styles.css'
import { defineComponent } from 'vue'
import download from 'downloadjs'

import { useAppStorage } from '../store/AppStorage'
const store = useAppStorage()

defineComponent({ VueJsonPretty })

function clk_download() {
  createToast('Download started...', { type: 'info' })
  download(
    JSON.stringify(store.export(), null, 3),
    'resource_capacity_estimator_export.json',
    'text/plain'
  )
}
</script>
