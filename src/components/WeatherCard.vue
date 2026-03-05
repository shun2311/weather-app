<template>
    <v-img
        v-if="!loading"
        :src="weatherBackground"
        cover
    >
      <div  class="d-flex align-center fill-height mx-6">
          <div class="text-left">
            <div class="text-title-large font-weight-medium mb-2">
              {{ city }}, {{ country }}
            </div>
            <div class="text-label-medium">
              {{ date }}
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-img :src="useWeatherIcon(currentData.weatherCode)" max-width="80" max-height="80"></v-img>
          <div class="ml-8 text-display-large">{{ currentData.temperature }}°</div>
      </div>
    </v-img>
    <v-sheet  
      v-else 
      class="rounded-xl d-flex flex-column align-center justify-center"      
      color="neutral-600"
      height="280"
      width="100%"
    >
      <div class="d-flex justify-center" style="gap: 4px">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="text-label-medium mt-2">
        Loading...
      </div>
    </v-sheet>
</template>

<script setup>
import weatherBackground from '@/assets/images/bg-today-large.svg'
import { useWeatherIcon } from '@/composables/useWeather.js'
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
    city: {
      type: String, 
      default: "Berlin"
    },
    country: {
      type: String,
      default: "Germany"
    },
    currentData: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
});

const date = ref(null)
const options = { 
  weekday: 'long', 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric' 
};

const today = new Date();
onMounted(() => date.value = today.toLocaleDateString('en-GB', options))
</script>

<style scoped>
.dot {
  width: 10px;
  height: 10px;
  background-color: rgb(var(--v-theme-neutral-200)); /* Uses your Vuetify primary color */
  border-radius: 50%;
  animation: dot-bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-bounce {
  0%, 80%, 100% { 
    transform: translateY(0); 
  }
  40% { 
    /* Adjust -10px to change how high they jump */
    transform: translateY(-10px); 
  }
}
</style>