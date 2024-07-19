import {AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Routes from './Src/Routes/Routes';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import {changeCurrentLevel, changeLevel} from './Src/redux/LevelSlice';

const App = () => {
  const soundRef = useRef(null);
  const dispatch = useDispatch();

  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    intiateLevel();
  }, []);

  useEffect(() => {
    // Initialize the sound
    soundRef.current = new Sound(
      require('./Src/Assets/sound/backgound.mp3'),
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }

        soundRef.current.setNumberOfLoops(-1); // -1 means loop indefinitely
        soundRef.current.play();
        soundRef.current.setVolume(0.5);
      },
    );

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    setAppState(nextAppState);

    if (nextAppState.match(/inactive|background/)) {
      console.log('Pausing sound');
      if (soundRef.current && soundRef.current.isPlaying()) {
        soundRef.current.pause();
      }
    } else if (nextAppState === 'active') {
      console.log('Resuming sound');
      if (soundRef.current && !soundRef.current.isPlaying()) {
        soundRef.current.play();
      }
    }
  };

  const intiateLevel = async () => {
    const lev = await AsyncStorage.getItem('level');
    const curLev = await AsyncStorage.getItem('currentLevel');

    if (lev != undefined && curLev != undefined) {
      const levtemp = JSON.parse(lev);
      const curtemp = JSON.parse(lev);

      dispatch(changeCurrentLevel(curtemp));
      dispatch(changeLevel(levtemp));
    } else {
      dispatch(changeCurrentLevel(1));
      dispatch(changeLevel(1));
    }
  };
  return <Routes />;
};

export default App;
