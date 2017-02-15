'use strict';

import request from 'request';

class RandomWord {

	constructor() {
	  this.URL = 'http://localhost:3030/random-word?';
  	}

	getRandomWord(filters) {
		const self = this;

		return new Promise((resolve, reject) => {
		request(this.prepareQueryParams(filters), (err, response, body) => {
			if (err) {
			  reject(err)
			}
		    else {
		      resolve(body);
		    }
		});
	  });
	}

	prepareQueryParams(filters) {
		return {
			url: this.formatURL(filters),
			method: 'GET',
			dataType: 'json',
			headers: {
			    'content-type': 'application/json',
			    'charset': 'utf-8',
			    'access-control-allow-origin': '*',
			    'mode': 'no-cors'
			}
		};
	}

	formatURL(filters) {
	  return this.URL + Object.keys(filters).map((k) => {
	    return encodeURIComponent(k) + '=' + encodeURIComponent(filters[k])
	  }).join('&');
	}
}

export default new RandomWord();
