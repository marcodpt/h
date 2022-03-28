# h
Yet another hyperscript function 

[Tests](https://marcodpt.github.io/h/)

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

## Samples
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

### Again using function for HTML tags
```js
import {
  hText as h,
  tags
} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

const {
  button,
  i,
  span
} = tags(h)

console.log(button({
  type: 'button'
  disabled: true
}, [
  i({
    class: 'icon-check'
  }),
  span('Submit!')
]))
//<button type="button" disabled>
//  <i class="icon-check" />
//  <span>Submit!</span>
//</button
```

### Syntax sugar
```js
import {
  hText as h,
  tags
} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

const {div} = tags(h)

//attributes are optional, text nodes are handled automatic
console.log(div("Hello!"))
//<div>Hello!</div>

//class might be an array
console.log(div({
  class: 'container mx-auto'
}, "Hello!"))
//<div class="container mx-auto">Hello!</div>
console.log(div({
  class: [
    'container',
    'mx-auto'
  ]
}, "Hello!"))
//<div class="container mx-auto">Hello!</div>

//style might be an object with case conversion
console.log(div({
  style: 'white-space: pre-wrap'
}, "Hello!"))
//<div style="white-space: pre-wrap">Hello!</div>
console.log(div({
  style: {
    'white-space': 'pre-wrap'
  }
}, "Hello!"))
//<div style="white-space: pre-wrap">Hello!</div>
console.log(div({
  style: {
    whiteSpace: 'pre-wrap'
  }
}, "Hello!"))
//<div style="white-space: pre-wrap">Hello!</div>

//attributes have case conversion too
console.log(div({
  'data-bind': 'some data...'
}, "Hello!"))
//<div data-bind="some data...">Hello!</div>
console.log(div({
  dataBind: 'some data...'
}, "Hello!"))
//<div data-bind="some data...">Hello!</div>
```

### Wrapping hyperapp with this API
```js
import {h as hyperapp, text, app} from "https://unpkg.com/hyperapp"
import {
  wrapper,
  tags
} from 'https://cdn.jsdelivr.net/gh/marcodpt/h/index.js'

const h = wrapper((tagName, attributes, children) => hyperapp(
  tagName,
  attributes,
  typeof children == "string" ? text(children) : children
))
const {
  main, h1, input, ul, li, button
} = tags(h)

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
  view: ({ todos, value }) =>
    main([
      h1("To do list"),
      input({ type: "text", oninput: NewValue, value }),
      ul({},
        todos.map((todo) => li(todo))
      ),
      button({ onclick: AddTodo }, "New!"),
    ]),
  node: document.getElementById("app"),
})
```

## Contributing
Yes please! It is a very simple project, no guidelines, any contribution is
greatly appreciated!
