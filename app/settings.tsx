
import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, StatusBar, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function SettingsScreen() {
  const settingsOptions = [
    {
      id: 'about',
      title: 'About PenTest Arsenal',
      description: 'Learn more about this application',
      icon: 'info.circle',
      color: colors.primary,
      onPress: () => showAbout(),
    },
    {
      id: 'disclaimer',
      title: 'Legal Disclaimer',
      description: 'Important legal information',
      icon: 'exclamationmark.triangle',
      color: colors.warning,
      onPress: () => showDisclaimer(),
    },
    {
      id: 'resources',
      title: 'Learning Resources',
      description: 'Additional security resources',
      icon: 'book',
      color: colors.accent,
      onPress: () => showResources(),
    },
    {
      id: 'contact',
      title: 'Contact & Support',
      description: 'Get help and support',
      icon: 'envelope',
      color: colors.success,
      onPress: () => showContact(),
    },
  ];

  const showAbout = () => {
    Alert.alert(
      "About PenTest Arsenal",
      "PenTest Arsenal is a comprehensive mobile reference for penetration testing tools and techniques. This app provides detailed information about security tools, their usage, and best practices.\n\nVersion: 1.0.0\nBuilt with React Native & Expo",
      [{ text: "OK" }]
    );
  };

  const showDisclaimer = () => {
    Alert.alert(
      "Legal Disclaimer",
      "This application is intended for educational purposes and authorized security testing only. Users are responsible for ensuring they have proper authorization before using any tools or techniques described in this app.\n\nUnauthorized access to computer systems is illegal and may result in criminal prosecution.",
      [{ text: "I Understand" }]
    );
  };

  const showResources = () => {
    Alert.alert(
      "Learning Resources",
      "Recommended resources for learning penetration testing:\n\n• OWASP (owasp.org)\n• SANS Institute\n• Cybrary.it\n• Hack The Box\n• TryHackMe\n• VulnHub\n• NIST Cybersecurity Framework",
      [{ text: "OK" }]
    );
  };

  const showContact = () => {
    Alert.alert(
      "Contact & Support",
      "For questions, suggestions, or support:\n\nThis is a demonstration app created for educational purposes. In a real application, you would include actual contact information and support channels.",
      [{ text: "OK" }]
    );
  };

  const renderSettingItem = (item: typeof settingsOptions[0]) => (
    <Pressable
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <IconSymbol name={item.icon as any} color={item.color} size={24} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingDescription}>{item.description}</Text>
      </View>
      <IconSymbol name="chevron.right" color={colors.grey} size={20} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.back()}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="chevron.left" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: renderHeaderLeft,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>
            Application settings and information
          </Text>
        </View>

        <View style={styles.settingsContainer}>
          {settingsOptions.map(renderSettingItem)}
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            PenTest Arsenal v1.0.0
          </Text>
          <Text style={styles.footerSubtext}>
            Educational penetration testing reference
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerSection: {
    padding: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey + '30',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.7,
  },
  settingsContainer: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  settingDescription: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
  },
  footerSection: {
    alignItems: 'center',
    paddingTop: 40,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  footerSubtext: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
  },
  headerButtonContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
});
