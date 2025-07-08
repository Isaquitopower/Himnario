// styles/homeStyles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { ThemeColors } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');

export const createHomeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    header: {
      backgroundColor: colors.headerBackground,
      paddingTop: 55,
      paddingBottom: 30,
      paddingHorizontal: 24,
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      shadowColor: colors.text,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 16,
      elevation: 12,
    },

    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },

    headerTitle: {
      color: colors.text,
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: 1.5,
    },

    headerRight: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      margin: 20,
      borderRadius: 16,
      padding: 12,
      shadowColor: colors.text,
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 6,
    },
    searchIcon: { marginRight: 12 },
    searchInput: { flex: 1, color: colors.text, fontSize: 16 },
    favoritesList: { padding: 20 },
    favoriteItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      marginBottom: 12,
      borderRadius: 12,
      padding: 14,
      shadowColor: colors.text,
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 6,
    },

    titleContainer: {
      marginTop: 12,
      paddingHorizontal: 24,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 8,
    },

    favoritesTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: 0.8,
      marginBottom: 4,
    },

    gridContainer: {
      paddingHorizontal: 16,
      paddingBottom: 40,
      paddingTop: 16,
    },

    himnoButton: {
      backgroundColor: colors.buttonBackground,
      width: width / 5 - 8,
      height: width / 5 - 8,
      margin: 4,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOpacity: 0.12,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },

    himnoNumber: {
      color: colors.buttonText,
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: 0.5,
    },

    himnoButtonActive: {
      backgroundColor: colors.text,
      transform: [{ scale: 0.95 }],
    },

    himnoNumberActive: {
      color: colors.background,
    },

    mainContent: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      marginTop: -12,
      paddingTop: 8,
    },
  });
