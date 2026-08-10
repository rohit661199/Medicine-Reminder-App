import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router, Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import "./../../global.css"
import { getLocalStorage } from '@/Service/storage';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeLayout = () => {
   const router = useRouter()
   useEffect(() => {
    GetUserDeatil();
  }, []);
  const GetUserDeatil= async () =>{
    const userInfo= await getLocalStorage("userDetail");
    if(!userInfo){
      router.replace("/login")
    }
  }

  return (
   <Tabs screenOptions={{headerShown:false} }>
    <Tabs.Screen name='index' options={{tabBarLabel:"Home",tabBarIcon : ({color,size})=> (<FontAwesome name="home" size={size} color={color} />)}}/>
    <Tabs.Screen name='history' options={{tabBarLabel : "History",tabBarIcon:({color,size}) =>(<FontAwesome name="history" size={24} color={color} />)}}/>
    <Tabs.Screen name='profile' options ={{tabBarLabel:"Profile",tabBarIcon:({color,size})=>(<FontAwesome name="user" size={size} color={color} />)}}/>
    <Tabs.Screen name='chat' options ={{tabBarLabel:"Chat",tabBarIcon:({color,size})=>(<Ionicons name="chatbubbles" size={24} color={color} />)}}/>
   </Tabs>
  )
}

export default HomeLayout

function checkUserAuthentication() {
  throw new Error('Function not implemented.');
}
