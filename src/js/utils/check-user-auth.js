import Config from '../config/config';
import Utils from './utils';

const CheckUserAuth = {
  excludeRedirectPage: ['login.html', 'register.html'],

  checkLoginState() {
    const userToken = Utils.getUserToken(Config.USER_TOKEN_KEY);
    const isUserSignedIn = Boolean(userToken);
    const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);

    if (isUserSignedIn) {
      if (isUserOnAuthPage) {
        window.location.href = '/';
      } else {
        this._showLoginMenuOrUserLogMenu(isUserSignedIn);
      }
    } else {
      if (!isUserOnAuthPage) {
        window.location.href = '/auth/login.html';
      }
    }
  },

  _showLoginMenuOrUserLogMenu(userLoginState) {
    const loginMenu = document.querySelector('#loginMenu');
    const userLoggedMenu = document.querySelectorAll('.userLoggedMenu');

    if (!userLoginState) {
      loginMenu?.classList.add('d-block');

      userLoggedMenu.forEach((ulm) => {
        ulm?.classList.add('d-none');
        ulm?.classList.remove('d-block');
      });

      loginMenu?.classList.remove('d-none');

      return;
    }

    loginMenu?.classList.add('d-none');

    loginMenu?.classList.remove('d-block');

    userLoggedMenu.forEach((ulm) => {
      ulm?.classList.add('d-block');
      ulm?.classList.remove('d-none');
    });
  },

  _isUserOnAuthPage(pages) {
    const filteredPages = pages.filter((item) =>
      window.location.pathname.endsWith(item)
    );
    return Boolean(filteredPages.length);
  },
};

export default CheckUserAuth;
