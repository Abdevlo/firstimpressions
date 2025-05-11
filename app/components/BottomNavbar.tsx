import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, User, MessageCircle, LogIn } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const BottomNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Chat", icon: MessageCircle, path: "/chat" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Login", icon: LogIn, path: "/login" },
  ];

  const handleNavPress = (path: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(path);
  };

  return (
    <LinearGradient
      colors={[
        "rgba(18, 18, 18, 0.8)",
        "rgba(30, 30, 30, 0.95)",
        "rgba(38, 38, 38, 1)",
      ]}
      className="absolute bottom-0 left-0 right-0 h-20 rounded-t-3xl border-t border-gray-800 px-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
      }}
    >
      <View className="flex-row justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const IconComponent = item.icon;

          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleNavPress(item.path)}
              className={`items-center justify-center w-16 h-16 ${isActive ? "relative" : ""}`}
            >
              {isActive && (
                <View className="absolute top-0 w-10 h-1 rounded-full bg-purple-500" />
              )}
              <View
                className={`p-2 rounded-full ${isActive ? "bg-purple-600/20" : ""}`}
              >
                <IconComponent
                  size={24}
                  color={isActive ? "#a64dff" : "#9ca3af"}
                />
              </View>
              <Text
                className={`text-xs mt-1 ${isActive ? "text-purple-400 font-bold" : "text-gray-400"}`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
};

export default BottomNavbar;
