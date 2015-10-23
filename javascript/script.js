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
    $("#main").load("publications.html");
    $("body").append("<div class=\"bibtex_template\"><div class=\"if author\" style=\"font-weight: bold;\">\n  <span class=\"if year\">\n    <span class=\"year\"></span>, \n  </span>\n  <span class=\"author\"></span>\n  <span class=\"if url\" style=\"margin-left: 20px\">\n    <a class=\"url\" style=\"color:black; font-size:10px\">(view online)</a>\n  </span>\n</div>\n<div style=\"margin-left: 10px; margin-bottom:5px;\">\n  <span class=\"title\"></span>\n</div></div>");
    $(".bibtex_template").hide();
    (new BibtexDisplay()).displayBibtex($("#bibtex_input").val(), $("#bibtex_display"));
}

function load_work() {
    $("#main").load("work.html");
}

var disp = '  @MISC{antlr:targets,\
        AUTHOR = "Terance Parr et al",\
        TITLE = "ANTLR code generation targets",\
        MONTH = "May",\
        YEAR = {2010},\
        NOTE = "\\url{http://www.antlr.org/wiki/display/ANTLR3/Code+Generation+Targets?focusedCommentId=23232603#comment-23232603}"\
  }\
\
  @MISC{antlr:works,\
        AUTHOR = "Jean Bovet and Terance Parr",\
        TITLE = "ANTLRWorks: An ANTLR Grammar Development Environment",\
        MONTH = "July",\
        YEAR = {2007},\
        NOTE = "\\url{http://www.antlr.org/papers/antlrworks-draft.pdf}"\
  }\
\
  @MISC{antlr:keywords,\
        AUTHOR = "Terance Parr",\
        TITLE = "How can I allow keywords as identifiers?",\
        MONTH = "June",\
        YEAR = {2008},\
        NOTE = "\\url{http://www.antlr.org/wiki/pages/viewpage.action?pageId=1741}"\
  }\
\
  @misc{ wiki:ast,\
    author = "Wikipedia",\
    title = "Abstract syntax tree --- Wikipedia{,} The Free Encyclopedia",\
    year = "2010",\
    url = "\\url{http://en.wikipedia.org/w/index.php?title=Abstract_syntax_tree&oldid=351440895}",\
    note = "[Online; accessed 30-March-2010]"\
  }'