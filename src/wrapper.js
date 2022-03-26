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
        style += ' '+camelToKebab(key)+': '+s+';'
      }
    }

    return style.trim()
  }, "") || null : typeof data == "string" ? data.trim() || null : null

const resolveClass = data =>
  data instanceof Array ? data
    .filter(c => typeof c == "string")
    .map(c => c.trim())
    .join(" ") || null :
  typeof data == "string" ? data.trim() || null : null

const resolveAttr = data => 
  data != null && data !== false && typeof data != "object" ? data : null

const resolveAttrs = data => Object.keys(data || {}).reduce((Attrs, key) => {
  var v = data[key]
  v = key == "style" ? resolveStyle(v) :
      key == "class" ? resolveClass(v) : resolveAttr(v)

  if (v != null) {
    Attrs[key] = v
  }

  return Attrs
}, {})

const resolveChildren = data =>
  typeof data == "string" || typeof data == "number" ?
    String(data).length ? String(data) : [] :
  data instanceof Array ?
    data.filter(item => item != null) :
  typeof data == "object" && data != null ?
    [data] : [] 

export default h => (tagName, attributes, children) => {
  children = resolveChildren(children)

  return h(
    camelToKebab(tagName),
    resolveAttrs(attributes),
    typeof children == "string" && typeof text == "function" ?
      text(children) : children
  )
}
