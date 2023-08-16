import ApiEndpoint from '../config/api-endpoint';
import axios from 'axios';
import Utils from '../utils/utils';
import Config from '../config/config';

const Stories = {
  async store({ description, photo }) {
    const data = await axios.post(
      ApiEndpoint.STORE_STORY,
      { description, photo },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
        },
      }
    );

    return data;
  },

  async storeWithGuest({ description, photo }) {
    const data = await axios.post(
      ApiEndpoint.STORE_STORY_WITH_GUEST,
      {
        description,
        photo,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  },

  async getAll() {
    const data = await axios.get(ApiEndpoint.GET_ALL_STORIES, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });

    return data;
  },

  async getById(id) {
    const data = await axios.get(ApiEndpoint.DETAIL_STORY(id), {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });

    return data;
  },
};

export default Stories;
