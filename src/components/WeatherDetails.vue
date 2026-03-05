<template>
    <div class="d-flex ga-5">
        <weather-detail-card
            v-for="detail in weatherDetails"
            class="flex-grow-1"
            style="flex-basis: 0;"
            :key="detail.title"
            :title="detail.title"
            :data="detail.data"
        />
    </div>
</template>

<script setup>
import WeatherDetailCard from './WeatherDetailCard.vue';
import { defineProps} from 'vue';

const props = defineProps({
    weatherDetails: {
        type: Array,
        default: []
    },
});
</script>