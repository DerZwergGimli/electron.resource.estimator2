import {
  draw_AssignmentPage,
  draw_CoverSheet,
  draw_HostListPage,
  draw_VMListPage,
} from './drawPages'
import { draw_CodePage } from './exportCode'
import { addPageNumbers } from './helperJSPDF'

import { jsPDF } from 'jspdf'
import { jsPDFDocument } from 'jspdf-autotable'

export async function generatePDF_FULL(doc: jsPDF) {
  draw_CoverSheet(doc)
  doc.addPage()

  draw_HostListPage(doc)
  doc.addPage()

  draw_VMListPage(doc)
  doc.addPage()

  draw_AssignmentPage(doc, true)

  //doc.addPage()
  //draw_CodePage(doc)

  addPageNumbers(doc)
}

export async function generatePDF_SIMPLE(doc: jsPDF) {
  draw_CoverSheet(doc)
  doc.addPage()

  draw_AssignmentPage(doc, false)

  addPageNumbers(doc)
}
