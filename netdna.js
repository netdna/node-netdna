//     node-netdna
//     MIT Licensed

var path        = require('path');
var request     = require('request');
var OAuth       = require('oauth').OAuth;
var version     = require('./package').version;

module.exports = function(opts) {
  if (typeof opts.companyAlias !== 'string') {
    throw new Error('company alias missing or not a string');
  }
  if (typeof opts.consumerKey !== 'string') {
    throw new Error('consumer key missing or not a string');
  }
  if (typeof opts.consumerSecret !== 'string') {
    throw new Error('consumer secret missing or not a string');
  }
  return new NetDNA(opts);
};

function NetDNA(opts) {
  var that = this;
  that.companyAlias = opts.companyAlias;
  that.consumerKey = opts.consumerKey;
  that.consumerSecret = opts.consumerSecret;
  that.API_SERVER = 'https://rws.netdna.com';
  that.oa = new OAuth(
      that.API_SERVER + '/oauth/request_token'
    , that.API_SERVER + '/oauth/access_token'
    , that.consumerKey
    , that.consumerSecret
    , '1.0'
    , opts.callback || 'oob'
    , 'HMAC-SHA1'
  );
}

NetDNA.prototype._makeUrl = function _makeUrl(url) {
  return this.API_SERVER + '/' + path.join(this.companyAlias, url);
};

NetDNA.prototype.get = function get(url, callback) {
  this.oa.get(
      this._makeUrl(url)
    , '' // token
    , '' // secret
    , this._parse(callback)
  );
};

NetDNA.prototype.delete = function del(url, callback) {
  if (typeof url === 'string') {
      this.oa.delete(
          this._makeUrl(url)
        , '' // token
        , '' // secret
        , this._parse(callback)
      );
  } else {
      var results = {};
      var errors  = null;
      var count   = 0;
      var that    = this;
      url.forEach(function(u) {
          that.oa.delete(
            that._makeUrl(u),
            '', // token
            '', // secret
            that._parse(function (err, data) {
                if (err) {
                    errors = errors || {};
                    errors[u] = err;
                } else {
                    results[u] = data;
                }

                // am I done
                if (++count === url.length) {
                    callback(errors, results);
                }
            })
          );
      });
  }
};

NetDNA.prototype.post = function post(url, body, contentType, callback) {
  if (typeof contentType === 'function') {
    callback = contentType;
    contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
  }
  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }
  this.oa.post(
      this._makeUrl(url)
    , '' // token
    , '' // secret
    , body
    , contentType
    , this._parse(callback)
  );
};

NetDNA.prototype.put = function put(url, body, contentType, callback) {
  if (typeof contentType === 'function') {
    callback = contentType;
    contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
  }
  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }
  this.oa.put(
      this._makeUrl(url)
    , '' // token
    , '' // secret
    , body
    , contentType
    , this._parse(callback)
  );
};

NetDNA.prototype._parse = function _parse(callback) {
  return function(err, data, response) {
    try {
      data = JSON.parse(data);
    } catch(e) {
      err = {
          statusCode: 500
        , data: "Invalid JSON from NetDNA's API."
      };
    }
    callback(err, data);
  };
};

