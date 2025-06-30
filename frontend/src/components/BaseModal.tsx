import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';

interface BaseModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
  closeButtonText?: string;
}

const { width, height } = Dimensions.get('window');

// Calcula as dimensões do mockup do iPhone
const iphoneWidth = Math.min(width * 0.9, 375);
const iphoneHeight = Math.min(height * 0.9, 812);
const iphonePadding = 8;
const iphoneScreenWidth = iphoneWidth - (iphonePadding * 2);
const iphoneScreenHeight = iphoneHeight - (iphonePadding * 2);

export default function BaseModal({
  visible,
  title,
  children,
  onClose,
  showCloseButton = true,
  closeButtonText = '✕',
}: BaseModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={2}>{title}</Text>
              {showCloseButton && (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>{closeButtonText}</Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView 
              style={styles.content}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: iphoneWidth,
    height: iphoneHeight,
    marginLeft: -iphoneWidth / 2,
    marginTop: -iphoneHeight / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    borderRadius: 40,
  },
  modalContainer: {
    width: Math.min(iphoneScreenWidth * 0.9, 320),
    maxHeight: iphoneScreenHeight * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxHeight: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    minHeight: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 30,
  },
}); 