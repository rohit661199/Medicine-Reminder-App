import { setLocalStorage } from "@/Service/storage";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
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

const SignUp = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      customAlert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      customAlert("Error", "Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      customAlert("Error", "Password should be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, {
        displayName: name,
      });

      // Create user data object to store
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: name, // Use the name from input since updateProfile is async
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      // Fixed: Use correct key name and proper data format
      await setLocalStorage("userDetail", userData);

      customAlert(
        "Success!",
        `Account created for ${name}!\nYou are now signed in.`
      );

      // Clear inputs
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Navigate to main app
      router.push("/(tabs)");
    } catch (error) {
      console.error("Sign Up Error:", error);

      let errorMessage = "An unexpected error occurred.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
        default:
          errorMessage = error.message;
      }

      customAlert("Sign Up Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignIn = () => {
    router.push("/login/signIn");
  };

  return (
    <View className="items-center justify-center flex-1 px-6 bg-gray-50">
      <Image
        source={require("./../../assets/images/medicine-login-image.png")}
        resizeMode="cover"
        style={{ width: 120, height: 120, marginBottom: 40 }}
      />

      <Text className="mb-4 text-3xl font-bold text-center">
        Sign Up to <Text className="text-[#007FFF]">Medico</Text>
      </Text>

      <Text className="mb-8 text-base text-center text-gray-300">
        Create a new account to get started.
      </Text>

      <View className="w-full mb-4">
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg"
          style={{ minHeight: 56 }}
        />
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
          className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg"
          style={{ minHeight: 56 }}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          className="w-full p-4 bg-white border border-gray-300 rounded-lg"
          style={{ minHeight: 56 }}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignUp}
        disabled={isLoading}
        className="flex-row items-center justify-center w-full p-4 mb-4 bg-[#007FFF] rounded-lg"
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
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSignIn}>
        <Text className="text-sm text-blue-500 underline">
          Already have an account? Sign In
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

export default SignUp;
