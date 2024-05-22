import React from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './screens/NonAuth/login';
import MapScreen from './screens/Auth/Map/index';
import MovieScreen from './screens/Auth/Movies/index';
import MapLocationDetail from './screens/Auth/Map/detail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Map') {
                    iconName = focused ? 'map' : 'map-outline';
                } else if (route.name === 'Movie') {
                    iconName = focused ? 'film' : 'film-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
        })}>
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Movie" component={MovieScreen} />
        </Tab.Navigator>
    );
}

function MainApp() {
    const session = useSelector((state) => state.user);

    React.useEffect(() => {
        async function run() {
            const data = await AsyncStorage.getItem('users');
            if (!data) {
                AsyncStorage.setItem('users', JSON.stringify([
                    { username: 'test', password: 'test' },
                    { username: 'testuser', password: '123456' },
                    { username: '123456', password: '123456' },
                ]))
            }
        }

        run()
    }, []);

    return (
        <NavigationContainer>
            {
                (session?.username) ? (
                    <Stack.Navigator initialRouteName="Login1" screenOptions={{
                        headerShown: false,
                        animation: 'none'
                    }}>
                        <Stack.Screen name="MyTabs" component={MyTabs} />
                        <Stack.Screen name="MapLocationDetail" component={MapLocationDetail} />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator initialRouteName="Login" screenOptions={{
                        headerShown: false,
                        animation: 'none'
                    }}>
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </Stack.Navigator>
                )
            }
        </NavigationContainer>

    );
}

export default MainApp;