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
  data != null && data !== false && typeof data != "object" ? data : null

const resolveAttrs = data => Object.keys(data || {}).reduce((Attrs, key) => {
  var v = data[key]
  v = key == "style" ? resolveStyle(v) :
      key == "class" ? resolveClass(v) : resolveAttr(v)

  if (v != null) {
    Attrs[camelToKebab(key)] = v
  }

  return Attrs
}, {})

const resolveChildren = data =>
  data == null ? null : 
  typeof data == "string" || typeof data == "number" ?
    String(data) || [] :
  data instanceof Array ?
    data.filter(item => item != null) :
  typeof data == "object" ?
    [data] : [] 

export default h => (tagName, attributes, children) => {
  if (children == null && (
    typeof attributes != 'object' || attributes instanceof Array
  )) {
    children = attributes
    attributes = {}
  }

  return h(
    camelToKebab(tagName),
    resolveAttrs(attributes),
    resolveChildren(children)
  )
}
