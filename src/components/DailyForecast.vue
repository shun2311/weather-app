<template>
    <div class="text-start text-label-large mb-4">Daily forecast</div>
    <div class="d-flex ga-5" :class="{'flex-wrap' : mdAndDown}">
      <daily-forecast-card
        :class="{'flex-grow-1' : !mdAndDown}"
        v-for="index in 7"
        :key="index"
        :loading="loading"
        :minimumTemp="dailyData?.temperature_min?.[index-1]"
        :maximumTemp="dailyData?.temperature_max?.[index-1]"
        :weather-code="dailyData?.weather_code?.[index-1]"
        :day="dailyData?.time?.[index-1]"
        :style="mdAndDown 
                ? 'flex-basis: calc(33% - 13px);' 
                : ''"
      />
    </div>
</template>

<script setup>
import DailyForecastCard from './DailyForecastCard.vue';
import { defineProps} from 'vue';
import { useDisplay } from 'vuetify';

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

const { mdAndDown } = useDisplay()

</script>