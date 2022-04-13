import selfClosing from './selfClosing.js'
import normalTags from './normalTags.js'

const camelToKebab = string => string
  .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
  .toLowerCase()

const resolveStyle = data =>
  typeof data == "object" ? Object.keys(data).reduce((style, key) => {
    const v = data[key]
    const t = typeof v
    if (t == "boolean" || t == "number" || t == "string") {
      const s = String(v).trim()
      if (s.length) {
        style += (style ? '; ' : '')+camelToKebab(key)+': '+s
      }
    }

    return style.trim()
  }, "") || null : typeof data == "string" ? data.trim() || null : null

const resolveClass = data =>
  data instanceof Array ? data
    .filter(c => typeof c == "string")
    .map(c => c.trim())
    .filter(c => c)
    .join(" ") || null :
  typeof data == "string" ? data.trim() || null : null

const resolveAttr = data => 
  data === true ? '' :
  typeof data == "number" ? String(data) :
  typeof data == "string" || typeof data == "function" ? data :
    null

const resolveAttrs = data => Object.keys(data).reduce((Attrs, key) => {
  var v = data[key]
  v = key == "style" ? resolveStyle(v) :
      key == "class" ? resolveClass(v) : resolveAttr(v)

  if (v != null) {
    key = camelToKebab(key)
    if (typeof v == "function" && key.substr(0, 2) == "on") {
      key = key.substr(2)
    }

    Attrs[key] = v
  }

  return Attrs
}, {})

const resolveChildren = (data, text, preserve, raw) =>
  data == null ? [] : 
  (typeof data == "string" && data.length) || typeof data == "number" ?
    (preserve ? (raw ? data : text(String(data))) : [text(String(data))]) :
  data instanceof Array ? data
    .map(item => resolveChildren(item, text, preserve, true))
    .filter(item => item != null)
    .reduce((A, item) => A.concat(item), []) :
  typeof data == "object" ?
    [data] : [] 

const resolver = (text, preserve) => (tagName, attributes, children) => {
  if (children == null && (
    typeof attributes != 'object' || attributes instanceof Array
  )) {
    children = attributes
    attributes = {}
  }
  if (attributes == null || typeof attributes != 'object') {
    attributes = {}
  }
  attributes = resolveAttrs(attributes)
  children = resolveChildren(
    children, typeof text == 'function' ? text : x => x, preserve 
  )

  return [camelToKebab(tagName), attributes, children]
}

export default (h, text, preserve) => {
  const r = resolver(text, preserve)
  const Tags = {}

  selfClosing.forEach(tag => {
    Tags[tag] = attributes => {
      const [t, a, c] = r(tag, attributes, [])
      return h(t, a, c)
    }
  })

  normalTags.forEach(tag => {
    Tags[tag] = (attributes, children) => {
      const [t, a, c] = r(tag, attributes, children)
      return h(t, a, c)
    }
  })

  return (tagName, attributes, children) => {
    const isF = typeof tagName == 'function'
    const [t, a, c] = r(isF ? '' : tagName, attributes, children)
    if (isF) {
      return tagName(Tags, a, c)
    } else {
      return h(t, a, c)
    }
  }
}
