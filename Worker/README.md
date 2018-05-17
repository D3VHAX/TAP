# 💣 TAP Worker

Allows to fetch articles from different publishers with simple configuration
## Getting Started

#### 1. Clone and Install

```bash
# Clone the repo

# Install dependencies
npm i
```

#### 3. Start fetching

```bash
# Run the worker with
npm start
```

## 🚀 Configuration files

Just add a new publisher with this configuration file will add data to our database to perform IA
```bash
let feed = (Object) {
  commonName: (string), // Name of publisher
  websiteUrl: (string), // Main publisher website
  articleParsingTag: (string), // HTML div name of article to calculate reading time
  urlStripParameters: (Array of Strings) // URL query string parameters to remove
  resources: (Array of Objects) [
    {
      endpoint: (string), // RSS endpoint
      categories: (Array of string), // Categories of article on endpoint
    },
  ],
  tags: (Object) {
    title: (string), RSS tag of title
    description: (string), RSS tag of description
    picture: (string), RSS tag of picture
    creationDate: (string), RSS tag of creationDate
    url: (string), RSS tag of url
  },
}
```
