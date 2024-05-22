import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailScreen from './src/screens/DetailScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import TabNavigator from './src/navigators/TabNavigator'
import store, { persistor } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tab" component={TabNavigator}
              options={{
                animation: 'slide_from_bottom'
              }}
            />
            <Stack.Screen name="Details" component={DetailScreen}
              options={{
                animation: 'slide_from_bottom'
              }}
            />
            <Stack.Screen name="Payment" component={PaymentScreen}
              options={{
                animation: 'slide_from_bottom'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App