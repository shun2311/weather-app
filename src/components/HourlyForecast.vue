<template>
  <v-card
    flat
    height="665"
    rounded="lg"
    color="neutral-700"
    >
    <div v-if="!loading">
      <v-card-text class="flex-grow-1 text-start text-title-medium">
          Hourly forecast
      </v-card-text>
      <v-sheet class="custom-scroll" height="590" color="transparent">
        <hourly-forecast-card
            v-for="index in 24"
            :key="index"
            class="mb-4"
            :date="hourlyData?.time?.[index-1]"
            :temperature="hourlyData?.temperature?.[index-1]"
            :weather-code="hourlyData?.weather_code?.[index-1]"
        />
      </v-sheet>
    </div>
  </v-card>
</template>

<script setup>
import HourlyForecastCard from './HourlyForecastCard.vue';
import { defineProps} from 'vue';

const props = defineProps({
    hourlyData: {
      type: Object, 
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    },
});
</script>

<style>
.custom-scroll {
  overflow-y: auto;
}

/* For Chrome/Edge/Safari */
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: rgb(var(--v-theme-neutral-600));
  border-radius: 4px;
}
</style>