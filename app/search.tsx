
import React, { useState, useMemo } from "react";
import { Stack, router } from "expo-router";
import { FlatList, Pressable, StyleSheet, View, Text, TextInput, StatusBar } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { pentestTools, PentestTool } from "@/data/pentestTools";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return pentestTools.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.purpose.toLowerCase().includes(query) ||
      tool.features.some(feature => feature.toLowerCase().includes(query)) ||
      tool.platform.some(platform => platform.toLowerCase().includes(query))
    );
  }, [searchQuery]);

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
          size={40}
        />
        <View style={styles.toolInfo}>
          <Text style={styles.toolName}>{item.name}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
        <IconSymbol name="chevron.right" color={colors.grey} size={20} />
      </View>
      <Text style={styles.toolDescription} numberOfLines={2}>{item.description}</Text>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      {searchQuery.trim() ? (
        <>
          <IconSymbol name="magnifyingglass" color={colors.grey} size={48} />
          <Text style={styles.emptyTitle}>No tools found</Text>
          <Text style={styles.emptyText}>Try searching with different keywords</Text>
        </>
      ) : (
        <>
          <IconSymbol name="magnifyingglass" color={colors.grey} size={48} />
          <Text style={styles.emptyTitle}>Search Tools</Text>
          <Text style={styles.emptyText}>Enter a tool name, feature, or platform to search</Text>
        </>
      )}
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
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <IconSymbol name="magnifyingglass" color={colors.grey} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search tools, features, platforms..."
              placeholderTextColor={colors.grey}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <IconSymbol name="xmark.circle.fill" color={colors.grey} size={20} />
              </Pressable>
            )}
          </View>
          {searchQuery.trim() && (
            <Text style={styles.resultsCount}>
              {filteredTools.length} result{filteredTools.length !== 1 ? 's' : ''} found
            </Text>
          )}
        </View>

        <FlatList
          data={filteredTools}
          renderItem={renderToolCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
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
  searchContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey + '30',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    fontFamily: 'monospace',
  },
  resultsCount: {
    fontSize: 14,
    color: colors.grey,
    marginTop: 12,
    fontFamily: 'monospace',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  toolCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolInfo: {
    flex: 1,
    marginLeft: 12,
  },
  toolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  emptyText: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  headerButtonContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
});
