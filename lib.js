const getUrl = () => {
  const key = 'url='
  var url = location.search.substr(1).split('&')
    .filter(pair => pair.substr(0, key.length) == key)[0]
  url = url || ''
  return decodeURIComponent(url.substr(key.length))
}

const source = X => {
  const ident = A => A.join(',\n').split('\n').join('\n  ')
  if (X instanceof Array) {
    return !X.length ? '[]' : `[\n  ${
      ident(X.map(x => source(x)))
    }\n]`
  } else if (typeof X == 'function') {
    return X.toString()
  } else if (X && typeof X == 'object') {
    const K = Object.keys(X)
    return !K.length ? '{}' : `{\n  ${
      ident(K.map(key => `${key}: ${source(X[key])}`))
    }\n}`
  } else {
    return JSON.stringify(X)
  }

  return data
}

export {getUrl, source}
