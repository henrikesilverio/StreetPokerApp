import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson 1',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson 2',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson 3',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson 4',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson 5',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson 6',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson 7',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson 8',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
];

const Ranking = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.name}
              subtitle={item.subtitle}
              leftAvatar={{ source: { uri: item.avatar_url } }}
              bottomDivider
            />
          ))
        }
      </View>
    </ScrollView>
    <Icon reverse
      reverseColor='#212121'
      name='add'
      type='material'
      size={30}
      color='#ffc107'
      containerStyle={styles.icon}
      iconStyle={{ fontSize: 40 }}
    />
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
  icon: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    right: 0
  }
});