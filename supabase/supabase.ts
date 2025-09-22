import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'
// const apiKey =Constants.expoConfig?.extra?.geminiApiKey

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl
const supabasePublishableKey = Constants.expoConfig?.extra?.supabaseKey

export const supabase = createClient('https://yauhsigmcfhaglkzyyup.supabase.co', supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})