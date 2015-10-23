$(document).ready(function () {
    load_header();
    load_home();
    $("home").onclick = load_home
    $("about").onclick = load_about
    $("publications").onclick = load_publications
    $("work").onclick = load_work
});

function load_header() {
    $("#header").load('header.html');
}

function load_home() {
    $("#main").load('home.html');
}

function load_about() {
    $("#main").load('about.html');
}

function load_publications() {
    $("#main").load('publications.html');
}

function load_work() {
    $("#main").load('work.html');
}