import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class StoryCard extends LitWithoutShadowDom {
  static properties = {
    id: {
      type: String,
      reflect: true,
    },
    name: {
      type: String,
      reflect: true,
    },
    photoUrl: {
      type: String,
      reflect: true,
    },
    createdAt: {
      type: String,
      reflect: true,
    },
    description: {
      type: String,
      reflect: true,
    },
  };

  constructor() {
    super();

    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('id')) {
      throw new Error(
        `Atribut "id" harus diterapkan pada elemen ${this.localName}`
      );
    }
    if (!this.hasAttribute('name')) {
      throw new Error(
        `Atribut "name" harus diterapkan pada elemen ${this.localName}`
      );
    }
    if (!this.hasAttribute('photoUrl')) {
      throw new Error(
        `Atribut "photoUrl" harus diterapkan pada elemen ${this.localName}`
      );
    }

    if (!this.hasAttribute('createdAt')) {
      throw new Error(
        `Atribut "createdAt" harus diterapkan pada elemen ${this.localName}`
      );
    }

    if (!this.hasAttribute('description')) {
      throw new Error(
        `Atribut "description" harus diterapkan pada elemen ${this.localName}`
      );
    }
  }

  render() {
    return html`
      <div class="card mb-3">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <div class="d-flex align-items-center">
            <img
              src="http://placehold.co/50x50"
              class="me-2 rounded-circle"
              alt=""
            />
            <a
              @click=${() => {
                console.log(this.id);
              }}
              >${this.name}</a
            >
          </div>
          <div class="dropdown">
            <button
              class="btn border"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ...
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  id="linkCopyButton"
                  href="/detail-story.html?id=${this.id}"
                  @click=${this._copyLinkToClipboard}
                >
                  <i class="bi bi-link"></i>
                  <span>Copy Link</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="card-body">
          <div class="text-center">
            <img
              src="${this.photoUrl}"
              class="img-fluid mb-2 mx-auto"
              style="max-height: 350px; object-fit: cover"
              alt="story image"
            />
          </div>
          <p class="createdAt fw-bold mb-2">
            ${this._formatTimeStampToHumanDate(this.createdAt)}
          </p>
          <p class="description mb-1">${this.description}</p>
        </div>
      </div>
    `;
  }

  _copyLinkToClipboard(event) {
    event.preventDefault();

    const linkCopyButton = document.querySelector('#linkCopyButton');

    navigator.clipboard.writeText(
      location.host + linkCopyButton.getAttribute('href')
    );

    alert('link copied');
  }

  _formatTimeStampToHumanDate(timestamp) {
    const months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      10: 'October',
      11: 'November',
      12: 'Desember',
    };

    let year = timestamp.slice(0, 4);
    let month = timestamp.slice(5, 7);
    let day = timestamp.slice(8, 10);

    let hour = timestamp.slice(11, 13);
    let minute = timestamp.slice(14, 16);

    return `${months[month]} ${day}, ${year} ${hour}.${minute}`;
  }
}
customElements.define('story-card', StoryCard);
