import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    gap: 12,
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  highlightCard: {
    backgroundColor: '#e8f5e8',
    borderWidth: 2,
    borderColor: '#27ae60',
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  statClient: {
    fontSize: 12,
    color: '#34495e',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  titleShimmer: {
    marginBottom: 16,
  },
  statLabelShimmer: {
    marginBottom: 8,
  },
  statValueShimmer: {
    marginBottom: 4,
  },
  statClientShimmer: {
    marginTop: 4,
  },
}); 