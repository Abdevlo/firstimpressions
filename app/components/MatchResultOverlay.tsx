import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  Heart,
  Star,
  UserPlus,
  MessageCircle,
  Home,
  X,
} from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
} from "react-native-reanimated";

interface MatchResultOverlayProps {
  isVisible?: boolean;
  isMatch?: boolean;
  onClose?: () => void;
  onContinueConversation?: () => void;
  onAddContact?: () => void;
  onReturnHome?: () => void;
  matchedUserName?: string;
  matchedUserImage?: string;
  matchPercentage?: number;
}

const MatchResultOverlay = ({
  isVisible = true,
  isMatch = true,
  onClose = () => {},
  onContinueConversation = () => {},
  onAddContact = () => {},
  onReturnHome = () => {},
  matchedUserName = "Alex Johnson",
  matchedUserImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=matchedUser",
  matchPercentage = 87,
}: MatchResultOverlayProps) => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const profileScale = useSharedValue(0.8);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withSpring(1);
      scale.value = withSequence(withSpring(1.2), withSpring(1));
      profileScale.value = withDelay(300, withSpring(1));
    } else {
      opacity.value = withSpring(0);
      scale.value = withSpring(0);
      profileScale.value = withSpring(0.8);
    }
  }, [isVisible]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const profileStyle = useAnimatedStyle(() => ({
    transform: [{ scale: profileScale.value }],
  }));

  const handleRating = (value: number) => {
    setRating(value);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleAction = (action: "continue" | "add" | "home") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (action === "continue") onContinueConversation();
    else if (action === "add") onAddContact();
    else onReturnHome();
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[styles.overlay, containerStyle]}
      className="absolute inset-0 flex items-center justify-center bg-black/80"
    >
      <Animated.View
        style={[contentStyle]}
        className="w-[90%] max-w-[350px] rounded-3xl bg-gray-900 p-6 items-center"
      >
        <Pressable onPress={onClose} className="absolute right-4 top-4 z-10">
          <X size={24} color="#9ca3af" />
        </Pressable>

        {isMatch ? (
          <>
            <View className="mb-4 items-center">
              <Text className="text-2xl font-bold text-white mb-1">
                It's a Match!
              </Text>
              <Text className="text-gray-400 text-center">
                You both enjoyed the conversation
              </Text>
            </View>

            <Animated.View style={[profileStyle]} className="mb-6 items-center">
              <Image
                source={{ uri: matchedUserImage }}
                className="w-32 h-32 rounded-full mb-3"
                contentFit="cover"
              />
              <Text className="text-xl font-semibold text-white">
                {matchedUserName}
              </Text>
              <View className="flex-row items-center mt-1">
                <Heart size={16} color="#ec4899" fill="#ec4899" />
                <Text className="text-pink-500 ml-1">
                  {matchPercentage}% Match
                </Text>
              </View>
            </Animated.View>

            <View className="w-full mb-6">
              <Text className="text-gray-300 mb-3 text-center">
                How was your conversation?
              </Text>
              <View className="flex-row justify-center space-x-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Pressable key={star} onPress={() => handleRating(star)}>
                    <Star
                      size={32}
                      color={star <= rating ? "#fbbf24" : "#4b5563"}
                      fill={star <= rating ? "#fbbf24" : "transparent"}
                    />
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="w-full flex-row justify-between">
              <Pressable
                onPress={() => handleAction("continue")}
                className="flex-1 mr-2 bg-indigo-600 py-3 rounded-xl items-center"
              >
                <MessageCircle size={20} color="#ffffff" />
                <Text className="text-white text-sm mt-1">Continue</Text>
              </Pressable>

              <Pressable
                onPress={() => handleAction("add")}
                className="flex-1 mx-2 bg-emerald-600 py-3 rounded-xl items-center"
              >
                <UserPlus size={20} color="#ffffff" />
                <Text className="text-white text-sm mt-1">Add Contact</Text>
              </Pressable>

              <Pressable
                onPress={() => handleAction("home")}
                className="flex-1 ml-2 bg-gray-700 py-3 rounded-xl items-center"
              >
                <Home size={20} color="#ffffff" />
                <Text className="text-white text-sm mt-1">Home</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View className="mb-6 items-center">
              <Text className="text-2xl font-bold text-white mb-1">
                Conversation Ended
              </Text>
              <Text className="text-gray-400 text-center">
                No match this time
              </Text>
            </View>

            <View className="w-full mb-6">
              <Text className="text-gray-300 mb-3 text-center">
                How was your conversation?
              </Text>
              <View className="flex-row justify-center space-x-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Pressable key={star} onPress={() => handleRating(star)}>
                    <Star
                      size={32}
                      color={star <= rating ? "#fbbf24" : "#4b5563"}
                      fill={star <= rating ? "#fbbf24" : "transparent"}
                    />
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable
              onPress={() => handleAction("home")}
              className="w-full bg-indigo-600 py-4 rounded-xl items-center"
            >
              <Text className="text-white font-medium">
                Find Another Conversation
              </Text>
            </Pressable>
          </>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default MatchResultOverlay;
