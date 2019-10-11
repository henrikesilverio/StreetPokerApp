import React from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';

const list = [
  {
    id: 1,
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    id: 2,
    name: 'Chris Jackson 1',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
];

const onPressFromLeft = (player) => {
  Alert.alert(
    'Rebuy',
    `Confirma o rebuy do ${player.name}?`,
    [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirmar', onPress: () => console.log('OK Pressed')
      },
    ]
  );
}

const onPressFromRight = (player) => {
  Alert.alert('Eliminação', `Confirma a eliminação do ${player.name} na posição ${list.length}?.`);
}

const LeftActions = ({ progress, dragX, player }) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  return (
    <TouchableOpacity onPress={() => onPressFromLeft(player)}>
      <View style={styles.leftAction}>
        <Animated.Text
          style={[styles.actionText,
          {
            transform: [{ scale }]
          }
          ]}>
          Rebuy
        </Animated.Text>
      </View>
    </TouchableOpacity>
  )
}

const RightActions = ({ progress, dragX, player }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <TouchableOpacity onPress={() => onPressFromRight(player)}>
      <View style={styles.rightAction}>
        <Animated.Text
          style={[styles.actionText,
          {
            transform: [{ scale }]
          }
          ]}>
          Eliminar
        </Animated.Text>
      </View>
    </TouchableOpacity>
  )
}

const Ranking = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View>
        {
          list.map((item, i) => (
            <Swipeable
              key={i}
              renderLeftActions={(progress, dragX) =>
                <LeftActions progress={progress} dragX={dragX} player={item} />
              }
              renderRightActions={(progress, dragX) =>
                <RightActions progress={progress} dragX={dragX} player={item} />
              }
            >
              <ListItem
                title={item.name}
                subtitle={item.subtitle}
                leftAvatar={{ source: { uri: item.avatar_url } }}
                bottomDivider
              />
            </Swipeable>
          ))
        }
      </View>
    </ScrollView>
  </SafeAreaView>
);

Ranking.navigationOptions = {
  title: 'Ranking',
  headerStyle: {
    backgroundColor: '#212121',
  },
  headerTintColor: '#ffc107',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

export default Ranking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238'
  },
  leftAction: {
    backgroundColor: '#4caf50',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 3.5
  },
  rightAction: {
    backgroundColor: '#f44336',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 3.5
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
    fontSize: 20
  }
});