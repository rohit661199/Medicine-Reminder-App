import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const MedicationCardItem = ({ medicine, selectedDate = "", onDelete }) => {
  const [status, setStatus] = useState();
  useEffect(() => {
    CheckStatus();
  }, [medicine]);
  const CheckStatus = () => {
    const actions = Array.isArray(medicine?.action) ? medicine.action : [];
    const data = actions.find((item) => item.date === selectedDate);
    console.log(data);
    setStatus(data);
  };
  return (
    <View className="flex-row items-center justify-between p-2 mt-6 border-2 border-gray-300 rounded-xl ">
      <View className="flex-row items-center">
        <View>
          <View className="p-2 mr-3 bg-white border-2 border-gray-200 rounded-xl">
            <Image
              source={{ uri: medicine?.type?.icon }}
              style={{ width: 60, height: 60 }}
            ></Image>
          </View>
        </View>
        <View>
          <Text className="text-[21px] font-bold">{medicine?.name}</Text>
          <Text className="text-[16px]">{medicine?.option}</Text>
          <Text className="font-bold text-blue-600">{medicine?.does}</Text>
        </View>
      </View>
      <View className="flex-row gap-2">
        <View className="items-center p-3 bg-white rounded-xl">
          <Ionicons name="timer-outline" size={24} color="black" />
          <Text className="font-bold text-[18px]">{medicine?.reminder}</Text>
        </View>
        <TouchableOpacity className="flex justify-center">
          <AntDesign
            name="delete"
            size={15}
            color="red"
            onPress={() => {
              Alert.alert(
                "Delete Medication",
                `Are you sure you want to delete "${medicine?.name}"?`,
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive", onPress: onDelete },
                ]
              );
            }}
          />
        </TouchableOpacity>
      </View>
      {status?.date && (
        <View className="absolute top-2">
          {status?.status === "Taken" ? (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          ) : (
            status?.status === "Missed" && (
              <Ionicons name="close-circle" size={24} color="red" />
            )
          )}
        </View>
      )}
    </View>
  );
};

export default MedicationCardItem;
