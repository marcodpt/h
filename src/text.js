import selfClosing from './selfClosing.js'
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
  var a = V.length ? '\n  ' : ''
  var b = V.length ? '\n' : ''
  if (max > 0) {
    var len = V.reduce((l, v) => l + v.length, 0)
    if (len < max) {
      var div = ' '
      var a = !a || pre.substr(pre.length - 1) == '"' ? '' : ' '
      var b = ''
    }
  }

  return pre+a+V.map(v => v.split('\n').join('\n  ')).join(div)+b+pos
}

export default wrapper((tagName, attributes, children) => {
  const maxLine = 50

  var X = Object.keys(attributes).map(function (name) {
    var v = attributes[name]
    if (v == "") {
      return name
    } else if (name == 'class') {
      return ident('class="', v.split(" "), '"', maxLine)
    } else if (name == 'style') {
      return ident('style="', v.split("; ").map(v => v+';'), '"', maxLine)
    } else {
      return name+'="'+v+'"'
    }
  })

  var html = ident('<'+tagName, X, '', maxLine)

  if (selfClosing.indexOf(tagName) != -1) {
    html += '/>'
  } else if (typeof children == "string") {
    html += '>'+children+'</'+tagName+'>'
  } else {
    html += ident('>', children, '</'+tagName+'>')
  }

  return html
}, escapeHtml, true)
