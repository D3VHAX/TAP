import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import * as Animatable from 'react-native-animatable';

import Colors from 'Theme/variables/commonColor';

class Messages extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(['error', 'success', 'info']),
  };
  static defaultProps = {
    message: 'Une erreur est survenue',
    type: 'error',
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { type, message } = this.props;
    let slideMessage = null;
    if (message) slideMessage = 'slideInUp';
    else slideMessage = 'slideOutDown';
    return (
      <Animatable.View
        animation={slideMessage}
        duration={400}
        style={{
          backgroundColor: (type === 'error') ? Colors.brandDanger : (type === 'success') ? Colors.brandSuccess : Colors.brandInfo,
          paddingVertical: 12,
          paddingHorizontal: 5,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>{message}</Text>
      </Animatable.View>
    );
  }
}


export default Messages;
