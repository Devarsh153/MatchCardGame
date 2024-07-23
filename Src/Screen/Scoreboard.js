import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Scoreboard = props => {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    getScore();
  }, []);

  const getScore = async () => {
    const jsonValue = await AsyncStorage.getItem('scores');
    let array = jsonValue != null ? JSON.parse(jsonValue) : [];
    await AsyncStorage.setItem('highScore', JSON.stringify(array[0]));
    const sortedScores = array.sort((a, b) => a.moves - b.moves);
    const temp = sortedScores.map((score, index) => ({...score, index}));
    setScores(temp);
  };

  const renderItem = ({item}) => {
    return (
      <>
        {item?.index > 2 ? (
          <View style={styles.scoreDiv}>
            <Text
              style={[
                styles.score,
                {
                  fontWeight: '600',
                  fontSize: 16,
                  width: '20%',
                  textAlign: 'center',
                },
              ]}>
              {item?.index + 1}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '60%',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../Assets/Images/trophy.png')}
                style={{height: 20, width: 20, marginRight: 6, marginLeft: -8}}
              />
              <Text style={styles.score}>{item.moves} Moves</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '20%',
                justifyContent: 'center',
              }}>
              <Text style={[styles.score]}>{item.sec}s</Text>
            </View>
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#081829'}}>
      <ImageBackground
        source={require('../Assets/Images/BG1.webp')}
        style={styles.bg}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.header}>
          <Image
            source={require('../Assets/Images/back.png')}
            tintColor={'white'}
            style={{height: 24, width: 24, marginRight: 10}}
          />
          <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>
            Scoreboard
          </Text>
        </TouchableOpacity>
        <View style={styles.upperDiv}>
          <View style={styles.card}>
            <Image
              source={require('../Assets/Images/trophy.png')}
              style={{height: 50, width: 50}}
            />
            <Text style={[styles.rank, {fontSize: 14, top: 20}]}>2</Text>
            <Text style={styles.title}>{scores[1]?.moves || null} Moves</Text>
            <Text style={styles.sub}>{scores[1]?.sec || null} sec</Text>
          </View>
          <View style={[styles.card, {height: 140, width: 110}]}>
            <Image
              source={require('../Assets/Images/trophy.png')}
              style={{height: 60, width: 60}}
            />
            <Text style={styles.rank}>1</Text>
            <Text style={styles.title}>{scores[0]?.moves || null} Moves</Text>
            <Text style={styles.sub}>{scores[0]?.sec || null} sec</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require('../Assets/Images/trophy.png')}
              style={{height: 50, width: 50}}
            />
            <Text style={[styles.rank, {fontSize: 14, top: 20}]}>3</Text>
            <Text style={styles.title}>{scores[2]?.moves || null} Moves</Text>
            <Text style={styles.sub}>{scores[2]?.sec || null} sec</Text>
          </View>
        </View>
        <View style={styles.listDiv}>
          <View style={styles.tableHead}>
            <Text style={[styles.heading, {width: '20%'}]}>Rank</Text>
            <Text style={[styles.heading, {width: '60%'}]}>Moves</Text>
            <Text style={[styles.heading, {width: '20%'}]}>Time</Text>
          </View>
          <View style={{height: 450}}>
            <FlatList data={scores} renderItem={renderItem} />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Scoreboard;

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    paddingHorizontal: 14,
  },
  card: {
    backgroundColor: 'rgba(225,225,225,0.4)',
    height: 120,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '400',
    color: 'white',
    marginTop: 2,
  },
  sub: {
    fontWeight: '500',
    color: 'white',
  },
  upperDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: 50,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  score: {
    color: 'white',
  },
  scoreDiv: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.6,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rank: {
    fontSize: 16,
    color: '#7b481c',
    fontWeight: '600',
    position: 'absolute',
    top: 25,
  },
  listDiv: {
    marginTop: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
  },
  tableHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 8,
  },
  heading: {
    color: 'black',
    fontWeight: '500',

    textAlign: 'center',

    paddingVertical: 6,
  },
});
