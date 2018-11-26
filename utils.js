function clone(target, source) {
  var out = {}

  for (var i in target) out[i] = target[i]
  for (var i in source) out[i] = source[i]

  return out
}

function set(path, value, source) {
  if (typeof path === 'string') path = path.split('.')
  var target = {}
  if (path.length) {
    target[path[0]] =
      path.length > 1 ? set(path.slice(1), value, source[path[0]]) : value
    return clone(source, target)
  }
  return value
}

function get(path, source) {
  if (typeof path === 'string') path = path.split('.')
  var i = 0
  while (i < path.length) {
    source = source[path[i++]]
  }
  return source
}

export const map = setup => {
  const [namespace, { init, actions, view }] = Object.entries(setup)[0]
  const reducers = Object.entries(actions).reduce(
    (all, [key, fn]) => ({
      ...all,
      [key]: (state, props, e) =>
        set(namespace, fn(get(namespace, state), props, e), state),
    }),
    {}
  )
  return {
    init,
    view: (state, props) => view(get(namespace, state), props)(reducers),
  }
}

export const module = maps =>
  Object.entries(maps).reduce(
    (all, [key, mod]) => {
      const { init, view } = map({ [key]: mod })
      return { ...all, init: { ...all.init, [key]: init }, [key]: view }
    },
    { init: {} }
  )
