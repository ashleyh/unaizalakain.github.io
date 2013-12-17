githubPushTemplate = 'pushed to <a href="https://github.com/${status.repo.name}' +
        '/tree/${status.payload.ref}">${status.payload.ref}</a> at ' +
        '<a href="https://github.com/${status.repo.name}">' +
        '${status.repo.name}</a>' +
        '<ul class="commits">{%each(i, commit) $.isArray(status.payload.commits) ? status.payload.commits : [status.payload.commits]%}' +
        '    <li><a href="https://github.com/${status.repo.name}/commit/${commit.sha}">${commit.message}</a></li>' +
        '{%/each%}</ul>'
list = [
    {
        service: "github",
        user: "unaizalakain",
        template: {
            pushEvent: githubPushTemplate
        }
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
                input.children('ul').children('li').sort(function(a, b) {
                    return $(b).data("time") - $(a).data("time");
                }).each(function() {
                    var element = $(this);
                    var date = jQuery.timeago(new Date(element.data("time")));
                    if (output.children('dt:contains("'+date+'")').length == 0) {
                        output.append('<dt>'+date+'</dt>');
                    };
                    output.append('<dd>'+element.html()+'</dd>');
                });
            };
        input.remove();
        },
        limit: 50,
        list: list
    });
});
