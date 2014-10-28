
var server_host = "http://localhost:3000";
var redirect_url = window.location.origin + "/blank.html"; //Ask user to set - check domain on server
var app_id = "ej4Nf2ID8IH1"; //As per registration

var Sdk = function(host, redirect_url, app_id){
    
    var existing_cookie = get_cookie("SDK_" + app_id);
    if(existing_cookie && existing_cookie != " "){ 
        this.token = JSON.parse(existing_cookie).token;
    }
    this.login = function(){
        var url = host + "/authImplicit?client_id=" + app_id + 
                    "&redirect_uri=" + redirect_url + "&scope=" +
                    encodeURIComponent("info-read info-write");
        var login_window = window.open(url, "Oauth-Login", "width=800, height=400");

        var pollTimer = window.setInterval(function(){
            try{
                var url = login_window.document.URL
                if(url.indexOf(redirect_url)!=-1){
                    //Redirect has happened
                    window.clearInterval(pollTimer);
                    
                    var hash_location = url.indexOf('#');
                    var hash_args = url.slice(hash_location + 1);
                
                    //Can be generalized further
                    var token_start = hash_args.indexOf('=') + 1;
                    var token_end = hash_args.indexOf('&');
                    var new_token = hash_args.slice(token_start, token_end);
                    console.log(url);
                    set_cookie("SDK_" + app_id, JSON.stringify({token: new_token}),
                         7, window.location.origin); 
                    token = new_token;
                    login_window.close();
                }
            } catch(e) {
                //Cross Origin Errors will be thrown
                //until approval
                //console.log(e);
            }              
        }, 500);
    }

    this.logout = function(){
        return ajax.get(host + "/logout", {}, function(res){
            return res;
        });
    }

    this.get = function(api_path){
        return ajax.get(host + "/" + api_path, {}, function(res){
            console.log(res);
            return res;
        });
    }

    this.post = function(api_path, data){
        return ajax.post(host + "/" + api_path, data, function(res){
            console.log(res);
            return res;
        });
    }


    function set_cookie(cookie_name, cookie_value, lifespan, domain){
        document.cookie = cookie_name + "=" + 
            encodeURIComponent(cookie_value) + "; max_age" + 
            (60*60*24*lifespan) + "; path=/" + domain;
    }

    function get_cookie(cookie_name){
        var name = cookie_name + "=";
        var cookie_array = document.cookie.split(";");
        for(var i=0; i<cookie_array.length; i++){
            var cookie = cookie_array[i];
            while (cookie.charAt(0)==" "){
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) != -1){
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }

    var ajax = {};
   
    ajax.x = function() {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();  
        }
        var versions = [
            "MSXML2.XmlHttp.5.0",   
            "MSXML2.XmlHttp.4.0",  
            "MSXML2.XmlHttp.3.0",   
            "MSXML2.XmlHttp.2.0",  
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for(var i = 0; i < versions.length; i++) {  
            try {  
                xhr = new ActiveXObject(versions[i]);  
                break;  
            } catch (e) {
            }  
        }
        return xhr;
    };

    ajax.send = function(url, callback, method, data, sync) {
        var x = ajax.x();
        x.open(method, url, sync);
        x.onreadystatechange = function() {
            if (x.readyState == 4) {
                callback(x.responseText)
            }
        };
        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        x.setRequestHeader('Authorization','Bearer ' + token);
        x.send(data)
    };

    ajax.get = function(url, data, callback, sync) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        ajax.send(url + '?' + query.join('&'), callback, 'GET', null, sync)
    };

    ajax.post = function(url, data, callback, sync) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        ajax.send(url, callback, 'POST', query.join('&'), sync)
    };

}

var sdk = new Sdk(server_host, redirect_url, app_id);


