import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//screens
import { Login } from '../screens/Login.js'
import QRcodeScanner from '../screens/QRcodeScanner.js'
import { Dash, TicketDashBoard } from '../screens/Dashboard.js'
import { AllotedInspector } from '../screens/AllocateInspector.js'
import { InvalidToken } from '../screens/InvalidToken.js'

const Stack = createStackNavigator()

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          // headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
        }}
        initialRouteName='Login'
      >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='TicketDashboard' component={Dash} />
        <Stack.Screen name='QRcodeScanner' component={QRcodeScanner} />
        <Stack.Screen name='AllotedInspector' component={AllotedInspector} />
        <Stack.Screen name='InvalidToken' component={InvalidToken} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
