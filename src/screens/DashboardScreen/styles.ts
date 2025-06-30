import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iphoneFrame: {
    width: Math.min(width * 0.9, 375),
    height: Math.min(height * 0.9, 812),
    backgroundColor: '#000',
    borderRadius: 40,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  iphoneScreen: {
    flex: 1,
    backgroundColor: '#f4f2ee',
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bear: {
    fontSize: 28,
    marginRight: 8,
    marginLeft: -4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  logoutButton: {
    marginLeft: 'auto',
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    zIndex: 2,
  },
  logoutText: {
    color: '#e74c3c',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#7f8c8d',
  },
  addButtonShimmer: {
    marginBottom: 20,
  },
  cardShimmer: {
    marginBottom: 20,
  },
  clientesShimmer: {
    marginTop: 20,
  },
  titleShimmer: {
    marginBottom: 16,
  },
  searchShimmer: {
    marginBottom: 16,
  },
});

export default styles; 