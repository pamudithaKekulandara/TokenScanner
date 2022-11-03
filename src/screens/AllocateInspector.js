import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import axios from 'axios'

import {
  StyledContainer,
  InnerContainer,
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
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { KeyBoardAvoidingWrapper } from '../components/KeyBoardAvoidingWrapper.js'

const { brand, darkLight, primary } = colors

export const AllotedInspector = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date(2000, 0, 1))

  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  //actual date of birth to be sent
  const [aDate, setADate] = useState()
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(false)
    setDate(currentDate)
    setADate(currentDate)
  }

  const showDatePicker = () => {
    setShow(true)
  }

  const handleSignup = (credentials) => {
    axios
      .post(
        'https://travels-ticket-booking.herokuapp.com/allocateInsp/add',
        credentials
      )
      .then((res) => {
        console.log(res.data)
        navigation.navigate('TicketDashboard')
      })
      .catch((err) => {
        console.log(err)
      })
    console.log(credentials)
  }

  return (
    <KeyBoardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style='dark' />
        <InnerContainer>
          <PageTitle>Ticket Booking</PageTitle>
          <SubTitle>Allocate Inspector</SubTitle>
          {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode='date'
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}
          <Formik
            initialValues={{
              ID: '',
              route: '',
              date: '',
              aDate
            }}
            onSubmit={(values) => {
              if (
                values.AllotedInspector == '' ||
                values.route == '' ||
                values.data == ''
              ) {
                handleMessage('Please fill all the fields')
                setSubmitting(false)
              } else {
                handleSignup(values)
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <InputCd
                  label='Allotted Inspector ID'
                  icon='person'
                  placeholder='Enter the ID'
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('ID')}
                  onBlur={handleBlur('ID')}
                  value={values.ID}
                />

                <InputCd
                  label='Allotted Route'
                  icon='location'
                  placeholder='Enter the route'
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('route')}
                  onBlur={handleBlur('route')}
                  value={values.email}
                />

                <InputCd
                  label='Alloted Date'
                  icon='calendar'
                  placeholder='YYYY - MM - DD'
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('date')}
                  onBlur={handleBlur('date')}
                  value={aDate ? aDate.toDateString() : ''}
                  isDate={true}
                  editable={true}
                  showDatePicker={showDatePicker}
                />
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Submit</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
          <Line />
        </InnerContainer>
      </StyledContainer>
    </KeyBoardAvoidingWrapper>
  )
}

export const InputCd = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={20} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {/* {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )} */}
    </View>
  )
}
