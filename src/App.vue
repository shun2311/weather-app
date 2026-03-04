<template>
  <v-app>
    <v-app-bar class="py-6 px-10" color="transparent" density="compact" flat>
      <v-img
        :src="logo"
        height="40"
        width="200"
        contain
        class="flex-grow-0"
      ></v-img>
      
      <v-spacer></v-spacer>
      <v-btn>units</v-btn>
    </v-app-bar>
    <v-main class="px-10 mt-16">
      <v-container class="text-center">
        <v-row justify="center">
          <v-col cols="12">
            <div class="text-display-medium font-weight-bold mb-10 text-center">
              How's the sky looking today?
            </div> 
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11" md="8" lg="6">
           <SearchBar />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import logo from '@/assets/images/logo.svg'
import SearchBar from '@/components/Searchbar.vue'
</script>
