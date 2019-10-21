import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';

const LeftActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  return (
    <TouchableOpacity onPress={onPress}>
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

const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <TouchableOpacity onPress={onPress}>
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

const Ranking = ({ navigation }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers([
      {
        id: 1,
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        rebuy: 0,
        position: 0,
        deleted: false,
        ref: React.createRef()
      },
      {
        id: 2,
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        rebuy: 0,
        position: 0,
        deleted: false,
        ref: React.createRef()
      },
      {
        id: 3,
        name: 'Alan Pearson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        rebuy: 0,
        position: 0,
        deleted: false,
        ref: React.createRef()
      },
    ]);
  }, []);

  const onPressFromLeft = (player) => {
    Alert.alert(
      'Rebuy',
      `Confirma o rebuy do ${player.name}?`,
      [
        {
          text: 'Cancelar',
          onPress: () => {
            player.ref.current.close();
          },
          style: 'cancel',
        },
        {
          text: 'Confirmar', onPress: () => {
            player.rebuy += 1;
            player.ref.current.close();
            setPlayers([...players]);
          }
        },
      ]
    );
  }

  const onPressFromRight = (player) => {
    const position = players.filter((player) => { 
      return !player.deleted; 
    }).length;
    Alert.alert(
      'Eliminação',
      `Confirma a eliminação do ${player.name} na posição ${position}?.`,
      [
        {
          text: 'Cancelar',
          onPress: () => {
            player.ref.current.close();
            console.log(player.ref);
          },
          style: 'cancel',
        },
        {
          text: 'Confirmar', onPress: () => {
            player.position = position;
            player.deleted = true;
            player.ref.current.close();
            setPlayers([...players]);            
          }
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Card title="JOGANDO" containerStyle={styles.card}>
            {
              players.filter((player) => { return !player.deleted; }).map((player) => {
                return (
                  <Swipeable
                    key={player.id}
                    ref={player.ref}
                    overshootLeft={false}
                    overshootRight={false}
                    renderLeftActions={(progress, dragX) =>
                      <LeftActions progress={progress} dragX={dragX} onPress={() => onPressFromLeft(player)} />
                    }
                    renderRightActions={(progress, dragX) =>
                      <RightActions progress={progress} dragX={dragX} onPress={() => onPressFromRight(player)} />
                    }
                  >
                    <ListItem
                      title={player.name}
                      leftAvatar={{ source: { uri: player.avatar_url } }}
                      badge={{
                        value: `Rebuy ${player.rebuy}`,
                        textStyle: { color: 'black', fontSize: 16 },
                        badgeStyle: { padding: 12 },
                        containerStyle: { marginTop: 0 },
                        size: 'large',
                        status: 'success'
                      }}
                      bottomDivider
                    />
                  </Swipeable>
                )
              })
            }
          </Card>
        </View>
        <View>
          <Card title="ELIMINADOS" containerStyle={styles.card}>
            {
              players.filter((player) => { return player.deleted; })
                .sort((a, b) => a.position > b.position)
                .map((player) => {
                return (
                  <ListItem
                    key={player.id}
                    title={player.name}
                    subtitle={`Rebuy ${player.rebuy} | Posição: ${player.position}`}
                    leftAvatar={{ source: { uri: player.avatar_url } }}
                    bottomDivider
                  />
                )
              })
            }
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    backgroundColor: '#e0dfdf'
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
  },
  card: {
    marginHorizontal: 0, 
    paddingHorizontal: 0
  }
});