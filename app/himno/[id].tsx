import { idStyles as styles } from "./idStyles";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import himnosData from "@/assets/data/himnos.json";

export default function HimnoScreen() {
  const { id } = useLocalSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState<"original" | "esp" | "eng">("original");
  const [isFav, setIsFav] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const himno = himnosData[id as keyof typeof himnosData];

  // Cargar estado de favorito al iniciar
  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorite_himnos');
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          setIsFav(parsedFavorites.some((f: any) => f.id === Number(id)));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    
    loadFavoriteStatus();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const favoritesKey = 'favorite_himnos';
      const currentFavorites = await AsyncStorage.getItem(favoritesKey);
      let favorites = currentFavorites ? JSON.parse(currentFavorites) : [];
      
      if (isFav) {
        favorites = favorites.filter((f: any) => f.id !== Number(id));
      } else {
        favorites.push({
          id: Number(id),
          numero: Number(id),
          titulo: himno.titulo.Tze,
          timestamp: Date.now()
        });
      }
      
      await AsyncStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setIsFav(!isFav);
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  };

  if (!himno) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", fontSize: 18, padding: 20 }}>
          Himno no encontrado.
        </Text>
      </View>
    );
  }

  const renderParte = (parte: any, index: number, lang: "original" | "esp" | "eng") => {
    const texto = lang === "original" ? parte.texto.original : parte.texto[lang];
    
    switch (parte.tipo) {
      case "coro":
        return (
          <View key={`${lang}-coro-${index}`} style={styles.coroContainer}>
            <Text style={[styles.coroLabel, { fontSize }]}>CORO</Text>
            <Text style={[styles.coroTexto, { fontSize }]}>{texto}</Text>
          </View>
        );
      case "segcoro":
        return (
          <View key={`${lang}-segcoro-${index}`} style={styles.coroContainer}>
            <Text style={[styles.coroLabel, { fontSize }]}>SEGUNDO CORO</Text>
            <Text style={[styles.coroTexto, { fontSize }]}>{texto}</Text>
          </View>
        );
      default:
        return (
          <View key={`${lang}-estrofa-${index}`} style={styles.estrofaContainer}>
            <Text style={[styles.estrofaTexto, { fontSize }]}>{texto}</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Contenedor principal */}
      <View style={{flex: 1}}>
        {/* Sección de traducción con scroll */}
        {showTranslation && language !== "original" && (
          <ScrollView style={{flex: 1}}>
            <Text style={[styles.himnoTitle, { fontSize: fontSize + 4 }]}>
              {id}. {himno.titulo[language]}
            </Text>

            {himno.versiculo && (
              <Text style={styles.versiculo}>{himno.versiculo[language]}</Text>
            )}

            {himno.partes.map((parte, index) => renderParte(parte, index, language))}
          </ScrollView>
        )}

        {/* Línea divisoria FIJA */}
        {showTranslation && language !== "original" && (
          <View style={{
            height: 2,
            backgroundColor: 'white',
            width: '100%',
            marginVertical: 10
          }}/>
        )}

        {/* Sección original con scroll */}
        <ScrollView style={{flex: 1}}>
          <Text style={[styles.himnoTitle, { fontSize: fontSize + 4 }]}>
            {id}. {himno.titulo.Tze}
          </Text>

          {himno.versiculo && (
            <Text style={styles.versiculo}>{himno.versiculo.Tze}</Text>
          )}

          {himno.partes.map((parte, index) => renderParte(parte, index, "original"))}
        </ScrollView>
      </View>

      {/* Menú flotante */}
      {showMenu ? (
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => setFontSize((p) => Math.min(p + 2, 24))}>
            <Text style={styles.menuText}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontSize((p) => Math.max(p - 2, 12))}>
            <Text style={styles.menuText}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setLanguage("esp");
            setShowTranslation(true);
          }}>
            <Text style={[styles.menuText, language === "esp" && styles.activeLanguage]}>
              ESP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setLanguage("eng");
            setShowTranslation(true);
          }}>
            <Text style={[styles.menuText, language === "eng" && styles.activeLanguage]}>
              ENG
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setLanguage("original");
            setShowTranslation(false);
          }}>
            <Text style={[styles.menuText, language === "original" && styles.activeLanguage]}>
              TZE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons 
              name={isFav ? "star" : "star-outline"} 
              size={24} 
              color={isFav ? "#FFD700" : "white"} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowMenu(false)}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowMenu(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}