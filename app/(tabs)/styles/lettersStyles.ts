import { StyleSheet } from 'react-native';

export const lettersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  headerRight: {
    width: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 15,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#00BCD4',
  },
  configButton: {
    backgroundColor: '#FF4444',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  configText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: 149,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#333',
    borderRadius: 35,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchBarText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  himnosContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  himnosList: {
    paddingBottom: 20,
  },
  himnoItem: {
    backgroundColor: '#333',
    marginBottom: 8,
    padding: 15,
    borderRadius: 8,
  },
  himnoTitle: {
    color: 'white',
    fontSize: 16,
  },
  lettersSidebar: {
    width: 50,
    paddingRight: 10,
    paddingLeft: 5,
  },
  letterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginVertical: 2,
    borderRadius: 15,
  },
  letterButtonActive: {
    backgroundColor: '#333',
  },
  letterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  letterTextActive: {
    color: 'white',
  },
    languageSelector: {
    paddingHorizontal: 15,
    marginBottom: 10,
    zIndex: 10,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 16,
  },
  languageMenu: {
    position: 'absolute',
    top: 45,
    left: 15,
    right: 15,
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 5,
    elevation: 5,
  },
  languageOption: {
    padding: 10,
  },
  languageOptionActive: {
    backgroundColor: '#444',
  },
  languageOptionText: {
    color: 'white',
    fontSize: 16,
  },
  himnoNumber: {
    color: '#888',
    marginRight: 10,
    fontWeight: 'bold',
  }
});