<template>
  <v-app>
    <v-app-bar class="py-6 px-10" color="transparent" density="compact" flat>
      <v-img
        :src="logo"
        height="40"
        width="200"
        contain
        class="flex-grow-0"
      ></v-img>
      
      <v-spacer></v-spacer>
      <v-btn>units</v-btn>
    </v-app-bar>
    <v-main class="px-10 mt-16">
      <v-container class="text-center">
        <v-row justify="center">
          <v-col cols="12">
            <div class="text-display-medium font-weight-bold mb-10 text-center">
              How's the sky looking today?
            </div> 
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11" md="8" lg="6">
           <search-bar />
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="8">
            <weather-card 
              :loading="loading" 
              :current-data="currentData"
              :city="city"
              :country="country"
            />
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="8">
            <weather-detail 
              :weather-details="weatherDetails"
            />
          </v-col>
        </v-row>
         <v-row class="mt-8">
          <v-col cols="8">
            <daily-forecast 
              :loading="loading"
              :daily-data="dailyData"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import logo from '@/assets/images/logo.svg'
import SearchBar from '@/components/SearchBar.vue'
import WeatherCard from './components/WeatherCard.vue';
import WeatherDetail from './components/WeatherDetails.vue';
import DailyForecast from './components/DailyForecast.vue';
import { fetchWeatherApi } from "openmeteo";
import { ref, onMounted} from 'vue';

const loading = ref(true);
const error = ref(null);
const url = ref("https://api.open-meteo.com/v1/forecast");

const city = ref('')
const country = ref('')
const latitude = ref(null)
const longitude = ref(null)
// fetch weather api
const hourlyData = ref(null);
const dailyData = ref(null)
const currentData = ref(null)
const weatherDetails = ref([
  {title: "Feels Like", data: "--"}, 
  {title: "Humidity", data: "--"}, 
  {title: "Wind", data: "--"}, 
  {title: "Precipitation", data: "--"}
])

const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        resolve(position.coords); // Success!
      },
      (err) => {
        console.log(err.message)
        reject(err); // Failed or denied
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  });
};

const getAddress = async () => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude.value}&lon=${longitude.value}`
    )
    const data = await response.json()
    console.log(data)
    city.value = data.address.city || data.address.town || data.address.village
    country.value = data.address.country
    
  } catch (error) {
    console.error("Reverse geocoding failed:", error)
  }
}

const fetchForecastData = async () => {
    try {
      const params = {
        latitude: latitude.value,
        longitude: longitude.value,
        daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
        hourly: ["temperature_2m", "weather_code"],
        current: ["temperature_2m", "relative_humidity_2m", "precipitation", "wind_speed_10m", "apparent_temperature", "weather_code"],

      };

      // Assuming fetchWeatherApi is imported or globally available
      const responses = await fetchWeatherApi(url.value, params);
      // Store the result in our reactive ref
      // Process first location. Add a for-loop for multiple locations or weather models
      const response =  responses[0];

      // Attributes for timezone and location
      const utcOffsetSeconds =  response.utcOffsetSeconds();
      
      // Daily Forecast data
      const daily = response.daily();
      const dailyDates = Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
      );
      dailyData.value =  {
        time: dailyDates.map(date => date.toLocaleDateString('en-US', { weekday: 'short' })),
        weather_code: daily.variables(0).valuesArray(),
        temperature_min: daily.variables(1).valuesArray().map(Math.ceil),
        temperature_max: daily.variables(2).valuesArray().map(Math.ceil),
      };

      // Hourly forecast data
      const hourly = response.hourly();
      hourlyData.value = {
        time: Array.from(
          { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
          (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
        ),
        temperature: hourly.variables(0).valuesArray().map(Math.ceil),
        weather_code: hourly.variables(1).valuesArray(),
      };
      
      // Current Weather Data
      const current = response.current()
      currentData.value = {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature: Math.ceil(current.variables(0).value()),
        humidity: current.variables(1).value(),
        precipitation: current.variables(2).value(),
        wind_speed: Math.ceil(current.variables(3).value()),
        apparent_temperature: Math.ceil(current.variables(4).value()),
        weather_code: current.variables(5).value()
      }

      weatherDetails.value[0].data = currentData.value.apparent_temperature + "°"
      weatherDetails.value[1].data = currentData.value.humidity + "%"
      weatherDetails.value[2].data = currentData.value.wind_speed + " km/h"
      weatherDetails.value[3].data = currentData.value.precipitation + " mm"
      
      for (let i=0; i< dailyData.value.time.length; i++) {
        console.log(dailyData.value.time[i])
        console.log(dailyData.value.weather_code[i])
        console.log(dailyData.value.temperature_min[i])
        console.log(dailyData.value.temperature_max[i])
      }
    } catch (err) {
      error.value = "Failed to get location.";
      console.error(err);
    }
};

onMounted(async () => {
  loading.value = true;
  await getLocation()
  await getAddress()
  await fetchForecastData(); // Added await here
  loading.value = false;
});

</script>
