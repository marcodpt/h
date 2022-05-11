# h
Yet another hyperscript function 

## Examples
 - [alert](https://marcodpt.github.io/h/)
 - [chart](https://marcodpt.github.io/h/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fchart%2Fsamples.js)
 - [graph](https://marcodpt.github.io/h/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fgraph%2Fsamples.js)
 - [navbar](https://marcodpt.github.io/h/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fnavbar%2Fsamples.js)
 - [SPA](https://marcodpt.github.io/h/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fspa%2Fsamples.js)

## Motivation
 - Present hyperscript as an es6 module
 - Allow to be used in server side in text mode
 - Allow to be used in frontend in DOM mode
 - Wrap any h function (
   [react](https://github.com/facebook/react),
   [hyperapp](https://github.com/jorgebucaran/hyperapp),
   [mithril](https://github.com/MithrilJS/mithril.js/)...)
   in the same consistent API
 - Generate all HTML tags as functions
 - Generate your own custom elements with great experience

## Definition
An `element` is a function with the following signature

### element(params, children) -> node
 - object `params`: is the params that element recieve as attributes
 - array `children`: is the children nodes of element
 - return DOM `node`: the DOM node representing the element

## Usage
### DOM mode
```js
import {hDom as h} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

const e = h('button', {
  click: () => console.log('Hi!') 
}, 'Click me!')

console.log(e.outerHTML)
//<button>Click me!</button>

e.click()
//Hi!
```

### DOM mode with HTML tags
```js
import {hDom as h} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

const e = h(({button}) => {
  button({
    click: () => console.log('Hi!') 
  }, 'Click me!')
})

console.log(e.outerHTML)
//<button>Click me!</button>

e.click()
//Hi!
```

### Text mode
```js
import {hText as h} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

console.log(h('button', {
  type: 'button'
  disabled: true
}, [
  h('i', {
    class: 'icon-check'
  }),
  h('span', 'Submit!')
]))
//<button type="button" disabled>
//  <i class="icon-check" />
//  <span>Submit!</span>
//</button
```

### Text mode with HTML tags
```js
import {hText as h} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

console.log(h(({
  button, i, span
}) => button({
  type: 'button'
  disabled: true
}, [
  i({
    class: 'icon-check'
  }),
  span('Submit!')
])))
//<button type="button" disabled>
//  <i class="icon-check" />
//  <span>Submit!</span>
//</button
```

### Create your own html elements
```js
import {hDom as html} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

const myButton = (attributes, children) => html(({
  button, i
}, resolvedAttrs, resolvedChildren) => {
  //NO MATTER WHAT USER PUTS IN ATTRIBUTES OR CHILDREN

  //resolvedAttrs is always an object
  //with kebab case keys
  //with string or functions values 

  //resolvedChildren is always a DOM array

  return button({
    class: "btn btn-"+resolvedAttrs.btn
  }, [
    resolvedAttrs.icon ? i({class: resolvedAttrs.icon}) : null
  ].concat(children))
}, attributes, children)

console.log(myButton({
  btn: 'primary',
  icon: 'fas fa-play'
}, ' Run!').outerHTML)
//<button class="btn btn-primary"><i class="fas fa-play"></i> Run!</button>
```

### Syntax sugar
```js
import {hText as html} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

//attributes are optional, text nodes are handled automatic
console.log(html(({div}) => div("Hello!")))
//<div>Hello!</div>

//class might be an array
console.log(html(({div}) => div({
  class: 'container mx-auto'
}, "Hello!")))
//<div class="container mx-auto">Hello!</div>
console.log(html(({div}) => div({
  class: [
    'container',
    'mx-auto'
  ]
}, "Hello!")))
//<div class="container mx-auto">Hello!</div>

//style might be an object with case conversion
console.log(html(({div}) => div({
  style: 'white-space: pre-wrap'
}, "Hello!")))
//<div style="white-space: pre-wrap">Hello!</div>
console.log(html(({div}) => div({
  style: {
    'white-space': 'pre-wrap'
  }
}, "Hello!")))
//<div style="white-space: pre-wrap">Hello!</div>
console.log(html(({div}) => div({
  style: {
    whiteSpace: 'pre-wrap'
  }
}, "Hello!")))
//<div style="white-space: pre-wrap">Hello!</div>

//attributes have case conversion too
console.log(html(({div}) => div({
  'data-bind': 'some data...'
}, "Hello!")))
//<div data-bind="some data...">Hello!</div>
console.log(html(({div}) => div({
  dataBind: 'some data...'
}, "Hello!")))
//<div data-bind="some data...">Hello!</div>
```

### Wrapping hyperapp with this API
```js
import {h, text, app} from "https://unpkg.com/hyperapp"
import {wrapper} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

const html = wrapper(h, text)

const AddTodo = (state) => ({
  ...state,
  value: "",
  todos: state.todos.concat(state.value),
})

const NewValue = (state, event) => ({
  ...state,
  value: event.target.value,
})

app({
  init: { todos: [], value: "" },
  view: ({ todos, value }) => html(({
    main, h1, input, ul, li, button
  }) => main([
    h1("To do list"),
    input({ type: "text", oninput: NewValue, value }),
    ul(todos.map((todo) => li(todo))),
    button({ onclick: AddTodo }, "New!"),
  ])),
  node: document.getElementById("app"),
})
```

## Tests
 - [wrapper](https://marcodpt.github.io/h/tests.html?url=.%2Ftests%2Fwrapper.js)
 - [hDom](https://marcodpt.github.io/h/tests.html?url=.%2Ftests%2Fdom.js)
 - [hText](https://marcodpt.github.io/h/tests.html?url=.%2Ftests%2Ftext.js)

## Contributing
Yes please! It is a very simple project, no guidelines, any contribution is
greatly appreciated!
