import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import himnosList from '@/assets/data/himnosList.json';
import { useThemeContext } from '@/theme/ThemeContext';
import { useThemeColors } from '@/hooks/useThemeColor';
import { createLettersStyles } from '@/app/styles/lettersStyles';

export default function LettersScreen() {
  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState<'TZELTAL' | 'ESPAÑOL' | 'INGLES' | 'GLOBAL'>('GLOBAL');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const router = useRouter();

  // Tema
  const { theme } = useThemeContext();
  const { colors } = useThemeColors(theme);
  const styles = createLettersStyles(colors);

  // Función para normalizar texto
  const normalizar = (texto: string): string => {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')   // quita acentos
      .replace(/[^a-zA-Z0-9\s]/g, '')    // quita signos
      .toLowerCase();
  };

  // Filtrar himnos
const filteredHimnos = himnosList
  .filter((himno) => {
    const tze = himno.titulo?.Tze || '';
    const esp = himno.titulo?.esp || '';
    const eng = himno.titulo?.eng || '';
    const numero = himno.numero.toString();

    let titulo = '';
    if (language === 'TZELTAL') titulo = tze;
    else if (language === 'ESPAÑOL') titulo = esp;
    else if (language === 'INGLES') titulo = eng;
    else titulo = `${tze} / ${esp} / ${eng}`;

    const tituloNormalizado = normalizar(titulo);
    const busquedaNormalizada = normalizar(searchText);
    const numeroIncluye = numero.includes(searchText);

    return tituloNormalizado.includes(busquedaNormalizada) || numeroIncluye;
  })
  .sort((a, b) => {
    const tituloA =
      language === 'TZELTAL'
        ? a.titulo?.Tze
        : language === 'ESPAÑOL'
        ? a.titulo?.esp
        : language === 'INGLES'
        ? a.titulo?.eng
        : `${a.titulo?.Tze || ''} / ${a.titulo?.esp || ''} / ${a.titulo?.eng || ''}`;

    const tituloB =
      language === 'TZELTAL'
        ? b.titulo?.Tze
        : language === 'ESPAÑOL'
        ? b.titulo?.esp
        : language === 'INGLES'
        ? b.titulo?.eng
        : `${b.titulo?.Tze || ''} / ${b.titulo?.esp || ''} / ${b.titulo?.eng || ''}`;

    return tituloA.localeCompare(tituloB, 'es', { sensitivity: 'base' });
  });


  const handleHimnoPress = (himno: any) => {
    router.push(`/himno/${himno.numero}`);
  };

  const renderHimnoItem = ({ item }: { item: any }) => {
    let tituloAMostrar = '';

    if (language === 'TZELTAL') tituloAMostrar = item.titulo?.Tze || '';
    else if (language === 'ESPAÑOL') tituloAMostrar = item.titulo?.esp || '';
    else if (language === 'INGLES') tituloAMostrar = item.titulo?.eng || '';
    else tituloAMostrar = `${item.titulo?.Tze || ''} \n${item.titulo?.esp || ''} \n${item.titulo?.eng || ''}`;

    return (
      <TouchableOpacity style={styles.himnoItem} onPress={() => handleHimnoPress(item)}>
        <Text style={styles.himnoTitle}>{tituloAMostrar}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.headerBackground}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text />
          <Text style={styles.headerTitle}>HIMNARIO</Text>
          <Text />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Titulo del himno..."
          placeholderTextColor={colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Language Selector */}
      <View style={styles.languageSelector}>
        <TouchableOpacity style={styles.languageButton} onPress={() => setShowLanguageMenu(!showLanguageMenu)}>
          <Text style={styles.languageButtonText}>
            {language === 'GLOBAL' ? 'IDIOMA: TODOS' : `IDIOMA: ${language}`}
          </Text>
          <Ionicons name={showLanguageMenu ? 'chevron-up' : 'chevron-down'} size={16} color={colors.text} />
        </TouchableOpacity>

        {showLanguageMenu && (
          <View style={styles.languageMenu}>
            {(['TZELTAL', 'ESPAÑOL', 'INGLES', 'GLOBAL'] as const).map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.languageOption, language === lang && styles.languageOptionActive]}
                onPress={() => {
                  setLanguage(lang);
                  setShowLanguageMenu(false);
                }}
              >
                <Text style={styles.languageOptionText}>
                  {lang === 'TZELTAL' ? 'TZELTAL' : lang === 'ESPAÑOL' ? 'ESPAÑOL' : lang === 'INGLES' ? 'INGLÉS' : 'TODOS'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Lista de himnos */}
      <FlatList
        data={filteredHimnos}
        renderItem={renderHimnoItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={{ color: colors.text }}>No se encontraron himnos.</Text>}
      />
    </View>
  );
}
