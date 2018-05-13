let feed = {
  commonName: 'Elle',
  websiteUrl: 'http://www.elle.fr',
  articleParsingTag: 'article',
  resources: [
    {
      endpoint: 'http://cdn-elle.ladmedia.fr/var/plain_site/storage/flux_rss/fluxMode.xml',
      categories: ['mode'],
    },
  ],
  tags: {
    title: 'title',
    description: 'content',
    picture: 'enclosure.url',
    creationDate: 'pubDate',
    url: 'link',
  },
}

export default feed