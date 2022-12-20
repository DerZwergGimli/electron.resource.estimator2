import { RAIDEnums } from '../store/types/enums'
//import { parse } from 'filepond'

function storage_netto(storage_amount: number, storage_size: number) {
  return (storage_amount * storage_size) / 1.073741824
}

export function calculate_storage_netto(
  storage_amount: number,
  storage_size: number,
  decimals: number
) {
  return storage_netto(storage_amount, storage_size).toFixed(decimals)
}

export function calculate_raid(
  storage_amount: number,
  storage_size: number,
  raid_config: RAIDEnums,
  decimals: number
): number {
  console.log(storage_amount)
  // https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_5
  switch (raid_config) {
    case RAIDEnums.R0:
      return parseFloat(
        storage_netto(storage_amount, storage_size).toFixed(decimals)
      )
    case RAIDEnums.R1:
      if (storage_amount >= 2)
        return parseFloat(
          (storage_netto(storage_amount, storage_size) / 2).toFixed(decimals)
        )
      break
    case RAIDEnums.R5:
      if (storage_amount >= 3)
        return parseFloat(
          (
            storage_netto(storage_amount, storage_size) *
            (1 - 1 / storage_amount)
          ).toFixed(decimals)
        )
      break
    case RAIDEnums.R6:
      if (storage_amount >= 4)
        return parseFloat(
          (
            storage_netto(storage_amount, storage_size) *
            (1 - 2 / storage_amount)
          ).toFixed(decimals)
        )
      break
    case RAIDEnums.R10:
      if (storage_amount >= 4)
        return parseFloat(
          (storage_netto(storage_amount, storage_size) / 2).toFixed(decimals)
        )
      break
    default:
      console.log('Raid-Config not implemented')
      break
  }
  console.log('Error calculating RAID Storage size')
  return 0
}
