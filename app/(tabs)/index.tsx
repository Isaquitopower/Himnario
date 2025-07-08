import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,StatusBar,Platform,} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import himnosList from '@/assets/data/himnosList.json';
import { useThemeColors } from '@/hooks/useThemeColor';
import { useThemeContext } from '@/theme/ThemeContext';
import { createHomeStyles } from '@/app/styles/homeStyles';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const { theme, toggleTheme } = useThemeContext(); // Cambio de tema
  const { colors } = useThemeColors(theme); // Aplicar tema
  const styles = createHomeStyles(colors); // Estilos dinámicos

  const filteredHimnos = himnosList.filter((himno) =>
    himno.numero.toString().includes(searchText)
  );

  const handleHimnoPress = (himno: any) => {
    router.push(`/himno/${himno.numero}`);
  };

  const renderHimnoItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.himnoButton} onPress={() => handleHimnoPress(item)}>
      <Text style={styles.himnoNumber}>{item.numero}</Text>
    </TouchableOpacity>
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
          <Ionicons name="menu" size={26} color={colors.text} />
          <Text style={styles.headerTitle}>HIMNARIO</Text>

          {/* Botón cambio de tema */}
          <TouchableOpacity onPress={toggleTheme} style={styles.headerRight}>
            <Ionicons
              name={theme === 'dark' ? 'sunny' : 'moon'}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Número del himno..."
          placeholderTextColor={colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Subtítulo */}
      <View style={styles.titleContainer}>
        <Text style={styles.favoritesTitle}>SELECCIÓN DE HIMNOS</Text>
      </View>

      {/* Lista de himnos */}
      <FlatList
        data={filteredHimnos}
        renderItem={renderHimnoItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={5}
        contentContainerStyle={{
          ...styles.gridContainer,
          justifyContent: 'center',
        }}
        columnWrapperStyle={{ justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
