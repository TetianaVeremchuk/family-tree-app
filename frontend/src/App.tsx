import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import FamilyTree from './components/FamilyTree/FamilyTree';
import './styles/global.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <FamilyTree />
    </Provider>
  );
};

export default App;
