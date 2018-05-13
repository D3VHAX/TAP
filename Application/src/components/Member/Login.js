import React from 'react';
import PropTypes from 'prop-types';
import { View, Container, Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import FadeInView from 'animations/fadeIn';
import Messages from 'components/Messages';
import Header from 'components/Header';
import Spacer from 'components/Spacer';
import { FontAwesome } from '@expo/vector-icons';
import Style from './syles/Login';

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }


  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => Actions.profileHome())
      .catch(e => console.log(e));
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    return (
      <Container>
        <Content padder>
          <Header
            title="Login"
            content="Use your Tap account or connect with Facebook"
          />
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>
            <Spacer size={20} />
            <View>
              <FadeInView duration={300} loading={!!loading}>
                <Button rounded block large-btn onPress={this.handleSubmit}>
                  <Text>Login</Text>
                </Button>
              </FadeInView>
              <Button style={Style.btnFacebook} large-btn rounded iconLeft block onPress={this.handleSubmit}>
                <FontAwesome
                  name="facebook"
                  size={22}
                  color="white"
                />
                <Text>S'identifier avec Facebook</Text>
              </Button>

            </View>
          </Form>
        </Content>

        <Messages message={error} />
      </Container>
    );
  }
}


export default Login;
