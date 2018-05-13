# 💡 TAP Elasticsearch

## Installation
For data processing and storage, we use ElasticSearch. In order to use the distributed features of ElasticSearch (share workload between each nodes, increasing availability, capacity and performance), we built a custom Dockerfile to create new nodes in a matter of minutes. The provisionning of new instances could be automated.
To process preferences and build user-to-user recommendations, we used an ElasticSearch plugin internally using Apache Mahout binaries.

For testing and development purposes we only used one Docker container (one ElasticSearch instance).

The Docker container, described in the `Dockerfile`, exposes ports 9200 (REST API) and 9300 (Communications between ES nodes).

To build the container's image, you'll need to download the Dockerfile.

Container can be built using `docker build -t tap/elasticsearch-taste`

Create a Docker volume (will contain data storage): `docker volume create esdata`

To run the container :
```
docker run --name tap-es -d -p 9200:9200 -p 9300:9300 -v esdata:/usr/share/elasticsearch/data \
-e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms512M -Xmx512M" tap/elasticsearch-taste
```

The container will run in a daemonized way.

To stop container : `docker stop tap-es`
To start container : `docker start tap-es`.

## Usage

### Base URL
`http://tap-project.tk:9200/`

### Local access only REST endpoints
#### Refresh recommendations
```bash
curl -XPOST localhost:9200/_taste/action/recommended_items_from_user -d '{
  "num_of_items": 10,
  "data_model": {
    "cache": {
      "weight": "100m"
    }
  },
  "index_info": {
    "index": "tap"
  }
}'
```

#### Checking running tasks

```bash
curl -XGET localhost:9200/_taste/action?pretty
```


## Remote access endpoints
#### Get article based on the value of given fields

```bash
curl -XGET "http://tap-project.tk/tap/item/_search?q=KEY:VALUE_SEARCHED,KEY2:VALUE_SEARCHED&pretty"
```
Result :

```bash
curl -XGET "http://tap-project.tk/tap/item/_search?q=title:3&pretty"
{
   "took":23,
   "timed_out":false,
   "_shards":{
      "total":5,
      "successful":5,
      "failed":0
   },
   "hits":{
      "total":1,
      "max_score":0.70273256,
      "hits":[
         {
            "_index":"tap",
            "_type":"item",
            "_id":"AWNMw7qStu0P9DbCCrxB",
            "_score":0.70273256,
            "_source":{
               "title":"Titre document 3",
               "description":"Sept mois après l’explosion du scandale Weinstein, sa femme Georgina Chapman s’est confiée au magazine Vogue USA, expliquant le choc qu’ont été pour elle les révélations sur ses abus sexuels.« Il y avait...",
               "picture":"",
               "creationDate":"Thu, 10 May 2018 23:08:52 +0200",
               "url":"http://www.leparisien.fr/societe/la-femme-de-weinstein-sort-du-silence-elle-ne-s-etait-jamais-doutee-de-rien-10-05-2018-7709508.php#xtor=RSS-1481423633"
            }
         }
      ]
   }
}
```


#### Add article to database

```bash
POST http://tap-project.tk:9200/tap/item/_taste/event
{
   "item":{
      "system_id":"", // Unique ID
      "title":"", // Article title
      "description":"", // Article description
      "categories" : [], // Associated category
      "keywords" : [], // Associated keywords
      "picture":"", // Main picture
      "pubDate":"", // Publication date
      "creationDate":"", // Creation timestamp
      "url":"" // Article URL
   }
}
```


#### Fetch recommendations for a given USER_ID

```bash
curl -XGET "localhost:9200/tap/recommendation/_taste/user/USER_ID?pretty"
```

#### To store a new entry in the tap/preference index
```bash
POST http://tap-project.tk:9200/tap/_taste/event
{
   "user": {
      "id": 1
   },
   "item": {
      "id": "SYSTEM_ID"
   },
   "value": 10
   }
```

This action can be translated to : "The user (ID: 1) has interacted with the content (item, id : SYSTEM_ID) with a mark of 10". More informations about the value field is given in the next part.

### Preferences & Used Indicators

To give a score to an article (a content, or an item), we use a scale from 0 to 10 where 5 is neutral. If the user seemed to like the content we gave him, the value will be higher than if he only looked the article for 10 seconds.

We use differents indicators such as user's like action (button press), user reading time and user behaviour in the application.

