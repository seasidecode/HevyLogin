/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  useColorScheme,
  View,
} from 'react-native';
import CheckBox from 'react-native-check-box';

const Input = ({label, placeholder, isPassword, validateCallback}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = isDarkMode ? styles.dark : styles.light;
  const [fieldState, setFieldState] = useState('hidden');

  return (
    <View style={styles.all.inputContainer}>
      <Text style={style.content}>{label}</Text>
      <View style={styles.all.inputFlex}>
        <TextInput
          secureTextEntry={isPassword}
          style={[style.content, styles.all.textInput]}
          placeholder={placeholder}
          placeholderTextColor={style.placeholderTextColor}
          onChangeText={(text: string) => {
            if (text === '')
              setFieldState('hidden');
            else
              setFieldState(validateCallback(text) ? 'ok' : 'error');
          }}
          />
        <Image
          style={fieldState === 'hidden' ? {opacity: 0} : {opacity: 1}}
          source={
            fieldState === 'ok'
              ? require('./signup_assets/field_valid.png')
              : require('./signup_assets/field_invalid.png')
          }
          />
      </View>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = isDarkMode ? styles.dark : styles.light;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setusername] = useState();
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={style.content}>
          <Input
            label="Email"
            placeholder="example@gmail.com"
            validateCallback={(text: string) => {
              const valid = /^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z0-9][A-Za-z0-9]+/.test(text);
              setEmail(valid ? text : null);
              return valid;
            }}
            />
          <Input
            isPassword={true}
            label="Password"
            placeholder="minimum 6 characters"
            validateCallback={(text: string) => {
              const valid = (text.length >= 6);
              setPassword(valid ? text : null);
              return valid;
            }}
            />
          <Input
            label="Username"
            placeholder="username"
            validateCallback={(text: string) => {
              const valid = (text.length >= 3);
              setUsername(valid ? text : null);
              return valid;
            }}
            />
          <CheckBox
            rightText="I accept the terms & conditions and the privacy policy"
            rightTextStyle={style.content}
            isChecked={termsAccepted}
            onClick={() => {setTermsAccepted(!termsAccepted)}}
            unCheckedImage={<Image style={{tintColor: style.imageTintColor}} source={require('./signup_assets/checkbox_empty.png')}/>}
            checkedImage={<Image style={{tintColor: style.imageTintColor}} source={require('./signup_assets/checkbox_full.png')}/>}
            />
          <Button disabled={!(email && password && username && termsAccepted)} title="Continue" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dark: {
    content: {
      color: 'white',
      backgroundColor: 'black',
    },
    placeholderTextColor: 'grey',
    imageTintColor: 'grey',
  },
  light: {
    content: {
      color: 'black',
      backgroundColor: 'white',
    },
    placeholderTextColor: 'grey',
    imageTintColor: null,
  },
  all: {
    inputContainer: {
      marginBottom: 10,
    },
    inputFlex: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
});

export default App;
