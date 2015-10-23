$(document).ready(function () {
    load_header();
    load_home();
});

function load_header() {
    $("#header").load("header.html");
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
    deferred.push($.get("publications.bib", function(data, bibtex) {bibtex = data;}));
    deferred.push($.get("bibtex_template.html", function(data, template) {template = data;}));
    $.when.apply($, deferred).done(function() {
        (new BibtexDisplay()).displayBibtex(bibtex, $("#bibtex_display"), template)
    });
    // $("#main").load("publications.html", function() {
    //     if ($(".bibtex_template").size() == 0) {
    //         $("#main").append("<div class=\"bibtex_template\"><div class=\"if author\" style=\"font-weight: bold;\">\n  <span class=\"if year\">\n    <span class=\"year\"></span>, \n  </span>\n  <span class=\"author\"></span>\n  <span class=\"if url\" style=\"margin-left: 20px\">\n    <a class=\"url\" style=\"color:black; font-size:10px\">(view online)</a>\n  </span>\n</div>\n<div style=\"margin-left: 10px; margin-bottom:5px;\">\n  <span class=\"title\"></span>\n</div></div>");
    //         $(".bibtex_template").hide();
    //     }
    //     $.get("publications.bib", function(bibtex) {
    //         (new BibtexDisplay()).displayBibtex(bibtex, $("#bibtex_display"));
    //     });
    // });
}

function load_work() {
    $("#main").load("work.html");
}
