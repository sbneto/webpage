$(document).ready(function () {
    load_header();
    load_home();
    document.getElementById("home").onclick = load_home;
    document.getElementById("about").onclick = load_about;
    document.getElementById("publications").onclick = load_publications;
    document.getElementById("work").onclick = load_work;
});

function load_header() {
    $("#header").load('header.html');
}

function load_home() {
    $("#main").load('home.html');
}

function load_about() {
    $("#main").load('about.html');
    return false;
}

function load_publications() {
    $("#main").load('publications.html');
}

function load_work() {
    $("#main").load('work.html');
}