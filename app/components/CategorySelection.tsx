import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { Brain, Plane, Flame } from "lucide-react-native";

interface CategoryProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  gradientColors: string[];
  selected?: boolean;
  onSelect?: (id: string) => void;
}

const Category = ({
  id,
  title,
  icon,
  gradientColors,
  selected = false,
  onSelect = () => {},
}: CategoryProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelect(id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className="mr-4"
    >
      <LinearGradient
        colors={gradientColors}
        className={`rounded-2xl p-5 w-36 h-36 justify-center items-center ${selected ? "border-2 border-white" : ""}`}
      >
        <View className="items-center">
          <View className="bg-black/30 p-3 rounded-full mb-3">{icon}</View>
          <Text className="text-white font-bold text-lg text-center">
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

interface CategorySelectionProps {
  onCategorySelect?: (categoryId: string) => void;
  initialSelectedCategory?: string;
}

const CategorySelection = ({
  onCategorySelect = () => {},
  initialSelectedCategory = "deep-talks",
}: CategorySelectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory,
  );

  const categories = [
    {
      id: "deep-talks",
      title: "Deep Talks",
      icon: <Brain size={28} color="#fff" />,
      gradientColors: ["#4A00E0", "#8E2DE2"],
    },
    {
      id: "travel-stories",
      title: "Travel Stories",
      icon: <Plane size={28} color="#fff" />,
      gradientColors: ["#00C6FB", "#005BEA"],
    },
    {
      id: "hot-takes",
      title: "Hot Takes",
      icon: <Flame size={28} color="#fff" />,
      gradientColors: ["#FF416C", "#FF4B2B"],
    },
    {
      id: "random",
      title: "Random",
      icon: <Text className="text-white text-2xl font-bold">?</Text>,
      gradientColors: ["#4CAF50", "#8BC34A"],
    },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <View className="bg-gray-900 p-4 rounded-lg">
      <Text className="text-white text-xl font-bold mb-4">
        Choose a Category
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        className="pb-2"
      >
        {categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            title={category.title}
            icon={category.icon}
            gradientColors={category.gradientColors}
            selected={selectedCategory === category.id}
            onSelect={handleCategorySelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategorySelection;
