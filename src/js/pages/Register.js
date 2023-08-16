import Auth from '../network/auth';
import CheckUserAuth from '../utils/check-user-auth';

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();

    // await this._initialData();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (e) => {
        e.preventDefault();

        registerForm.classList.add('was-validated');
        await this._getRegistered();
      },
      false
    );
  },
  _callLoadingBeforeRegister() {
    const submitButtonIcon = document.querySelector(
      'button[type="submit"] .icon'
    );
    submitButtonIcon.innerHTML = `<span class="spinner-border px-auto" style="width:20px;height:20px" role="status"></span>`;
  },
  _callStateAfterRegister(status) {
    const submitButtonIcon = document.querySelector(
      'button[type="submit"] .icon'
    );
    const submitButtonText = document.querySelector(
      'button[type="submit"] span'
    );

    submitButtonIcon.innerHTML = ``;

    if (status) {
      submitButtonText.textContent = 'Registered';
    } else {
      submitButtonText.textContent = 'Register';
    }
  },

  async _getRegistered() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      this._callLoadingBeforeRegister();

      try {
        const response = await Auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        this._callStateAfterRegister(true);

        window.alert('Registered a new user');

        this._goToLoginPage();
      } catch (e) {
        this._callStateAfterRegister(false);
        alert(e.response.data.message);
      }
    }
  },

  _getFormData() {
    const name = document.querySelector('#validationCustomName');
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      name: name.value,
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

  _goToLoginPage() {
    window.location.href = '/auth/login.html';
  },
};

export default Register;
