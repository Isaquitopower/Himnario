// app/(tabs)/favorites.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TextInput,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useThemeContext } from '@/theme/ThemeContext';
import { useThemeColors } from '@/hooks/useThemeColor';
import { createFavoritesStyles } from '@/app/styles/favoritesStyles';

interface Himno {
  id: number;
  numero: number;
  titulo: string;
  timestamp?: number;
}

const FAVORITES_KEY = 'favorite_himnos';

export default function FavoritesScreen() {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState<Himno[]>([]);
  const router = useRouter();

  const { theme, toggleTheme } = useThemeContext();
  const { colors } = useThemeColors(theme);
  const styles = createFavoritesStyles(colors);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const favs = await AsyncStorage.getItem(FAVORITES_KEY);
        const parsed: Himno[] = favs ? JSON.parse(favs) : [];
        setFavorites(parsed.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)));
      })();
    }, [])
  );

  const filtered = favorites.filter(h =>
    h.numero.toString().includes(searchText) ||
    h.titulo.toLowerCase().includes(searchText.toLowerCase())
  );

  const remove = async (id: number) => {
    const newFavs = favorites.filter(f => f.id !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
    setFavorites(newFavs);
  };

  const renderItem = ({ item }: { item: Himno }) => (
    <View style={styles.favoriteItem}>
      <TouchableOpacity
        style={styles.favoriteContent}
        onPress={() => router.push(`/himno/${item.numero}`)}
      >
        <Text style={styles.favoriteNumber}>{item.numero}.</Text>
        <Text style={styles.favoriteTitle}>{item.titulo}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => remove(item.id)}>
        <Ionicons name="close-circle" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.headerBackground}
      />

      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text />
          <Text style={styles.headerTitle}>HIMNARIO</Text>
          <Text />
        </View>
      </View>

            {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor={colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Subtítulo */}
      <View style={styles.titleContainer}>
        <Text style={styles.favoritesTitle}>FAVORITOS</Text>
      </View>

      {/* Lista */}
      {filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay favoritos</Text>
          <Text style={styles.emptySubtext}>Agrega himnos a favoritos para verlos aquí.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.favoritesList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
