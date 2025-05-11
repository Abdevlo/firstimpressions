import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Mic, Headphones } from "lucide-react-native";
import CategorySelection from "./components/CategorySelection";

export default function HomeScreen() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  // Animation values for the audio wave
  const wave1 = new Animated.Value(0);
  const wave2 = new Animated.Value(0);
  const wave3 = new Animated.Value(0);
  const buttonScale = new Animated.Value(1);

  // Start animations when component mounts
  useEffect(() => {
    setIsReady(true);
    startWaveAnimations();
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
      <View className="flex-1 items-center justify-between py-16 px-6">
        {/* App Header */}
        <View className="items-center">
          <Text className="text-4xl font-bold text-white mb-2">VoiceMatch</Text>
          <Text className="text-gray-400 text-center text-lg mb-4">
            Connect through conversations,{"\n"}not appearances
          </Text>
        </View>

        {/* Audio Wave Animation */}
        <View className="flex-1 justify-center items-center relative w-full">
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
            <Headphones size={24} color="white" className="absolute bottom-6" />
          </View>
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
        <Text className="text-gray-500 text-center text-sm mt-6">
          Talk anonymously with others based on shared interests.{"\n"}
          Profiles are revealed only after mutual matching.
        </Text>
      </View>
    </LinearGradient>
  );
}
