// 一个简单的ajax请求
var sendRequest = function (url, jsonData, onSuccess, onError) {
  var xhr = new XMLHttpRequest()
  var resp = {}
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        resp = JSON.parse(this.responseText)
        (typeof onSuccess === 'function') && onSuccess(resp)
      } else {
        // request error
        onError && onError()
      }
    }
  })

  xhr.onerror = function (e) {
    (typeof onError === 'function') && onError()
  }

  xhr.open((jsonData ? "POST" : "GET"), url)
  xhr.setRequestHeader("content-type", "application/json")
  xhr.setRequestHeader("cache-control", "no-cache")

  xhr.send(JSON.stringify(jsonData))
}