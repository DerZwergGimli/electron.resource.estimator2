import { jsPDF } from 'jspdf'

export function addPageNumbers(doc: jsPDF) {
    var pageCount = doc.getNumberOfPages();
    for (var i = 0; i < pageCount; i++) {
        doc.setPage(i);
        let pageCurrent = doc.getCurrentPageInfo().pageNumber;
        doc.setFontSize(10);
        doc.text(pageCurrent.toString(), doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 5);
    }
}