<template>
    <div class="d-flex ga-5" :class="{'flex-wrap' : mobile}">
        <weather-detail-card
            v-for="detail in weatherDetails"
            :class="'flex-grow-1'"
            :style="mobile 
                ? 'flex-basis: calc(50% - 20px);' 
                : 'flex-basis: 0;'"
            :key="detail.title"
            :title="detail.title"
            :data="detail.data"
        />
    </div>
</template>

<script setup>
import WeatherDetailCard from './WeatherDetailCard.vue';
import { defineProps} from 'vue';
import { useDisplay } from 'vuetify';

const props = defineProps({
    weatherDetails: {
        type: Array,
        default: []
    },
});

const { mobile } = useDisplay()

</script>