import { v4 as uuidv4 } from 'uuid'
import {
  CatClientMessageStruct as Message,
  CatClientStruct as Client,
  CatStoreStruct as Store
} from '../types'

export default class CatClient implements Client {
  // 核心存储
  private store: Store
  // 主题包
  public themeMap: Map<string, any>
  // 客户端ID
  public clientId: string = uuidv4()

  /**
   * 初始化
   * @param store
   */
  constructor (store: Store) {
    this.store = store
    this.themeMap = new Map()
    this.connect()
  }

  /**
   * 建立连接
   */
  public connect () {
    this.store.addClient(this)
  }

  /**
   * 断开连接
   */
  public disconnect () {
    this.store.delClient(this)
  }

  /**
   * 发送
   * @param theme
   * @param data
   */
  public send (theme: string, data: any) {
    this.store.taskPush({
      theme,
      clientId: this.clientId,
      timestamp: new Date().getTime(),
      data
    })
  }

  /**
   * 接收
   * @param theme
   * @param callback
   */
  public receive (theme: string, callback: any) {
    callback && this.themeMap.set(theme, callback)
  }

  /**
   * 返回待处理主题包
   */
  public getTheme (theme: string): any {
    return (message: Message): Promise<Function> =>
      new Promise(resolve => {
        resolve(this.themeMap.get(theme)(message))
      })
  }

  /**
   * 主题包是否存在
   */
  public hasTheme (theme: string): boolean {
    return this.themeMap.has(theme)
  }
}
