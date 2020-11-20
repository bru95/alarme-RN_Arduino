import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './src/pages/HomePage';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomePage}
        options={{
          title: 'Arduino e React-Native',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#9C27B0',
          },
          headerTintColor: '#fff'
        }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              default:
                iconName = 'code';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#9C27B0',
          inactiveTintColor: '#777',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} Icon />
      </Tab.Navigator>
    </NavigationContainer>
  );
}