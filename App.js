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

const Input = ({label, placeholder, isPassword}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = isDarkMode ? styles.dark : styles.light;
  return (
    <View style={styles.all.inputContainer}>
      <Text style={style.content}>{label}</Text>
      <View style={styles.all.inputFlex}>
        <TextInput
          secureTextEntry={isPassword}
          style={[style.content, styles.all.textInput]}
          placeholder={placeholder}
          placeholderTextColor={style.placeholderTextColor}
          />
        <Image source={require('./signup_assets/field_invalid.png')}/>
      </View>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = isDarkMode ? styles.dark : styles.light;
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={style.content}>
          <Input label="Email" placeholder="example@gmail.com" />
          <Input isPassword={true} label="Password" placeholder="minimum 6 characters" />
          <Input label="Username" placeholder="username" />
          <CheckBox
            rightText="I accept the terms & conditions and the privacy policy"
            rightTextStyle={style.content}
            isChecked={termsAccepted}
            onClick={() => {setTermsAccepted(!termsAccepted)}}
            unCheckedImage={<Image style={{tintColor: style.imageTintColor}} source={require('./signup_assets/checkbox_empty.png')}/>}
            checkedImage={<Image style={{tintColor: style.imageTintColor}} source={require('./signup_assets/checkbox_full.png')}/>}
            />
          <Button title="Continue" />
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
