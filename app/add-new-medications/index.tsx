import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AddMedicationHeader from '@/components/add-medication-header'
import AddMedicationForm from '@/components/add-medication-form'

const AddNewMedications = () => {
  return (
    <ScrollView>
      <AddMedicationHeader/>
      <AddMedicationForm/>
    </ScrollView>
  )
}

export default AddNewMedications