list = [
    {
        service: "github",
        user: "unaizalakain"
    },
    {
        service: "twitter",
        user: "unaizalakain"
    },
    {
        service: "bitbucket",
        user: "unaizalakain"
    }
];

$(document).ready(function() {
    var count = 0;
    var input = $('#latest');
    var output = $('#activities');
    input.hide();
    input.lifestream({
        feedloaded: function(){
            count++;
            if( count === list.length){
                input.sort(function(a, b) {
                    return $(b).data("time") - $(a).data("time");
                });
                input.find('li').each(function() {
                    var element = $(this);
                    var date = jQuery.timeago(new Date(element.data("time")));
                    if (output.children('dt:contains("'+date+'")').length == 0) {
                        output.append('<dt>'+date+'</dt>');
                    };
                    output.append('<dd>'+element.html()+'</dd>');
                });
            };
        },
        limit: 50,
        list: list
    });
});
