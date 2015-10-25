$(document).ready(function () {
    load_header();
    load_home();
    load_footer();
});

function load_header() {
    $("#header").load("header.html");
}

function load_footer() {
    $("#footer").load("footer.html", function () {
        $.get(".git/logs/HEAD", function(data) {
            var pull = data.lastIndexOf("pull");
            var timeUTC = data.substr(pull - 17, 10);
            var date = new Date(timeUTC*1000);
            $("#footer_date").html(date);
        });
    });
}

function load_home() {
    $("#main").load("home.html");
}

function load_about() {
    $("#main").load("about.html");
}

function load_publications() {
    deferred = [];
    var bibtex;
    var template;
    deferred.push($.get("publications.html", function(data) {$("#main").html(data);}));
    deferred.push($.get("https://raw.githubusercontent.com/sbneto/tex_cv/master/publications.bib", function(data) {bibtex = data;}));
    deferred.push($.get("bibtex_template.html", function(data) {template = data;}));
    $.when.apply($, deferred).done(function() {
        (new BibtexDisplay()).displayBibtex(bibtex, $("#bibtex_display"), template)
    });
}

function load_work() {
    $("#main").load("work.html");
}
