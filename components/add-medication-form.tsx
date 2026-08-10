import { TypeList, WhenToTake } from "@/constants/Option";
import {
  formatDate,
  formatDateForText,
  formatTime,
  getDateRange,
} from "@/Service/convert-date-time";
import Ionicons from "@expo/vector-icons/Ionicons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { use, useState } from "react";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import { useRouter } from "expo-router";

const AddMedicationForm = () => {
  const [formData, setFormData] = useState<any>({});
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [loading,setLoading] = useState(false );

  const router = useRouter()

  const onHandleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
const db = getFirestore(app);

const saveMedication = async () => {
  const dates=getDateRange(formData?.startDate,formData?.endDate)
  setLoading(true)
  try {
    const docId = Date.now().toString();

    await setDoc(doc(db, "medications", docId), {
      ...formData,
      docId: docId, 
      dates:dates
    });

    Alert.alert("Successfully!","Medication saved successfully!",[
      {
        text:"Ok",
        onPress:()=>router.push("/(tabs)")
      }
    ]);
    setFormData({});
  } catch (error) {
    console.error("Error saving medication:", error);
    alert("Failed to save medication!");
  }finally{
    setLoading(false)

  }
};
  return (
    <View className="p-7">
      <Text className="font-bold text-[25px]">Add New Medications</Text>

      {/* Medicine Name */}
      <View className="flex-row items-center w-full p-3 mt-4 bg-white border border-gray-300">
        <Ionicons
          name="medkit-outline"
          size={24}
          className="pr-3 text-blue-500 border-r-2 border-gray-300"
        />
        <TextInput
          placeholder="Medicine Name"
          className="flex-1 text-[16px] ml-3"
          onChangeText={(value) => onHandleInputChange("name", value)}
          value={formData.name || ""}
        />
      </View>

      {/* Type Selection */}
      <FlatList
        data={TypeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 p-3 mt-6 mr-3 bg-white border border-gray-300 rounded-2"
            style={{
              backgroundColor:
                item.name === formData?.type?.name ? "#1F51FF" : "white",
            }}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              className="text-[16px]"
              style={{
                color: item.name === formData?.type?.name ? "white" : "black",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Dose */}
      <View className="flex-row items-center w-full p-3 mt-4 bg-white border border-gray-300">
        <Ionicons
          name="eyedrop-outline"
          size={24}
          className="pr-3 text-blue-500 border-r-2 border-gray-300"
        />
        <TextInput
          placeholder="Does Ex. 2 , 5 ml"
          className="flex-1 text-[16px] ml-3"
          onChangeText={(value) => onHandleInputChange("does", value)}
          value={formData.does || ""}
        />
      </View>

      {/* When to Take */}
      <View className="flex-row items-center w-full p-3 mt-4 bg-white border border-gray-300">
        <Ionicons
          name="time-outline"
          size={24}
          className="pr-3 text-blue-500 border-r-2 border-gray-300"
        />
        <Picker
          selectedValue={formData.option || WhenToTake[0]}
          onValueChange={(itemValue) =>
            onHandleInputChange("option", itemValue)
          }
         style={{width:280, marginLeft:8}}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} style={{display:"flex", textAlign:"center"}} />
          ))}
        </Picker>
      </View>

      {/* Start & End Date */}
      <View className="flex-row w-full gap-3">
        {/* Start Date */}
        <TouchableOpacity
          className="flex-row items-center flex-1 p-3 mt-4 bg-white border border-gray-300"
          onPress={() => setStartDate(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            className="pr-3 text-blue-500 border-r-2 border-gray-300"
          />
          <Text className="flex-1 text-[16px] ml-3">
            {formatDateForText(formData?.startDate ?? "StartDate")}
          </Text>
        </TouchableOpacity>

        {startDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            value={
              formData?.startDate ? new Date(formData.startDate) : new Date()
            }
            onChange={(event) => {
              if (event.nativeEvent.timestamp) {
                onHandleInputChange(
                  "startDate",
                  formatDate(event.nativeEvent.timestamp)
                );
              }
              setStartDate(false);
            }}
          />
        )}

        {/* End Date */}
        <TouchableOpacity
          className="flex-row items-center flex-1 p-3 mt-4 bg-white border border-gray-300"
          onPress={() => setEndDate(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            className="pr-3 text-blue-500 border-r-2 border-gray-300"
          />
          <Text className="flex-1 text-[16px] ml-3">
            {formatDateForText(formData?.endDate ?? "EndDate")}
          </Text>
        </TouchableOpacity>

        {endDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            value={formData?.endDate ? new Date(formData.endDate) : new Date()}
            onChange={(event) => {
              if (event.nativeEvent.timestamp) {
                onHandleInputChange(
                  "endDate",
                  formatDate(event.nativeEvent.timestamp)
                );
              }
              setEndDate(false);
            }}
          />
        )}
      </View>

      {/* Reminder Time */}
      <View className="flex-row w-full gap-3">
        <TouchableOpacity
          className="flex-row items-center flex-1 p-3 mt-4 bg-white border border-gray-300"
          onPress={() => setTimePicker(true)}
        >
          <Ionicons
            name="timer-outline"
            size={24}
            className="pr-3 text-blue-500 border-r-2 border-gray-300"
          />
          <Text className="flex-1 text-[16px] ml-3">
            {formData?.reminder ?? "Select Reminder Time"}
          </Text>
        </TouchableOpacity>
      </View>

      {timePicker && (
        <RNDateTimePicker
          mode="time"
          value={formData?.reminder ? new Date(formData.reminder) : new Date()}
          onChange={(event) => {
            if (event.nativeEvent.timestamp) {
              onHandleInputChange(
                "reminder",
                formatTime(event.nativeEvent.timestamp)
              );
            }
            setTimePicker(false);
          }}
        />
      )}

      {/* Submit Button */}
      <TouchableOpacity className="w-full p-3 mt-6 bg-blue-600 rounded-lg shadow-lg" onPress={saveMedication}>
        {loading?<ActivityIndicator size={'large'} color={'white'}/>:
        <Text className="text-center text-white text-bold text-[16px]">
          Add New Medications
        </Text>}  
      </TouchableOpacity>
    </View>
  );
};

export default AddMedicationForm;
