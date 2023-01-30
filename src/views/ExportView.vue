<script setup>
import {
  Accordion,
  AccordionPanel,
  AccordionHeader,
  AccordionContent,
  Button,
  Badge,
} from 'flowbite-vue'

import VueJsonPretty from 'vue-json-pretty'
import { createToast } from 'mosha-vue-toastify'
import 'vue-json-pretty/lib/styles.css'
import { defineComponent } from 'vue'
import download from 'downloadjs'

import { useAppStorage } from '~/store/AppStorage'
import { make_zip } from '~/jsZIP/make_zip'
import { TOAST_INFO } from '~/extra/toast-config'
const store = useAppStorage()

defineComponent({ VueJsonPretty })

function clk_download_config() {
  createToast('Download started...', TOAST_INFO)
  download(
    JSON.stringify(store.export_config(), null, 3),
    'resource_capacity_estimator_export.json',
    'text/json'
  )
}

function clk_download_presets() {
  createToast('Download started...', TOAST_INFO)
  download(
    JSON.stringify(store.export_presets(), null, 3),
    'resource_capacity_estimator_presets.json',
    'text/json'
  )
}

function clk_download_zip() {
  createToast('Download started...', TOAST_INFO)
  make_zip(
    useAppStorage().export_presets(),
    useAppStorage().export_config()
  ).then(() => {
    console.log('Generated .zip')
  })
}
</script>

<template>
  <div class="base-content flex flex-col space-y-3">
    <Accordion>
      <accordion-panel>
        <accordion-header
          ><div class="flex flex-row items-center">
            <p>Combined ZIP</p>
            <div class="flex w-full justify-end pr-5">
              <Button color="default" @click="clk_download_zip()"
                >Download</Button
              >
            </div>
          </div>
        </accordion-header>
        <accordion-content>
          <div>
            <h2
              class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
            >
              The .ZIP-Archive will contain:
            </h2>
            <div
              class="grid grid-cols-2 gap-4 text-gray-500 dark:text-gray-400"
            >
              <div>Your configuration:</div>
              <div class="w-min">
                <Badge type="yellow">rce_config.json</Badge>
              </div>
              <div>The preset-configuration:</div>
              <div class="w-min">
                <Badge type="yellow">rce_presets.json</Badge>
              </div>
              <div>A simplified Printout as PDF:</div>
              <div class="w-min">
                <Badge type="yellow">rce_simple.pdf</Badge>
              </div>

              <div>An extended Printout as PDF:</div>
              <div class="w-min">
                <Badge type="yellow">rce_full.pdf</Badge>
              </div>
            </div>
          </div>
        </accordion-content>
      </accordion-panel>
      <accordion-panel>
        <accordion-header
          ><div class="flex flex-row items-center">
            <p>Standalone Config (JSON)</p>
            <div class="flex w-full justify-end pr-5">
              <Button color="default" @click="clk_download_config()"
                >Download</Button
              >
            </div>
          </div>
        </accordion-header>
        <accordion-content>
          <div>
            <div class="mx-4 p-2">
              <vue-json-pretty
                :path="'res'"
                :data="store.export_config()"
              ></vue-json-pretty>
            </div>
          </div>
        </accordion-content>
      </accordion-panel>

      <accordion-panel>
        <accordion-header
          ><div class="flex flex-row items-center">
            <p>Standalone Presets (JSON)</p>
            <div class="flex w-full justify-end pr-5">
              <Button color="default" @click="clk_download_presets()"
                >Download</Button
              >
            </div>
          </div></accordion-header
        >
        <accordion-content>
          <div>
            <div class="mx-4 p-2">
              <vue-json-pretty
                :path="'res'"
                :data="store.export_presets()"
              ></vue-json-pretty>
            </div>
          </div>
        </accordion-content>
      </accordion-panel>
    </Accordion>
  </div>
</template>
