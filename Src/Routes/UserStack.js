import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Splash from '../Screen/Splash';
import Home from '../Screen/Home';
import Rules from '../Screen/Rules';
import Scoreboard from '../Screen/Scoreboard';
import Login from '../Screen/Login';
import Register from '../Screen/Register';
import Levels from '../Screen/Levels';

const Stack = createStackNavigator();
const UserStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        cardStyle: {backgroundColor: 'black'},
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Rules" component={Rules} />
      <Stack.Screen name="Scoreboard" component={Scoreboard} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Levels" component={Levels} />
    </Stack.Navigator>
  );
};

export default UserStack;
