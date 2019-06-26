var mode = process.env.REACT_APP_MY_VAR
var API_SERVER = ''

if (mode === 'development') {
  API_SERVER = 'http://127.0.0.1'
}

if (mode === 'production') {
  API_SERVER = 'http://103.44.28.14:1888'
}

export { API_SERVER }