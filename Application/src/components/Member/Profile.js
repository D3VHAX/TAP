import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Body, Left, Text } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Header from 'components/Header';

const Profile = ({ member, logout }) => (
  <Container>
    <Content>
      <List>
        {(member && member.email) ?
          <View>
            <Content padder>
              <Header
                title={`Hi ${member.firstName},`}
                content={`You are currently logged in as ${member.email}`}
              />
            </Content>
            <ListItem onPress={Actions.updateProfile} icon>
              <Left>
                <SimpleLineIcons name="plus" size={20} />
              </Left>
              <Body>
                <Text>Update My Profile</Text>
              </Body>
            </ListItem>
            <ListItem onPress={logout} icon>
              <Left>
                <SimpleLineIcons name="plus" size={20} />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
            </ListItem>
          </View>
        :
          <View>
            <Content padder>
              <Header
                title="Hi there,"
                content="Please login to gain extra access"
              />
            </Content>

            <ListItem onPress={Actions.login} icon>
              <Left>
                <SimpleLineIcons name="login" size={20} />
              </Left>
              <Body>
                <Text>Login</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.signUp} icon>
              <Left>
                <SimpleLineIcons name="plus" size={20} />
              </Left>
              <Body>
                <Text>Sign Up</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.forgotPassword} icon>
              <Left>
                <SimpleLineIcons name="question" size={20} />

              </Left>
              <Body>
                <Text>Forgot Password</Text>
              </Body>
            </ListItem>
          </View>
        }
      </List>
    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
