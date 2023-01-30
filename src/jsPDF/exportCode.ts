import { jsPDF } from 'jspdf'

import { useAppStorage } from '../store/AppStorage'

export function draw_CodePage(doc: jsPDF) {
  doc.setFontSize(15)
  doc.text('JSON-Config Export', doc.internal.pageSize.getWidth() / 2, 10, {
    align: 'center',
  })

  const font_size = 5
  doc.setFontSize(font_size)

  const split_text = doc.splitTextToSize(
    JSON.stringify(useAppStorage().export_config(), null, 3),
    doc.internal.pageSize.getWidth() - 20
  )

  let current_height = 0
  let index_fix = 0
  split_text.forEach((element, index) => {
    current_height = (font_size / 2) * (index - index_fix)
    if (current_height > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage()
      current_height = 0
      index_fix = index
    }
    if (index_fix === 0) {
      doc.text(element, 10, 25 + current_height)
    } else {
      doc.text(element, 10, 10 + current_height)
    }
  })
}
