
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, StyleSheet, View, Text, StatusBar } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { getToolsByCategory, getCategoryById, PentestTool } from "@/data/pentestTools";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = getCategoryById(id);
  const tools = getToolsByCategory(id);

  if (!category) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Category not found</Text>
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

  const renderToolCard = ({ item }: { item: PentestTool }) => (
    <Pressable
      style={styles.toolCard}
      onPress={() => router.push(`/tool/${item.id}`)}
    >
      <View style={styles.toolHeader}>
        <IconCircle
          emoji={item.icon}
          backgroundColor={item.color}
          size={45}
        />
        <View style={styles.toolInfo}>
          <Text style={styles.toolName}>{item.name}</Text>
          <View style={styles.difficultyContainer}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
          </View>
        </View>
        <IconSymbol name="chevron.right" color={colors.grey} size={20} />
      </View>
      <Text style={styles.toolDescription}>{item.description}</Text>
      <View style={styles.platformContainer}>
        {item.platform.slice(0, 3).map((platform, index) => (
          <View key={index} style={styles.platformBadge}>
            <Text style={styles.platformText}>{platform}</Text>
          </View>
        ))}
        {item.platform.length > 3 && (
          <Text style={styles.moreText}>+{item.platform.length - 3}</Text>
        )}
      </View>
    </Pressable>
  );

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <View style={styles.categoryHeader}>
        <IconCircle
          emoji={category.icon}
          backgroundColor={category.color}
          size={60}
        />
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
          <Text style={styles.toolCount}>{tools.length} tools available</Text>
        </View>
      </View>
    </View>
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
      <View style={styles.container}>
        <FlatList
          data={tools}
          renderItem={renderToolCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  headerSection: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey + '30',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  categoryDescription: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    lineHeight: 18,
    marginBottom: 8,
  },
  toolCount: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  toolCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.grey + '30',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolInfo: {
    flex: 1,
    marginLeft: 12,
  },
  toolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  difficultyContainer: {
    flexDirection: 'row',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.background,
    fontFamily: 'monospace',
  },
  toolDescription: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 18,
    marginBottom: 12,
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformBadge: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  platformText: {
    fontSize: 10,
    color: colors.text,
    fontFamily: 'monospace',
  },
  moreText: {
    fontSize: 10,
    color: colors.grey,
    fontFamily: 'monospace',
  },
  headerButtonContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
});
