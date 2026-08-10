import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { use, useEffect, useState } from "react";
import { GetDateRangeToDisplay } from "@/Service/convert-date-time";
import { Image } from "react-native";
import moment from "moment";
import { collection, deleteDoc, getDoc, getDocs, query, where,doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import MedicationCardItem from "./medicationCardItem";
import EmptyState from "./empty-state";
import { useRouter } from "expo-router";

const MedicationList = () => {
  const [medList, setMedList] = useState<any>();
  const [dateRange, setDateRange] = useState();
  const[loading,setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const router = useRouter()

  useEffect(() => {
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, []);
  const GetDateRangeList = () => {
    const dateRange = GetDateRangeToDisplay();
    setDateRange(dateRange);
  };
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
      setTimeout(() => {
        setLoading(false)
      }, 500);
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
    <View className="flex-1 mt-8 ">
      <Image
        source={require("./../assets/images/medication.jpeg")}
        style={{ width: "100%", height: 200, borderRadius: 15 }}
      />
      <FlatList
        data={dateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="items-center justify-center flex-1 h-24 p-4 mt-5 mr-3 bg-gray-300 rounded-lg"
            style={{
              backgroundColor:
                item.formateDate === selectedDate ? "#007FFF" : "#D3D3D3",
            }}
            onPress={() => {setSelectedDate(item.formateDate);
              GetMedicationList(item.formateDate)
            }}>
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
        )}
      />
        {medList?.length>0? <FlatList
        onRefresh={() => GetMedicationList(selectedDate)}
        refreshing={loading}
        data={medList}
        renderItem={({item,index})=>(
          <TouchableOpacity onPress={()=> router.push({
            pathname:"/action-modal",
            params:{
              ...item,
              selectedDate:selectedDate
            }
          })}>
          <MedicationCardItem medicine={item} selectedDate={selectedDate}  onDelete={() => deleteMedication(item.docId)}/>
          </TouchableOpacity>
        )}  
      />:<EmptyState/>
}
    </View>
  );
};

export default MedicationList;
