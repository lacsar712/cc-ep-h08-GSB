import { toastBothOnFinally } from '../utils/commandOutcome'

/** BUG: every API command celebrates in finally via helper. */
export async function withSuccessToast(messageApi, fn) {
  let ok = false
  let err = null
  try {
    const result = await fn()
    ok = true
    return result
  } catch (e) {
    err = e
    throw e
  } finally {
    toastBothOnFinally(messageApi, ok, err)
  }
}
