import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { checkAuth } from './src/store/slices/authSlice';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { useAppSelector, useAppDispatch } from './src/store/hooks';
import Shimmer from './src/components/Shimmer';

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.iphoneFrame}>
        <View style={styles.iphoneScreen}>
          <View style={styles.loadingContent}>
            <Shimmer width="60%" height={24} borderRadius={8} style={styles.titleShimmer} />
            <Shimmer width="40%" height={16} borderRadius={6} style={styles.subtitleShimmer} />
            
            <View style={styles.shimmerCards}>
              <Shimmer width="100%" height={120} borderRadius={12} style={styles.cardShimmer} />
              <Shimmer width="100%" height={120} borderRadius={12} style={styles.cardShimmer} />
              <Shimmer width="100%" height={120} borderRadius={12} style={styles.cardShimmer} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function AppContent() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <DashboardScreen /> : <LoginScreen />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iphoneFrame: {
    width: 375,
    height: 812,
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
  loadingContent: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  titleShimmer: {
    marginBottom: 8,
  },
  subtitleShimmer: {
    marginBottom: 30,
  },
  shimmerCards: {
    gap: 16,
  },
  cardShimmer: {
    marginBottom: 16,
  },
}); 