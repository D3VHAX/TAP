'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var feed = {
  commonName: 'Le Parisien',
  websiteUrl: 'http://www.leparisien.fr',
  articleParsingTag: 'article',
  urlStripParameters: ['xtor'],
  resources: [{
    endpoint: 'http://www.leparisien.fr/une/rss.xml',
    categories: ['une']
  }],
  tags: {
    title: 'title',
    description: 'description',
    picture: 'enclosure.url',
    creationDate: 'pubDate',
    url: 'link'
  }
};

exports.default = feed;