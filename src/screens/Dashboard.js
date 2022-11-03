import * as React from 'react'
import { Button, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

import {
  SubTitle,
  PageTitle,
  PageLogo,
  SubTitle1,
  StyledButton1,
  ButtonText,
} from '../components/Styles'
import { Login } from './Login'
import * as SecureStore from 'expo-secure-store'

const Drawer = createDrawerNavigator()

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  // console.log(result)
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result)
  } else {
    alert('No values stored under that key.')
  }
}

export const Dash=({ navigation })=> {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StyledButton1
        onPress={() => navigation.navigate('QRcodeScanner')}
        title='Go to Token Scanner'
      >
        <ButtonText>Go to Token Scanner</ButtonText>
      </StyledButton1>
      <SubTitle1 />
      <SubTitle1 />
      <SubTitle1 />
      <SubTitle1 />

      <StyledButton1 onPress={() => navigation.navigate('AllotedInspector')}>
        <ButtonText>Go to Alloting Inspector</ButtonText>
      </StyledButton1>
    </View>
  )
}

// export const TicketDashBoard = () => {
//   return (
//     <Drawer.Navigator useLegacyImplementation initialRouteName='Ticket Booking'>
//       <Drawer.Screen name='Ticket Booking' component={Dash}>
//         {/* <PageLogo
//             resizeMode='cover'
//             source={require('./../../assets/logo.png')}
//           /> */}
//       </Drawer.Screen>
//       <Drawer.Screen name='Logout' component={Login} />
//     </Drawer.Navigator>
//   )
// }
