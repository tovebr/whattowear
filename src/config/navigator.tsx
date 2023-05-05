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
          backgroundColor: colors.light,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            return <Logo height={35} width={35} color={color} />;
          } else if (route.name === 'Wardrobe') {
            return <FontAwesome5 name='tshirt' size={size} color={color} />;
          } else if (route.name === 'AddItem') {
            return <Foundation name='plus' size={30} color={color} />;
          } else if (route.name === 'Logout') {
            return <FontAwesome5 name='user-alt' size={size} color={color} />;
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.darkest,
        tabBarInactiveTintColor: colors.darkblue,
        tabBarLabelStyle: {
          fontSize: 13,
        },
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
