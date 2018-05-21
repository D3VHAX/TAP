import { Logger } from './libs/logger';
import elasticsearch from 'elasticsearch';
import http from 'http';
import crypto from 'crypto';
import request from 'request';

let log = new Logger('Runner');

const ES_URL = 'tap-project.tk:9200';

var client = new elasticsearch.Client({
    host: ES_URL,
    apiVersion: '2.4'
});

let store = (data) => {
    return new Promise(function(resolve, reject) {
        var shasum = crypto.createHash('sha1');
        shasum.update(data.url);
        var system_id = shasum.digest('hex');
        data.system_id = system_id;

        client.search({
            index: 'tap',
            type: 'item',
            body: {
              query: {
                match: {
                  system_id: system_id
                }
              }
            }
        }).then(function success(resp) {
            if(resp.hits.total === 0) {
                log.info('[' + system_id + '] Storing');
                data.system_id = system_id;

                request.post('http://'+ES_URL+'/tap/item/_taste/event', {
                    json: {
                        item: data,
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }, function(error, response, body) {
                    if(error || response.statusCode != 200) {
                        log.error("Error while sending data for '"+data.system_id+"' (HTTPCode: "+response.statusCode+")");
                        //log.error(response);
                        resolve();
                    } else {
                        log.success("Content ("+data.url+")" + data.system_id + " successfuly added.");
                        resolve();
                    }
                });
            } else {
                log.info('[' + system_id + '] Already exists');
                resolve();
            }
        }, function error(err) {
            log.error('Error while sending request to ElasticSearch (search operation)');
        });

        // Generate an identifier from URL (sha1)
        // Use elasticsearch client SDK to search an object with that hash
        // If exist, ignore
        // If doesn't exist, store object in datastore
        //log.debug(data);
    });
};

export default store;