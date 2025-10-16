import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';
import { RequestAccessScreen } from '../screens/RequestAccessScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AgendaScreen } from '../screens/AgendaScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { SupportScreen } from '../screens/SupportScreen';
import { TipsScreen } from '../screens/TipsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChildProfileScreen } from '../screens/ChildProfileScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { RegisterDeviceScreen } from '../screens/RegisterDeviceScreen';
import { AboutAppScreen } from '../screens/AboutAppScreen';
import { TermsPrivacyScreen } from '../screens/TermsPrivacyScreen';
import { SubscriptionScreen } from '../screens/SubscriptionScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ResetPassword: undefined;
  RequestAccess: undefined;
  Dashboard: undefined;
  Agenda: undefined;
  Progress: undefined;
  Support: undefined;
  Tips: undefined;
  Profile: undefined;
  ChildProfile: { childId: string };
  ChangePassword: undefined;
  RegisterDevice: undefined;
  AboutApp: undefined;
  TermsPrivacy: undefined;
  Subscription: undefined;
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
        <Stack.Screen name="Agenda" component={AgendaScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Tips" component={TipsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ChildProfile" component={ChildProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="RegisterDevice" component={RegisterDeviceScreen} />
        <Stack.Screen name="AboutApp" component={AboutAppScreen} />
        <Stack.Screen name="TermsPrivacy" component={TermsPrivacyScreen} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
