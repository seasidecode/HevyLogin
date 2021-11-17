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

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: isDarkMode ? 'black' : 'white',
          }}>
          <Text>Email</Text>
          <TextInput placeholder="example@gmail.com" />
          <Text>Password</Text>
          <TextInput secureTextEntry placeholder="minimum 6 characters" />
          <Text>Username</Text>
          <TextInput placeholder="username" />
          <CheckBox
            rightText="I accept the terms & conditions and the privacy policy"
            isChecked={termsAccepted}
            onClick={() => {setTermsAccepted(!termsAccepted)}}
            unCheckedImage={<Image source={require('./signup_assets/checkbox_empty.png')}/>}
            checkedImage={<Image source={require('./signup_assets/checkbox_full.png')}/>}
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
});

export default App;
