import Stories from '../network/stories';
import CheckUserAuth from '../utils/check-user-auth';

const DetailStory = {
  async init() {
    CheckUserAuth.checkLoginState();

    const urlParams = this._getParamsFromUrl();
    const id = urlParams['id'];

    if (id) {
      try {
        const response = await Stories.getById(id);
        const data = response.data.story;

        let html = `
            <story-card
                    id="${data.id}"
                    name="${data.name}"
                    description="${data.description}"
                    photoUrl="${data.photoUrl}"
                    createdAt="${data.createdAt}"
                  ></story-card>
            `;

        const dataField = document.querySelector('.data-field');

        dataField.innerHTML = html;
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert('masukan id dengan benar');
    }
  },

  _getParamsFromUrl() {
    let url = location.search;
    url = url.slice(1);
    url = url.split('&');

    let urlArray = [];
    url.forEach((u) => {
      urlArray.push(u.split('='));
    });

    let urlParams = {};
    urlArray.forEach((u) => {
      urlParams[u[0]] = u[1];
    });

    return urlParams;
  },

  _parseURLParams(url) {
    var queryStart = url.indexOf('?') + 1,
      queryEnd = url.indexOf('#') + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, ' ').split('&'),
      parms = {},
      i,
      n,
      v,
      nv;

    if (query === url || query === '') return;

    for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split('=', 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  },
};

export default DetailStory;
