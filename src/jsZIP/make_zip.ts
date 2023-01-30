import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { jsPDF } from 'jspdf'
import { generatePDF_FULL } from '../jsPDF/generator'
export async function make_zip(presets_json: any, config_json: any) {
  let zip = new JSZip()

  zip.file('rce_presets.json', JSON.stringify(presets_json, null, 3))
  zip.file('rce_config.json', JSON.stringify(config_json, null, 3))

  const doc = new jsPDF('p', 'mm', 'a4')
  await generatePDF_FULL(doc)

  zip.file('rce_full.pdf', doc.output('blob'))

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, 'rce_export.zip')
  })
}
