<template>
    <div>
      <h1>Contacts</h1>
      <ul>
        <li v-for="contact in contacts" :key="contact.id">
          <h2>{{ contact.name }}</h2>
          <p>{{ contact.email }}</p>
          <p>{{ contact.contact }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        contacts: []
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:8000/api/get-contacts');
        this.contacts = response.data;
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  