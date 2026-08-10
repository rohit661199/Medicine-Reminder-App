import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { getLocalStorage } from '@/Service/storage';

const Header = () => {
  const router= useRouter()
  const [user,setUser] = useState();
  useEffect(()=>{
    GetUserDetail()

  },[])
  const GetUserDetail= async () =>{
    const userInfo= await getLocalStorage("userDetail")
    console.log(userInfo)
    setUser(userInfo)
  }
  return (
    <View className='w-full mt-10'>
      <View className='flex-row items-center justify-between'>
      <View className='flex-row gap-4 item-center'>
        <Image source={require("./../assets/images/smiley.png")} style={{width:30, height:30}}/>
      <Text className='text-[25px] font-bold'>Hello {user?. displayName} 👋</Text>
      </View>
       <TouchableOpacity onPress={()=> router.push('/add-new-medications')}>
        <Ionicons name="medkit-outline" size={27} color="black" style={{color:"#007FFF"}}/>
       </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header