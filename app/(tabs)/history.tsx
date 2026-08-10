import { View, Text , Image, TouchableOpacity, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import EmptyState from '@/components/empty-state';
import MedicationCardItem from '@/components/medicationCardItem';
import moment from 'moment';
import { GetPrevDataRangeToDisplay } from '@/Service/convert-date-time';
import { db } from '@/firebaseConfig';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const History = () => {
  const [medList, setMedList] = useState<any>();
  const [dateRange, setDateRange] = useState();
  const[loading,setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
      moment().format("MM/DD/YYYY")
    );
  const router = useRouter()

    useEffect(()=>{
      GetDateList();  
      GetMedicationList(selectedDate);
    },[])

    const GetDateList=() =>{
      const dates = GetPrevDataRangeToDisplay();
      setDateRange(dates)
    }
    const GetMedicationList = async (selectedDate ) => {
        setLoading(true)
        try {
          const q = query(
            collection(db, "medications"),
           where("dates", "array-contains", selectedDate)
          );
    
          const querySnapshot = await getDocs(q);
          const data: any[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.docId, ...doc.data() });
          });
          setMedList(data);
        } catch (e) {
          console.error("Error fetching medication list: ", e);
        }
        finally{
            setLoading(false)
        }
      };
        const deleteMedication= async (docId:string) =>{
        try {
          await deleteDoc(doc(db, "medications", docId));
          console.log("Deleted successfully");
           GetMedicationList(selectedDate);
        } catch (error) {
          console.error("Error deleting medication:", error);
        }
      }
      
  
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={<View className='flex p-5 mt-5 '>
        <Image source={require("./../../assets/images/medi4.png")} style={{ width: 350, height: 250 }} />
        <Text className='text-[25px] font-bold'>Medication History</Text>
        <FlatList
          data={dateRange}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="items-center justify-center flex-1 h-24 p-4 mt-5 mr-3 bg-gray-300 rounded-lg"
              style={{
                backgroundColor: item.formateDate === selectedDate ? "#007FFF" : "#D3D3D3",
              }}
              onPress={() => {
                setSelectedDate(item.formateDate);
                GetMedicationList(item.formateDate);
              } }>
              <Text
                className="text-[20px]"
                style={{
                  color: item.formateDate === selectedDate ? "white" : "black",
                }}
              >
                {item.day}
              </Text>
              <Text
                className="text-[26px] font-bold"
                style={{
                  color: item.formateDate === selectedDate ? "white" : "black",
                }}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          )} />
        {medList?.length > 0 ? <FlatList
          onRefresh={() => GetMedicationList(selectedDate)}
          refreshing={loading}
          data={medList}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: "/(tabs)/action-modal",
              params: {
                ...item,
                selectedDate: selectedDate
              }
            })}>
              <MedicationCardItem medicine={item} selectedDate={selectedDate} onDelete={() => deleteMedication(item.docId)} />
            </TouchableOpacity>
          )} /> : <Text className='text-[25px] p-10 text-gray-300  font-bold'>No Medication Found!</Text>}
      </View>} renderItem={undefined}    />
  )
}
export default History