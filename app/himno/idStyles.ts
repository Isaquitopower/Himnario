import { StyleSheet } from 'react-native';

export const idStyles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: 20, // Espacio para el menú flotante
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Contenido principal
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 70, // Espacio para el menú flotante
  },

  // Títulos
  himnoTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  translationTitle: {
    color: '#CCCCCC',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Estrofas
  estrofaContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  estrofaTexto: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },

  // Coro
  coroContainer: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  coroLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  coroTexto: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },

    // Segundos Coros
  segcoroContainer: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  segcoroLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  segcoroTexto: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },

  // Menú flotante
  menuContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeLanguage: {
    color: '#1E90FF',
  },
  menuButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#333',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },

  // Elementos adicionales
  versiculo: {
    color: '#BBB',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 30,
    lineHeight: 20,
    textAlign: 'center',
  },
  nextHimnoContainer: {
    marginTop: 30,
    marginBottom: 50,
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  nextHimnoText: {
    color: '#BBB',
    fontSize: 16,
    textAlign: 'center',
  },
  divider: {
  height: 2,
  width: '100%',
  marginVertical: 10,
  backgroundColor: 'white',
  }
});