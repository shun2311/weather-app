<template>
    <v-card 
      class="mx-4" 
      color="neutral-600" 
      rounded="lg" 
      flat
    >
        <div class="d-flex flex-grow-1 align-center ma-4">
            <v-img :src="useWeatherIcon(weatherCode)" max-width="30" max-height="30" />
            <div class="ml-4 text-label-large">{{ hour }}</div>
            <v-spacer></v-spacer>
            <div class="text-label-large">{{ temperature }}°</div>
        </div>
    </v-card>
</template>

<script setup>
import { useWeatherIcon } from '@/composables/useWeather.js'
import { defineProps, computed } from 'vue';

const props = defineProps({
    date: {
      type: Date, 
      default: ""
    },
    weatherCode: {
      type: Number,
      default: null
    },
    temperature: {
      type: Number,
      default: 0
    },
});

const hour = computed(() => {
  return props.date?.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true
  });
});
</script>