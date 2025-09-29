
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, StatusBar } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { getToolById } from "@/data/pentestTools";

export default function ToolDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tool = getToolById(id);

  if (!tool) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Tool not found</Text>
      </View>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return colors.success;
      case 'Intermediate': return colors.warning;
      case 'Advanced': return colors.danger;
      case 'Expert': return '#8b5cf6';
      default: return colors.grey;
    }
  };

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
        {/* Tool Header */}
        <View style={styles.toolHeader}>
          <IconCircle
            emoji={tool.icon}
            backgroundColor={tool.color}
            size={80}
          />
          <View style={styles.toolInfo}>
            <Text style={styles.toolName}>{tool.name}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(tool.difficulty) }]}>
              <Text style={styles.difficultyText}>{tool.difficulty}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{tool.description}</Text>
        </View>

        {/* Purpose */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purpose</Text>
          <Text style={styles.content}>{tool.purpose}</Text>
        </View>

        {/* Platforms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supported Platforms</Text>
          <View style={styles.platformContainer}>
            {tool.platform.map((platform, index) => (
              <View key={index} style={styles.platformBadge}>
                <Text style={styles.platformText}>{platform}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {tool.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" color={colors.success} size={16} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Usage Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Examples</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{tool.usage}</Text>
          </View>
        </View>

        {/* Warning Notice */}
        <View style={styles.warningContainer}>
          <IconSymbol name="exclamationmark.triangle.fill" color={colors.warning} size={20} />
          <Text style={styles.warningText}>
            This tool is for educational and authorized testing purposes only. 
            Unauthorized use may violate laws and regulations.
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
  errorContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.text,
    fontSize: 18,
  },
  contentContainer: {
    padding: 20,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  toolInfo: {
    flex: 1,
    marginLeft: 20,
  },
  toolName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.background,
    fontFamily: 'monospace',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
    fontFamily: 'monospace',
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  content: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    opacity: 0.9,
  },
  platformContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  platformBadge: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  platformText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'monospace',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 10,
    flex: 1,
  },
  codeContainer: {
    backgroundColor: colors.backgroundAlt,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  codeText: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.warning + '20',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.warning + '50',
    marginTop: 10,
  },
  warningText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
    opacity: 0.9,
  },
  headerButtonContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
});
