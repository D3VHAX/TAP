let feed = {
  commonName: 'Elle',
  websiteUrl: 'http://www.elle.fr',
  articleParsingTag: 'article',
  urlStripParameters: ['utm_source', 'utm_medium', 'utm_campaign', 'xtor'],
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