import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { AllotedInspector } from './AllocateInspector'
import moment from 'moment/moment'
import { PageTitle, SubTitle1 } from '../components/Styles'

export default function QRcodeScanner({navigation}) {
  const [hasPermission, setHasPermission] = React.useState(false)
    const [scanData, setScanData] = React.useState()
    
    
    var now = moment().format('YYYY-MM-DD')
    console.log(now)

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    )
  }

  const handleBarCodeScanned = ({ data }) => {
      setScanData(data)
      var hashStr = data
      var [firstHalf, secondHalf] = hashStr.split(',')
      if (new Date(secondHalf) > new Date(now)) {
          
          console.log('done')
        
      }
      else {
            navigation.navigate('InvalidToken')
      }
    console.log(firstHalf)
    //   console.log(`Type: ${type}`)
           

  }

    return (
        <>
            <SubTitle1/>
        <PageTitle>QR Code Scanner</PageTitle>
        <View style={styles.container}>
          <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
          />
          {scanData && (
            <Button
              title='Scan Again?'
              onPress={() => setScanData(undefined)}
            />
          )}
          <StatusBar style='auto' />
        </View>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
