import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const Card = ({
  data,
  onCardClick = () => {},
  isfliped,
  isInactive,
  isDisable,
  level,
}) => {
  const rotateY = useSharedValue(0);

  useEffect(() => {
    flipCard(isfliped, isInactive);
  }, [isfliped, isInactive]);

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotateY.value}deg`}],
      backfaceVisibility: 'hidden',
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotateY.value + 180}deg`}],
      backfaceVisibility: 'hidden',
    };
  });

  const flipCard = isfliped => {
    rotateY.value = withTiming(isfliped || isInactive ? 0 : 180, {
      duration: 300,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCardClick} disabled={isDisable}>
        <View>
          <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: isInactive ? '#dddddd' : '#5FC9F8',
                height:
                  level == 1
                    ? 120
                    : level == 2
                    ? 100
                    : level == 3
                    ? 90
                    : level == 4
                    ? 80
                    : level == 5
                    ? 80
                    : level == 6
                    ? 80
                    : level == 7
                    ? 80
                    : 120,
                width:
                  level == 1
                    ? 100
                    : level == 2
                    ? 80
                    : level == 3
                    ? 80
                    : level == 4
                    ? 74
                    : level == 5
                    ? 74
                    : level == 6
                    ? 74
                    : level == 7
                    ? 74
                    : 100,
              },
              frontStyle,
            ]}>
            <Image source={data?.img} style={{height: 60, width: 60}} />
            {isInactive ? (
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgba(211, 211, 211, 0.5)',
                  position: 'absolute',
                }}></View>
            ) : (
              <></>
            )}

            {/* <Text style={styles.text}>{data?.type}</Text> */}
          </Animated.View>
          <Animated.View
            style={[
              styles.card,
              styles.back,
              backStyle,
              {
                height:
                  level == 1
                    ? 120
                    : level == 2
                    ? 100
                    : level == 3
                    ? 90
                    : level == 4
                    ? 80
                    : level == 5
                    ? 80
                    : level == 6
                    ? 80
                    : level == 7
                    ? 80
                    : 120,
                width:
                  level == 1
                    ? 100
                    : level == 2
                    ? 80
                    : level == 3
                    ? 80
                    : level == 4
                    ? 74
                    : level == 5
                    ? 74
                    : level == 6
                    ? 74
                    : level == 7
                    ? 74
                    : 100,
              },
            ]}>
            <ImageBackground
              source={require('../Assets/Images/card2.png')}
              style={{
                height: '98%',
                width: '100%',
                marginLeft: 1.5,
                marginTop: 1.5,
              }}
              borderRadius={8}
              resizeMode="cover"
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isInactive ? (
        <>
          <LottieView
            source={require('../Assets/Animations/shine.json')}
            // ref={animationRef}
            loop={false}
            autoPlay
            style={{
              position: 'absolute',
              zIndex: 999,
              top: -48,
              left: -40,
              height: '100%',
              width: '100%',
            }}
          />
          <LottieView
            source={require('../Assets/Animations/shine.json')}
            // ref={animationRef}
            loop={false}
            autoPlay
            style={{
              position: 'absolute',
              zIndex: 999,
              top: 48,
              left: 40,
              height: '100%',
              width: '100%',
            }}
          />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
  },

  card: {
    height: 100,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: '#5FC9F8',
    borderRadius: 8,
    padding: 0.3,
  },

  back: {
    transform: [{rotateY: '180deg'}],
    position: 'absolute',
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
});

export default Card;
