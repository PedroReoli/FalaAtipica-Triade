import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { CategoryItemsScreen } from '../screens/CategoryItemsScreen';
import { GuessGameScreen } from '../screens/GuessGameScreen';
import { AdivinhaScreen } from '../screens/AdivinhaScreen';
import { RequestAccessScreen } from '../screens/RequestAccessScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Dashboard: undefined;
  Categories: undefined;
  CategoryItems: { categoryId: string };
  GuessGame: undefined;
  Adivinha: undefined;
  RequestAccess: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Categories" component={CategoriesScreen} />
    <Stack.Screen name="CategoryItems" component={CategoryItemsScreen} />
    <Stack.Screen name="GuessGame" component={GuessGameScreen} />
    <Stack.Screen name="Adivinha" component={AdivinhaScreen} />
    <Stack.Screen name="RequestAccess" component={RequestAccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
