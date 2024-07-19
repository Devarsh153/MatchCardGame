import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = props => {
  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../Assets/Images/BG1.webp')}
        style={styles.bg}>
        <View style={styles.main}>
          <Image
            style={styles.frame}
            source={require('../Assets/Images/loginFrame.png')}
          />
          <View style={styles.inputDiv}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../Assets/Images/logo.png')}
                style={styles.logo}
              />
              <Text style={styles.title}>Sign In </Text>
            </View>
            <View style={{width: '100%'}}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor={'#5FC9F8'}
              />
              <TextInput
                placeholder="Password"
                style={styles.input}
                placeholderTextColor={'#5FC9F8'}
                secureTextEntry={true}
              />
            </View>
            <RectButton style={styles.btn}>
              <Text style={styles.btnTxt}>Sign In</Text>
            </RectButton>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  bg: {
    height: 780,
  },
  text: {
    color: '#5FC9F8',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  frame: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    height: 530,
    width: 340,
  },
  main: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
    padding: 10,
  },
  input: {
    borderWidth: 1.3,
    borderColor: '#5FC9F8',
    borderRadius: 4,
    paddingLeft: 12,
    color: '#5FC9F8',
    marginVertical: 8,
  },
  inputDiv: {
    width: '76%',
    height: '70%',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'rgba(137,207,240,0.4)',
    width: '80%',
    padding: 16,
    borderRadius: 6,
  },
  btnTxt: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginTop: -40,
    marginBottom: 4,
  },
});
