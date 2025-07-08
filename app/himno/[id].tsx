import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import himnosData from "@/assets/data/himnos.json";
import { useThemeContext } from "@/theme/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColor";
import { createIdStyles } from "@/app/styles/idStyles";
import { useFontSize } from '@/context/FontSizeContext';
import { useRerenderOnFocus } from "@/hooks/useRerenderOnFocus";

export default function HimnoScreen() {
  const { id } = useLocalSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const { fontSize, increaseFont, decreaseFont, resetFont } = useFontSize();
  const [language, setLanguage] = useState<"original" | "esp" | "eng">("original");
  const [isFav, setIsFav] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const { theme } = useThemeContext();
  const { colors } = useThemeColors(theme);
  const styles = createIdStyles(colors);

  const shouldRenderTitle = useRerenderOnFocus([id]);
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [id])
  );

  const himno = himnosData[id as keyof typeof himnosData];

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorite_himnos");
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          setIsFav(parsedFavorites.some((f: any) => f.id === Number(id)));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavoriteStatus();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const favoritesKey = "favorite_himnos";
      const currentFavorites = await AsyncStorage.getItem(favoritesKey);
      let favorites = currentFavorites ? JSON.parse(currentFavorites) : [];

      if (isFav) {
        favorites = favorites.filter((f: any) => f.id !== Number(id));
      } else {
        favorites.push({
          id: Number(id),
          numero: Number(id),
          titulo: himno.titulo.Tze,
          timestamp: Date.now(),
        });
      }

      await AsyncStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setIsFav(!isFav);
    } catch (error) {
      console.error("Error al guardar favoritos:", error);
    }
  };

  if (!himno) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text, fontSize: 18, padding: 20 }}>
          Himno no encontrado.
        </Text>
      </View>
    );
  }

  const renderParte = (
    parte: any,
    index: number,
    lang: "original" | "esp" | "eng"
  ) => {
    const texto = lang === "original" ? parte.texto.original : parte.texto[lang];

    switch (parte.tipo) {
      case "coro":
        return (
          <View key={`${lang}-coro-${index}`} style={styles.coroContainer}>
            <Text style={[styles.coroLabel, { fontSize, color: colors.text }]}>
              CORO
            </Text>
            <Text style={[styles.coroTexto, { fontSize, lineHeight: fontSize + 10, color: colors.text }]}>
              {texto}
            </Text>
          </View>
        );
      case "segcoro":
        return (
          <View key={`${lang}-segcoro-${index}`} style={styles.coroContainer}>
            <Text style={[styles.coroLabel, { fontSize, color: colors.text }]}>
              SEGUNDO CORO
            </Text>
            <Text style={[styles.segcoroTexto, { fontSize, lineHeight: fontSize + 10, color: colors.text }]}>
              {texto}
            </Text>
          </View>
        );
      default:
        return (
          <View key={`${lang}-estrofa-${index}`} style={styles.estrofaContainer}>
            <Text style={[styles.estrofaTexto, { fontSize, lineHeight: fontSize + 10, color: colors.text }]}>
              {texto}
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background, flex: 1 }]}>
      <View style={{ height: 35 }} />

      {/* Contenedor principal */}
      <View style={{ flex: 1 }}>
        {/* Sección de traducción con scroll */}
        {showTranslation && language !== "original" && (
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={{paddingBottom: 60 }}
          >
            {shouldRenderTitle && (
              <View>
                <Text
                  style={[styles.himnoTitle, { fontSize: fontSize + 4, color: colors.text }]}
                >
                  {id}. {himno.titulo[language]}
                </Text>
              </View>
            )}

            {himno.versiculo && (
              <Text style={[styles.versiculo, { color: colors.textSecondary }]}>
                {himno.versiculo[language]}
              </Text>
            )}

            {himno.partes.map((parte, index) =>
              renderParte(parte, index, language)
            )}
          </ScrollView>
        )}

        {/* Línea divisoria */}
        {showTranslation && language !== "original" && (
          <View
            style={{
              height: 2,
              backgroundColor: colors.text,
              width: "100%",
              marginVertical: 10,
              opacity: 1,
            }}
          />
        )}

        {/* Sección original con scroll */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{paddingBottom: 60 }}
        >
          {shouldRenderTitle && (
            <View>
              <Text
                style={[styles.himnoTitle, { fontSize: fontSize + 4, color: colors.text }]}
              >
                {id}. {himno.titulo.Tze}
              </Text>
            </View>
          )}

          {himno.versiculo && (
            <Text style={[styles.versiculo, { color: colors.textSecondary }]}>
              {himno.versiculo.Tze}
            </Text>
          )}

          {himno.partes.map((parte, index) =>
            renderParte(parte, index, "original")
          )}
        </ScrollView>
      </View>

      {/* Menú flotante */}
      {showMenu ? (
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={increaseFont}>
            <Text style={[styles.menuText, { color: colors.text }]}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={decreaseFont}>
            <Text style={[styles.menuText, { color: colors.text }]}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLanguage("esp");
              setShowTranslation(true);
            }}
          >
            <Text
              style={[
                styles.menuText,
                { color: colors.text },
                language === "esp" && styles.activeLanguage,
              ]}
            >
              ESP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLanguage("eng");
              setShowTranslation(true);
            }}
          >
            <Text
              style={[
                styles.menuText,
                { color: colors.text },
                language === "eng" && styles.activeLanguage,
              ]}
            >
              ENG
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLanguage("original");
              setShowTranslation(false);
            }}
          >
            <Text
              style={[
                styles.menuText,
                { color: colors.text },
                language === "original" && styles.activeLanguage,
              ]}
            >
              TZE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFav ? "star" : "star-outline"}
              size={24}
              color={isFav ? "#FFD700" : colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowMenu(false)}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: colors.accent }]}
          onPress={() => setShowMenu(true)}
        >
          <Ionicons name="add" size={24} color={colors.text} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
