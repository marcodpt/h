import {hText as html} from './index.js'

export default {
  title: 'Alert',
  gh: 'https://github.com/marcodpt/h',
  element: (attrs, children) => html(({div}) => div({
    class: [
      'alert',
      'alert-'+attrs.type
    ]
  }, children)),
  samples: {
    success: {
      attributes: {
        type: 'success'
      },
      children: "This is a success alert"
    },
    warning: {
      attributes: {
        type: 'warning'
      },
      children: "This is a warning alert"
    },
    danger: {
      attributes: {
        type: 'danger'
      },
      children: "This is a danger alert"
    }
  }
}
