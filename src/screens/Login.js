import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../components/Styles.js'
import { Formik } from 'formik'
import { View, ActivityIndicator } from 'react-native'
import { KeyBoardAvoidingWrapper } from '../components/KeyBoardAvoidingWrapper.js'

const { brand, darkLight, primary } = colors

async function save(key,value) {
  await SecureStore.setItemAsync(key,value)
}

export const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  const handleLogin = async (credentials) => {
    const url = 'https://travels-ticket-booking.herokuapp.com/user/login'
    await axios
      .post(url, credentials)
      .then(async (res) => {
        const result = res.data
          console.log(result)
          save(result.data[0]._id, JSON.stringify(result.data[0]._id))

        const { message, status, data } = result

        if (status == 'SUCESS') {
        } else {
          // NavigationPreloadManager.navigate('Welcome', { ...data[0]});
          console.log(message, status)
          navigation.navigate('TicketDashboard')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const handleMessage = (message, type = 'FAILD') => {
  //   setMessage(message)
  //   setMessageType(type)
  // }

  return (
    <>
      <StyledContainer>
        <StatusBar style='dark' />
        <InnerContainer>
          <PageLogo
            resizeMode='cover'
            source={require('./../../assets/logo.png')}
          />
          <PageTitle>Ticket Booking</PageTitle>
          <SubTitle>Accont Login</SubTitle>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
              console.log(values)
              if (values.email == '' || values.password == '') {
                handleMessage('please fill all the fields')
              } else {
                handleLogin(values)
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <InputCd
                  label='Email'
                  icon='mail'
                  placeholder='enter email'
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType='email-address'
                />

                <InputCd
                  label='Password'
                  icon='lock'
                  placeholder='* * * * * * *'
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>

                {/* {isSubmitting && (
                <StyledButton disabled={true}>
                  <ActivityIndicator size='large' color={primary} />
                </StyledButton>
              )} */}
                <Line />
                {/* <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name='google' color={primary} size={25} />
                  <ButtonText google={true}> Sign in with Google</ButtonText>
                </StyledButton> */}
                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink
                    onPress={() => {
                      navigation.navigate('Signup')
                    }}
                  >
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </>
  )
}

export const InputCd = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'md-eye-off' : 'md-eye'}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  )
}
