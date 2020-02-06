import { LitElement, html } from '../../vendor/lit-element/lit-element.js'
import { toNiceDriveType } from '../lib/strings.js'
import '../com/search/results.js'

export class SearchView extends LitElement {
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
    var qp = new URLSearchParams(location.search)
    this.driveType = qp.get('drive-type') || undefined
    this.query = qp.get('q') || undefined
  }

  async load () {
    await this.requestUpdate()
  }

  render () {
    var title = `Search results ${this.driveType ? `for ${toNiceDriveType(this.driveType)} matching` : 'for'} "${this.query}"`
    // `${this.query ? 'Searching for' : 'Listing all'} ${toNiceDriveType(this.driveType) || 'post'}s ${this.query ? `matching "${this.query}"` : ''}`
    return html`
      <style>
        .search-title {
          margin: 0 0 10px;
          color: #556;
          font-size: 18px;
          letter-spacing: 0.5px;
          font-weight: normal;
          background: #f3f3f8;
          padding: 10px 16px;
          border-radius: 8px;
        }
      </style>
      <div class="layout">
        <main>
          <h3 class="search-title">
            <span class="fas fa-fw fa-search"></span>
            ${title}
          </h3>
          <beaker-search-results loadable .user=${this.user} drive-type=${this.driveType || ''} query=${this.query || ''}></beaker-search-results>
        </main>
      </div>
    `
  }

  // events
  // =

}

customElements.define('beaker-search-view', SearchView)
