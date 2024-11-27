import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import FamilyTree from './components/FamilyTree/FamilyTree';
import './styles/global.scss';
const App = () => {
    return (React.createElement(Provider, { store: store },
        React.createElement(FamilyTree, null)));
};
export default App;
