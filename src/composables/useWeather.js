// useMouse.js
import iconSunny from '@/assets/images/icon-sunny.webp'
import iconDrizzle from '@/assets/images/icon-drizzle.webp'
import iconFog from '@/assets/images/icon-fog.webp'
import iconOvercast from '@/assets/images/icon-overcast.webp'
import iconPartlyCloudy from '@/assets/images/icon-partly-cloudy.webp'
import iconRain from '@/assets/images/icon-rain.webp'
import iconSnow from '@/assets/images/icon-snow.webp'
import iconStorm from '@/assets/images/icon-storm.webp'

export function useWeatherIcon(weatherCode) {
  const code = weatherCode === null ?  0 : weatherCode;

  // Map WMO codes to your imported assets
  const mapping = {
    // Sunny / Clear
    0: iconSunny, // Or iconSunny if you have one
    1: iconPartlyCloudy,
    2: iconPartlyCloudy,
    
    // Cloudy / Fog
    3: iconOvercast,
    45: iconFog,
    48: iconFog,
    
    // Drizzle
    51: iconDrizzle,
    53: iconDrizzle,
    55: iconDrizzle,
    56: iconDrizzle,
    57: iconDrizzle,
    
    // Rain
    61: iconRain,
    63: iconRain,
    65: iconRain,
    66: iconRain,
    67: iconRain,
    80: iconRain,
    81: iconRain,
    82: iconRain,
    
    // Snow
    71: iconSnow,
    73: iconSnow,
    75: iconSnow,
    77: iconSnow,
    85: iconSnow,
    86: iconSnow,
    
    // Storm
    95: iconStorm,
    96: iconStorm,
    99: iconStorm,
  };
  // Return the mapped icon, or a fallback if the code is unknown
  return mapping[code] || iconSunny;
};