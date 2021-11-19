/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import CheckBox from 'react-native-check-box';

const Input: React.FC<{
  value: string;
  label: string;
  placeholder: string;
  isPassword: boolean;
  isValid: boolean;
  onChangeText: object;
}> = ({value, label, placeholder, isPassword, isValid, onChangeText}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = isDarkMode ? styles.dark : styles.light;

  return (
    <View style={styles.all.inputContainer}>
      <Text style={[style.content, styles.all.font]}>{label}</Text>
      <View style={styles.all.inputFlex}>
        <TextInput
          value={value}
          secureTextEntry={isPassword}
          style={[style.content, styles.all.textInput]}
          placeholder={placeholder}
          placeholderTextColor={style.placeholderTextColor}
          onChangeText={(text) => onChangeText(text)}
          />
        <Image
          style={[
            {
              position: 'absolute',
              right: 0,
            },
            value === '' ? {opacity: 0} : {opacity: 1}
          ]}
          source={
            isValid
              ? require('./signup_assets/field_valid.png')
              : require('./signup_assets/field_invalid.png')
          }
          />
      </View>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = isDarkMode ? styles.dark : styles.light;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const emailValid = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9][A-Za-z0-9]+/.test(email);
  const passwordValid = (password.length >= 6);
  const usernameValid = (username.length >= 3);
  const ready = emailValid && passwordValid && usernameValid && termsAccepted;
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={[style.content, styles.all.topLevel]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={[style.header, {alignItems: 'center', justifyContent: 'center', height: 56}]}>
          {/*<Image style={{position: 'absolute', left: 0}} source={{backArrow}} />*/}
          <Text style={[style.header, styles.all.font, {textAlign: 'center'}]}>Sign up</Text>
        </View>
        <View style={style.content, styles.all.innerContent}>
          <View style={{height: 20}} />
          <Input
            value={email}
            label="Email"
            placeholder="example@gmail.com"
            isValid={emailValid}
            onChangeText={(text: string) => setEmail(text)}
            />
          <Input
            value={password}
            isPassword={true}
            label="Password"
            placeholder="minimum 6 characters"
            isValid={passwordValid}
            onChangeText={(text: string) => setPassword(text)}
            />
          <Input
            value={username}
            label="Username"
            placeholder="username"
            isValid={usernameValid}
            onChangeText={(text: string) => setUsername(text)}
            />
          <View style={{height: 12}} />
          <CheckBox
            rightText="I accept the terms & conditions and the privacy policy"
            rightTextStyle={[styles.all.buttonFont, style.content, {paddingLeft: 8}]}
            isChecked={termsAccepted}
            onClick={() => {setTermsAccepted(!termsAccepted)}}
            unCheckedImage={<Image style={{tintColor: style.imageTintColor}} source={require('./signup_assets/checkbox_empty.png')}/>}
            checkedImage={<Image style={{tintColor: style.imageTintColor}} source={require('./signup_assets/checkbox_full.png')}/>}
            />
          <View style={{height: 14}} />
          <TouchableOpacity
            style={[styles.all.button, ready ? styles.all.buttonEnabled : styles.all.buttonDisabled]}
            onPress={() => setLoading(true)}
            disabled={!ready}
            >
            {loading ? <ActivityIndicator /> : <Text style={styles.all.buttonFont}>Continue</Text>}
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
      backgroundColor: '#1c1c1e',
    },
    content: {
      color: 'white',
      backgroundColor: 'black',
    },
    placeholderTextColor: '#9b9b9b',
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
    topLevel: {
      flex: 1,
    },
    innerContent: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    inputContainer: {
      marginTop: 4,
      marginBottom: 12,
    },
    inputFlex: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 34,
    },
    textInput: {
      flex: 1,
      padding: 0,
      marginTop: 4,
      borderBottomColor: '#c6c6c6',
      borderBottomWidth: StyleSheet.hairlineWidth,
      fontSize: 16,
    },
    button: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
    buttonDisabled: {
      backgroundColor: '#9b9b9b',
      alignItems: 'center',
    },
    buttonEnabled: {
      backgroundColor: '#1d83ea',
      alignItems: 'center',
    },
    font: {
      fontSize: 16,
      letterSpacing: -0.25,
    },
    buttonFont: {
      fontSize: 16,
      color: 'white',
    },
  },
});

export default App;
