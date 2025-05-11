import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Implement registration logic here
    router.push("/");
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const navigateToLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/login");
  };

  return (
    <LinearGradient
      colors={["#121212", "#1e1e1e", "#262626"]}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-6 py-12">
            {/* Header */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 rounded-full bg-purple-600 items-center justify-center mb-4">
                <User size={32} color="white" />
              </View>
              <Text className="text-white text-3xl font-bold mb-2">
                Create Account
              </Text>
              <Text className="text-gray-400 text-center">
                Join the voice matching community
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              {/* Name Input */}
              <View className="bg-gray-800 rounded-xl px-4 flex-row items-center border border-gray-700">
                <User size={20} color="#a64dff" />
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#9ca3af"
                  value={name}
                  onChangeText={setName}
                  className="flex-1 py-4 px-3 text-white"
                />
              </View>

              {/* Email Input */}
              <View className="bg-gray-800 rounded-xl px-4 flex-row items-center border border-gray-700">
                <Mail size={20} color="#a64dff" />
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  className="flex-1 py-4 px-3 text-white"
                />
              </View>

              {/* Password Input */}
              <View className="bg-gray-800 rounded-xl px-4 flex-row items-center border border-gray-700">
                <Lock size={20} color="#a64dff" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  className="flex-1 py-4 px-3 text-white"
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility("password")}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#9ca3af" />
                  ) : (
                    <Eye size={20} color="#9ca3af" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Confirm Password Input */}
              <View className="bg-gray-800 rounded-xl px-4 flex-row items-center border border-gray-700">
                <Lock size={20} color="#a64dff" />
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  className="flex-1 py-4 px-3 text-white"
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#9ca3af" />
                  ) : (
                    <Eye size={20} color="#9ca3af" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Terms and Conditions */}
              <View className="flex-row items-center mt-2">
                <TouchableOpacity className="w-5 h-5 border border-purple-500 rounded mr-2" />
                <Text className="text-gray-400 text-sm flex-1">
                  I agree to the{" "}
                  <Text className="text-purple-400">Terms of Service</Text> and{" "}
                  <Text className="text-purple-400">Privacy Policy</Text>
                </Text>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                onPress={handleRegister}
                className="mt-6"
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#8a2be2", "#9932cc", "#a64dff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 rounded-xl items-center"
                >
                  <Text className="text-white text-lg font-bold">
                    Create Account
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Login Link */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-gray-400">Already have an account? </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text className="text-purple-400 font-bold">Sign In</Text>
                </TouchableOpacity>
              </View>

              {/* Social Registration Options */}
              <View className="mt-6">
                <View className="flex-row items-center mb-6">
                  <View className="flex-1 h-0.5 bg-gray-700" />
                  <Text className="mx-4 text-gray-400">Or register with</Text>
                  <View className="flex-1 h-0.5 bg-gray-700" />
                </View>

                <View className="flex-row justify-center space-x-4">
                  <TouchableOpacity
                    className="bg-gray-800 w-14 h-14 rounded-full items-center justify-center border border-gray-700"
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                  >
                    <Text className="text-white text-xl font-bold">G</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-gray-800 w-14 h-14 rounded-full items-center justify-center border border-gray-700"
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                  >
                    <Text className="text-white text-xl font-bold">f</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-gray-800 w-14 h-14 rounded-full items-center justify-center border border-gray-700"
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                  >
                    <Text className="text-white text-xl font-bold">a</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
