$(document).ready(function () {
    load_header();
    load_home();
    $("#home").click(load_home)
    $("#about").click(load_about)
    $("#publications").click(load_publications)
    $("#work").click(load_work)
});

function load_header() {
    event.preventDefault();
    $("#header").load('header.html');
}

function load_home() {
    event.preventDefault();
    $("#main").load('home.html');
}

function load_about() {
    event.preventDefault();
    $("#main").load('about.html');
}

function load_publications() {
    event.preventDefault();
    $("#main").load('publications.html');
}

function load_work() {
    event.preventDefault();
    $("#main").load('work.html');
}