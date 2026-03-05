<template>
    <v-card class="py-3" color="neutral-600" rounded="lg">
        <v-card-title class="text-start text-label-medium mb-2">{{ title }}</v-card-title>
        <v-card-subtitle class="text-start text-title-large">{{ data }}</v-card-subtitle>
    </v-card>
</template>

<script setup>
import { defineProps} from 'vue';

const props = defineProps({
    title: {
      type: String, 
      default: "Lorem Ipsum"
    },
    data: {
      type: String,
      default: "Lorem Ipsum"
    },
});
</script>