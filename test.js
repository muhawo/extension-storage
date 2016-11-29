var chromeStorageLocal = (function(){
    var db = {};
    var storage = {
        get: function(keys, callback){
            if(typeof keys == 'string') keys = [keys];
            var items = {};
            for(var key of keys){
                items[key] = db[key];
            }
            callback(items);
        },
        set: function(items, callback){
            for(var key in items){
                db[key] = items[key];
            }
        },
        remove: function(keys, callback){
            if(typeof keys == 'string') keys = [keys];
            for(var key of keys){
                delete db[key];
            }
        },
        clear: function(callback){
            db = {};
        }
    };
    return storage;
})();

var storage = require('./index.js');
storage.setStorage(chromeStorageLocal);

storage.set('test-get', 'test-get');
storage.get('test-get', function(items){
    if(items['test-get'].value == 'test-get'){
        console.log('test-get ok');
    }else{
        console.error('test-get error');
    }
});

storage.set('test-mul1', 'test-mul1');
storage.set('test-mul2', 'test-mul2');
storage.get(['test-mul1', 'test-mul2'], function(items){
    if(items['test-mul1'].value == 'test-mul1' && items['test-mul2'].value == 'test-mul2'){
        console.log('test-mul ok');
    }else{
        console.log('test-mul error');
    }
});

storage.set('test-remove', [1,2,3]);
storage.remove('test-remove');
storage.get('test-remove', function(items){
    if(!items['test-remove']){
        console.log('test-remove ok');
    }else{
        console.log('test-remove error');
    }
});

storage.clear();
storage.get('test-mul1', function(items){
    if(!items['test-mul1']){
        console.log('test-clear ok');
    }else{
        console.log('test-clear error');
    }
});

storage.set('test-expire', 'test-expire', {expire: 3000});
setTimeout(function(){
    storage.get('test-expire', function(items){
        if(items['test-expire']){
            console.log('test-not-expire ok');
        }else{
            console.error('test-not-expire error');
        }
    });
}, 1000);

setTimeout(function(){
    storage.get('test-expire', function(items){
        if(!items['test-expire']){
            console.log('test-expire ok');
        }else{
            console.error('test-expire error');
        }
    });
}, 4000);

