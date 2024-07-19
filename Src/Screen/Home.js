import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Card from '../Components/Card';

import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {card} from '../Components/data';
import {level2Cards} from '../Components/data';
import {level3Cards} from '../Components/data';
import {level4Cards} from '../Components/data';
import {useDispatch, useSelector} from 'react-redux';
import {changeCurrentLevel, changeLevel} from '../redux/LevelSlice';

const Home = props => {
  const dispatch = useDispatch();
  const level = useSelector(state => state.level.level);
  const currentLevel = useSelector(state => state.level.currentLevel);
  console.log('lev:', level);
  console.log('current lev:', currentLevel);

  const [totleTime, setTotalTime] = useState(
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
      : 90,
  );
  const [timeLeft, setTimeLeft] = useState(totleTime);

  const [shuffle, setShuffle] = useState(card);

  const [highScore, setHighScore] = useState({
    moves: 0,
    sec: 0,
  });
  const [won, setWon] = useState(false);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCard, setClearedCard] = useState({});
  const [moves, setMoves] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isVisisble, setIsVisible] = useState(false);
  const [scoreData, setScoreData] = useState({
    moves: '',
    sec: '',
  });

  const timer = useRef(null);
  const timeout = useRef(null);
  const animationRef = useRef(null);
  const flipSoundRef = useRef(null);
  const matchSoundRef = useRef(null);
  const alertFailSoundRef = useRef(null);
  const alertWonSoundRef = useRef(null);

  const getCardsForLevel = lev => {
    console.log('curent in get cards', lev);
    // Add more levels as needed
    switch (lev) {
      case 1:
        return card;
      case 2:
        return level2Cards;
      case 3:
        return level3Cards;
      case 4:
        return level4Cards;
      case 5:
        return level4Cards;
      case 6:
        return level4Cards;
      case 7:
        return level4Cards;
      // Add more cases for additional levels
      default:
        return card; // Default to level 1 cards if level is not recognized
    }
  };

  useEffect(() => {
    setTimeLeft(
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
        : 90,
    );
    setTimeout(() => {
      const newCards = getCardsForLevel(currentLevel);
      shuffleCards(newCards);
    }, 700);
  }, [level, currentLevel]);

  useEffect(() => {
    const cleanup = () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
    if (isStart) {
      shuffleCards(shuffle);
      timer.current = setInterval(() => {
        setTimeLeft(prevTime => Math.max(prevTime - 1, 0)); // Ensure timeLeft doesn't go negative

        if (timeLeft === 0) {
          setIsVisible(true);
          clearInterval(timer.current);
          setClearedCard({});
        }
      }, 1000);
    }
    return cleanup;
  }, [isStart]);

  useEffect(() => {
    if (timeLeft < 1) {
      setIsVisible(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    getLevel();
    getHighScore();
    setOpenCards([]);
    flipSoundRef.current = new Sound(
      require('../Assets/sound/flip.mp3'),
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      },
    );
    matchSoundRef.current = new Sound(
      require('../Assets/sound/match.mp3'),
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      },
    );
    alertFailSoundRef.current = new Sound(
      require('../Assets/sound/fail.mp3'),
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      },
    );
    alertWonSoundRef.current = new Sound(
      require('../Assets/sound/won.mp3'),

      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      },
    );

    // Cleanup sound on component unmount
    return () => {
      if (flipSoundRef.current) {
        flipSoundRef.current.release();
      }
      if (matchSoundRef.current) {
        matchSoundRef.current.release();
      }
      if (alertFailSoundRef.current) {
        alertFailSoundRef.current.release();
      }
      if (alertWonSoundRef.current) {
        alertWonSoundRef.current.release();
      }
    };
  }, []);

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(evaluate, 500);
    }
    if (Object.keys(clearedCard).length === shuffle.length / 2) {
      setWon(true);
      setScoreData({...scoreData, moves: moves, sec: totleTime - timeLeft});
      if (timer.current) {
        clearInterval(timer.current);
      }
      setIsVisible(true);
    }
  }, [openCards]);

  useEffect(() => {
    if (isVisisble) {
      if (won) {
        if (animationRef.current) {
          animationRef.current.play();
        }
        storeScore(scoreData).then(() => {
          getHighScore();
        });

        alertWonSound();
        chnageLevel();
      } else alertFailSound();
    } else {
      reInit();
    }
  }, [isVisisble]);

  function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      swap(array, currentIndex, randomIndex);
    }
    setShuffle(array);
  }

  const reInit = () => {
    setIsStart(false);
    setClearedCard({});
    setOpenCards([]);
    setTimeLeft(
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
        : 90,
    );
    getLevel();
    setMoves(0);
    setWon(false);
    setTimeout(() => {
      const newCards = getCardsForLevel(currentLevel);
      shuffleCards(newCards);
    }, 1000);
  };

  const flipSound = () => {
    console.log('flip sound called');

    if (flipSoundRef.current) {
      flipSoundRef.current.play();
    }
  };

  const matchSound = () => {
    console.log('flip sound called');

    if (matchSoundRef.current) {
      matchSoundRef.current.play();
    }
  };

  const alertFailSound = () => {
    console.log('loss sound called..');
    if (alertFailSoundRef.current) {
      alertFailSoundRef.current.play();
    }
  };
  const alertWonSound = () => {
    console.log('loss sound called..');
    if (alertWonSoundRef.current) {
      alertWonSoundRef.current.play();
    }
  };

  const handleCardClick = index => {
    if (openCards.length === 1) {
      flipSound();
      if (openCards.includes(index)) {
        return;
      } else {
        setOpenCards(prev => [...prev, index]);
      }

      setMoves(moves => moves + 1);
    } else {
      flipSound();
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    if (shuffle[first].type === shuffle[second].type) {
      setClearedCard(prev => ({...prev, [shuffle[first].type]: true}));
      matchSound();
      setOpenCards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 300);
  };

  const checkIsFlipped = index => {
    return openCards.includes(index);
  };

  const checkIsInactive = card => {
    return Boolean(clearedCard[card.type]);
  };

  const storeScore = async newObject => {
    console.log('coredata', newObject);
    try {
      const jsonValue = await AsyncStorage.getItem('scores');
      let array = jsonValue != null ? JSON.parse(jsonValue) : [];

      array.push(newObject);

      await AsyncStorage.setItem('scores', JSON.stringify(array));
      await AsyncStorage.setItem('highScore', JSON.stringify(array[0]));

      console.log('Object appended successfully');
    } catch (e) {
      console.error('Failed to append object:', e);
    }
  };

  const getHighScore = async () => {
    const high = await AsyncStorage.getItem('highScore');
    console.log('high :', high);
    if (high != undefined) {
      setHighScore(JSON.parse(high));
    }
  };

  const getLevel = async () => {
    const lev = await AsyncStorage.getItem('level');
    const curLev = await AsyncStorage.getItem('currentLevel');

    if (lev != undefined && curLev != undefined) {
      dispatch(changeLevel(JSON.parse(lev)));
      dispatch(changeCurrentLevel(JSON.parse(curLev)));
      console.log('local level', JSON.parse(curLev));
    } else {
      dispatch(changeLevel(1));
      dispatch(changeCurrentLevel(1));
    }
  };

  const chnageLevel = async () => {
    try {
      const temp = level + 1;
      const curTemp = currentLevel + 1;
      console.log('new level', temp);
      if (level == currentLevel) {
        await AsyncStorage.setItem('level', JSON.stringify(temp)).then(
          getLevel,
        );
      }
      await AsyncStorage.setItem('currentLevel', JSON.stringify(curTemp)).then(
        getLevel,
      );

      console.log('level updated successfully');
    } catch (e) {
      console.error('Failed to update level:', e);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#081829'}}>
      <ImageBackground
        source={require('../Assets/Images/BG1.webp')}
        style={styles.bg}>
        <View>
          <View style={styles.upperDiv}>
            <TouchableOpacity
              style={{alignItems: 'center', width: '20%'}}
              onPress={() => props.navigation.navigate('Rules')}>
              <Image
                source={require('../Assets/Images/info.png')}
                tintColor={'white'}
                style={styles.icon}
              />
              <Text style={[styles.txt, {fontSize: 12}]}>Rules</Text>
            </TouchableOpacity>
            <Text style={styles.time}>Timer : {timeLeft}</Text>
            <TouchableOpacity
              style={{alignItems: 'center', width: '19%'}}
              onPress={() => props.navigation.navigate('Scoreboard')}>
              <Image
                source={require('../Assets/Images/score.png')}
                tintColor={'white'}
                style={[styles.icon]}
              />
              <Text style={[styles.txt, {fontSize: 12}]}>Scores</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '24%',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 20,
              }}>
              <Image
                source={require('../Assets/Images/trophy.png')}
                style={styles.icon}
              />
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[styles.txt, {fontSize: 12}]}>Heighest Score</Text>
                <Text style={[styles.txt, {fontWeight: '500'}]}>
                  {highScore?.moves} Moves
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Levels')}>
              <Text style={[styles.time, {marginRight: 20}]}>
                Level : {currentLevel}/7
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.txt, {textAlign: 'center', marginBottom: 20}]}>
            Moves : {moves}
          </Text>
          <View
            style={{
              height: 520,
              justifyContent: 'center',
            }}>
            <View style={styles.cardDiv}>
              {shuffle.map((item, index) => {
                return (
                  <Card
                    data={item}
                    index={index}
                    isInactive={checkIsInactive(item)}
                    isfliped={checkIsFlipped(index)}
                    onCardClick={() => handleCardClick(index)}
                    isDisable={!isStart}
                    key={index}
                    level={currentLevel}
                  />
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              isStart ? reInit() : setIsStart(true);
            }}>
            <Text style={{fontWeight: '500', color: 'black'}}>
              {isStart ? 'Reset Game' : 'Start Game'}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal transparent={true} visible={isVisisble} animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 9,
            }}>
            <View style={styles.alert}>
              <Image
                source={
                  won
                    ? require('../Assets/Images/trophy.png')
                    : require('../Assets/Images/sad.webp')
                }
                style={{
                  height: 80,
                  width: 80,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
              />
              <Text style={styles.alertTitle}>
                {won ? 'YOU WON !!!' : 'You Loss...!'}
              </Text>

              <Text style={{textAlign: 'center', color: 'grey'}}>
                Moves : {moves}
              </Text>
              <TouchableOpacity
                style={styles.alertBtn}
                onPress={() => {
                  setIsVisible(false);
                }}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  {won
                    ? currentLevel < 7
                      ? 'Next Level'
                      : 'Play Again'
                    : 'Play Again'}
                </Text>
              </TouchableOpacity>

              {won ? (
                <LottieView
                  source={require('../Assets/Animations/won.json')}
                  ref={animationRef}
                  loop={false}
                  style={{
                    position: 'absolute',
                    zIndex: 999,
                    height: '300%',
                    width: '300%',
                    top: -140,
                    left: -380,
                  }}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  bg: {
    height: '100%',
  },
  time: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 14,
  },
  btn: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  icon: {
    height: 32,
    width: 32,
  },
  upperDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginTop: 10,
    width: '96%',
    alignSelf: 'center',
  },
  cardDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
    justifyContent: 'center',
  },
  alert: {
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 30,
    borderRadius: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  alertBtn: {
    backgroundColor: '#0D4398',
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
    zIndex: 1000,
  },
});
