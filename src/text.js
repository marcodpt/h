import wrapper from './wrapper.js'

const escapeHtml = unsafe => unsafe
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;")
  .split("\n").join("&#13;&#10;")

const ident = (pre, V, pos, max) => {
  var div = '\n  '
  var a = '\n  '
  var b = '\n'
  if (max > 0) {
    var len = V.reduce((l, v) => l + v.length, 0)
    if (len < max) {
      var div = ' '
      var a = pre.substr(pre.length - 1) == '"' ? '' : ' '
      var b = ''
    }
  }

  return pre+a+V.map(v => v.split('\n').join('\n  ')).join(div)+b+pos
}

export default wrapper((tagName, attributes, children) => {
  const maxLine = 50

  const e = document.createElement(tagName)

  Object.keys(attributes).forEach(key => {
    const v = attributes[key]

    if (v === true) {
      return key
    } else if (key == "class") {

    }

    if (key.substr(0, 2) == 'on' && typeof v == 'function') {
      e.addEventListener(key.substr(2), v)
    } else {
      e.setAttribute(key, v)
    }
  })

  if (children instanceof Array) {
    children.forEach(child => e.appendChild(child))
  } else if (typeof children == "string") {
    e.appendChild(document.createTextNode(children))
  }

  return e
})
