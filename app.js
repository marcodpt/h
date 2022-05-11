import {hDom as html} from './index.js'
import test from './samples.js'
import {getUrl} from './lib.js'

const url = getUrl() || './samples.js'
const error = {
  title: 'Error',
  gh: test.gh,
  element: test.element({
    type: 'danger'
  }, `Error loading module: ${url}`)
}
const defaultTitle = document.title

const setElement = e => {
  const target = document.getElementById('element')
  target.innerHTML = ''
  if (e) {
    if (typeof e == "string") {
      target.innerHTML = e
    } else if (typeof e == "object") {
      target.appendChild(e)
    }
  }
}

const rebuild = x => {
  var title = ''
  var gh = ''
  if (x) {
    title = x.title
    gh = x.gh
  } else {
    setElement()
  }

  const newTitle = defaultTitle+(title ? ': ' : '')+(title || '')
  document.title = newTitle
  const link = document.getElementById('gh')
  if (gh) {
    link.classList.remove('d-none')
    link.setAttribute('href', gh)
  } else {
    link.classList.add('d-none')
  }
  document.getElementById('title').textContent = title

  const target = document.getElementById('samples')
  target.innerHTML = ''

  if (x && x.samples) {
    const setSample = ({attributes, children}) => {
      setElement(x.element(attributes, children))
    }

    const K = Object.keys(x.samples)
    target.appendChild(html(({select, option}) => select({
      class: 'form-control',
      change: ev => {
        setSample(x.samples[ev.target.value])
      },
      value: K[0]
    }, K.map(key => option(key)))))
    setSample(x.samples[K[0]])
  }
}

import(url).then(example => {
  rebuild(example.default)
  if (url != './samples.js') {
    document.getElementById('picker').classList.add('d-none')
  }
}).catch(err => {
  rebuild(error)
  setElement(error.element)
  throw err
})
