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
import { ListItem, Card, Icon } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import { db } from "../services/firebase";
import { _ } from 'underscore';

let championshipCurrent = {};
let gameCurrent = {};

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

const SaveHistoric = (historic) => {
  Alert.alert(
    'Salvar Historico',
    `Confirma todas informações ?`,
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar', onPress: () => {
          gameCurrent.historic = _.map(historic, (historicPlayer) => {
            return {
              played: historicPlayer.played,
              player: historicPlayer.player,
              playerId: historicPlayer.playerId,
              ranking: historicPlayer.ranking,
              retries: historicPlayer.retries,
            };
          });
          db.collection("championships")
            .doc(championshipCurrent.id)
            .update(championshipCurrent)
            .then(result => {
              console.log(result);
            });
          console.log(championshipCurrent.id);
          console.log(championshipCurrent.games[4]);
        }
      },
    ]
  );
}

const Ranking = () => {
  const [historic, setHistoric] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const start = new Date(currentYear, currentMonth, 1).getTime() / 1000;
  const end = new Date(currentYear, currentMonth + 1, 0).getTime() / 1000;
  const now = new Date().getTime() / 1000;

  useEffect(() => {
    db.collection("championships").where("endDate", ">=", new Date()).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().endDate.seconds >= now) {
          championshipCurrent = doc.data();
          championshipCurrent.id = doc.id;
        }
      });

      if (championshipCurrent) {
        gameCurrent = _.find(championshipCurrent.games, (game) => {
          return start <= game.date.seconds && end >= game.date.seconds;
        });

        const historic = _.map(gameCurrent.historic, (historic) => {
          return {
            played: historic.played,
            player: historic.player,
            playerId: historic.playerId,
            ranking: historic.ranking,
            retries: historic.retries,
            deleted: false,
            ref: React.createRef()
          };
        });
        setHistoric(historic);
      } else {
        setHistoric([]);
      }
    });
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
            player.ref.current.close();
            player.retries += 1;
            setHistoric([...historic]);
          }
        },
      ]
    );
  }

  const onPressFromRight = (player) => {
    const position = historic.filter((player) => {
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
          },
          style: 'cancel',
        },
        {
          text: 'Confirmar', onPress: () => {
            player.ranking = position;
            player.deleted = true;
            player.ref.current.close();
            setHistoric([...historic]);
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
              historic.filter((item) => { return !item.deleted && item.played; }).map((item) => {
                return (
                  <Swipeable
                    key={item.playerId}
                    ref={item.ref}
                    overshootLeft={false}
                    overshootRight={false}
                    renderLeftActions={(progress, dragX) =>
                      <LeftActions progress={progress} dragX={dragX} onPress={() => onPressFromLeft(item)} />
                    }
                    renderRightActions={(progress, dragX) =>
                      <RightActions progress={progress} dragX={dragX} onPress={() => onPressFromRight(item)} />
                    }
                  >
                    <ListItem
                      title={item.player}
                      leftAvatar={{ source: { uri: item.photo } }}
                      badge={{
                        value: `Rebuy ${item.retries}`,
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
              historic.filter((item) => { return item.deleted; })
                .sort((a, b) => a.ranking > b.ranking)
                .map((item) => {
                  return (
                    <ListItem
                      key={item.playerId}
                      title={item.player}
                      subtitle={`Rebuy ${item.retries} | Posição: ${item.ranking}`}
                      leftAvatar={{ source: { uri: item.photo } }}
                      bottomDivider
                    />
                  )
                })
            }
          </Card>
        </View>
      </ScrollView>
      <Icon reverse
        reverseColor='#212121'
        name='save'
        type='material'
        size={30}
        color='#ffc107'
        containerStyle={styles.icon}
        iconStyle={{ fontSize: 40 }}
        onPress={() => SaveHistoric(historic)}
      />
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
  },
  icon: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    right: 0
  }
});