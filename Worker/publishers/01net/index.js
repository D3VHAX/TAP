let feed = {
  commonName: '01Net',
  websiteUrl: 'http://www.01net.com/',
  articleParsingTag: 'div[itemprop="articleBody"]',
  urlStripParameters: [],
  resources: [
    {
      endpoint: 'http://www.01net.com/rss/actualites/securite/',
      categories: ['securite'],
    },
    {
      endpoint: 'http://www.01net.com/rss/actualites/politique-droits/',
      categories: ['politique', 'droits'],
    },

  ],
  tags: {
    title: 'title',
    description: 'content',
    picture: 'enclosure.url',
    creationDate: 'pubDate',
    url: 'link',
  },
};

export default feed;