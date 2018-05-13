# 💡 TAP Elasticsearch

For data processing and storage, we use Elasticsearch

### Base URL
`http://tap-project.tk:9200/`

## Local access only
### Refresh recommendations
```bash
curl -XPOST localhost/_taste/action/recommended_items_from_user -d '{
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

### Cheking running tasks

```bash
curl -XGET localhost:9200/_taste/action?pretty
```


### Get article based on fields

```bash
curl -XGET "localhost:9200/tap/item/_search?q=KEY:VALUE_SEARCHED,KEY2:VALUE_SEARCHED&pretty"
```
Result :

```bash
curl -XGET "localhost:9200/tap/item/_search?q=title:3&pretty"
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


## Remote access via Postman

### Add article to database

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


### Add article to database

```bash
POST http://tap-project.tk:9200/tap/item/_taste/event
{
   "item": {
      "system_id": "", // Unique ID
      "title": "", // Article title
      "description": "", // Article description
      "categories": [], // Associated category
      "keywords": [], // Associated keywords
      "picture": "", // Main picture
      "pubDate": "", // Publication date
      "creationDate": "", // Creation timestamp
      "url" :"" // Article URL
   }
}
```


### Get recommendations

```bash
curl -XGET "localhost:9200/tap/recommendation/_taste/user/USER_ID?pretty"
```

### User interactions
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

### Used indicators

To give a score to an article, we use a scale from 0 to 10 where 5 is neutral
We use differents indicators such as user like, user reading time and user behaviour on application










