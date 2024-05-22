import React from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import store from './src/redux/store';
import MainApp from './src/Main';

function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <BottomSheetModalProvider>
            <PaperProvider>
              <MainApp />
            </PaperProvider>
          </BottomSheetModalProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App;