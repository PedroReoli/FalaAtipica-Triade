import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { GuessGameScreen } from '../screens/GuessGameScreen';
import { IgualDiferenteScreen } from '../screens/IgualDiferenteScreen';
import { CenaCertaScreen } from '../screens/CenaCertaScreen';
import { PalavrasGameScreen } from '../screens/PalavrasGameScreen';
import { RequestAccessScreen } from '../screens/RequestAccessScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Dashboard: undefined;
  GuessGame: undefined;
  IgualDiferente: undefined;
  CenaCerta: undefined;
  PalavrasGame: { categoryId: string };
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
        <Stack.Screen name="IgualDiferente" component={IgualDiferenteScreen} />
        <Stack.Screen name="CenaCerta" component={CenaCertaScreen} />
        <Stack.Screen name="PalavrasGame" component={PalavrasGameScreen} />
        <Stack.Screen name="GuessGame" component={GuessGameScreen} />
        <Stack.Screen name="RequestAccess" component={RequestAccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
