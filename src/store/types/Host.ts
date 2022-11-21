import { RAIDEnums } from './enums'
export interface Host {
  id: number
  uuids: string[]
  name: string
  manufacturer: string
  cpu: CPU
  ram: RAM
  storage: Storage
}

export interface CPU {
  sockets: number
  cores: number
}

export interface RAM {
  slots: number
  size: number
}

export interface Storage {
  amount: number
  size: number
  raid: RAIDEnums
}
