import Config from './config';

const ApiEndpoint = {
  LOGIN: `${Config.BASE_URL}/login`, // POST
  REGISTER: `${Config.BASE_URL}/register`, // POST
  STORE_STORY: `${Config.BASE_URL}/stories`, // POST
  STORE_STORY_WITH_GUEST: `${Config.BASE_URL}/stories/guest`, // POST
  GET_ALL_STORIES: `${Config.BASE_URL}/stories`, // GET
  DETAIL_STORY: (id) => `${Config.BASE_URL}/stories/${id}`, // GET
};

export default ApiEndpoint;
