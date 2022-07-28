import {
  CatClientMessageStruct as Message,
  CatServerStruct as Server,
  CatClientStruct as Client,
  CatStoreStruct as Store
} from '../types'
import CatServer from '../server'

export default class CatStore implements Store {
  // 客户端清单
  public clientList: Set<Client>
  // 服务端信息
  public serverInfo: Server
  // 任务清单
  public taskList: Message[]

  /**
   * 初始化
   */
  constructor () {
    this.serverInfo = new CatServer(this)
    this.clientList = new Set()
    this.taskList = []
  }

  /**
   * 任务入栈
   */
  public taskPush = (e: Message) => {
    this.taskList.push(e)
    this.serverInfo.dispatch()
  }

  /**
   * 任务出栈
   */
  public taskShift = (): Message | undefined => {
    return this.taskList.shift()
  }

  /**
   * 返回客户端主题信息
   * @param theme
   * @param message
   * @returns
   */
  public getClientTheme = (theme: string, message: Message): any[] => {
    const receives: any[] = []
    this.clientList.forEach((item: Client) => {
      if (item.hasTheme(theme)) {
        receives.push(item.getTheme(theme)(message))
      }
    })
    return receives
  }

  /**
   * 添加客户端信息
   */
  public addClient = (client: Client) => {
    this.clientList.add(client)
  }

  /**
   * 删除客户端信息
   */
  public delClient = (client: Client) => {
    this.clientList.delete(client)
  }
}
