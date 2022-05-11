const getUrl = () => {
  const key = 'url='
  var url = location.search.substr(1).split('&')
    .filter(pair => pair.substr(0, key.length) == key)[0]
  url = url || ''
  return decodeURIComponent(url.substr(key.length))
}

export {getUrl}
