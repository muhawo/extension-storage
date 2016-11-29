var storage;
module.exports = {
    setStorage: function(customStorage){
        storage = customStorage;
    },
    _is_expired : function(c) {
        return c.options && c.options.expire && c.options.expire < (new Date()).getTime();
    },
    get : function(key, callback) {
        storage.get(key, function(items){
            for(var k in items){
                var v = items[k];
                if (v) {
                    try {
                        if (this._is_expired(v)) {
                            this.remove(key);
                            delete items[k];
                        }
                    } catch (e) {

                    }
                }
            }
            callback(items);
        }.bind(this));
    },
    set : function(key, value, options) {
        var opt = options || {};
        if (opt.skip) return;
        if(options && options.expire){
            opt.expire = new Date().getTime() + options.expire;
        }
        var s = {};
        s[key] = {
            key : key,
            value : value,
            options : opt
        };
        storage.set(s);
    },
    clear : function(key) {
        storage.clear();
    },
    remove : function(key) {
        storage.remove(key);
    }
};
