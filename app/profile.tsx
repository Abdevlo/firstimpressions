import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import {
  Edit,
  Settings,
  Bell,
  Shield,
  Star,
  MessageCircle,
  Clock,
  LogOut,
} from "lucide-react-native";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("stats");

  const handleTabChange = (tab: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const stats = [
    { label: "Matches", value: "24" },
    { label: "Conversations", value: "67" },
    { label: "Rating", value: "4.8" },
  ];

  const menuItems = [
    { icon: Bell, label: "Notifications", badge: 3 },
    { icon: Shield, label: "Privacy" },
    { icon: Star, label: "Favorites" },
    { icon: MessageCircle, label: "Conversations" },
    { icon: Clock, label: "History" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Logout", danger: true },
  ];

  return (
    <LinearGradient
      colors={["#121212", "#1e1e1e", "#262626"]}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <LinearGradient
          colors={["#8a2be2", "#9932cc", "#a64dff"]}
          className="pt-12 pb-20 px-6 rounded-b-3xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        >
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-2xl font-bold">My Profile</Text>
            <TouchableOpacity
              className="bg-white/20 p-2 rounded-full"
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
            >
              <Edit size={20} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Profile Avatar and Info */}
        <View className="px-6 -mt-16">
          <View className="bg-gray-800 rounded-3xl p-4 shadow-lg shadow-black/30 border border-gray-700">
            <View className="flex-row items-center">
              <View className="mr-4">
                <Image
                  source={{
                    uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=voicematch&backgroundColor=8a2be2",
                  }}
                  className="w-24 h-24 rounded-full bg-purple-700"
                  style={{ borderWidth: 3, borderColor: "#a64dff" }}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-bold mb-1">
                  Alex Johnson
                </Text>
                <Text className="text-gray-400 mb-2">
                  @alexj • Premium Member
                </Text>
                <View className="bg-purple-600/30 px-3 py-1 rounded-full self-start">
                  <Text className="text-purple-300 text-xs font-medium">
                    Voice Level 7
                  </Text>
                </View>
              </View>
            </View>

            <Text className="text-gray-300 mt-4 mb-3">
              Looking for meaningful conversations about travel, philosophy, and
              music. Let's connect through our voices!
            </Text>

            {/* Stats Row */}
            <View className="flex-row justify-between mt-2 pt-3 border-t border-gray-700">
              {stats.map((stat, index) => (
                <View key={index} className="items-center">
                  <Text className="text-white text-xl font-bold">
                    {stat.value}
                  </Text>
                  <Text className="text-gray-400 text-sm">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-around mt-6 px-6 border-b border-gray-800 pb-2">
          {["stats", "history", "settings"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabChange(tab)}
              className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-purple-500" : ""}`}
            >
              <Text
                className={`${activeTab === tab ? "text-white font-bold" : "text-gray-400"} capitalize`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View className="px-6 py-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-4 border-b border-gray-800"
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
            >
              <View
                className={`p-2 rounded-full mr-4 ${item.danger ? "bg-red-500/20" : "bg-purple-600/20"}`}
              >
                <item.icon
                  size={20}
                  color={item.danger ? "#f87171" : "#a64dff"}
                />
              </View>
              <Text
                className={`flex-1 text-base ${item.danger ? "text-red-400" : "text-white"}`}
              >
                {item.label}
              </Text>
              {item.badge && (
                <View className="bg-purple-600 rounded-full w-6 h-6 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {item.badge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
