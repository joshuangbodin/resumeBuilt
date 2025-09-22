import "dotenv/config";

export default {
  expo: {
    name: "ApplyEazy",
    slug: "ApplyEazy",
    scheme: "applyEazy",
    extra: {
      geminiApiKey: process.env.EXPO_GEMINI_API_KEY,
      payStackKey :process.env.EXPO_PAYSTACK_PUB_KEY,
      supabaseUrl: process.env.EXPO_EXPO_SUPABASE_URL,
      supabaseKey : process.env.EXPO_SUPABASE_KEY
    },
  },
};
