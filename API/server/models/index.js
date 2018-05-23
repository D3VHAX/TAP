import { Logger } from 'utils/logger';
import axios from 'axios';

let logger = new Logger('Elastic');

const STORAGE_URL = 'http://tap-project.tk:9200/tap';

let self = {};

self.getUserRecommended = async (userID, number) => {
    let articles;

    try {
        let res = await axios.get(STORAGE_URL + '/recommendation/_taste/user/' + userID, {"size" : number});
        articles = res.data.hits.hits;
    } catch(e) {
        articles = [];
    }

    // No recommended articles. Just get some random articles...
    if(articles.length === 0) {
        try {
            let res = await axios.post(STORAGE_URL + '/item/_search', {
              "from": 0, "size" : number,
              "query": {
                "function_score": {
                  "functions": [
                    {
                      "random_score": {
                        "seed":  Math.floor(Math.random() * 200)
                      }
                    }
                  ],
                  "score_mode": "sum"
                }
              }
            });

            articles = res.data.hits.hits;
        } catch(e) {
            articles = [];
        }
    }

    return articles;
}

self.storePreference = async (userID, itemID, value) => {
    let res = await axios.post(STORAGE_URL + '/_taste/event', {
        user: {id: userID},
        item: {id: itemID},
        value: value
    });

    return true;
}


export default self;