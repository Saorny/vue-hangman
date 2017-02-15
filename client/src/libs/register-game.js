'use strict';

import request from 'request';

class GameRegistryService {

    constructor() {
        this.URL = 'http://localhost:3030/register-game';
    }

    registerGame(data) {
        return new Promise((resolve, reject) => {
            return request(this.prepareQueryParams(data), (err, response, body) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(body);
                }
            });
        });
    }

    prepareQueryParams(data) {
        return {
            url: this.URL,
            method: 'POST',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'charset': 'utf-8',
                'access-control-allow-origin': '*'
            }
        };
    }
}

export default new GameRegistryService();
