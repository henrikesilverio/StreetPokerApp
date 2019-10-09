import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Ranking from './pages/Ranking';
import Rebuy from './pages/Rebuy';

const Routes = createAppContainer(
    createStackNavigator({
        Ranking: Ranking,
        Rebuy: Rebuy,
    }, {
        initialRouteName: 'Ranking',
    })
);

export default Routes;