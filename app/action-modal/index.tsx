import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import MedicationCardItem from '@/components/medicationCardItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import moment from 'moment';

const MedicationActionModal = () => {
    const medicine = useLocalSearchParams();
    console.log(medicine)
    const router = useRouter()

    const UpdateActionStatus = async (status : any)=> {
      try{
        const docRef = doc(db,'medications',medicine?.docId);
        await updateDoc(docRef,{
          action : arrayUnion({
            status:status,
            time:moment().format('LT'),
            date:medicine?.selectedDate
          })
        })
        Alert.alert(status,'Response Saved!',[
          {
            text:'OK',
            onPress:()=>router.replace('/(tabs)')
          }
        ])
      }catch(error){
        console.log(error)
      }
    }
  return (
    <View className='items-center justify-center flex-1 p-3'>
     <Image source={require("./../../assets/images/notification-bell.png")} style={{width:120,height:120}}></Image>
     <Text className='text-[15px] text-gray-400'>{medicine?.selectedDate}</Text>
     <Text className='text-[32px] font-bold text-blue-600'>{medicine?.reminder}</Text>
     <Text className='text-[15px] text-gray-400 text-'>It&apos;s time to take</Text>
     <MedicationCardItem medicine={medicine} onDelete={undefined}/>
     <View className='flex-row gap-3 mt-3 '>
      <TouchableOpacity className='flex-row p-3 border-2 border-red-500 rounded-lg' onPress={()=> UpdateActionStatus('Missed')}>
        <Ionicons name="close-outline" size={20} color="red" />
        <Text className='ml-1 font-bold text-red-500'>Missed</Text>
      </TouchableOpacity>
      <TouchableOpacity className='flex-row p-3 bg-green-500 rounded-lg ' onPress={()=> UpdateActionStatus('Taken')}>
        <Ionicons name="checkmark-outline" size={20} color="white" />
        <Text className='ml-1 font-bold text-white'>Taken</Text>
      </TouchableOpacity>
     </View>
     <TouchableOpacity className='absolute bottom-10' onPress={()=> router.back()}>
      <Ionicons name="close-circle" size={30} color="gray" />
     </TouchableOpacity>
    </View>
  )
}

export default MedicationActionModal