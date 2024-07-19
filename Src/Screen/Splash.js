import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Home');
    }, 500);
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: '#081829'}}>
      <ImageBackground
        source={require('../Assets/Images/BG1.webp')}
        style={styles.bg}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              borderRadius: 22,
              height: 80,
              width: 80,
              alignSelf: 'center',
              borderWidth: 3,
              borderColor: '#5FC9F8',
            }}>
            <Image
              source={require('../Assets/Images/logo.png')}
              style={{
                borderRadius: 20,
                height: '100%',
                width: '100%',
                alignSelf: 'center',
              }}
            />
          </View>
          <Text style={styles.text}>MemoryMatch</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  bg: {
    height: '100%',
  },
  text: {
    color: '#5FC9F8',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
});
