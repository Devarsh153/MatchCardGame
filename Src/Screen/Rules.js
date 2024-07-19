import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const Rules = props => {
  const currentLevel = useSelector(state => state.level.currentLevel);
  const sec =
    currentLevel == 2
      ? 90
      : currentLevel == 3
      ? 100
      : currentLevel == 4
      ? 120
      : currentLevel == 5
      ? 100
      : currentLevel == 6
      ? 90
      : currentLevel == 7
      ? 80
      : 90;

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <ImageBackground
        source={require('../Assets/Images/BG1.webp')}
        style={styles.bg}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={require('../Assets/Images/back.png')}
            tintColor={'white'}
            style={{height: 30, width: 30, marginTop: 12}}
          />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.title}>How to Play:</Text>
            <Text style={styles.txt}>
              1. All card will be fliped back side , to start the game you nedd
              to press 'Start Game'.
            </Text>
            <Text style={styles.txt}>
              2. User have to tap on the card.User has to flip two card in
              singlr move one by one , if the cards are matchhing card it will
              be freez and and can continue with other cards.
            </Text>
            <Text style={styles.txt}>
              3. If the timer secods are completed the game will be over and you
              will loss.
            </Text>
            <Text style={styles.txt}>
              4. If you open all the pair of matching cards in a time limit you
              will win the game and your score of move will be recorded.
            </Text>
            <Text style={styles.txt}>
              5. You can reset the game in between by clicking 'Reset Game'
              button.
            </Text>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.title}>Rules for Level : {currentLevel}</Text>
            <Text style={styles.txt}>
              1. In level{' '}
              <Text style={{fontWeight: '500'}}>{currentLevel}</Text> , you will
              get <Text style={{fontWeight: '500'}}>{sec}</Text> seconds to
              complate the level.
            </Text>
            <Text style={styles.txt}>
              2. Without complating this level you can't acces the next level,
              but to play the previouse cleared leveles.
            </Text>
            <Text style={styles.txt}>
              3. To slected the level you can click on the level text on Main
              page {'(ex.level : 3/7)'}.
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Rules;

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginVertical: 10,
  },
  txt: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '300',
  },
});
