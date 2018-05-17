import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const deck1 = [
  {
    text: 'Card One',
    name: 'One',
    image: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg'
  },
  {
    text: 'Card Two',
    name: 'Two',
    image: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg'


  },
  {
    text: 'Card Three',
    name: 'Three',
    image: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg'

  }
];

const deck2 = [
  {
    text: 'Card One',
    name: 'One',
    image: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg'

  },
  {
    text: 'Card Two',
    name: 'Two',
    image: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg'

  },
  {
    text: 'Card Three',
    name: 'Three',
    image: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg'

  }
];

const RecipeListing = ({
  error,
  loading,
  recipes,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;
  const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Grid>
        <Row>
          <DeckSwiper
            dataSource={deck1}
            onSwipeLeft={()=>{
              console.log("swiped")
            }}
            renderItem={item =>
                <Card style={{ elevation: 3}}>
                  <CardItem style={{ flex: 1 }}>
                    <Left>
                      <Thumbnail source={{uri : item.image}}  style={{width: 40, height: 40}} />
                      <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image source={{uri: item.image}}  style={{height: 120, flex: 1}}/>
                  </CardItem>
                  <CardItem>
                    <SimpleLineIcons name="arrow-down" size={14} />
                    <Text>{" Read more"}</Text>
                  </CardItem>
                </Card>
            }
        />
        </Row>

        <Row>
          <DeckSwiper
              dataSource={deck2}
              onSwipeLeft={()=>{
                console.log("swiped")
              }}
              renderItem={item =>
                  <Card style={{ elevation: 3}}>
                    <CardItem style={{ flex: 1 }}>
                      <Left>
                        <Thumbnail source={{uri : item.image}}  style={{width: 40, height: 40}} />
                        <Body>
                        <Text>{item.text}</Text>
                        <Text note>NativeBase</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={{uri: item.image}}  style={{height: 120, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                      <SimpleLineIcons name="arrow-down" size={14} />
                      <Text>{" Read more"}</Text>
                    </CardItem>
                  </Card>
              }
          />
        </Row>
      </Grid>

    </Container>
  );
};

RecipeListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

RecipeListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default RecipeListing;
