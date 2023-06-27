import { type Connector, type DisconnectError } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('parameter', () => {
  expectTypeOf(useDisconnect().disconnect)
    .parameter(0)
    .toEqualTypeOf<{ connector?: Connector | undefined } | undefined>()
  expectTypeOf(useDisconnect({ connector }).disconnect)
    .parameter(0)
    .toEqualTypeOf<{ connector?: Connector | undefined } | undefined>()
})

test('context', () => {
  useDisconnect({
    connector,
    onMutate(variables) {
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connector?: Connector | undefined
          }
        | undefined
      >()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connector?: Connector | undefined
          }
        | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<DisconnectError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connector?: Connector | undefined
          }
        | undefined
      >()
      expectTypeOf(data).toEqualTypeOf<void>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<void | undefined>()
      expectTypeOf(error).toEqualTypeOf<DisconnectError | null>()
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connector?: Connector | undefined
          }
        | undefined
      >()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  }).disconnect(undefined, {
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connector?: Connector | undefined
          }
        | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<DisconnectError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connector?: Connector | undefined
          }
        | undefined
      >()
      expectTypeOf(data).toEqualTypeOf<void | undefined>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<void | undefined>()
      expectTypeOf(error).toEqualTypeOf<DisconnectError | null>()
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connector?: Connector | undefined
          }
        | undefined
      >()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  })
})
