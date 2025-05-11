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
import { Lock, Mail, Eye, EyeOff } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Implement login logic here
    router.push("/");
  };

  const togglePasswordVisibility = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowPassword(!showPassword);
  };

  const navigateToRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/register");
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
          <View className="flex-1 px-6 py-12 justify-center">
            {/* Header */}
            <View className="items-center mb-12">
              <View className="w-20 h-20 rounded-full bg-purple-600 items-center justify-center mb-4">
                <Lock size={32} color="white" />
              </View>
              <Text className="text-white text-3xl font-bold mb-2">
                Welcome Back
              </Text>
              <Text className="text-gray-400 text-center">
                Sign in to continue your voice matching journey
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-6">
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
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {showPassword ? (
                    <EyeOff size={20} color="#9ca3af" />
                  ) : (
                    <Eye size={20} color="#9ca3af" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="self-end">
                <Text className="text-purple-400">Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                className="mt-6"
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#8a2be2", "#9932cc", "#a64dff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 rounded-xl items-center"
                >
                  <Text className="text-white text-lg font-bold">Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Register Link */}
              <View className="flex-row justify-center mt-8">
                <Text className="text-gray-400">Don't have an account? </Text>
                <TouchableOpacity onPress={navigateToRegister}>
                  <Text className="text-purple-400 font-bold">Sign Up</Text>
                </TouchableOpacity>
              </View>

              {/* Social Login Options */}
              <View className="mt-8">
                <View className="flex-row items-center mb-6">
                  <View className="flex-1 h-0.5 bg-gray-700" />
                  <Text className="mx-4 text-gray-400">Or continue with</Text>
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
