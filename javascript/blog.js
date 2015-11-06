function add_blog(element, template, apiKey, blogId) {
    gapi.client.setApiKey(apiKey);
    gapi.client.load('blogger', 'v3').then(function () {
        var request = gapi.client.blogger.posts.list({
            "blogId": blogId
        });
        request.execute(function(response){
            add_response(element, response, template);
        });
    });
}

function add_response(blog, response, template) {
    var tpl = $.parseHTML(template);
    var keys = {};
    var cls;
    $(tpl).find("[class!=''][class]").each(function(i, e) {
        cls = $(e).attr("class");
        if(!(cls in keys)) {
            keys[cls] = true;
        }
    });
    $("#" + blog).empty()
    var clone;
    for (var item in response.items) {
        clone = $($.parseHTML(template)).clone();
        for (var key in keys) {
            ($(clone).find("." + key)).each(function(i, e) {
                $(e).append(response.items[item][key]);
            });
        }
        $("#" + blog).append(clone)
    }
}