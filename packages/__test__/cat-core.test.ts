import { expect, test } from 'vitest'
import { useCatCore } from '@packages/cat-core'

test('client A say hello world', () => {
  const clientA = useCatCore()
  const clientB = useCatCore()
  clientA.send('say', 'hello word!')
  clientA.send('not say', 'this is test')
  clientB.receive('say', message => {
    expect(message.data).toBe('hello word!')
    expect(message.data).not.toBe('this is test')
  })
})