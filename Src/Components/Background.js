import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

const Background = ({children}) => {
  return (
    <ImageBackground
      source={require('../Assets/Images/BG1.webp')}
      style={styles.background}>
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 14,
  },
  overlay: {
    flex: 1,
  },
});

export default Background;
