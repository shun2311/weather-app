<template>
    <v-card color="neutral-700" rounded="lg" flat height="150">
        <v-card-text v-if="!loading">{{ day }}</v-card-text>
        <div v-if="!loading" class="d-flex justify-center mb-4">
          <v-img :src="useWeatherIcon(weatherCode)" max-width="40" max-height="40" class="mx-auto" />
        </div>
        <div v-if="!loading" class="d-flex mx-2 flex-grow-1 justify-space-between">
            <div class="text-label-medium">{{ minimumTemp }}°</div>
            <div class="text-label-medium">{{ maximumTemp }}°</div>
        </div>
    </v-card>
</template>

<script setup>
import { defineProps} from 'vue';
import { useWeatherIcon } from '@/composables/useWeather.js'

const props = defineProps({
    day: {
      type: String, 
      default: ""
    },
    weatherCode: {
      type: Number,
      default: null
    },
    minimumTemp: {
      type: Number,
      default: 0
    },
    maximumTemp: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: true
    }
});
</script>