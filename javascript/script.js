var apiKey = "AIzaSyC8OVwZk45gWWus2l6w-s6tEdyx8TtV-i0"
var blogId = "1713900942386127940"

$(window).on("popstate", function () {
    //load main page when back button is clicked
    load_main(get_url_parameter(window.location.href, "show"));
});

function initialize() {
    var deferred = [];
    deferred.push(load_header());
    deferred.push(load_footer());
    $.when.apply($, deferred).done(function() {
        //Page ready
        //load main page
        load_main(get_url_parameter(window.location.href, "show"));
        //bind on click listeners
        $(".nav a, .navbar-brand").on("click", function(e) {
            e.preventDefault();
            //push history state
            window.history.pushState("", "", $(this).attr('href'));
            //load chosen option in the main page
            load_main(get_url_parameter($(this).attr('href'), "show"));
        });
    });
}

function get_url_parameter(url, key) {
  return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(url)||[,""])[1].replace(/\+/g, '%20'))||null
}

function highlight_navbar(option) {
    $(".nav").find(".active").removeClass("active");
    $(".nav").find("[href]").each(function(i, e) {
        if (get_url_parameter($(e).attr('href'), "show") == option) {
            $(e).parent().addClass("active");
        }
    });
}

function load_main(option) {
    $(".collapse").collapse("hide");
    highlight_navbar(option);
    switch(option) {
        case "about":
            load_about();
            break;
        case "publications":
            load_publications();
            break;
        case "work":
            load_work();
            break;
        default:
            load_home();
        };
}

function deffered_load(element, url) {
    $.ajaxSetup({ cache: false });
    return $.get(url, function(data) {$(element).html(data);});
}

function load_header() {
    return deffered_load("#header", "header.html");
}

function load_footer() {
    $("#footer").load("footer.html", function () {
        $.ajaxSetup({ cache: false });
        $.get(".git/logs/HEAD", function(data) {
            $.ajaxSetup({ cache: true });
            var pull = data.lastIndexOf(">");
            var timeUTC = data.substr(pull + 2, 10);
            var date = new Date(timeUTC*1000);
            $("#footer_date").html(date);
        });
    });
}

function load_home() {
    var deferred = [];
    var template;
    deferred.push(deffered_load("#main", "home.html"));
    deferred.push($.get("blog_template.html", function(data) {template = data;}));
    $.when.apply($, deferred).done(function() {
        add_blog("blog", template, apiKey, blogId);
    });
    return 
}

function load_about() {
    return deffered_load("#main", "about.html");
}

function load_publications() {
    var deferred = [];
    var bibtex;
    var template;
    deferred.push(deffered_load("#main", "publications.html"));
    deferred.push($.get("publications.bib", function(data) {bibtex = data;}));
    deferred.push($.get("bibtex_template.html", function(data) {template = data;}));
    $.when.apply($, deferred).done(function() {
        (new BibtexDisplay()).displayBibtex(bibtex, $("#bibtex_display"), template)
    });
}

function load_work() {
    return deffered_load("#main", "work.html");
}