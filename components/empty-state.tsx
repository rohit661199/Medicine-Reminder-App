import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const EmptyState = () => {
    const router = useRouter()
  return (
    <View className='flex items-center mt-20'>
        <Image source={require("./../assets/images/medicine.png")} style={{width:120, height:120}}/>
        <Text className='text-[30px] mt-7 font-bold text-center'>No Medications!</Text>
        <Text className='text-[16px] text-gray-400 text-center mt-5'>You have 0 Medications setup, Kindly setup a new one</Text>
        <TouchableOpacity className='w-full p-3 bg-blue-500 rounded-lg shadow-lg text-1xl mt-7' onPress={()=> router.push("/(tabs)/add-new-medications")}>
          <Text className='text-center text-white'>+ Add new Medications</Text>
        </TouchableOpacity>
    </View>
  )
}

export default EmptyState