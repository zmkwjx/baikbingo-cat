import {
  CatClientMessageStruct as Message,
  CatServerStruct as Server,
  CatStoreStruct as Store
} from '../types'

export default class CatServer implements Server {
  // 核心存储
  private store: Store

  // 加锁状态
  private lock: Number | Boolean = false

  /**
   * 初始化
   */
  constructor (store: Store) {
    this.store = store
  }

  // 任务调度
  public dispatch () {
    if (this.lock === false) {
      this.lock = setTimeout(async () => {
        const taskInfo = this.store.taskShift()
        taskInfo && (await this.handler(taskInfo))
        this.lock = false
        this.dispatch()
      })
    }
  }

  // 处理任务
  private handler (e: Message) {
    return Promise.all(this.store.getClientTheme(e.theme, e))
  }
}
