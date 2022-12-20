import { jsPDF } from 'jspdf'

export function addResources(doc: jsPDF, offset_y: number, cpu_percentage: number, ram_percentage: number, storage_percentage: number) {
    const page_with = doc.internal.pageSize.getWidth()
    const bar_width = 20


    doc.rect(46,
        offset_y + 4,
        bar_width,
        5, 'S')
    doc.setFillColor("#0112ff")
    doc.rect(46,
        offset_y + 4,
        bar_width * (cpu_percentage / 100),
        5, 'F')
    doc.text(cpu_percentage.toFixed(1) + '%', 46 + bar_width + 1, offset_y + 7.5)


    doc.rect(96,
        offset_y + 4,
        bar_width,
        5, 'S')
    doc.setFillColor("#0112ff")
    doc.rect(96,
        offset_y + 4,
        bar_width * (ram_percentage / 100),
        5, 'F')
    doc.text(ram_percentage.toFixed(1) + '%', 96 + bar_width + 1, offset_y + 7.5)



    doc.rect(134,
        offset_y + 4,
        bar_width,
        5, 'S')
    doc.setFillColor("#0112ff")
    doc.rect(134,
        offset_y + 4,
        bar_width * (storage_percentage / 100),
        5, 'F')
    doc.text(storage_percentage.toFixed(1) + '%', 134 + bar_width + 1, offset_y + 7.5)




}
