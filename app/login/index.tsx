import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, NavigationProp, useNavigation} from '@react-navigation/native'
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
const LoginScreen = () => {
  const router = useRouter();
  return (
    <View className='bg-white'> 
      <View className='p-12'>
        <Image source={require("./../../assets/images/medi-10.png")} style={{width:300, height:300}}></Image>
      </View>
      <View className='p-10 bg-[#007FFF] h-full'>
        <Text className='text-white text-[30px] font-bold text-center mt-7' >Stay on Track, Stay Health!</Text>
        <Text className='text-center text-white text-[12px] mt-5'>Track your meds, take control of your health. stay consistent, stay confident</Text>
        <TouchableOpacity className='p-4 mt-5 bg-white rounded-full' onPress={()=> router.push('/login/signIn')}>
          <Text className='font-bold text-center text-blue-500'>Continue</Text>
        </TouchableOpacity>
        <Text className='mt-4 text-white text-[12px] '>Note: By Clicking Continue button, you will agree to our terms and conditions </Text>
      </View>
      </View>
  )
}

export default LoginScreen