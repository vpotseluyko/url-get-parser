/**
 * Created by vpotseluyko on 6/27/17.
 */


module.exports = {

    /**
     * Returns url get params in object
     * @returns {{}}
     */
    get_url_params: function (search) {
        if (typeof search === "undefined") {
            search = location.search;
        }
        var paramsObj = {};
        var url = search.substr(1, search.length - 1).split('&');
        if (url.length > 0) { // check if url had params before
            url.forEach(function (item) {
                paramsObj[item.split("=")[0]] = item.split("=")[1];
                // translate all params to object
                // {name: value}
            });
        }
        return paramsObj;
    },
    /**
     * @param change - object or array of object
     *      {name: value}
     * @param options
     * @returns {string}
     */
    replace_url_value: function (change, options) {
        if (typeof options === "undefined") {
            options = {};
        }
        if (typeof options.change === "undefined") {
            options.change = true;
        }
        var pathname;
        var search;
        if (typeof options.url !== "undefined") {
            var urlParts = options.url.split('?');
            pathname = urlParts[0];
            options.change = false;
            search = (urlParts.length > 1) ? "?" + urlParts[1] : '';
        } else {
            pathname = location.pathname;
            search = location.search;
        }
        if (!Array.isArray(change)) {
            change = [change];
        }
        var paramsObj = this.get_url_params(search);
        change.forEach(function (item) {
            Object.keys(item).map(function (key) {
                paramsObj[key] = item[key];
            });
        });
        var params = [];
        Object.keys(paramsObj).map(function (key) {
            if (typeof paramsObj[key] === "undefined" || paramsObj[key] === null) {
                delete paramsObj[key];
            } else {
                params.push(key + "=" + encodeURIComponent(paramsObj[key]));
            }
        });
        var url = pathname + "?" + params.join("&");
        if (options.change) {
            if (typeof window.history !== "undefined" &&
                typeof window.history.replaceState !== "undefined") {
                window.history.replaceState(null, document.title, url);
            } else {
                location.href = url;
            }
        }
        return url;
    }
};