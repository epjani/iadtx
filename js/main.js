$(document).mouseup(function (e) {
    var container = $("#advanced_filter_content");
    console.log(container.has(e.target));
    console.log($(e.target).parent().attr('id'));
    if (container.has(e.target).length == 0 && e.target.id != 'advanced_filter' && e.target.id != 'advanced_filter_content' && $(e.target).parent().attr('id') != 'advanced_filter') {
        hide_advanded_filter();
    }
});
function toggle_advanced_filter() {
    if ($('#advanced_filter_content').is(':visible')) {
        hide_advanded_filter();
    } else {
        $('#advanced_filter_content').show();
        $('#advanced_filter').addClass('selected');
    }
}
function hide_advanded_filter() {
    $('#advanced_filter_content').hide();
    $('#advanced_filter').removeClass('selected');
}
