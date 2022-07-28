import CatClient from './client'
import CatStore from './store'

// 单例
const store = new CatStore()

// 客户端处理核心
const useCatCore = () => {
  const client = new CatClient(store)
  return client
}

export { useCatCore }
