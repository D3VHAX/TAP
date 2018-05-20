import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Colors from 'Theme/variables/commonColor';

const Loader = () => (
  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
    <ActivityIndicator size={38} color={Colors.brandPrimary} />
  </View>
);

export default Loader;
