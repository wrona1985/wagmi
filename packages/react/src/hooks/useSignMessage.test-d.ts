import { type SignMessageError, type SignMessageParameters } from '@wagmi/core'
import { expectTypeOf, test } from 'vitest'

import { useSignMessage } from './useSignMessage.js'

const message = 'hello world'
const contextValue = { foo: 'bar' } as const

type SignableMessage = SignMessageParameters['message']

test('required', () => {
  expectTypeOf(useSignMessage().signMessage)
    .parameter(0)
    .toEqualTypeOf<{ message: SignableMessage }>()

  // @ts-expect-error
  useSignMessage().signMessage()
})

test('optional', () => {
  expectTypeOf(useSignMessage({ message }).signMessage)
    .parameter(0)
    .toEqualTypeOf<{ message?: SignableMessage | undefined } | undefined>()
})

test('context', () => {
  useSignMessage({
    message,
    onMutate(variables) {
      expectTypeOf(variables).toEqualTypeOf<{
        message: SignableMessage
      }>()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{
        message: SignableMessage
      }>()
      expectTypeOf(error).toEqualTypeOf<SignMessageError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{
        message: SignableMessage
      }>()
      expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
      expectTypeOf(error).toEqualTypeOf<SignMessageError | null>()
      expectTypeOf(variables).toEqualTypeOf<{
        message: SignableMessage
      }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  }).signMessage(undefined, {
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{
        message: SignableMessage
      }>()
      expectTypeOf(error).toEqualTypeOf<SignMessageError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{
        message: SignableMessage
      }>()
      expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
      expectTypeOf(error).toEqualTypeOf<SignMessageError | null>()
      expectTypeOf(variables).toEqualTypeOf<{
        message: SignableMessage
      }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  })
})
