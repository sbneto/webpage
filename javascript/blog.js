//add blogger content to a element using a given template
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

//return nested items in the dictionary
//return null if nesting does not exist
function get_element(dict, element) {
    var path = element.split(".");
    var step;
    var current = dict;
    for (var i in path) {
        step = path[i];
        if (step in current) {
            current = current[step];
        } else {
            return null;
        }
    }
    return current;
}

//check if keys are in the dictionary and add to key to set in case it is
function check_for_key(keys_text, dict, set) {
    var found;
    var key;
    var keys = keys_text.split(" ");
    for (var i in keys) {
        key = keys[i];
        if(!(key in set)) {
            found = get_element(dict, key);
            if (found != null)
                set[key] = true;
        }
    }
}

//for all elements in a given class, find the existing elements in 
//a given property that are keys in a dictionary and are present
//in the template
function get_keys_from_elements(selector, property, keys, dict, template) {
    var value;
    $(template).find(selector).each(function(i, e) {
        value = $(e).attr(property);
        check_for_key(value, dict, keys);
    });
}

function add_response(blog, response, template) {
    var tpl = $.parseHTML(template);
    var keys_classes = {};
    var keys_urls = {};
    if(response.items.length > 0) {
        //find classes in template that match items in the response
        get_keys_from_elements("[class!=''][class]", "class", keys_classes, response.items[0], template);
        //find href elements to be replaced
        get_keys_from_elements("[href!=''][href]", "href", keys_urls, response.items[0], template);
        //process elements in the response
        $("#" + blog).empty()
        var clone;
        for (var item in response.items) {
            clone = $($.parseHTML(template)).clone();
            //add data in the classes present in the response
            for (var key in keys_classes) {
                ($(clone).find("." + key.replace(".", "\\."))).each(function(i, e) {
                    $(e).append(get_element(response.items[item], key));
                });
            }
            //replace the urls in the href elements
            for (var key in keys_urls) {
                ($(clone).find("a[href=\"" + key + "\"]")).each(function(i, e) {
                    $(e).attr("href", get_element(response.items[item], key));
                });
            }
            $("#" + blog).append(clone)
        }
    }
}