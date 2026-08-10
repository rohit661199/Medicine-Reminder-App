import { View, Text ,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';


const AddMedicationHeader = () => {
 const router =  useRouter()
  return (
    <View>
      <Image source={require("./../assets/images/medicineConsult.jpg")} style={{width:"100%", height:300}}></Image>
      <TouchableOpacity className='absolute p-6' onPress={()=>router.back()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default AddMedicationHeader