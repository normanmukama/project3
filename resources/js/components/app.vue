<template>
  <div class=" flex ">

    <div class="w-full ">
      <div id="app">
        <nav class="bg-gray-800 text-white py-4 px-6" v-if="showNavbar">
          <!-- Desktop Navigation -->
          <div class="hidden lg:flex justify-between items-center">
            <div class="flex space-x-4">
              <!-- <router-link to="/" class="nav-item">Home</router-link> -->
              <router-link to="/about" class="nav-item">About</router-link>
              <router-link to="/service" class="nav-item">Services</router-link>
              <router-link to="/location" class="nav-item">Location</router-link>
              <router-link to="/contact" class="nav-item">Contact</router-link>
              <router-link to="/emis" class="nav-item">EMIS</router-link>
            </div>
            <div>
              <!-- Add any additional items like a logo or a search bar here -->
            </div>
          </div>
        </nav>

        <main>
          <router-view/>
        </main>
  </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '../components/login.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();

    // Define which routes should hide the navbar
    const hideNavbarRoutes = ['/login'];

    // Check if the current route is in the list of routes without a navbar
    const showNavbar = computed(() => !hideNavbarRoutes.includes(route.path));

    return { showNavbar };
  },
};
</script>
<style scoped>
.nav-item {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem; /* Rounded corners */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-item:hover {
  background-color: #2563eb; /* Blue color */
  color: #ffffff;
}

nav {
  background: #333;
  padding: 1em;
  color: #fff;
}

ul {
  list-style-type: none;
  display: flex;
  gap: 1em;
}

li {
  cursor: pointer;
}

</style>

  
