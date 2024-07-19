import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {changeCurrentLevel} from '../redux/LevelSlice';

const Levels = props => {
  const level = useSelector(state => state.level.level);
  const dispatch = useDispatch();
  const levels = [1, 2, 3, 4, 5, 6, 7];
  const chnageLevel = async item => {
    try {
      await AsyncStorage.setItem('currentLevel', JSON.stringify(item)).then(
        () => {
          dispatch(changeCurrentLevel(item));
          props.navigation.goBack();
        },
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
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../Assets/Images/back.png')}
              tintColor={'white'}
              style={{height: 28, width: 28}}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Levels</Text>
        </View>
        <View style={styles.container}>
          {levels?.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => chnageLevel(item)}>
                <ImageBackground
                  source={
                    item <= level
                      ? require('../Assets/Images/levelCard.png')
                      : require('../Assets/Images/levelCard2.png')
                  }
                  style={styles.card}>
                  <View style={styles.main}>
                    <Text
                      style={[
                        styles.title,
                        {color: item <= level ? '#5FC9F8' : 'grey'},
                      ]}>
                      {item}
                    </Text>
                    <Text
                      style={[
                        styles.sub,
                        {color: item <= level ? '#5FC9F8' : '#555555'},
                      ]}>
                      Level
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Levels;

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  text: {
    color: '#5FC9F8',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  main: {
    alignItems: 'center',
    marginTop: 26,
  },
  title: {
    color: '#5FC9F8',
    fontWeight: 'bold',
    fontSize: 30,
  },
  sub: {
    color: '#5FC9F8',
    fontSize: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  card: {
    height: 122,
    width: 110,
    margin: 3,
  },
  header: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '500',
  },
});
