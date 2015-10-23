$(document).ready(function () {
    load_header();
    load_home();
    $("#home").click(load_home)
    $("#about").click(load_about)
    $("#publications").click(load_publications)
    $("#work").click(load_work)
});

function load_header() {
    $("#header").load('header.html');
    return false
}

function load_home() {
    $("#main").load('home.html');
    return false
}

function load_about() {
    $("#main").load('about.html');
    return false
}

function load_publications() {
    $("#main").load('publications.html');
    return false
}

function load_work() {
    $("#main").load('work.html');
    return false
}