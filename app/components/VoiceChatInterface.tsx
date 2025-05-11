import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Heart,
  X,
  MessageCircle,
  Clock,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import MatchResultOverlay from "./MatchResultOverlay";

interface VoiceChatInterfaceProps {
  category?: string;
  matchedUserId?: string;
  initialTimeInSeconds?: number;
  onMatchDecision?: (decision: "match" | "pass") => void;
}

const VoiceChatInterface = ({
  category = "Deep Talks",
  matchedUserId = "user123",
  initialTimeInSeconds = 300, // 5 minutes
  onMatchDecision = () => {},
}: VoiceChatInterfaceProps) => {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(true);
  const [showMatchResult, setShowMatchResult] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>(
    Array(20)
      .fill(0)
      .map(() => Math.random() * 0.8 + 0.2),
  );

  // Animation value for audio visualization
  const [animation] = useState(new Animated.Value(0));

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Simulate audio level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevels((prev) => prev.map(() => Math.random() * 0.8 + 0.2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Pulse animation for audio waves
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handleMuteToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsMuted((prev) => !prev);
  };

  const handleListenToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsListening((prev) => !prev);
  };

  const handleMatch = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onMatchDecision("match");
    setShowMatchResult(true);
  };

  const handlePass = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onMatchDecision("pass");
    router.push("/");
  };

  const handleCloseMatchResult = () => {
    setShowMatchResult(false);
    router.push("/");
  };

  return (
    <View className="flex-1 bg-gray-900 p-4 items-center justify-between">
      {/* Top section with timer and category */}
      <View className="w-full items-center pt-6">
        <View className="bg-gray-800/60 px-6 py-2 rounded-full flex-row items-center">
          <Clock size={18} color="#E5E7EB" />
          <Text className="text-gray-200 ml-2 font-medium">
            {formatTime(timeRemaining)}
          </Text>
        </View>

        <Text className="text-gray-400 mt-3 text-sm">{category}</Text>
      </View>

      {/* Audio visualization */}
      <View className="flex-1 w-full justify-center items-center my-8">
        <View className="h-40 w-full flex-row items-center justify-center">
          {audioLevels.map((level, index) => {
            const animatedHeight = animation.interpolate({
              inputRange: [0, 1],
              outputRange: [level * 60, level * 100],
            });

            return (
              <Animated.View
                key={index}
                style={[
                  {
                    width: 4,
                    marginHorizontal: 3,
                    backgroundColor: "#6366F1",
                    borderRadius: 2,
                    height: animatedHeight,
                    opacity: isListening ? 1 : 0.3,
                  },
                ]}
              />
            );
          })}
        </View>

        <BlurView
          intensity={20}
          className="mt-8 p-4 rounded-2xl bg-gray-800/30"
        >
          <Text className="text-gray-300 text-center text-lg">
            {timeRemaining > 0
              ? "Listening to each other's voice..."
              : "Time's up! Did you enjoy the conversation?"}
          </Text>
        </BlurView>
      </View>

      {/* Audio controls */}
      <View className="flex-row justify-center w-full mb-4">
        <TouchableOpacity
          onPress={handleMuteToggle}
          className={`mr-4 p-4 rounded-full ${isMuted ? "bg-red-500/20" : "bg-gray-800/60"}`}
        >
          {isMuted ? (
            <MicOff size={24} color={isMuted ? "#EF4444" : "#E5E7EB"} />
          ) : (
            <Mic size={24} color="#E5E7EB" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleListenToggle}
          className={`ml-4 p-4 rounded-full ${!isListening ? "bg-red-500/20" : "bg-gray-800/60"}`}
        >
          {isListening ? (
            <Volume2 size={24} color="#E5E7EB" />
          ) : (
            <VolumeX size={24} color="#EF4444" />
          )}
        </TouchableOpacity>
      </View>

      {/* Action buttons */}
      <View className="flex-row justify-around w-full mb-8">
        <TouchableOpacity
          onPress={handlePass}
          className="bg-gray-800 h-16 w-16 rounded-full items-center justify-center"
          style={styles.actionButton}
        >
          <X size={32} color="#EF4444" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleMatch}
          className="bg-gray-800 h-16 w-16 rounded-full items-center justify-center"
          style={styles.actionButton}
        >
          <Heart size={32} color="#6366F1" />
        </TouchableOpacity>
      </View>

      {/* Match result overlay */}
      {showMatchResult && (
        <MatchResultOverlay
          isMatch={true}
          onClose={handleCloseMatchResult}
          matchedUserName="Anonymous"
          matchedUserImage="https://api.dicebear.com/7.x/avataaars/svg?seed=matchedUser123"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
});

export default VoiceChatInterface;
