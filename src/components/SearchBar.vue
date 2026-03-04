<template>
    <div class="d-flex mx-5 align-stretch">
        <v-text-field 
            rounded="lg"
            label="Search for a place..."
            prepend-inner-icon="mdi-magnify"
            density="comfortable"
            variant="solo"
            bg-color="neutral-600" 
            hide-details
        ></v-text-field>

        <v-btn 
            color="blue-500" 
            class="ml-4"
            height="auto" 
            flat
            rounded="lg"
        >
            Search
        </v-btn>
    </div>
</template>

