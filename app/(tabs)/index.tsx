import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import himnosList from '@/assets/data/himnosList.json';
import { homeStyles as styles } from './styles/homeStyles';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const filteredHimnos = himnosList.filter(himno => 
    himno.numero.toString().includes(searchText) || 
    himno.titulo.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleHimnoPress = (himno: any) => {
    router.push(`/himno/${himno.numero}`);
  };

  const renderHimnoItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.himnoButton}
      onPress={() => handleHimnoPress(item)}
    >
      <Text style={styles.himnoNumber}>{item.numero}</Text>
    </TouchableOpacity>
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

      {/* Search Bar */}
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

      {/* Favorites Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.favoritesTitle}>PAGINAS</Text>
      </View>

      {/* Himnos Grid */}
      <FlatList
        data={filteredHimnos}
        renderItem={renderHimnoItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={5}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
