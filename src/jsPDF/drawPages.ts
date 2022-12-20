import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import { useAppStorage } from '../store/AppStorage'
import { calculate_raid } from '../extra/calculator_storage'
import { RAIDEnums } from '../store/types/enums'
import { addResources } from './usedResources'

export function draw_CoverSheet(doc: jsPDF) {
    draw_outline(doc)

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
    draw_outline(doc)

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
    draw_outline(doc)

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

export function draw_AssignmentPage(doc: jsPDF) {
    doc.text('Assignments-List', doc.internal.pageSize.getWidth() / 2, 20, {
        align: 'center',
    })

    doc.addPage()

    for (let i = 0; i < useAppStorage().assignmentsList.length; i++) {
        var offsetY = 20

        let current_host = useAppStorage().hostsList.find((host) =>
            host.uuids.some((uuid) => uuid === useAppStorage().assignmentsList[i].host_uuid)
        )

        doc.text(
            current_host?.name ?? 'error',
            doc.internal.pageSize.getWidth() / 2,
            offsetY,
            {
                align: 'center',
            }
        )
        doc.setFontSize(9)
        doc.text('UUID:', 15, 30)
        doc.text('Index:', 150, 30, { align: 'right' })
        doc.text(i.toString() ?? 'error', 160, 30, { align: 'left' })
        doc.text(useAppStorage().assignmentsList[i].host_uuid ?? 'error', 40, 30)
        doc.text('Manufacturer:', 15, 35)
        offsetY += 20
        doc.text(
            useAppStorage().hostsList.find((host) =>
                host.uuids.some((uuid) => uuid == useAppStorage().assignmentsList[i].host_uuid)
            )?.manufacturer ?? 'error',
            offsetY,
            35
        )

        let body_assignments = [
            [
                {
                    content: current_host?.cpu.sockets.toString() ?? 'error',
                    colSpan: 1,
                },
                {
                    content: current_host?.cpu.cores.toString() ?? 'error',
                    colSpan: 1,
                },
                {
                    content: current_host?.ram.slots.toString() ?? 'error',
                    colSpan: 1,
                },
                {
                    content: current_host?.ram.size.toString() ?? 'error',
                    colSpan: 1,
                },
                {
                    content: current_host?.storage.amount.toString() ?? 'error',
                    colSpan: 1,
                },
                {
                    content: current_host?.storage.size.toString() ?? 'error',
                    colSpan: 1,
                },
                {
                    content: current_host?.storage.raid.toString() ?? 'error',
                    colSpan: 1,
                },
            ],
        ]

        body_assignments.push([
            {
                content:
                    (
                        (current_host?.cpu.sockets ?? 0) * (current_host?.cpu.cores ?? 0)
                    ).toString() + ' Cores',
                colSpan: 2,
            },
            {
                content:
                    (
                        (current_host?.ram.slots ?? 0) * (current_host?.ram.size ?? 0)
                    ).toString() + ' GB',
                colSpan: 2,
            },
            {
                content:
                    calculate_raid(
                        current_host?.storage.amount ?? 0,
                        current_host?.storage.size ?? 0,
                        current_host?.storage.raid ?? RAIDEnums.R0,
                        1
                    ).toString() + ' GB',
                colSpan: 3,
            },
        ])

        autoTable(doc, {
            theme: 'grid',
            startY: offsetY,
            head: [
                [
                    {
                        content: 'CPU',
                        colSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'RAM',
                        colSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Storage',
                        colSpan: 3,
                        styles: { halign: 'center' },
                    },
                ],
                ['sockets', 'cores', 'slots', 'size', 'amount', 'size', 'RAID'],
            ],
            body: body_assignments,
        })

        offsetY += 35
        addResources(doc, offsetY, 'Used Resources', 10, 20, 70)
        offsetY += 20

        doc.setFontSize(15)

        let body_vms: any[] = []

        for (let i = 0; i < useAppStorage().assignmentsList[i].vm_uuid.length; i++) {
            useAppStorage().vmsList.forEach((vm) => {
                vm.uuids.forEach((uuid) => {
                    if (uuid === useAppStorage().assignmentsList[i].vm_uuid[i]) {
                        let row = [
                            vm.name,
                            vm.vcpu.rec.toString() + ' Cores',
                            vm.vram.rec.toString() + ' GB',
                            vm.vstorage.rec.toString() + ' GB',
                        ]
                        body_vms.push(row)
                    }
                })
            })
        }

        body_vms.push([
            'SUM',
            body_vms.reduce((a, b) => a + parseInt(b[1].replace(' Cores', '')), 0) +
            ' Cores',
            body_vms.reduce((a, b) => a + parseInt(b[2].replace(' GB', '')), 0) +
            ' GB',
            body_vms.reduce((a, b) => a + parseInt(b[3].replace(' GB', '')), 0) +
            ' GB',
        ])

        autoTable(doc, {
            head: [['Name', 'CPU', 'RAM', 'Storage']],
            startY: offsetY,
            body: body_vms,
            didParseCell: function (data) {
                var rows = data.table.body
                if (data.row.index === rows.length - 1) {
                    data.cell.styles.fillColor = '#8FE6FC'
                }
            },
        })

        if (useAppStorage().assignmentsList.length - 1 > i) {
            doc.addPage()
        }
    }
}

function draw_outline(doc: jsPDF) {
    doc.setDrawColor('#000000')
    doc.roundedRect(
        10,
        10,
        190,
        doc.internal.pageSize.getHeight() - 20,
        5,
        5,
        'S'
    )
}