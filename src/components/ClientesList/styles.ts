import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  clienteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clienteHeader: {
    marginBottom: 12,
  },
  clienteInfo: {
    flex: 1,
  },
  clienteNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 8,
  },
  missingLetterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missingLetterLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 4,
  },
  missingLetter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#3498db',
  },
  editButton: {
    backgroundColor: '#f39c12',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  saveButton: {
    backgroundColor: '#27ae60',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  clienteDetails: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 12,
  },
  clienteDetail: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#2c3e50',
  },
  dateContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  verMaisButton: {
    backgroundColor: '#3498db',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  verMaisText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  nomeShimmer: {
    marginBottom: 8,
  },
  detailShimmer: {
    marginBottom: 4,
  },
  titleShimmer: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    color: '#2c3e50',
  },
  clearButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
    minHeight: 32,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6c757d',
  },
  searchShimmer: {
    marginBottom: 16,
  },
}); 