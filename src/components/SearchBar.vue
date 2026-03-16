<template>
    <div :class="{'d-flex align-stretch mx-5' : !mdAndDown}">
      <v-combobox
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
      </v-combobox>
    <v-btn 
        color="blue-500" 
        :class="mdAndDown ? 'mt-4 py-3' : 'ml-4'"
        height="auto" 
        :width="mdAndDown ? '100%' : ''"
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

const { mdAndDown } = useDisplay()
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
  // If we have search text but haven't formally "selected" an object yet
  if (typeof selectedCity.value !== 'object'&& cities.value.length > 0) {
    selectedCity.value = cities.value[0]
  } else if (!selectedCity.value && searchQuery.value) {
    // If user clicks search but results haven't loaded, try one last fetch
    fetchCities(searchQuery.value)
  }
}

watch(selectedCity, (newVal, oldVal) => {
    // 1. Check if newVal exists
  // 2. Ensure it is an Object (not the string the user is typing)
  // 3. Ensure it has a unique property from your API (like 'id')
  if (newVal && typeof newVal === 'object' && newVal.id) {
    emit('changeLocation', newVal)
  }
})
</script>