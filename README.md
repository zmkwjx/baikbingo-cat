#### 摘要
低代码中，有一个重要的组成部分就是各模块、各组件之间的通信。要完成不同类型、独立开发的组件之间的交互，势必需要一个沟通枢纽，在以往的一些项目中，触发方式过于死板，或者耦合性过强，导致代码中的逻辑越来越复杂，后期开发难度大。订阅转发模式以订阅主题转发消息，脱离了组件制定的强关联模式，使得消息传递低耦合进行。以一个制定的主题进行，甚至可以在配置项时自定义主题，在需要的地方配置监听方法即可完成传递。

#### baikbingo-cat 简介
baikbingo是组织名称，意在让所有人都参与、把开发当游戏一样进行。取名为Cat（猫），是来源于制解调器的谐音（光猫），其次是应为猫是一种身手敏捷的动物，作者也希望该架构作为一种基础模式在未来有着更加强大的拓展。

#### 安装使用

安装
```shell
npm i @baikbingo/cat-core -S
```

使用
```js
import { useCatCore } from '@baikbingo/cat-core'
const client = useCatCore()
// 作为生产者：发送消息
client.send('theme', 'this is baikbingo cat!')
// 也可以发送多个主题
client.send('otherTheme', 'this is baikbingo cat!')
// 作为消费者：接收消息
client.receive('theme', msg => {
  console.log('this is theme receive message: ', msg.data)
})
// 也可以接收多个主题
client.receive('otherTheme', msg => {
  console.log('this is otherTheme receive message: ', msg.data)
})
```

#### 预览
```shell
git clone https://github.com/zmkwjx/baikbingo-cat.git
cd baikbingo-cat
yarn 
yarn dev
```