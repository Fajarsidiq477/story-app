import CheckUserAuth from '../utils/check-user-auth';
import Stories from '../network/stories';
import Utils from '../utils/utils';
import Config from '../config/config';

const AddStory = {
  async init() {
    const formAddStory = document.querySelector('#form-add-story');
    this._showLoginMenuOrUserLogMenu(this._isLoggedIn());

    formAddStory.addEventListener('submit', (e) => {
      e.preventDefault();
      formAddStory.classList.add('was-validated');

      if (this._isLoggedIn()) {
        this._sendData();
      } else {
        this._sendAnonymData();
      }
    });
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

  _isLoggedIn() {
    return Utils.getUserToken(Config.USER_TOKEN_KEY);
  },

  async _sendAnonymData() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      this._callLoadingBeforeSave();

      try {
        const response = await Stories.storeWithGuest(formData);

        this._callStateAfterSave();

        alert('data tersimpan, login untuk melihat!');
        this._goToLoginPage();
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  },
  _callLoadingBeforeSave() {
    const submitButtonIcon = document.querySelector(
      'button[type="submit"] .icon'
    );
    const submitButtonText = document.querySelector(
      'button[type="submit"] span'
    );
    submitButtonIcon.innerHTML = `<div class="spinner-border px-auto" role="status"></div>`;
    submitButtonText.textContent = 'Menyimpan';
  },

  _callStateAfterSave() {
    const submitButtonIcon = document.querySelector(
      'button[type="submit"] .icon'
    );
    const submitButtonText = document.querySelector(
      'button[type="submit"] span'
    );

    submitButtonIcon.innerHTML = `<i class="bi bi-check"></i>`;
    submitButtonText.textContent = 'Tersimpan';
  },
  async _sendData() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      this._callLoadingBeforeSave();

      try {
        const response = await Stories.store(formData);

        this._callStateAfterSave();

        this._goToDashboardPage();
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  },
  _goToDashboardPage() {
    window.location.href = '/';
  },
  _goToLoginPage() {
    window.location.href = '/auth/login.html';
  },

  _getFormData() {
    const descriptionInput = document.querySelector('#descriptionInput');
    const storyInput = document.querySelector('#storyInput');

    return {
      description: descriptionInput.value,
      photo: storyInput.files[0],
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter(
      (item) => item === ''
    );

    if (formData['photo'].size > 1000000) {
      alert('file harus kurang dari 1mb');
      return false;
    }

    return formDataFiltered.length === 0;
  },
};

export default AddStory;
