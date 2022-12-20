import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import { useAppStorage } from '../store/AppStorage'

export function draw_CoverSheet(doc: jsPDF) {
    doc.roundedRect(
        10,
        10,
        190,
        doc.internal.pageSize.getHeight() - 20,
        5,
        5,
        'S'
    )

    doc.setFontSize(15)
    doc.text(
        'Virtual Environment Estimator ',
        doc.internal.pageSize.getWidth() / 2,
        50,
        {
            align: 'center',
        }
    )

    doc.setFontSize(10)
    doc.text(
        new Date().toLocaleDateString(),
        doc.internal.pageSize.getWidth() / 2,
        250,
        {
            align: 'center',
        }
    )
    doc.text(
        'Tool-Version ' + process.env.npm_package_version ?? 'error',
        doc.internal.pageSize.getWidth() / 2,
        255,
        {
            align: 'center',
        }
    )

    doc.setFontSize(15)

}

export function draw_HostListPage(doc: jsPDF) {
    doc.text('List of all Hosts', doc.internal.pageSize.getWidth() / 2, 20, {
        align: 'center',
    })

    let body_hosts = useAppStorage().hostsList.map((host, index) => {
        return [
            index,
            host.name,
            host.cpu.cores * host.cpu.sockets + ' Cores',
            host.ram.size * host.ram.slots + ' GB',
            host.storage.size * host.storage.amount + ' GB',
            host.uuids.length,
        ]
    })

    body_hosts.push([
        'Sum',
        '',
        useAppStorage().hostsList.reduce((a, b) => a + b.cpu.cores * b.cpu.sockets, 0) +
        ' Cores',
        useAppStorage().hostsList.reduce((a, b) => a + b.ram.size * b.ram.slots, 0) + ' GB',
        useAppStorage().hostsList.reduce((a, b) => a + b.storage.size * b.storage.amount, 0) +
        ' GB',
        useAppStorage().hostsList.reduce((a, b) => a + b.uuids.length, 0),
    ])

    autoTable(doc, {
        startY: 30,
        head: [['ID', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']],
        body: body_hosts,
        didParseCell: function (data) {
            var rows = data.table.body
            if (data.row.index === rows.length - 1) {
                data.cell.styles.fillColor = '#8FE6FC'
            }
        },
    })
}

export function draw_VMListPage(doc: jsPDF) {
    doc.text('List of all VMs ', doc.internal.pageSize.getWidth() / 2, 20, {
        align: 'center',
    })

    let body_vms = useAppStorage().vmsList.map((vm, index) => {
        return [
            index,
            vm.name,
            vm.vcpu.rec.toString() + ' Cores',
            vm.vram.rec.toString() + ' GB',
            vm.vstorage.rec.toString() + ' GB',
            vm.uuids.length,
        ]
    })

    body_vms.push([
        'Sum',
        '',
        useAppStorage().vmsList.reduce((a, b) => a + b.vcpu.rec, 0) + ' Cores',
        useAppStorage().vmsList.reduce((a, b) => a + b.vram.rec, 0) + ' GB',
        useAppStorage().vmsList.reduce((a, b) => a + b.vstorage.rec, 0) + ' GB',
        useAppStorage().vmsList.reduce((a, b) => a + b.uuids.length, 0),
    ])

    autoTable(doc, {
        startY: 30,
        head: [['ID', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']],
        body: body_vms,
        didParseCell: function (data) {
            var rows = data.table.body
            if (data.row.index === rows.length - 1) {
                data.cell.styles.fillColor = '#8FE6FC'
            }
        },
    })

}