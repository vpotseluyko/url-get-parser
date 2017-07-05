/**
 * Created by vpotseluyko on 7/5/17.
 */

const urlGetParser = require('./index');

console.log(urlGetParser.replace_url_value([{p: 2}, {status: 1}, {get: null}],
    {url: '/somepath/?p=123&abc=123&get=no'}));