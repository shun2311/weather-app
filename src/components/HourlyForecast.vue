<template>
  <v-card flat height="665" rounded="lg" color="neutral-700">
    <div v-if="!loading">
      <div class="d-flex flex-grow-1">
        <v-card-text class="text-start text-title-medium">
          Hourly forecast
        </v-card-text>
        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn class="my-4 mx-6" color="neutral-600" variant="flat" v-bind="props">
              {{ chosenDay }}
              <template v-slot:append>
                <v-img :src="iconDropdown" width="15" height="15"></v-img>
              </template>
            </v-btn>
          </template>
          <v-list bg-color="neutral-700">
            <v-list-item v-for="(day, index) in days" :key="index" :value="day" :active="chosenDay === day"
              color="neutral-300" @click="$emit('changeDay', day)">
              <v-list-item-title class="text-label-medium text-white">{{ day }}</v-list-item-title>
            </v-list-item>
          </v-list>

        </v-menu>
      </div>
      <v-sheet class="custom-scroll" height="590" color="transparent">
        <hourly-forecast-card v-for="index in 24" :key="index" class="mb-4" :date="hourlyData?.time?.[index - 1]"
          :temperature="hourlyData?.temperature?.[index - 1]" :weather-code="hourlyData?.weather_code?.[index - 1]" />
      </v-sheet>
    </div>
  </v-card>
</template>

<script setup>
import HourlyForecastCard from './HourlyForecastCard.vue';
import iconDropdown from '@/assets/images/icon-dropdown.svg';

import { defineProps } from 'vue';

const props = defineProps({
  hourlyData: {
    type: Object,
    default: null
  },
  chosenDay: {
    type: String,
    default: null
  },
  days: {
    type: Array,
    default: []
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