var apiKey = "AIzaSyC8OVwZk45gWWus2l6w-s6tEdyx8TtV-i0"
var blogId = "1713900942386127940"

$(window).on("hashchange", function () {
    load_main(get_current_page());
});

function initialize() {
    var deferred = [];
    deferred.push(load_header());
    deferred.push(load_footer());
    deferred.push(load_main(get_current_page()));
    $.when.apply($, deferred).done(function() {
        //Page ready
        $(".nav a").on("click", function(e) {
            //colapse right after click
            $(".collapse").collapse("hide");
            //highlight the option selected
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
            //load chosen option in the main page
            load_main($(this).attr('href'));
        });
        $(".navbar-brand").on("click", function(e) {
            //remove all highlited content in navbar 
            //(maybe should highlight home)
            $(".nav").find(".active").removeClass("active");
            //load home
            load_main($(this).attr('href'))
        });
    });
}

function get_current_page() {
    var url = window.location.href;
    return url.slice(url.indexOf("#!"));
}

function load_main(option) {
    switch(option) {
        case "#!about":
            load_about();
            break;
        case "#!publications":
            load_publications();
            break;
        case "#!work":
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