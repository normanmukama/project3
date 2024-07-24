<template>
    <!-- <p>npm install vue-router@4</p> -->
     
    <div>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/service">Services</router-link>
        <router-link to="/location">Location</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
      <main>
        <router-view/>
      </main>
    </div>

  </template>
  
  