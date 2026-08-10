/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.tsx","./components/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
     fontFamily: {
        jost: ["Jost_400Regular"],
        jostBold: ["Jost_700Bold"],
        interBlack: ["Inter_900Black"],
        urbanist: ["urbanist-Regular"],
         urbanistBold: ["urbanist-Bold"],
      },
      
      // Add custom font weights
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      }
    },
  },
  plugins: [],
}