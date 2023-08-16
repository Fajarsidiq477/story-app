import Stories from '../network/stories';
import CheckUserAuth from '../utils/check-user-auth';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();
    // await this._initialData();

    try {
      const response = await Stories.getAll();

      const data = response.data.listStory;

      if (data.length != 0) {
        return this._populateDataToCard(data);
      }

      return this._dataNotFoundCard();
    } catch (e) {
      console.log(e.response.data.message);
    }
  },

  _dataNotFoundCard() {
    let html = `
      <div
        class="alert alert-danger d-flex justify-content-between"
        role="alert"
      >
        <span>Data stories tidak ditemukan</span>
      </div>
    `;

    const dataField = document.querySelector('.data-field');

    dataField.innerHTML = html;
  },

  _populateDataToCard(stories) {
    let html = '';

    stories.forEach((story) => {
      html += `
            <story-card
              id="${story.id}"
              name="${story.name}"
              description="${story.description}"
              photoUrl="${story.photoUrl}"
              createdAt="${story.createdAt}"
            ></story-card>
        `;
    });

    const dataField = document.querySelector('.data-field');

    dataField.innerHTML = html;
  },
};

export default Dashboard;
