import { Logger } from './libs/logger';
import elasticsearch from 'elasticsearch';
import http from 'http';
import crypto from 'crypto';
import request from 'request';

let log = new Logger('Storage');

const ES_URL = 'tap-project.tk:9200';

var client = new elasticsearch.Client({
    host: ES_URL,
    apiVersion: '2.4'
});

var urlToSystemId = function(url) {
    var shasum = crypto.createHash('sha1');
    shasum.update(url);

    return shasum.digest('hex');
}

export function CheckExist (data) {
    return new Promise(function(resolve, reject) {
        client.search({
            index: 'tap',
            type: 'item',
            body: {
              query: {
                match: {
                  system_id: urlToSystemId(data.url)
                }
              }
            }
        }).then(function success(resp) {
            resolve(resp.hits.total !== 0);
        }, function error(err) {
            reject(err);
        });
    });
}

export function Persist (data) {
    return new Promise(function(resolve, reject) {
        data.system_id = urlToSystemId(data.url);

        log.info('['+data.publisher+'] [' + data.system_id + '] Storing');

        request.post('http://'+ES_URL+'/tap/item/_taste/event', {
            json: {
                item: data,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(error, response, body) {
            if(error || response.statusCode != 200) {
                //reject('['+data.publisher+'] [' + data.system_id + '] Error while sending data (HTTPCode: '+response.statusCode+')');
                resolve(); // ignore
            } else {
                log.success('['+data.publisher+'] [' + data.system_id + '] Successfuly added');
                resolve();
            }
        });
    });
}