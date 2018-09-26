requirejs.config({
    paths:{
        "a":"../lib/jquery-1.10.1.min",
        "e":"shopping_car"
    },
    shim:{
        "e":{
            deps:["a"]
        },
        
    }
});
requirejs(["a","e"],function(){

});