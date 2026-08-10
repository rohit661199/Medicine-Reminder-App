import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "./../global.css"

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="login"/>
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name='action-modal' options={{presentation:'modal'}}/> 
    </Stack>
  );
}
