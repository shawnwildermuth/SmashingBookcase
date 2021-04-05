<template>
  <div class="container mx-auto bg-gray-100 p-1">
    <router-link to="/"><h1>Bookcase</h1></router-link>
    <div class="alert">Errors</div>
    <div class="alert bg-gray-200 text-gray-900">Loading...</div>
    <router-view />
  </div>
</template>
