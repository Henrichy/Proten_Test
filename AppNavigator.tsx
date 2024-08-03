import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import FirstPage from './src/component/firstpage'; // Adjust path as necessary
import SecondPage from './src/component/SecondPage'; // Adjust path as necessary

export type RootStackParamList = {
  Home: undefined;
  FirstPage: undefined;
  SecondPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={FirstPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="FirstPage" 
          component={FirstPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SecondPage" 
          component={SecondPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      {/* BottomSheet component remains */}
      <BottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%']} index={-1}>
        <View style={styles.bottomSheetContent}>
          <Text>Bottom Sheet Content</Text>
        </View>
      </BottomSheet>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 20,
    alignItems: 'center',
  },
});

export default AppNavigator;
