import React from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { StyleProvider } from 'native-base';
import getTheme from 'Theme/components/index';
import theme from 'Theme/variables/commonColor';

import Routes from 'routes/index';
import Loading from 'components/Loading';

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate
      loading={<Loading />}
      persistor={persistor}
    >
      <StyleProvider style={getTheme(theme)}>
        <Router>
          <Stack key="root">
            {Routes}
          </Stack>
        </Router>
      </StyleProvider>
    </PersistGate>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default Root;
