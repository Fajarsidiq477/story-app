import Config from '../config/config';
import Auth from '../network/auth';
import CheckUserAuth from '../utils/check-user-auth';
import Utils from '../utils/utils';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (e) => {
        e.preventDefault();

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false
    );
  },

  _callLoadingBeforeLogin() {
    const submitButtonIcon = document.querySelector(
      'button[type="submit"] .icon'
    );
    submitButtonIcon.innerHTML = `<span class="spinner-border px-auto" style="width:20px;height:20px" role="status"></span>`;
  },
  _callStateAfterLogin(status) {
    const submitButtonIcon = document.querySelector(
      'button[type="submit"] .icon'
    );
    const submitButtonText = document.querySelector(
      'button[type="submit"] span'
    );

    submitButtonIcon.innerHTML = ``;

    if (status) {
      submitButtonText.textContent = 'Logged in';
    } else {
      submitButtonText.textContent = 'Login';
    }
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      this._callLoadingBeforeLogin();

      try {
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });

        this._callStateAfterLogin(true);

        window.alert('logged in');

        Utils.setUserToken('userId', response.data.loginResult.userId);
        Utils.setUserToken('name', response.data.loginResult.name);
        Utils.setUserToken(
          Config.USER_TOKEN_KEY,
          response.data.loginResult.token
        );

        this._goToDashboardPage();
      } catch (e) {
        this._callStateAfterLogin(false);
        alert(e.response.data.message);
      }
    }
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter(
      (item) => item === ''
    );

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Login;
