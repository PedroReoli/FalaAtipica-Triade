import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';
import { RequestAccessScreen } from '../screens/RequestAccessScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ImagesAndSoundsScreen } from '../screens/ImagesAndSoundsScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { SupportScreen } from '../screens/SupportScreen';
import { TipsScreen } from '../screens/TipsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChildProfileScreen } from '../screens/ChildProfileScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ResetPassword: undefined;
  RequestAccess: undefined;
  Dashboard: undefined;
  ImagesAndSounds: undefined;
  Progress: undefined;
  Support: undefined;
  Tips: undefined;
  Profile: undefined;
  ChildProfile: { childId: string };
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
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="RequestAccess" component={RequestAccessScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ImagesAndSounds" component={ImagesAndSoundsScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Tips" component={TipsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ChildProfile" component={ChildProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
