// Import our custom CSS
import '../sass/main.scss';
// Components
import './components/index';

import './utils/firebase';
// Import javascript file as needed
import * as bootstrap from 'bootstrap';

// pages
import Dashboard from './pages/Dashboard';
import AddStory from './pages/AddStory';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import DetailStory from './pages/DetailStory';

const routes = {
  '/': Dashboard,
  '/add-story.html': AddStory,
  '/about.html': About,
  '/auth/register.html': Register,
  '/auth/login.html': Login,
  '/detail-story.html': DetailStory,
};

const detectRoute = () => routes[window.location.pathname];

window.addEventListener('DOMContentLoaded', async () => {
  const route = detectRoute();
  route.init();
});
