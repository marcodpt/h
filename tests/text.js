import {hText, tags} from '../index.js'

QUnit.test("hText", assert => {
  const {
    a,
    div,
    form,
    label,
    input,
    select,
    option,
    button
  } = tags(hText)

  assert.equal(a(), '<a></a>')
  assert.equal(input(), '<input/>')
  assert.equal(a({
    href: 'www.google.com'
  }), '<a href="www.google.com"></a>')
  assert.equal(input({
    value: 'www.google.com'
  }), '<input value="www.google.com"/>')
  assert.equal(a({
    href: 'www.google.com'
  }, "hello"), '<a href="www.google.com">hello</a>')
  assert.equal(input({
    value: 'www.google.com'
  }, "hello"), '<input value="www.google.com"/>')
  assert.equal(a({
    href: 'www.google.com'
  }, "<span>"), '<a href="www.google.com">&lt;span&gt;</a>')
  assert.equal(a({
    href: 'www.google.com',
    style: {
      whiteSpace: 'pre-wrap'
    }
  }, "<span>"), [
    '<a',
    '  href="www.google.com"',
    '  style="white-space: pre-wrap;"',
    '>&lt;span&gt;</a>',
  ].join("\n"))
  assert.equal(a({
    href: 'www.google.com',
    style: {
      whiteSpace: 'pre-wrap',
      disabled: true,
      active: null,
      width: 0,
      onBlur: false,
      switch: {},
      array: [],
      king: ''
    },
    class: ['', '', ''],
    disabled: true,
    inactive: false,
    user: null,
    dataBind: 3.14,
    array: ['x'],
    object: {'y': 7},
    king: ''
  }, "<span>"), [
    '<a',
    '  href="www.google.com"',
    '  style="',
    '    white-space: pre-wrap;',
    '    disabled: true;',
    '    width: 0;',
    '    on-blur: false;',
    '  "',
    '  disabled',
    '  data-bind="3.14"',
    '  king=""',
    '>&lt;span&gt;</a>'
  ].join("\n"))
  assert.equal(div([
    a({
      href: 'www.google.com',
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, [null, null])
  ]), [
    '<div>',
    '  <a',
    '    href="www.google.com"',
    '    style="white-space: pre-wrap;"',
    '  ></a>',
    '</div>'
  ].join("\n"))
  assert.equal(div([
    a({
      href: 'www.google.com',
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, "White Space\nShould not ident\nIn case of user data")
  ]), [
    '<div>',
    '  <a',
    '    href="www.google.com"',
    '    style="white-space: pre-wrap;"',
    '  >White Space&#13;&#10;Should not ident&#13;&#10;In case of user data</a>',
    '</div>'
  ].join("\n"))
  assert.equal(form({
    class: ['row', 'g-3']
  }, [
    div({
      class: 'col-md-6'
    }, [
      label({
        for: 'inputEmail4',
        class: 'form-label'
      }, 'Email'),
      input({
        type: 'email',
        class: 'form-control',
        id: "inputEmail4"
      })
    ]),
    div({
      class: 'col-md-6'
    }, [
      label({
        for: 'inputPassword4',
        class: 'form-label'
      }, 'Password'),
      input({
        type: 'password',
        class: 'form-control',
        id: "inputPassword4"
      })
    ]),
    div({
      class: 'col-12'
    }, [
      label({
        for: 'inputAddress',
        class: 'form-label'
      }, 'Address'),
      input({
        type: 'text',
        class: 'form-control',
        id: "inputAddress",
        placeholder: "1234 Main St"
      })
    ]),
    div({
      class: 'col-12'
    }, [
      label({
        for: 'inputAddress2',
        class: 'form-label'
      }, 'Address 2'),
      input({
        type: 'text',
        class: 'form-control',
        id: "inputAddress2",
        placeholder: "Apartment, studio, or floor"
      })
    ]),
    div({
      class: 'col-md-6'
    }, [
      label({
        for: 'inputCity',
        class: 'form-label'
      }, 'City'),
      input({
        type: 'text',
        class: 'form-control',
        id: "inputCity"
      })
    ]),
    div({
      class: 'col-md-4'
    }, [
      label({
        for: 'inputState',
        class: 'form-label'
      }, 'State'),
      select({
        id: 'inputState',
        class: 'form-select'
      }, [
        option({
          selected: true
        }, 'Choose...'),
        option('...')
      ])
    ]),
    div({
      class: 'col-md-2'
    }, [
      label({
        for: 'inputZip',
        class: 'form-label'
      }, 'Zip'),
      input({
        type: 'text',
        class: 'form-control',
        id: 'inputZip'
      })
    ]),
    div({
      class: 'col-12'
    }, [
      div({
        class: 'form-check'
      }, [
        input({
          class: 'form-check-input',
          type: 'checkbox',
          id: "gridCheck"
        }),
        label({
          class: 'form-check-label',
          for: 'gridCheck'
        }, 'Check me out')
      ])
    ]),
    div({
      class: 'col-12'
    }, [
      button({
        type: 'submit',
        class: ['btn btn-primary']
      }, 'Sign in')
    ])
  ]), [
    '<form class="row g-3">',
    '  <div class="col-md-6">',
    '    <label for="inputEmail4" class="form-label">Email</label>',
    '    <input type="email" class="form-control" id="inputEmail4"/>',
    '  </div>',
    '  <div class="col-md-6">',
    '    <label for="inputPassword4" class="form-label">Password</label>',
    '    <input',
    '      type="password"',
    '      class="form-control"',
    '      id="inputPassword4"',
    '    />',
    '  </div>',
    '  <div class="col-12">',
    '    <label for="inputAddress" class="form-label">Address</label>',
    '    <input',
    '      type="text"',
    '      class="form-control"',
    '      id="inputAddress"',
    '      placeholder="1234 Main St"',
    '    />',
    '  </div>',
    '  <div class="col-12">',
    '    <label for="inputAddress2" class="form-label">Address 2</label>',
    '    <input',
    '      type="text"',
    '      class="form-control"',
    '      id="inputAddress2"',
    '      placeholder="Apartment, studio, or floor"',
    '    />',
    '  </div>',
    '  <div class="col-md-6">',
    '    <label for="inputCity" class="form-label">City</label>',
    '    <input type="text" class="form-control" id="inputCity"/>',
    '  </div>',
    '  <div class="col-md-4">',
    '    <label for="inputState" class="form-label">State</label>',
    '    <select id="inputState" class="form-select">',
    '      <option selected>Choose...</option>',
    '      <option>...</option>',
    '    </select>',
    '  </div>',
    '  <div class="col-md-2">',
    '    <label for="inputZip" class="form-label">Zip</label>',
    '    <input type="text" class="form-control" id="inputZip"/>',
    '  </div>',
    '  <div class="col-12">',
    '    <div class="form-check">',
    '      <input',
    '        class="form-check-input"',
    '        type="checkbox"',
    '        id="gridCheck"',
    '      />',
    '      <label class="form-check-label" for="gridCheck">Check me out</label>',
    '    </div>',
    '  </div>',
    '  <div class="col-12">',
    '    <button type="submit" class="btn btn-primary">Sign in</button>',
    '  </div>',
    '</form>'
  ].join("\n"))

  const sup = (attrs, html) => div({
    class: 'super'
  }, [
    a(attrs, html)
  ])
  assert.equal(sup({
    href: 'www.google.com'
  }, 'google!'), [
    '<div class="super">',
    '  <a href="www.google.com">google!</a>',
    '</div>'
  ].join("\n"))

  const hyper = (attrs, html) => div({
    class: 'hyper'
  }, [
    sup(attrs, html)
  ])
  assert.equal(hyper({
    href: 'www.google.com'
  }, 'google!'), [
    '<div class="hyper">',
    '  <div class="super">',
    '    <a href="www.google.com">google!</a>',
    '  </div>',
    '</div>'
  ].join("\n"))

  const deep = (attrs, html) => {
    if (attrs.n) {
      attrs.n = parseInt(attrs.n) - 1
      return div([deep(attrs, html)])
    } else {
      return div({}, html)
    }
  }
  assert.equal(deep({
    n: 5
  }, 'Hello'), [
    '<div>',
    '  <div>',
    '    <div>',
    '      <div>',
    '        <div>',
    '          <div>Hello</div>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join("\n"))
})
