import { css, html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavCanvas extends LitWithoutShadowDom {
  static properties = {
    brandName: {
      type: String,
      reflect: true,
    },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandName')) {
      throw new Error(
        `Atribut "brandName" harus diterapkan pada elemen ${this.localName}`
      );
    }
  }

  render() {
    return html`
      <nav class="mynav">
        <a
          class="bg-dark text-white px-3 py-2 rounded-circle position-fixed bottom-0 end-0 me-2 mb-2 me-md-5 mb-md-5 btn-canvas"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i class="bi bi-three-dots-vertical fs-4"></i>
        </a>

        <div
          class="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              ${this.brandName}
            </h5>
          </div>
          <div class="offcanvas-body">
            <nav-links></nav-links>
          </div>
          <div class="offcanvas-footer">
            <p class="text-center">&copy; 2023 by Fajar</p>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-canvas', NavCanvas);
