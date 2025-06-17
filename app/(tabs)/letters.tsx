import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { lettersStyles as styles } from './styles/lettersStyles';
import himnosList from '@/assets/data/himnosList.json';

export default function LettersScreen() {
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState<'TZE' | 'ESP' | 'ENG' | 'GLOBAL'>('GLOBAL');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const router = useRouter();

  // Organizar himnos por letra inicial
  const himnosPorLetra = himnosList.reduce((acc, himno) => {
    // Determinar el título a mostrar según el idioma seleccionado
    let titulo = '';
    if (language === 'TZE') titulo = himno.titulo.Tze;
    else if (language === 'ESP') titulo = himno.titulo.esp;
    else if (language === 'ENG') titulo = himno.titulo.eng;
    else titulo = `${himno.titulo.Tze} / ${himno.titulo.esp} / ${himno.titulo.eng}`;

    const letraInicial = titulo.charAt(0).toUpperCase();
    
    if (!acc[letraInicial]) {
      acc[letraInicial] = [];
    }
    
    acc[letraInicial].push({
      id: himno.id,
      numero: himno.numero,
      titulo: titulo
    });
    
    return acc;
  }, {} as Record<string, Array<{id: number, numero: number, titulo: string}>>);

  const letters = Object.keys(himnosPorLetra).sort();
  const filteredHimnos = himnosPorLetra[selectedLetter as keyof typeof himnosPorLetra] || [];

  const handleHimnoPress = (himno: any) => {
    router.push(`/himno/${himno.numero}`);
  };

  const renderHimnoItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.himnoItem}
      onPress={() => handleHimnoPress(item)}
    >
      <Text style={styles.himnoNumber}>{item.numero}.</Text>
      <Text style={styles.himnoTitle}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  const renderLetterButton = (letter: string) => (
    <TouchableOpacity
      key={letter}
      style={[
        styles.letterButton,
        selectedLetter === letter && styles.letterButtonActive
      ]}
      onPress={() => setSelectedLetter(letter)}
    >
      <Text style={[
        styles.letterText,
        selectedLetter === letter && styles.letterTextActive
      ]}>
        {letter}
      </Text>
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

      {/* Language Selector */}
      <View style={styles.languageSelector}>
        <TouchableOpacity 
          style={styles.languageButton}
          onPress={() => setShowLanguageMenu(!showLanguageMenu)}
        >
          <Text style={styles.languageButtonText}>
            {language === 'GLOBAL' ? 'IDIOMA: TODOS' : `IDIOMA: ${language}`}
          </Text>
          <Ionicons name={showLanguageMenu ? "chevron-up" : "chevron-down"} size={16} color="white" />
        </TouchableOpacity>

        {showLanguageMenu && (
          <View style={styles.languageMenu}>
            <TouchableOpacity 
              style={[styles.languageOption, language === 'TZE' && styles.languageOptionActive]}
              onPress={() => {
                setLanguage('TZE');
                setShowLanguageMenu(false);
              }}
            >
              <Text style={styles.languageOptionText}>TZELTAL</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.languageOption, language === 'ESP' && styles.languageOptionActive]}
              onPress={() => {
                setLanguage('ESP');
                setShowLanguageMenu(false);
              }}
            >
              <Text style={styles.languageOptionText}>ESPAÑOL</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.languageOption, language === 'ENG' && styles.languageOptionActive]}
              onPress={() => {
                setLanguage('ENG');
                setShowLanguageMenu(false);
              }}
            >
              <Text style={styles.languageOptionText}>INGLÉS</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.languageOption, language === 'GLOBAL' && styles.languageOptionActive]}
              onPress={() => {
                setLanguage('GLOBAL');
                setShowLanguageMenu(false);
              }}
            >
              <Text style={styles.languageOptionText}>TODOS</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.content}>
        {/* Letter Header */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchBarText}>{selectedLetter}</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Himnos List */}
          <View style={styles.himnosContainer}>
            <FlatList
              data={filteredHimnos}
              renderItem={renderHimnoItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.himnosList}
            />
          </View>

          {/* Letters Sidebar */}
          <View style={styles.lettersSidebar}>
            {letters.map(letter => renderLetterButton(letter))}
          </View>
        </View>
      </View>
    </View>
  );
}
