import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class MyCarousel extends LitWithoutShadowDom {
  static properties = {
    title: {
      type: String,
      reflect: true,
    },
  };
  render() {
    return html`
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <a href="http://fajarbercerita.my.id">
              <div class="carousel-layout">
                <h3 class="carousel-title">Proyek Website POS</h3>
              </div>
              <img
                src="https://source.unsplash.com/1200x700/?technology"
                class="d-block w-100"
                alt="..."
              />
            </a>
          </div>
          <div class="carousel-item">
            <a href="http://fajarbercerita.my.id">
              <div class="carousel-layout">
                <h3 class="carousel-title">Proyek Website Kemenkes</h3>
              </div>
              <img
                src="https://source.unsplash.com/1200x700/?computer"
                class="d-block w-100"
                alt="..."
              />
            </a>
          </div>
          <div class="carousel-item">
            <a href="http://fajarbercerita.my.id">
              <div class="carousel-layout">
                <h3 class="carousel-title">Proyek Website Media Sosial</h3>
              </div>
              <img
                src="https://source.unsplash.com/1200x700/?programming"
                class="d-block w-100"
                alt="..."
              />
            </a>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }
}

customElements.define('my-carousel', MyCarousel);
