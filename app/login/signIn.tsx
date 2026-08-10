import { setLocalStorage } from "@/Service/storage";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../firebaseConfig";

// A simple alert function that works on web and native
const customAlert = (title, message) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      customAlert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create user data object to store
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      customAlert("Success!", `Welcome back, ${user.email}!`);

      // Fixed: Use correct key name 'userDetail' and proper data format
      await setLocalStorage("userDetail", userData);

      router.push("/(tabs)");
    } catch (error) {
      console.error("Sign In Error:", error);

      let errorMessage = "An unexpected error occurred.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password.";
          break;
        default:
          errorMessage = error.message;
      }

      customAlert("Sign In Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    router.push("/login/signUp");
  };

  return (
    <View className="items-center justify-center flex-1 px-6 bg-gray-50">
      <Image
        source={require("./../../assets/images/medicine-login-image.png")}
        resizeMode="cover"
        style={{ width: 120, height: 120, marginBottom: 40 }}
      />

      <Text className="mb-4 text-[25px] text-center font-bold">
        Sign In to <Text className="text-[#007FFF] ">Medico</Text>
      </Text>

      <Text className="mb-6 text-base text-center text-gray-300">
        Enter your details to access your account.
      </Text>

      <View className="w-full mb-4">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg"
          style={{ minHeight: 56 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full p-4 bg-white border border-gray-300 rounded-lg"
          style={{ minHeight: 56 }}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignIn}
        disabled={isLoading}
        className="flex-row items-center justify-center w-full p-4 mb-4 bg-[#007FFF]  rounded-lg"
        style={{
          minHeight: 56,
          opacity: isLoading ? 0.6 : 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text className="text-base font-semibold text-white">
          {isLoading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSignUp}>
        <Text className="text-sm text-blue-500 underline">
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>

      <View className="mt-8">
        <Text className="text-xs text-gray-500">
          Powered by medico Authentication
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
