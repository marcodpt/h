import wrapper from './wrapper.js'

export default wrapper((tagName, attributes, children) => {
  const e = document.createElement(tagName)

  Object.keys(attributes).forEach(key => {
    const v = attributes[key]
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
