import { jsPDF } from 'jspdf'

export function addResources(doc: jsPDF, offset_y: number, title: string, cpu_percentage: number, ram_percentage: number, storage_percentage: number) {
    const page_with = doc.internal.pageSize.getWidth()
    const page_margin = 20
    const page_with_usable = page_with - page_margin * 2

    doc.text(
        title,
        doc.internal.pageSize.getWidth() / 2,
        offset_y,
        {
            align: 'center',
        }
    )


    for (let i = 0; i < 3; i++) {
        const bar_width = 20
        const spacing_x = 20

        var resource_text = ''
        var percentage_fill = 0

        doc.text(resource_text, page_margin + ((bar_width + spacing_x) * i) - 3, offset_y + 9)
        doc.roundedRect(
            page_margin + ((bar_width + spacing_x) * i) + 10,
            offset_y + 5,
            bar_width,
            5,
            2,
            2,
            'S'
        )

        switch (i) {
            case 0:
                resource_text = 'CPU';
                percentage_fill = cpu_percentage / 100;
                doc.setFillColor("#1cf100")
                break;
            case 1:
                resource_text = 'RAM';
                percentage_fill = ram_percentage / 100;
                doc.setFillColor("#01fff2")
                break;
            case 2:
                resource_text = 'Storage';
                percentage_fill = storage_percentage / 100;
                doc.setFillColor("#0112ff")
                break;
            default:
                resource_text = 'error';
                percentage_fill = 50 / 100;
                break;
        }








        doc.roundedRect(
            page_margin + ((bar_width + spacing_x) * i) + 10,
            offset_y + 5,
            bar_width * percentage_fill,
            5,
            2,
            2,
            'F'
        )
    }






}