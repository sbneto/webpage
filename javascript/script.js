$(document).ready(function () {
    load_header();
    load_home();
});

function load_header() {
    $("#header").load('header.html');
}

function load_home() {
    $("#main").load('home.html');
}