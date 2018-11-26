import { h } from './hyperapp.js'

const cache = {}
export default new Proxy(
  {},
  {
    get: (target, name) => {
      let fn = cache[name]
      if (!fn) {
        fn = (...args) => {
          if (args[0] && typeof args[0] === 'object' && !Array.isArray(args[0]))
            return h(name, ...args)
          return h(name, {}, ...args)
        }
        cache[name] = fn
      }
      return fn
    },
  }
)
