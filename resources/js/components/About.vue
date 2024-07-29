<template>
  <div>
    <vue3-datatable :rows="contacts" :columns="cols"></vue3-datatable>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';

const contacts = ref([]);
const cols = ref([
  { field: 'id', title: 'ID', width: '90px', filter: false },
  { field: 'name', title: 'Name' },
  { field: 'email', title: 'Email' },
  { field: 'contact', title: 'Contact' },
]);

async function fetchContacts() {
  try {
    const response = await axios.get('http://localhost:8000/api/get-contacts');
    contacts.value = response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
}

fetchContacts();
</script>


<style scoped>
/* Add custom styles here */
</style>
