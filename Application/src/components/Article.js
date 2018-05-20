import React from 'react';
import PropTypes from 'prop-types';
import { Image, Linking, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text } from 'native-base';
import Loading from 'components/Loading';
import ErrorMessages from 'constants/errors';
import Error from './Error';
import Spacer from './Spacer';


const RecipeView = ({
  error,
  articles,
  articleId,
  articleLink,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Recipe from all recipes
  let article = null;
  if (articleId && articles && articleLink) {
    console.log(articleId);
    article = _.find(articles, 'id', articleId);
  }
  Actions.refresh({ title: articleLink });
  // Recipe not found
  // if (!article) return <Error content={ErrorMessages.recipe404} />;


  return (
    <WebView
      source={{ uri: articleLink }}
      renderLoading={Loading}
      startInLoadingState
      style={{ flex: 1 }}
    />
  );
};


RecipeView.propTypes = {
  error: PropTypes.string,
  articleId: PropTypes.string.isRequired,
  articleLink: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RecipeView.defaultProps = {
  error: null,
};

export default RecipeView;
