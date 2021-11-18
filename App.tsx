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
      <Text style={style.content}>{label}</Text>
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
          style={value === '' ? {opacity: 0} : {opacity: 1}}
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
            style={[styles.all.button, ready ? styles.all.buttonEnabled : styles.all.buttonDisabled]}
            onPress={() => setLoading(true)}
            disabled={!ready}
            >
            {loading ? <ActivityIndicator /> : <Text>Continue</Text>}
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
    button: {
      height: 40,
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
