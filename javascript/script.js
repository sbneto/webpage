$(document).ready(function () {
    deferred = [];
    deferred.push(load_header());
    deferred.push(load_home());
    deferred.push(load_footer());
    $.when.apply($, deferred).done(function() {
        //Page ready
        
        $(".nav a").on("click", function() {
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
            switch($(this).attr('href')) {
            case "#about":
                load_about();
                break;
            case "#publications":
                load_publications();
                break;
            case "#work":
                load_work();
                break;
            default:
                load_home();
            };
        });

    });
})

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
    return deffered_load("#main", "home.html");
}

function load_about() {
    return deffered_load("#main", "about.html");
}

function load_publications() {
    deferred = [];
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