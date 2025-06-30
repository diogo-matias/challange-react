import { StyleSheet } from 'react-native';

const PRIMARY = '#6366f1';
const SECONDARY = '#64748b';
const BTN_TEXT = '#fff';
const BTN_RADIUS = 18;
const BTN_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.10,
  shadowRadius: 12,
  elevation: 4,
};

export const styles = StyleSheet.create({
  clienteInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: SECONDARY,
    paddingVertical: 16,
    borderRadius: BTN_RADIUS,
    alignItems: 'center',
    ...BTN_SHADOW,
  },
  cancelButtonText: {
    color: BTN_TEXT,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  addButton: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: BTN_RADIUS,
    alignItems: 'center',
    ...BTN_SHADOW,
  },
  addButtonText: {
    color: BTN_TEXT,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
}); 