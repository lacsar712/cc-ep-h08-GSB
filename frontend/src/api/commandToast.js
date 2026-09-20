import { toastBothOnFinally } from '../utils/commandOutcome'

/** 在 finally 中按请求结果提示：成功才提示成功，失败/冲突只提示错误。 */
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
