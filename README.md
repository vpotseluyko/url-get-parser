# url-get-parser 
## version 1.1.0

Url-get-parser is a very simple and minimal-styled plugin for 
working with url get params.

## install
`npm i url-get-parser`
of you can use min version from `dist/` folder
it will provide you `ugp` object in global scope

Functionality:
1) Receive GET url params as an object name - value 
2) Add new GET params to url
3) Delete GET params from url
4) Change value of existing GET params
5) Api: 

### Method: `get_url_params(search)`
     
**Params:** search part of url. If none specified is used `location.search`
     
**Returns:** object of GET
      
**Example:** 
```javascript
console.log(ugp.get_url_params("?get=123&abc=123"));
// { get: '123', abc: '123' }
```
       
### Method `replace_url_value(change, options)`
     
**Params:**
  
 1) Change - 
 
 array of object or one object. 
 Object is like - {name: value}
 It will add new or replace existing get param with name.
 If value is null param will be deleted
 
 2) Options - 
 
 `options.change` - change url in browser or not. 
 **WARN:** if browser doesn't support html5 it will reload page
   
 `options.url` - if this value is specified script doesn't use location object,
 so you can use it in node.js environment.
 it must be full url with both path and search parts
 
 **WARN:** 
 this makes options.change being false 
 
 **Returns:**
 New url.
 
 **Example:**
 ```javascript
 
console.log(ugp.replace_url_value([{p: 2}, {status: 1}, {get: null}],
{url: '/somepath/?p=123&abc=123&get=no'}));
// /somepath/?p=2&abc=123&status=1
 ```