<template>
  <div class="p-4 bg-gray-100">
    <div class="flex justify-between mb-4">
      <input
        v-model="searchQuery"
        @input="applyFilter"
        type="text"
        placeholder="Search..."
        class="p-2 border border-green-500 rounded"
      />
      <div>
        <button @click="exportToExcel" class="p-2 bg-green-500 text-white rounded">Excel</button>
        <button @click="exportToCSV" class="p-2 bg-blue-500 text-white rounded ml-2">CSV</button>
        <button @click="exportToPDF" class="p-2 bg-red-500 text-white rounded ml-2">PDF</button>
      </div>
    </div>

    <!-- Manually rendering the table -->
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in cols"
            :key="column.field"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ column.title }}
          </th>
          <!-- Actions column header -->
          <th class="px-3 py-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="row in paginatedContacts" :key="row.id" class="hover:bg-gray-100">
          <td
            v-for="column in cols"
            :key="column.field"
            class="px-3 py whitespace-nowrap text-sm text-gray-900"
          >
            {{ row[column.field] }}
          </td>
          <!-- Actions buttons -->
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button @click="viewContact(row)" class="px-2 py-1 text-white bg-blue-500 rounded mx-1">View</button>
            <button @click="editContact(row)" class="px-2 py-1 text-white bg-yellow-500 rounded mx-1">Edit</button>
            <button @click="deleteContact(row)" class="px-2 py-1 text-white bg-red-500 rounded mx-1">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="flex justify-evenly mt-4">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="p-2 bg-gray-300 text-gray-600 rounded"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="p-2 bg-gray-300 text-gray-600 rounded"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const contacts = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(6);

const cols = ref([
  { field: 'id', title: 'ID', width: '90px', filter: false },
  { field: 'name', title: 'Name' },
  { field: 'email', title: 'Email' },
  { field: 'contact', title: 'Contact' },
  { field: 'created_at', title: 'Datehire' },
  { field: 'updated_at', title: 'Last Updated' }
]);

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value;
  return contacts.value.filter(contact => 
    Object.values(contact).some(val => 
      String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredContacts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredContacts.value.length / pageSize.value);
});

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
}

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
  currentPage.value = 1; // Reset to the first page on search
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

function viewContact(contact) {
  alert(`Viewing contact: ${contact.name}`);
  // Implement the logic for viewing a contact
}

function editContact(contact) {
  alert(`Editing contact: ${contact.name}`);
  // Implement the logic for editing a contact
}

function deleteContact(contact) {
  if (confirm(`Are you sure you want to delete contact: ${contact.name}?`)) {
    // Implement the logic for deleting a contact
    contacts.value = contacts.value.filter(c => c.id !== contact.id);
  }
}

fetchContacts();
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
