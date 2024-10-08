import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { ThemeView } from "@/components/theme";
import { useTheme } from "@react-navigation/native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeTitle } from "./theme/typography";

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = useThemeColor();

  return (
    <ThemeView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={colors.tabIconSelected}
        />
        <ThemeTitle>{title}</ThemeTitle>
      </TouchableOpacity>
      {isOpen && <ThemeView style={styles.content}>{children}</ThemeView>}
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
