<template>
    <div class="text-start text-label-large mb-4">Daily forecast</div>
    <div class="d-flex ga-5">
      <daily-forecast-card
        class="flex-grow-1"
        v-for="(item, index) in 7"
        :key="index"
        :loading="loading"
        :minimumTemp="dailyData?.temperature_min?.[index]"
        :maximumTemp="dailyData?.temperature_max?.[index]"
        :weather-code="dailyData?.weather_code?.[index]"
        :day="dailyData?.time?.[index]"
      />
    </div>
</template>

<script setup>
import DailyForecastCard from './DailyForecastCard.vue';
import { defineProps} from 'vue';

const props = defineProps({
    loading: {
      type: Boolean,
      default: true
    },
    dailyData: {
        type: Object,
        default: null
    }
})
</script>