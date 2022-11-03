
import { StyleSheet, Text, View } from 'react-native'
import { PageTitle } from './src/components/Styles'
import { RootStack } from './src/navigator/RootStack'
import { Dash } from './src/screens/Dashboard'
import { Login } from './src/screens/Login'

export default function App() {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <RootStack />
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0892d0',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
