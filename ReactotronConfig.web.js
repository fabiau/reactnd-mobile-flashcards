import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron.configure({
  name: 'ReactND - Mobile Flashcards',
}) // controls connection & communication settings
  .use(reactotronRedux()) // add redux integration
  .use(sagaPlugin()) // add redux-saga integration
  .connect(); // let's connect!

export default reactotron;
