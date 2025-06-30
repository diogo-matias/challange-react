import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    padding: 20,
    minHeight: 120,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    flexShrink: 1,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 'auto',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  confirmButton: {
    backgroundColor: '#007bff',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 