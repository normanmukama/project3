import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue';
import App from './components/app.vue'; // Corrected 'app.vue' to 'App.vue'
import router from "./router";
import Login from "./components/login.vue";

// Create the main app instance
const app = createApp(App);

// Register components globally
app.component('LoginComponent', Login); // Correct global registration with a string name

// Use the router and mount the app
app.use(router).mount('#app');
