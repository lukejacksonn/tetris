import DOM from '../utils/html.js'
import { link } from '../utils/router.js'

const { html, head, title, meta, body } = DOM
const { h1 } = DOM

export default state =>
  html([
    head([
      title('Not Found'),
      meta({ type: 'description', content: 'This page could not be found' }),
    ]),
    body([
      h1(`${window.location.pathname} Not found`),
      link({ href: '/' }, 'Go Back Home'),
    ]),
  ])
