'use strict';

module.exports = (body, secret, cb) => {
	console.log('body', body);

	if (!body) {
		return cb(new Error('invalid jwtdata'));
	}

	console.log('secret', secret);

	console.log('cb', cb);

	require('jsonwebtoken').verify(body.toString('utf8'), secret, {
		algorithm: 'HS256'
	}, cb);
};