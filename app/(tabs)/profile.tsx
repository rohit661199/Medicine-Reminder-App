import { View, Text , Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { getLocalStorage } from '@/Service/storage';
const Profile = () => {
  const router = useRouter()
  const [user,setUser] = useState()
  useEffect(()=>{
    GetUserDeatil()
  },[])
  const GetUserDeatil= async() =>{
    const userInfo = await getLocalStorage("userDetail")
    console.log(userInfo)
    setUser(userInfo)
  }
  return (
    <View className='items-center flex-1 p-5 mt-32'>
      <Image source={require("./../../assets/images/smiley (1).png")} style={{width:80, height:80}}></Image>
      <Text className='text-[25px] font-bold'>{user?.displayName}</Text>
      <Text className='text-gray-300'>{user?.email}</Text>
      <View>
        <TouchableOpacity className='flex-row items-center gap-4 mt-10 ' onPress={()=> router.push("/add-new-medications")}>
          <Ionicons name="add-circle" size={26} color="#007FFF" style={{padding:10, backgroundColor:"#AFDBF5", borderRadius:8}}/>
          <Text className='text-[17px] font-medium'>Add New Medications</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row items-center gap-4 mt-7' onPress={()=> router.push("/(tabs)")}> 
          <Ionicons name="medkit" size={24} color="#007FFF"  style={{padding:10, backgroundColor:"#AFDBF5", borderRadius:8}}   />
         <Text className='text-[17px] font-medium'>My Medication</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row items-center gap-4 mt-7' onPress={()=> router.push("/(tabs)/history")}>
        <MaterialCommunityIcons name="clock-time-three" size={24} color="#007FFF"  style={{padding:10, backgroundColor:"#AFDBF5", borderRadius:8}}/>
         <Text className='text-[17px] font-medium' >History</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row items-center gap-4 mt-7' onPress={()=> router.push("/(tabs)/chat")}>
        <Entypo name="chat" size={24} color="#007FFF"  style={{padding:10, backgroundColor:"#AFDBF5", borderRadius:8}}/>
         <Text className='text-[17px] font-medium'>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row items-center gap-4 mt-7' onPress={()=> router.push("/login")}>
        <MaterialIcons name="logout" size={24} color="#007FFF"  style={{padding:10, backgroundColor:"#AFDBF5", borderRadius:8}}/>
         <Text className='text-[17px] font-medium'>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  
  )
}

export default Profile