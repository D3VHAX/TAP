import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import 'moment/locale/fr';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';


moment.locale('fr');

const ArticlesListing = ({
  error,
  loading,
  articles,
  reFetch,
  fetchNew,
  opinion,
}) => {
  // Loading
  if (loading || articles.length < 1) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;
  const onPress = item => Actions.article({
    match: {
      params: {
        id: String(item.id),
        link: String(item.url),
      },
    },
  });

  return (
    <Container>
      <View style={{ flex: 1, margin: 10 }}>
        <DeckSwiper
          dataSource={articles}
          looping={false}
          onSwipeLeft={(a) => {
                      fetchNew();
                      opinion({ articleID: a.id, userID: 1, action: 'dislike' });
                }}
          onSwipeRight={(a) => {
            fetchNew();
            opinion({ articleID: a.id, userID: 1, action: 'like' });
          }}
          renderItem={item =>
                (<TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                  <Card style={{ elevation: 4 }}>
                    <CardItem style={{ flex: 1 }}>
                      <Left>
                        <Thumbnail source={{ uri: item.logo }} style={{ width: 40, height: 40 }} />
                        <Body>
                          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                          <Text note>Publié par {item.publisher} le {moment.utc(item.date).format('LL')}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={{ uri: item.picture }} style={{ height: 220, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                      <Text style={{ textAlign: 'justify' }}>{item.description}</Text>
                    </CardItem>
                    <CardItem>
                      <Left />
                      <Right>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <SimpleLineIcons name="book-open" style={{ color: '#808080', textAlign: 'center' }} size={14} />
                          <Text note style={{ textAlign: 'center' }}> {moment.utc(item.stats.readingTime).format('mm:ss') }</Text>
                        </View>
                      </Right>
                    </CardItem>
                  </Card>
                </TouchableOpacity>)
                }
        />

      </View>
    </Container>
  );
};

ArticlesListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
  fetchNew: PropTypes.func,
  opinion: PropTypes.func,
};

ArticlesListing.defaultProps = {
  error: null,
  reFetch: null,
  fetchNew: null,
  opinion: null,
};

export default ArticlesListing;
