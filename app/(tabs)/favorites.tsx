import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, TextInput } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritesStyles as styles } from './styles/favoritesStyles';

// Definimos la interfaz para TypeScript
interface Himno {
  id: number;
  numero: number;
  titulo: string;
  timestamp?: number;
}

// Clave para AsyncStorage
const FAVORITES_KEY = 'favorite_himnos';

// Función para obtener favoritos (exportada)
export const getFavorites = async (): Promise<Himno[]> => {
  const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

// Función para agregar favorito (exportada)
export const addFavorite = async (himno: Omit<Himno, 'timestamp'>): Promise<Himno[]> => {
  const favorites = await getFavorites();
  const newFavorite = { ...himno, timestamp: Date.now() };
  const updatedFavorites = [newFavorite, ...favorites.filter((f) => f.id !== himno.id)];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

// Función para remover favorito (exportada)
export const removeFavorite = async (himnoId: number): Promise<Himno[]> => {
  const favorites = await getFavorites();
  const updatedFavorites = favorites.filter((f) => f.id !== himnoId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

// Función para verificar si es favorito (exportada)
export const isFavorite = async (himnoId: number): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((f) => f.id === himnoId);
};

// Componente principal
export default function FavoritesScreen() {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState<Himno[]>([]);
  const router = useRouter();

  // Cargar favoritos al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const favs = await getFavorites();
        setFavorites(favs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)));
      };
      loadFavorites();
    }, [])
  );

  // Filtrar favoritos según búsqueda
  const filteredFavorites = favorites.filter(himno => 
    himno.numero.toString().includes(searchText) || 
    himno.titulo.toLowerCase().includes(searchText.toLowerCase())
  );

  // Navegar al himno
  const handleHimnoPress = (himno: Himno) => {
    router.push(`/himno/${himno.numero}`);
  };

  // Eliminar favorito
  const handleRemoveFavorite = async (himnoId: number) => {
    const updatedFavorites = await removeFavorite(himnoId);
    setFavorites(updatedFavorites);
  };

  // Renderizar cada item de favorito
  const renderFavoriteItem = ({ item }: { item: Himno }) => (
    <View style={styles.favoriteItem}>
      <TouchableOpacity 
        style={styles.favoriteContent}
        onPress={() => handleHimnoPress(item)}
      >
        <Text style={styles.favoriteNumber}>{item.numero}.</Text>
        <Text style={styles.favoriteTitle}>{item.titulo}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item.id)}
      >
        <Ionicons name="close-circle" size={24} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Ionicons name="menu" size={24} color="white" />
          <Text style={styles.headerTitle}>HIMNARIO</Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Nombre o número del himno..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.favoritesTitle}>FAVORITOS</Text>
      </View>

      {/* Lista de favoritos */}
      <View style={styles.content}>
        {filteredFavorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes himnos favoritos</Text>
            <Text style={styles.emptySubtext}>
              Agrega himnos a favoritos presionando la estrella en cada himno
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredFavorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.favoritesList}
          />
        )}
      </View>
    </View>
  );
}