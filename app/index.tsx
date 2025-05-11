import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  Mic,
  Headphones,
  TrendingUp,
  Users,
  Sparkles,
  ChevronRight,
} from "lucide-react-native";
import CategorySelection from "./components/CategorySelection";

export default function HomeScreen() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [activeUsers, setActiveUsers] = useState(324);
  const [matchesThisWeek, setMatchesThisWeek] = useState(1289);

  // Animation values for the audio wave
  const wave1 = new Animated.Value(0);
  const wave2 = new Animated.Value(0);
  const wave3 = new Animated.Value(0);
  const buttonScale = new Animated.Value(1);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  // Start animations when component mounts
  useEffect(() => {
    setIsReady(true);
    startWaveAnimations();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate active users changing
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to animate the audio waves
  const startWaveAnimations = () => {
    // Reset values
    wave1.setValue(0);
    wave2.setValue(0);
    wave3.setValue(0);

    // Create staggered wave animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(wave1, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wave1, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(wave2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wave2, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(wave3, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wave3, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  // Button press animation
  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Handle start talking button press
  const handleStartTalking = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    animateButtonPress();
    // Navigate to voice chat interface
    // This would be implemented when the VoiceChatInterface is ready
    // router.push('/voice-chat');
  };

  // Map the animation values to opacity and scale
  const wave1Opacity = wave1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const wave2Opacity = wave2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.6],
  });

  const wave3Opacity = wave3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.5],
  });

  const wave1Scale = wave1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const wave2Scale = wave2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const wave3Scale = wave3.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.7],
  });

  return (
    <LinearGradient
      colors={["#121212", "#1e1e1e", "#262626"]}
      style={{ flex: 1, backgroundColor: "#121212" }}
    >
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <View className="items-center justify-between py-16 px-6">
          {/* App Header with Stats */}
          <Animated.View
            className="items-center w-full"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text className="text-4xl font-bold text-white mb-2">
              VoiceMatch
            </Text>
            <Text className="text-gray-400 text-center text-lg mb-6">
              Connect through conversations,{"\n"}not appearances
            </Text>

            {/* Stats Cards */}
            <View className="flex-row justify-between w-full mb-8">
              <View className="bg-gray-800/60 p-4 rounded-xl flex-1 mr-2 border border-purple-900/30">
                <View className="flex-row items-center mb-1">
                  <Users size={16} color="#a64dff" />
                  <Text className="text-purple-400 ml-1 text-sm">
                    Active Now
                  </Text>
                </View>
                <Text className="text-white text-xl font-bold">
                  {activeUsers}
                </Text>
              </View>

              <View className="bg-gray-800/60 p-4 rounded-xl flex-1 ml-2 border border-purple-900/30">
                <View className="flex-row items-center mb-1">
                  <TrendingUp size={16} color="#a64dff" />
                  <Text className="text-purple-400 ml-1 text-sm">
                    Weekly Matches
                  </Text>
                </View>
                <Text className="text-white text-xl font-bold">
                  {matchesThisWeek}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Audio Wave Animation */}
          <View className="justify-center items-center relative w-full my-4">
            <Animated.View
              style={{
                opacity: wave3Opacity,
                transform: [{ scale: wave3Scale }],
                position: "absolute",
              }}
              className="w-64 h-64 rounded-full bg-purple-500/20"
            />
            <Animated.View
              style={{
                opacity: wave2Opacity,
                transform: [{ scale: wave2Scale }],
                position: "absolute",
              }}
              className="w-52 h-52 rounded-full bg-purple-500/30"
            />
            <Animated.View
              style={{
                opacity: wave1Opacity,
                transform: [{ scale: wave1Scale }],
                position: "absolute",
              }}
              className="w-40 h-40 rounded-full bg-purple-500/40"
            />

            <View className="w-32 h-32 rounded-full bg-purple-600 items-center justify-center z-10">
              <Mic size={48} color="white" />
              <Headphones
                size={24}
                color="white"
                className="absolute bottom-6"
              />
            </View>
          </View>

          {/* Featured Matches Section */}
          <View className="w-full mt-8 mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-xl font-semibold">
                Featured Matches
              </Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-purple-400 mr-1">See all</Text>
                <ChevronRight size={16} color="#a64dff" />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              {[1, 2, 3, 4].map((item) => (
                <TouchableOpacity
                  key={item}
                  className="mr-4 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 w-40"
                >
                  <View className="h-24 bg-purple-900/30 items-center justify-center">
                    <Sparkles size={32} color="#a64dff" />
                  </View>
                  <View className="p-3">
                    <Text className="text-white font-semibold">
                      Match #{item}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1">
                      Travel Stories
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Category Selection */}
          <View className="w-full mb-8">
            <Text className="text-white text-xl mb-4 font-semibold">
              Choose a category:
            </Text>
            <CategorySelection />
          </View>

          {/* Start Talking Button */}
          <Animated.View
            style={{
              transform: [{ scale: buttonScale }],
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={handleStartTalking}
              className="w-full"
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#8a2be2", "#9932cc", "#a64dff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-5 px-8 rounded-full items-center"
              >
                <Text className="text-white text-xl font-bold">
                  Start Talking
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* App Description */}
          <Text className="text-gray-500 text-center text-sm mt-6 mb-20">
            Talk anonymously with others based on shared interests.{"\n"}
            Profiles are revealed only after mutual matching.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
