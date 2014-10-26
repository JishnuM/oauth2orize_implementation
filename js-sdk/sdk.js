
var server_host = "http://localhost:3000/";
var redirect_url = window.location.origin + "/blank.html"; //Ask user to set - check domain on server

var app_id = "ej4Nf2ID8IH1"; //As per registration

var login = function(){
    var url = server_host + "loginImplicit?clientId=" + app_id + 
                "&redirectUri=" + redirect_url;
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
                var token = hash_args.slice(token_start, token_end);
                console.log(token);
                login_window.close();
            }
        } catch(e) {
            //Cross Origin Errors will be thrown
            //until approval
            //console.log(e);
        }    
      
    }, 500);
}
