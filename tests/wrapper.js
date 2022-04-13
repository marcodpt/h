import {wrapper} from '../index.js'

const toText = x => JSON.stringify(x, undefined, 2)

QUnit.test("wrapper", assert => {
  var h = wrapper(
    (tagName, attributes, children) => ({tagName, attributes, children}),
    text => ({text})
  )

  assert.equal(toText(h('myTag')), toText({
    tagName: 'my-tag',
    attributes: {},
    children: []
  }))

  assert.equal(toText(h('myTag', 'Hi!')), toText({
    tagName: 'my-tag',
    attributes: {},
    children: [
      {text: 'Hi!'}
    ]
  }))

  const attrs0 = {
    style: {
      whiteSpace: 'pre-wrap',
      textAlign: null,
      hide: false,
      show: true,
      height: undefined,
      width: 0,
      skip: {},
      anotherSkip: {x: '1'},
      thisToo: [],
      thisTooAgain: ['test'],
      display: ''
    },
    class: [
      'MyClass',
      '',
      0,
      false,
      true,
      undefined,
      null,
      [],
      ['a', 'b', 'c'],
      {},
      {x: 'x', y: 'y'},
      'test'
    ],
    attrA: null,
    attrB: undefined,
    attrC: false,
    attrD: true,
    attrE: '',
    attrF: 'some text',
    attrG: 0,
    attrH: 3.14,
    attrI: 7,
    attrJ: {},
    attrK: {x: 'test'},
    attrL: [],
    attrM: ['test']
  }

  const attrs1 = {
    style: 'white-space: pre-wrap; hide: false; show: true; width: 0',
    class: 'MyClass test',
    'attr-d': '',
    'attr-e': '',
    'attr-f': 'some text',
    'attr-g': '0',
    'attr-h': '3.14',
    'attr-i': '7'
  }

  assert.equal(toText(h('myTag', attrs0, 'Hi!')), toText({
    tagName: 'my-tag',
    attributes: attrs1,
    children: [
      {text: 'Hi!'}
    ]
  }))

  assert.equal(toText(h('myTag', attrs0,
    h('anotherTag', attrs0)
  )), toText({
    tagName: 'my-tag',
    attributes: attrs1,
    children: [
      {
        tagName: 'another-tag',
        attributes: attrs1,
        children: []
      }
    ]
  }))

  assert.equal(toText(h('tagA', attrs0, [
    h('tagAA', attrs0, [
      'text a-a-a',
      h('tagAAB', attrs0)
    ]),
    h('tagAB', attrs0, h('tagABA', attrs0)),
    'text a-c',
    h('tagAD', attrs0, 'text a-d-a'),
    'text a-e'
  ])), toText({
    tagName: 'tag-a',
    attributes: attrs1,
    children: [
      {
        tagName: 'tag-a-a',
        attributes: attrs1,
        children: [
          {
            text: 'text a-a-a'
          }, {
            tagName: 'tag-a-a-b',
            attributes: attrs1,
            children: []
          }
        ]
      }, {
        tagName: 'tag-a-b',
        attributes: attrs1,
        children: [
          {
            tagName: 'tag-a-b-a',
            attributes: attrs1,
            children: []
          }
        ]
      }, {
        text: 'text a-c'
      }, {
        tagName: 'tag-a-d',
        attributes: attrs1,
        children: [
          {
            text: 'text a-d-a'
          }
        ]
      }, {
        text: 'text a-e'
      }
    ]
  }))

  h((Tags, a, c) => {
    assert.equal(toText(a), toText({}))
    assert.equal(toText(c), toText([]))
  })

  h((Tags, a, c) => {
    assert.equal(toText(a), toText(attrs1))
    assert.equal(toText(c), toText([]))
  }, attrs0)

  h((Tags, a, c) => {
    assert.equal(toText(a), toText(attrs1))
    assert.equal(toText(c), toText([
      {
        tagName: 'tagA',
        attributes: attrs0,
        children: []
      }, {
        tagName: 'tagB',
        attributes: attrs0,
        children: []
      }, {
        text: 'text AC'
      }, {
        tagName: 'tagD',
        attributes: attrs0,
        children: [
          'text a-d-a'
        ]
      }, {
        text: 'text a-e'
      }, {
        text: 'x'
      }, {
        text: '0'
      }, {
        text: '3.14'
      }, {
        text: '7'
      }, {}, {
        text: 'k'
      }
    ]))
  }, attrs0, [
    {
      tagName: 'tagA',
      attributes: attrs0,
      children: []
    }, {
      tagName: 'tagB',
      attributes: attrs0,
      children: []
    }, 'text AC', [
      {
        tagName: 'tagD',
        attributes: attrs0,
        children: [
          'text a-d-a'
        ]
      }, 'text a-e', [false, true, undefined, 'x', '', 0, 3.14, 7, {}, [['k']]]
    ]
  ])

  assert.equal(
    toText(h(({div, input}, a, c) => div(attrs0, [
      input(a, c),
      div(a, c),
      input(attrs0, 'input'),
      div(attrs0, 'div')
    ]), attrs0, [h(({span}) => span(attrs0, span('text')))])),
    toText({
      tagName: 'div',
      attributes: attrs1,
      children: [
        {
          tagName: 'input',
          attributes: attrs1,
          children: []
        }, {
          tagName: 'div',
          attributes: attrs1,
          children: [
            {
              tagName: 'span',
              attributes: attrs1,
              children: [
                {
                  tagName: 'span',
                  attributes: {},
                  children: [
                    {text: 'text'}
                  ]
                }
              ]
            }
          ]
        }, {
          tagName: 'input',
          attributes: attrs1,
          children: []
        }, {
          tagName: 'div',
          attributes: attrs1,
          children: [
            {text: 'div'}
          ]
        }
      ]
    })
  )
})
