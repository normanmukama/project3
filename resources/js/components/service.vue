<template>
  <div class="p-4 bg-gray-100">
    <div class="flex justify-between mb-4">
      <input
        v-model="searchQuery"
        @input="applyFilter"
        type="text"
        placeholder="Search..."
        class="p-2 border border-gray-300 rounded"
      />
      <div>
        <button @click="exportToExcel" class="p-2 bg-green-500 text-white rounded">Excel</button>
        <button @click="exportToCSV" class="p-2 bg-blue-500 text-white rounded ml-2">CSV</button>
        <button @click="exportToPDF" class="p-2 bg-red-500 text-white rounded ml-2">PDF</button>
      </div>
    </div>
    <vue3-datatable :rows="filteredContacts" :columns="cols" class="min-w-full divide-y divide-gray-200">
      <template #table="{ rows, columns }">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="column in columns"
                :key="column.field"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ column.title }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="row in rows" :key="row.id" class="hover:bg-gray-100">
              <td v-for="column in columns" :key="column.field" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ row[column.field] }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </vue3-datatable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '@bhplugin/vue3-datatable/dist/style.css';

const contacts = ref([]);
const searchQuery = ref('');
const cols = ref([
  { field: 'id', title: 'ID', width: '90px', filter: false },
  { field: 'name', title: 'Name' },
  { field: 'email', title: 'Email' },
  { field: 'contact', title: 'Contact' },
]);

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value;
  return contacts.value.filter(contact => 
    Object.values(contact).some(val => 
      String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

async function fetchContacts() {
  try {
    const response = await axios.get('http://localhost:8000/api/get-contacts');
    contacts.value = response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
}

function applyFilter() {
  // Trigger the computed property to update
}

function exportToExcel() {
  const ws = XLSX.utils.json_to_sheet(contacts.value);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
  XLSX.writeFile(wb, 'contacts.xlsx');
}

function exportToCSV() {
  const ws = XLSX.utils.json_to_sheet(contacts.value);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contacts.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

function exportToPDF() {
  const doc = new jsPDF();
  doc.autoTable({
    head: [cols.value.map(col => col.title)],
    body: contacts.value.map(contact => cols.value.map(col => contact[col.field])),
  });
  doc.save('contacts.pdf');
}

fetchContacts();
</script>

<style scoped>
/* Add custom styles here */
</style>
