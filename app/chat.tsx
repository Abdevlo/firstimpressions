import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Camera,
  Send,
  Smile,
  Image as ImageIcon,
  Mic,
  X,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

type Message = {
  id: string;
  text: string;
  isMine: boolean;
  timestamp: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! How's it going?",
      isMine: false,
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      text: "I'm doing great! Just matched with you on VoiceMatch.",
      isMine: true,
      timestamp: "10:31 AM",
    },
    {
      id: "3",
      text: "Your voice was really interesting in our conversation!",
      isMine: false,
      timestamp: "10:32 AM",
    },
    {
      id: "4",
      text: "Thanks! I enjoyed our chat about travel stories.",
      isMine: true,
      timestamp: "10:33 AM",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [showCamera, setShowCamera] = useState(false);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isMine: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const toggleCamera = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowCamera(!showCamera);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`my-1 mx-2 p-3 rounded-2xl max-w-[80%] ${item.isMine ? "bg-purple-600 self-end" : "bg-gray-700 self-start"}`}
    >
      <Text className="text-white">{item.text}</Text>
      <Text
        className={`text-xs mt-1 ${item.isMine ? "text-purple-200" : "text-gray-400"}`}
      >
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#121212", "#1e1e1e", "#262626"]}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2 border-b border-gray-800">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-purple-500 mr-3" />
          <View>
            <Text className="text-white font-bold text-lg">Voice Match</Text>
            <Text className="text-gray-400 text-xs">Active now</Text>
          </View>
        </View>
        <View className="flex-row">
          <TouchableOpacity className="p-2" onPress={toggleCamera}>
            <Camera size={24} color="#a64dff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Camera View (Snapchat-like) */}
      {showCamera ? (
        <View className="flex-1 bg-black items-center justify-center">
          <Text className="text-white text-lg mb-4">Camera Preview</Text>
          <TouchableOpacity
            onPress={toggleCamera}
            className="absolute top-4 right-4 bg-gray-800/50 rounded-full p-2"
          >
            <X size={24} color="white" />
          </TouchableOpacity>
          <View className="absolute bottom-10 w-full px-6 flex-row justify-around">
            <TouchableOpacity className="bg-white/20 p-4 rounded-full">
              <ImageIcon size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-5 rounded-full">
              <View className="w-12 h-12 rounded-full border-2 border-gray-300" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/20 p-4 rounded-full">
              <Smile size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={80}
        >
          {/* Chat Messages */}
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 10 }}
            inverted={false}
          />

          {/* Input Area */}
          <View className="flex-row items-center p-2 border-t border-gray-800 bg-gray-900">
            <TouchableOpacity className="p-2" onPress={() => {}}>
              <Smile size={24} color="#a64dff" />
            </TouchableOpacity>
            <TextInput
              className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 mx-2"
              placeholder="Message"
              placeholderTextColor="#9ca3af"
              value={inputText}
              onChangeText={setInputText}
            />
            {inputText.trim() === "" ? (
              <>
                <TouchableOpacity className="p-2" onPress={() => {}}>
                  <Mic size={24} color="#a64dff" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2" onPress={toggleCamera}>
                  <Camera size={24} color="#a64dff" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity className="p-2" onPress={handleSend}>
                <Send size={24} color="#a64dff" />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      )}
    </LinearGradient>
  );
}
