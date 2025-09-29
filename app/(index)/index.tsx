
import React from "react";
import { Stack, router } from "expo-router";
import { FlatList, Pressable, StyleSheet, View, Text, StatusBar } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { toolCategories, ToolCategory } from "@/data/pentestTools";

export default function HomeScreen() {
  const renderCategoryCard = ({ item }: { item: ToolCategory }) => (
    <Pressable
      style={[styles.categoryCard, { borderColor: item.color }]}
      onPress={() => router.push(`/category/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <IconCircle
          emoji={item.icon}
          backgroundColor={item.color}
          size={50}
        />
        <View style={styles.toolCount}>
          <Text style={styles.toolCountText}>{item.toolCount}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.categoryTitle}>{item.name}</Text>
        <Text style={styles.categoryDescription}>{item.description}</Text>
      </View>
      <View style={styles.cardFooter}>
        <IconSymbol name="chevron.right" color={item.color} size={20} />
      </View>
    </Pressable>
  );

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <Text style={styles.headerTitle}>PenTest Arsenal</Text>
      <Text style={styles.headerSubtitle}>
        Professional penetration testing toolkit with comprehensive security tools and resources
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{toolCategories.length}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>41</Text>
          <Text style={styles.statLabel}>Tools</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>Free</Text>
        </View>
      </View>
    </View>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push('/search')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="magnifyingglass" color={colors.primary} size={24} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.push('/settings')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="gear" color={colors.primary} size={24} />
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
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={toolCategories}
          renderItem={renderCategoryCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={1}
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
  headerSection: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey + '30',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'monospace',
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
    opacity: 0.7,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: colors.grey + '30',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    position: 'relative',
    marginRight: 16,
  },
  toolCount: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.card,
  },
  toolCountText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  cardContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
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
  },
  cardFooter: {
    marginLeft: 12,
  },
  headerButtonContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
});
