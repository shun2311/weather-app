<template>
    <div :class="{'d-flex align-stretch mx-5' : !mobile}">
       <v-autocomplete
          v-model="selectedCity"
          v-model:search="searchQuery"
          :items="cities"
          item-title="formattedName"
          item-value="id"
          label="Search for a place..."
          prepend-inner-icon="mdi-magnify"
          return-object
          hide-details="auto"
          no-filter
          clearable
          auto-select-first
          bg-color="neutral-600" 
          density="compact"
          variant="solo-filled"
          menu-icon=""
          :list-props="{ 
                bgColor: 'neutral-700',
                class: 'pa-0' 
            }"
        >
        <template v-slot:no-data>
            <v-list-item v-if="citiesLoading" class="text-label-medium">
                <template v-slot:prepend>
                <v-progress-circular
                    indeterminate
                    size="20"
                    width="2"
                    color="primary"
                    class="mr-3"
                ></v-progress-circular>
                </template>
                Search In Progress...
            </v-list-item>
            
            <v-list-item v-else-if="searchQuery && searchQuery.length >= 2" class="text-label-medium">
                No cities found for "{{ searchQuery }}"
            </v-list-item>
        </template>
          <template v-slot:item="{ props }">
            <v-list-item
              v-bind="props"
            >
            </v-list-item>
          </template>
        </v-autocomplete>
    <v-btn 
        color="blue-500" 
        :class="mobile ? 'mt-4 py-3' : 'ml-4'"
        height="auto" 
        :width="mobile ? '100%' : ''"
        flat
        rounded="lg"
        @click="quickSelectFirst"
    >
        Search
    </v-btn>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify';

const props = defineProps({
    loading: {
      type: Boolean,
      default: true
    }
})
const emit = defineEmits(['changeLocation'])

const { mobile } = useDisplay()
const selectedCity = ref(null)
const searchQuery = ref('')
const cities = ref([])
const citiesLoading = ref(false)

// 1. Debounce Logic: Prevents API spamming
let debounceTimer = null
const debounceFetch = (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    fetchCities(val)
  }, 400) // Wait 400ms after user stops typing
}

// Watcher for the search input
watch(searchQuery, (newVal) => {

  if (selectedCity.value === null && newVal.length === 0) {
    cities.value = []
    return
  }
  if (!newVal || newVal.length < 2 || (selectedCity.value !== null && newVal === selectedCity.value.formattedName)) {
    return
  }
  
  debounceFetch(newVal)
})

// 2. Core API Call
async function fetchCities(query) {
  if (!query) return
  citiesLoading.value = true
  cities.value = []
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
    )
    const data = await response.json()
    const results = data.results || []
    
    cities.value = results.map(city => ({
      ...city,
      formattedName: `${city.name}, ${city.country}`
    }))    
  } catch (error) {
    console.error("Geocoding error:", error)
  } finally {
    citiesLoading.value = false
  }
}

// 3. Button Logic: "Quick Select"
function quickSelectFirst() {
  if (cities.value === null || cities.value.length === 0) {
    fetchCities(searchQuery.value)

  }
  selectedCity.value = cities.value === null || cities.value.length === 0 ? null : cities.value[0]
}

watch(selectedCity, (newVal, oldVal) => {
    if(newVal !== oldVal && newVal !== null) {
        emit('changeLocation', selectedCity.value)
    } 
})
</script>