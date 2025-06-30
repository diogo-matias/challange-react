import { StyleSheet } from 'react-native';

const RADIUS = 20;
const SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.10,
  shadowRadius: 12,
  elevation: 4,
};

export const styles = StyleSheet.create({
  alertContainer: {
    borderRadius: RADIUS,
    borderWidth: 1.5,
    padding: 24,
    minHeight: 120,
    ...SHADOW,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    flexShrink: 1,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 44,
  },
  cancelButton: {
    backgroundColor: '#64748b',
  },
  confirmButton: {
    backgroundColor: '#6366f1',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 