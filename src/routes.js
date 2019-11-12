import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Ranking from './pages/Ranking';

const Routes = createAppContainer(
    createStackNavigator({
        Ranking: Ranking
    }, {
        initialRouteName: 'Ranking',
    })
);

export default Routes;