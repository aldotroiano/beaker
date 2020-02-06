import { LitElement, html } from '../../vendor/lit-element/lit-element.js'
import '../com/posts/composer.js'

export class ComposeView extends LitElement {
  static get properties () {
    return {
      user: {type: Object}
    }
  }
 
  createRenderRoot () {
    return this // no shadow dom
  }

  constructor () {
    super()
    this.user = undefined
  }

  async load () {
    await this.requestUpdate()
    Array.from(this.querySelectorAll('[loadable]'), el => el.load())
  }

  render () {
    if (!this.user) return html``
    return html`
      <div class="layout">
        <main>
          <beaker-post-composer loadable></beaker-post-composer>
        </main>
      </div>
    `
  }

  // events
  // =

}

customElements.define('beaker-compose-view', ComposeView)
