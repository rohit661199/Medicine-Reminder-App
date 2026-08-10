import { View, Text ,ScrollView ,FlatList } from 'react-native'
import React from 'react'
import Header from '@/components/header'
import EmptyState from '@/components/empty-state'
import MedicationList from '@/components/medication-list'
import { Redirect } from 'expo-router'

const HomeScreen = () => {
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={<View className='flex-1 w-full p-5 '>
        <Header />
        {/* <EmptyState/> */}
        <MedicationList />
      </View>} renderItem={undefined} />
  )
  // Q when we use FlatList how to Scroll when i use Scrollview only scroll medilist empty component not scroll
}

export default HomeScreen