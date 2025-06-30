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
import { BlurView } from 'expo-blur';

interface BaseModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
  closeButtonText?: string;
}

const { width, height } = Dimensions.get('window');

const MODAL_RADIUS = 28;
const OVERLAY_BG = 'rgba(15,23,42,0.6)';
const MODAL_BG = '#fff';
const BORDER_COLOR = '#e5e7eb';
const TITLE_COLOR = '#1e293b';
const CLOSE_BG = '#f1f5f9';
const CLOSE_COLOR = '#64748b';
const SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 24,
  elevation: 8,
};

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
  closeButtonText = '\u2715',
}: BaseModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.absoluteFill} pointerEvents="box-none">
        <BlurView intensity={30} tint="light" style={styles.absoluteFill} />
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={styles.header}>
                <Text style={styles.bear}>🧸</Text>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                {showCloseButton && (
                  <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: iphoneWidth,
    height: iphoneHeight,
    marginLeft: -iphoneWidth / 2,
    marginTop: -iphoneHeight / 2,
    backgroundColor: OVERLAY_BG,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    borderRadius: MODAL_RADIUS + 12,
  },
  modalContainer: {
    width: Math.min(iphoneScreenWidth * 0.9, 340),
    maxHeight: iphoneScreenHeight * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: MODAL_BG,
    borderRadius: MODAL_RADIUS,
    width: '100%',
    maxHeight: '100%',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    ...SHADOW,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 38,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    minHeight: 64,
    position: 'relative',
  },
  bear: {
    fontSize: 28,
    marginRight: 8,
    marginLeft: -4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: TITLE_COLOR,
    flex: 1,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  closeButton: {
    position: 'absolute',
    right: 28,
    top: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    zIndex: 2,
  },
  closeButtonText: {
    color: '#cbd5e1',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 32,
  },
}); 