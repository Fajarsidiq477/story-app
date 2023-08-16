import { html } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputFileWithPreviews extends LitWithoutShadowDom {
  static properties = {
    inputId: {
      type: String,
      reflect: true,
    },
  };

  render() {
    return html`
      <div
        class="w-100 mx-auto d-flex justify-content-center align-items-center mb-3 d-none"
        style="
                  min-height: 15rem;
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: contain;
                "
        id="storyPreview"
      ></div>

      <div class="mb-3">
        <label for="${this.inputId}" class="form-label">Photo</label>
        <input
          class="form-control"
          type="file"
          id="${this.inputId}"
          required
          accept="image/*"
          @change=${this._updatePreviewStory}
        />
        <span class="d-none" id="storyURLSpan"></span>
      </div>
    `;
  }

  _updatePreviewStory() {
    const StoryInput = document.querySelector('#' + this.inputId);
    const storyPreview = document.querySelector('#storyPreview');

    const storyData = StoryInput.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(storyData);

    reader.onloadstart = () => {
      storyPreview.classList.remove('d-none');

      let spinner = `
        <div class="text-center text-secondary">
          <div class="spinner-border px-auto my-auto" role="status"></div>
          <p>Mengupload gambar ....</p>
        </div>
      `;

      storyPreview.innerHTML = spinner;
    };

    reader.onload = (e) => {
      storyPreview.style.backgroundImage = `url(${e.target.result})`;
      storyPreview.innerHTML = '';

      const storyURLSpan = document.querySelector('#storyURLSpan');
      storyURLSpan.innerText = e.target.result;
    };
  }
}

customElements.define('input-file-with-previews', InputFileWithPreviews);
