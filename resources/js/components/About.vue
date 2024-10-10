<template>
  <div>
    <vue3-datatable :rows="contacts" :columns="cols"></vue3-datatable>
  </div>
  <div>
    <li v-for="item in items" class="m-3">
      {{ item.name }} <br>
      {{ item.school }} <br>
      {{ item.home }}
    </li>
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


// List rendering
const items = ref([
  {
    name: 'NormanMukama',
    school: 'Ruhanga Adventist school',
    home: 'Ntungamo'
  },
  {
    name: 'Prossy Hope',
    school: 'Kinoni Hihg school',
    home: 'Wampewo'
  },
  {
    name: 'Henry Nahabwe',
    school: 'Kyamate High school',
    home: 'Nyongozi'
  },
])
</script>


<style scoped>
/* Add custom styles here */
</style>
