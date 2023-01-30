import {
  draw_AssignmentPage,
  draw_CoverSheet,
  draw_HostListPage,
  draw_VMListPage,
} from './drawPages'
import { draw_CodePage } from './exportCode'
import { addPageNumbers } from './helperJSPDF'

import { jsPDF } from 'jspdf'

export async function generatePDF_FULL(doc: jsPDF) {
  draw_CoverSheet(doc)
  doc.addPage()

  draw_HostListPage(doc)
  doc.addPage()

  draw_VMListPage(doc)
  doc.addPage()

  draw_AssignmentPage(doc)

  //doc.addPage()
  //draw_CodePage(doc)

  addPageNumbers(doc)
}
