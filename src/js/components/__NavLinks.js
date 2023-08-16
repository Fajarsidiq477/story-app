import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import Utils from '../utils/utils';
import Config from '../config/config';
import CheckUserAuth from '../utils/check-user-auth';

class NavLinks extends LitWithoutShadowDom {
  render() {
    return html`
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        <nav-link class="d-none userLoggedMenu" to="/profile.html" content="Profile"></nav-link>
        <nav-link class="d-none userLoggedMenu" to="/" content="Dashboard"></nav-link>
        <nav-link to="/add-story.html" content="Add Story"></nav-link>
        <nav-link to="/about.html" content="About"></nav-link>
        <nav-link to="/auth/login.html"" content="Login" id="loginMenu"></nav-link>
        <nav-link class="d-none userLoggedMenu" to="#" @click="${this._logout}" content="Keluar"></nav-link>

      </ul>
    `;
  }

  _logout(e) {
    e.preventDefault();

    try {
      Utils.destroyUserToken(Config.USER_TOKEN_KEY);
      Utils.destroyUserToken('name');
      Utils.destroyUserToken('userId');

      CheckUserAuth.checkLoginState();
    } catch (error) {
      console.log(error);
    }
  }
}

customElements.define('nav-links', NavLinks);
