<template>
    <v-menu location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn color="neutral-700" variant="flat" v-bind="props">
            <template v-slot:prepend>
                <v-img :src="iconUnits" width="15" height="15"></v-img>
            </template>
            Units
            <template v-slot:append>
                <v-img :src="iconDropdown" width="15" height="15"></v-img>
            </template>
            </v-btn>
        </template>
        <v-list bg-color="neutral-700">
            <v-list-item 
                value="unit" 
                @click="$emit('changeUnit')"
            >
                <v-list-item-title class="text-label-medium">{{ title }}</v-list-item-title>
            </v-list-item>

            <v-list-subheader class="text-label-small text-neutral-300">Temperature</v-list-subheader>
      
            <v-list-item 
                :value="celcius"
                :active="selectedTemperature === celcius"
                color="neutral-300"
                @click="$emit('changeTemperature', celcius)"
            >
                <v-list-item-title class="text-label-medium text-white">Celcius(°C)</v-list-item-title>
                <template v-slot:append>
                    <v-img v-if="selectedTemperature === celcius" class="ml-4" :src="iconCheckmark" width="10" height="10" />
                </template>
            </v-list-item>

            <v-list-item 
                :value="fahrenheit" 
                :active="selectedTemperature === fahrenheit"
                color="neutral-300"
                @click="$emit('changeTemperature', fahrenheit)"
            >
                <v-list-item-title class="text-label-medium text-white">Fahrenheit(°F)</v-list-item-title>
                <template v-slot:append>
                    <v-img v-if="selectedTemperature === fahrenheit" class="ml-4" :src="iconCheckmark"  width="10" height="10" />
                </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-subheader class="text-label-small text-neutral-300">Wind Speed</v-list-subheader>
            
            <v-list-item 
                :value="kmh" 
                :active="selectedWindSpeed === kmh"
                color="neutral-300"
                @click="$emit('changeSpeed', kmh)"
            >
                <v-list-item-title class="text-label-medium text-white">km/h</v-list-item-title>
                <template v-slot:append>
                    <v-img v-if="selectedWindSpeed === kmh" class="ml-4" :src="iconCheckmark"  width="10" height="10" />
                </template>
            </v-list-item>

            <v-list-item 
                :value="mph"
                :active="selectedWindSpeed === mph"
                color="neutral-300"
                @click="$emit('changeSpeed', mph)"
            >
                <v-list-item-title  class="text-label-medium text-white">mph</v-list-item-title>
                <template v-slot:append>
                    <v-img v-if="selectedWindSpeed === mph" class="ml-4" :src="iconCheckmark"  width="10" height="10" />
                </template>
            </v-list-item>


            <v-divider class="my-2 mx-4"></v-divider>

            <v-list-subheader class="text-label-small text-neutral-300">Precipitation</v-list-subheader>

            <v-list-item 
                :value="mm" 
                :active="selectedPrecipitation === mm"
                color="neutral-300"
                @click="$emit('changePrecipitation', mm)"
            >
                <v-list-item-title class="text-label-medium text-white">Millimeters (mm)</v-list-item-title>
                <template v-slot:append>
                    <v-img v-if="selectedPrecipitation === mm" class="ml-4" :src="iconCheckmark"  width="10" height="10" />
                </template>
            </v-list-item>
            <v-list-item 
                :value="inch" 
                :active="selectedPrecipitation === inch"
                color="neutral-300"
                @click="$emit('changePrecipitation', inch)"
            >
                <v-list-item-title class="text-label-medium text-white">Inches (in)</v-list-item-title>
                <template v-slot:append>
                    <v-img v-if="selectedPrecipitation === inch" class="ml-4" :src="iconCheckmark"  width="10" height="10" />
                </template>
            </v-list-item>
        </v-list>
    </v-menu>   
</template>

<script setup>
import iconUnits from '@/assets/images/icon-units.svg';
import iconDropdown from '@/assets/images/icon-dropdown.svg';
import iconCheckmark from '@/assets/images/icon-checkmark.svg'
import { defineProps } from 'vue';

const props = defineProps({
    title: {
      type: String, 
      default: "Lorem Ipsum"
    },
    selectedTemperature: {
        type: String,
        default: "celcius"
    },
    selectedWindSpeed: {
        type: String,
        default: "km/h"
    },
    selectedPrecipitation: {
        type: String,
        default: "mm"
    }
});

const fahrenheit = "fahrenheit"
const celcius = "celcius"
const kmh = "km/h"
const mph = "mph"
const mm = "mm"
const inch = "inch"
</script>