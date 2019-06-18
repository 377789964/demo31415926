import elementUI from "element-ui"
// import textField from './packages/textField/index.js'

const components = [
  // textField
]

const install = function(Vue) {
  Vue.use(ElementUI)
}

const sayHello = function() {
  return "Hello World"
}

export default {
  // elementUI,
  install,
  sayHello
}
