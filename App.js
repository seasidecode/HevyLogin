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
  TouchableOpacity,
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
  const [username, setUsername] = useState();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const ready = email && password && username && termsAccepted;
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={[style.header, {alignItems: 'center', justifyContent: 'center', height: 40}]}>
          {/*<Image style={{position: 'absolute', left: 0}} source={{backArrow}} />*/}
          <Text style={[style.header, {textAlign: 'center'}]}>Sign up</Text>
        </View>
        <View style={style.content}>
          <View style={{height: 20}} />
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
          <View style={{height: 20}} />
          <TouchableOpacity
            style={ready ? styles.all.buttonEnabled : styles.all.buttonDisabled}
            onPress={() => {setLoading(true);}}
            disabled={!ready}
            >
            <Text>{loading ? 'Loading...' : 'Continue'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dark: {
    header: {
      color: 'white',
      backgroundColor: '#333',
    },
    content: {
      color: 'white',
      backgroundColor: 'black',
    },
    placeholderTextColor: 'grey',
    imageTintColor: 'grey',
  },
  light: {
    header: {
      color: 'black',
      backgroundColor: 'white',
    },
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
      justifyContent: 'center',
    },
    textInput: {
      flex: 1,
      paddingTop: 0,
      paddingBottom: 0,
    },
    buttonDisabled: {
      padding: 10,
      backgroundColor: 'darkgrey',
      alignItems: 'center',
    },
    buttonEnabled: {
      padding: 10,
      backgroundColor: '#69f',
      alignItems: 'center',
    },
  },
});

export default App;
