import { StyleSheet } from 'react-native';
import Login from '../screen/login/login';
import React from 'react';
import Signup from '../screen/signup/signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/authContext';
import Home from '../screen/home/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Wardrobe from '../screen/wardrobe/wardrobe';
import Logout from '../screen/logout/logout';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import Logo from '../components/logo/logo';
import { colors } from '../utils/colors';
import AddItem from '../screen/addItem/addItem';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.lightest,
          height: 72,
          color: colors.darkest,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            return <Logo height={39} width={39} color={color} />;
          } else if (route.name === 'Wardrobe') {
            return <FontAwesome5 name='tshirt' size={size + 2} color={color} />;
          } else if (route.name === 'AddItem') {
            return <Foundation name='plus' size={32} color={color} />;
          } else if (route.name === 'Logout') {
            return (
              <FontAwesome5 name='user-alt' size={size + 2} color={color} />
            );
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.almostBlcak,
        tabBarInactiveTintColor: colors.darkest,

        tabBarLabelStyle: {
          fontSize: 15,
          paddingBottom: 10,
        },

        tabBarActiveBackgroundColor: colors.light,
      })}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name='Wardrobe'
        component={Wardrobe}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name='AddItem'
        component={AddItem}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name='Logout'
        component={Logout}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Signup'
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function Navigator() {
  const { user, loadingUser } = useAuth();
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  barIcon: {
    marginVertical: 8,
  },
});
