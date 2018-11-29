import { h } from './hyperapp.js'

const cache = {}
const subCache = {}
let started = false

const effect = (props, dispatch) => {
  // Run any actions or fx for matched routes
  const go = () => {
    console.log('Route changed', window.location.pathname)
    const route = Object.entries(props.routes).find(([path, view]) =>
      match(path)
    )
    if (route) {
      const [path, { file, onenter, redirect }] = route
      const shouldRedirect =
        redirect && Object.entries(redirect).find(([k, v]) => v)
      if (shouldRedirect) {
        history.replaceState(null, null, shouldRedirect[0])
        return
      }
      const data = {
        match: path,
        param: extractParams(path),
        query: extractQuery(location.search),
      }
      // dispatch(props.action, { match: path, ...window.location })
      onenter && dispatch(onenter(data))
      if (!cache[path]) {
        console.log('Importing', file)
        import(`${file}.js`).then(module => {
          cache[path] = module.default
          console.log(module.subscriptions)
          if (module.subscriptions)
            dispatch(module.subscriptions)
          console.log('Imported', file, 'running onenter', onenter)
          dispatch(props.action, data)
        })
      } else {
        console.log('Using cached', file)
        dispatch(props.action, data)
      }
    }
  }

  // Update url when a pushState occurs
  const pushState = history.pushState
  history.pushState = function() {
    pushState.apply(history, arguments)
    go()
  }
  // Update url when a replaceState occurs
  const replaceState = history.replaceState
  history.replaceState = function() {
    replaceState.apply(history, arguments)
    go()
  }
  // Update url when ever the window url changes
  addEventListener('popstate', go)

  // Update the url on page load
  !started && ((started = true), go())

  // Check if any redirects apply
  const route = Object.entries(props.routes).find(([path, view]) => match(path))
  if (route) {
    let [path, { file, onenter, redirect }] = route
    redirect && Object.entries(redirect).find(([k, v]) => v) && go()
  }

  return () => {
    history.pushState = pushState
    history.replaceState = replaceState
    removeEventListener('popstate', go)
  }
}

const action = (state, route) => ({ ...state, route })

export const router = routes => ({ effect, action, routes })
export const link = (props, children) =>
  h(
    'a',
    {
      href: props.href,
      onclick: (state, e) =>
        e.preventDefault() || history.pushState(null, null, props.href),
    },
    children
  )

const match = path =>
  !path.startsWith('*')
    ? location.pathname === path
    : location.pathname.match(
        path
          .replace('*', '')
          .replace(/\//g, '\\/')
          .replace(/:([\w]+)/g, '([-\\.%\\w\\(\\)]+)')
      )

// Return blank html page until route view exists
export const route = state => {
  return (
    (state.route &&
      cache[state.route.match] &&
      cache[state.route.match](state)) ||
    h('html', {}, '')
  )
}

const extractParams = route => {
  var params = {}
  var keys = []
  route !== '*' &&
    location.pathname.replace(
      RegExp(
        '^' +
          route
            .replace('*', '')
            .replace(/\//g, '\\/')
            .replace(/:([\w]+)/g, function(_, key) {
              keys.push(key)
              return '([-\\.%\\w\\(\\)]+)'
            }) +
          '/?$',
        'g'
      ),
      function() {
        for (var j = 1; j < arguments.length - 2; ) {
          var value = arguments[j++]
          try {
            value = decodeURI(value)
          } catch (_) {}
          params[keys.shift()] = value
        }
      }
    )
  return params
}

const extractQuery = search => {
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  let params = {}
  hashes.map(hash => {
    let [key, val] = hash.split('=')
    key && (params[key] = decodeURIComponent(val))
  })

  return params
}
