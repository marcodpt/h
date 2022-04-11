import selfClosing from './selfClosing.js'
import normalTags from './normalTags.js'

export default h => {
  const Tags = {}

  selfClosing.forEach(tag => {
    Tags[tag] = attributes => h(tag, attributes)
  })

  normalTags.forEach(tag => {
    Tags[tag] = (attributes, children) => h(tag, attributes, children)
  })

  return Tags
}
