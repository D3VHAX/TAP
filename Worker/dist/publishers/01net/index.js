'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var feed = {
  commonName: '01Net',
  websiteUrl: 'http://www.01net.com/',
  articleParsingTag: 'div[itemprop="articleBody"]',
  urlStripParameters: [],
  resources: [{
    endpoint: 'http://www.01net.com/rss/actualites/securite/',
    categories: ['securite']
  }, {
    endpoint: 'http://www.01net.com/rss/actualites/politique-droits/',
    categories: ['politique', 'droits']
  }, {
    endpoint: 'https://www.01net.com/rss/actualites/jeux/',
    categories: ['jeux', 'divertissement', 'esport']
  }, {
    endpoint: 'https://www.01net.com/rss/actualites/buzz-societe/',
    categories: ['buzz', 'societe']
  }, {
    endpoint: 'https://www.01net.com/rss/actualites/produits/',
    categories: ['produits']
  }, {
    endpoint: 'https://www.01net.com/rss/actualites/science-recherche/',
    categories: ['science', 'recherche']
  }],
  tags: {
    title: 'title',
    description: 'content',
    picture: 'enclosure.url',
    creationDate: 'pubDate',
    url: 'link'
  }
};

exports.default = feed;