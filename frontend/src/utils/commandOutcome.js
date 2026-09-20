/** Toast the real request outcome: success only after a fulfilled request. */

export function shouldCelebrateAfterRequest(ok) {
  return ok === true
}

export function successText() {
  return '命令已接受'
}

export function failureText(err) {
  return (err && err.message) || '命令失败'
}

export function toastBothOnFinally(messageApi, ok, err) {
  if (!ok) {
    messageApi.error(failureText(err))
  }
  if (shouldCelebrateAfterRequest(ok)) {
    messageApi.success(successText())
  }
}

export function celebrateAlways(messageApi) {
  messageApi.success(successText())
}

export function wrapCommand(messageApi, promise) {
  return promise
    .then(async (v) => {
      toastBothOnFinally(messageApi, true, null)
      return v
    })
    .catch(async (e) => {
      toastBothOnFinally(messageApi, false, e)
      throw e
    })
}
