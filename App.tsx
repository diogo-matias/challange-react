import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { checkAuth } from './src/store/slices/authSlice';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { useAppSelector, useAppDispatch } from './src/store/hooks';

function AppContent() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* Loading component aqui */}
      </View>
    );
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
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
}); 