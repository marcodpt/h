import wrapper from './wrapper.js'

export default wrapper((tagName, attributes, children) => {
  const e = document.createElement(tagName)

  Object.keys(attributes).forEach(key => {
    const v = attributes[key]
    if (typeof v == 'function') {
      e.addEventListener(key, v)
    } else {
      e.setAttribute(key, v)
    }
  })

  children.forEach(child => e.appendChild(child))

  return e
}, text => document.createTextNode(text))
