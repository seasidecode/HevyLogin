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

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? 'white' : 'black',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? 'white' : 'black',
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const getStyle = (): object => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = isDarkMode ? styles.dark : styles.light;
  return style;
};

const Label = ({children}): Node => {
  return (
    <Text style={getStyle().content}>{children}</Text>
  );
};

const Input = ({placeholder}): Node => {
  const style = getStyle();
  return (
    <TextInput style={style.content} placeholder={placeholder} placeholderTextColor={style.placeholderTextColor} />
  );
};

const PasswordInput = ({placeholder}): Node => {
  const style = getStyle();
  return (
    <TextInput secureTextEntry style={style.content} placeholder={placeholder} placeholderTextColor={style.placeholderTextColor} />
  );
};
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = isDarkMode ? styles.dark : styles.light;
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={style.content}>
          <Label>Email</Label>
          <Input placeholder="example@gmail.com" />
          <Label>Password</Label>
          <PasswordInput placeholder="minimum 6 characters" />
          <Label>Username</Label>
          <Input placeholder="username" />
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
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
});

export default App;
