// app/(tabs)/styles/favoritesStyles.ts
import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/hooks/useThemeColor';

export const createFavoritesStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
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
    favoriteContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    favoriteNumber: { fontSize: 18, fontWeight: 'bold', color: colors.textSecondary, marginRight: 10 },
    favoriteTitle: { fontSize: 16, color: colors.text, flexShrink: 1 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 10 },
    emptySubtext: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  });
