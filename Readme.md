#We're Hiring!
Do you like building cool stuff?  Do APIs keep you up at night? We're looking for our next superstar hacker and you could be it. Interested? Check out our job posting on [stackoverflow](http://careers.stackoverflow.com/jobs/37078/senior-web-engineer-for-fun-growing-la-startup-maxcdn&a=JdFbT4OY).

# netdna <sup>[![Version Badge](http://vb.teelaun.ch/niftylettuce/node-netdna.svg)](https://npmjs.org/package/netdna)</sup>

NetDNA API wrapper and CLI for node.js.

**NOTE**: Currently supports 2-legged auth with IP whitelisting on NetDNA's control panel.


## CLI Usage

```bash
npm install -g netdna
netdna --help
```

Example:

```bash
netdna <ALIAS> <KEY> <SECRET>
```

## API Usage

```bash
npm install netdna
```

Example:

```js
var netdna = require('netdna')({
    companyAlias: 'alias'
  , consumerKey: 'key'
  , consumerSecret: 'secret'
})

// get account info

netdna.get('account.json', callback)

function callback(err, response) {
  if (err) return console.log(err)
  console.log(response)
}
```


## API

* `netdna.get` - `(url, callback)`
* `netdna.delete` - `(url, callback)`
* `netdna.post` - `(url, body, callback)`
* `netdna.put` - `(url, body, callback)`

Docs: <https://developer.netdna.com/api/docs>


## Tests

To run tests, ensure `vows` is installed:

```bash
npm install
```

Then run:

```bash
# unit tests
npm test

# integration tests
ALIAS=alias KEY=key SECRET=secret npm run integration
```


## Contributors

* Nick Baugh <niftylettuce@gmail.com>
* Joshua Mervine <joshua@mervine.net>


## License

The MIT License

Copyright (c) 2013- Nick Baugh <niftylettuce@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
