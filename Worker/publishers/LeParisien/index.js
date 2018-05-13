let feed = {
  commonName: 'Le Parisien',
  websiteUrl: 'http://www.leparisien.fr',
  articleParsingTag: 'article',
  resources: [
    {
      endpoint: 'http://www.leparisien.fr/une/rss.xml',
      categories: ['une'],
    },
  ],
  tags: {
    title: 'title',
    description: 'description',
    picture: 'enclosure.url',
    creationDate: 'pubDate',
    url: 'link',
  },
}

export default feed