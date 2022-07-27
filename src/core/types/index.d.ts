export interface CatClientMessageStruct {
  theme: string
  clientId: string
  timestamp: string | number
  data: any
}

export interface CatServerStruct {
  dispatch(): void
}

export interface CatClientStruct {
  themeMap: Map<string, any>
  clientId: string
  connect(): void
  disconnect(): void
  send(action: string, data: any): void
  receive(action: string, callback: any): void
  getTheme(action: string): any
  hasTheme(action: string): boolean
}

export interface CatStoreStruct {
  clientList: Set<CatClientStruct>
  serverInfo: CatServerStruct
  taskList: CatClientMessageStruct[]
  taskPush(e: CatClientMessageStruct): void
  taskShift(): CatClientMessageStruct | undefined
  getClientTheme(action: string, message: CatClientMessageStruct): any[]
  addClient(client: CatClientStruct): void
  delClient(client: CatClientStruct): void
}
