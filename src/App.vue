<template>
  <div class="baikbingo-cat">
    <div
      class="baikbingo-cat-item"
      v-for="(item, index) in clientList"
      :key="index"
    >
      <div class="baikbingo-cat-theme">
        发送的主题：
        {{ item.sendTheme }}
      </div>
      <div class="baikbingo-cat-theme">
        接收的主题：
        {{ item.receiveTheme }}
      </div>
      <div class="baikbingo-cat-send">
        <input v-model="item.sendValue" />
        <button @click="handleSend(item)">发送</button>
      </div>
      <div class="baikbingo-cat-content">
        <div v-for="(log, key) in item.receiveLog" :key="`${index}_${key}`">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  CatClientMessageStruct as Message,
  CatClientStruct as Client
} from '@packages/cat-core/types'
import { useCatCore } from '@packages/cat-core'

interface ClientListStruct {
  title: string
  core: Client
  sendTheme: string[]
  receiveTheme: string[]
  sendValue: string
  receiveLog: Message[]
}

const clientList = ref<ClientListStruct[]>([
  {
    title: '客户端1',
    core: useCatCore(),
    sendTheme: ['test1'],
    receiveTheme: ['test2'],
    sendValue: '',
    receiveLog: []
  },
  {
    title: '客户端2',
    core: useCatCore(),
    sendTheme: ['test2'],
    receiveTheme: ['test1'],
    sendValue: '',
    receiveLog: []
  },
  {
    title: '客户端3',
    core: useCatCore(),
    sendTheme: ['test3'],
    receiveTheme: ['test1'],
    sendValue: '',
    receiveLog: []
  },
  {
    title: '客户端4',
    core: useCatCore(),
    sendTheme: ['test4'],
    receiveTheme: ['test1', 'test5'],
    sendValue: '',
    receiveLog: []
  },
  {
    title: '客户端5',
    core: useCatCore(),
    sendTheme: ['test5'],
    receiveTheme: ['test1'],
    sendValue: '',
    receiveLog: []
  },
  {
    title: '客户端6',
    core: useCatCore(),
    sendTheme: ['test5'],
    receiveTheme: ['test1', 'test5'],
    sendValue: '',
    receiveLog: []
  },
  {
    title: '客户端7',
    core: useCatCore(),
    sendTheme: ['test5'],
    receiveTheme: ['test1', 'test5'],
    sendValue: '',
    receiveLog: []
  },
  {
    title: '客户端8',
    core: useCatCore(),
    sendTheme: ['test5'],
    receiveTheme: ['test1', 'test5'],
    sendValue: '',
    receiveLog: []
  }
])

onMounted(() => {
  clientList.value.forEach(item => {
    item.receiveTheme.forEach(action => {
      item.core.receive(action, (message: Message) => {
        item.receiveLog.push(message)
      })
    })
  })
})

const handleSend = (item: ClientListStruct) => {
  item.sendTheme.forEach(theme => {
    item.core.send(theme, item.sendValue)
  })
}
</script>

<style>
html,
body,
#app {
  padding: unset;
  margin: unset;
  background-color: #e0e0e0;
}
.baikbingo-cat {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}
.baikbingo-cat-item {
  margin: 8px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  width: calc(25% - 48px);
  height: 300px;
  overflow-y: auto;
}
</style>
