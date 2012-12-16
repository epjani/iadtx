$(function () {
    $('#scrollable').each(
        function () {
            $(this).jScrollPane(
                {
                    showArrows: $(this).is('.arrow')
                }
            );
            var api = $(this).data('jsp');
            var throttleTimeout;
            $(window).bind(
                'resize',
                function () {
                    if ($.browser.msie) {
                        // IE fires multiple resize events while you are dragging the browser window which
                        // causes it to crash if you try to update the scrollpane on every one. So we need
                        // to throttle it to fire a maximum of once every 50 milliseconds...
                        if (!throttleTimeout) {
                            throttleTimeout = setTimeout(
                                function () {
                                    api.reinitialise();
                                    throttleTimeout = null;
                                },
                                50
                            );
                        }
                    } else {
                        api.reinitialise();
                    }
                    $('#scrollable, .jspContainer,.jspPane, .profiles').unbind('mousewheel');
                    if ($(window).width < 481)
                    {
                        api.destroy();
                    }
                }
            );
            
        }
    )
    $('#scrollable').jScrollPane();
    $('#scrollable, .jspContainer,.jspPane, .profiles').unbind('mousewheel');
});

$(document).mouseup(function (e) {
    var container = $("#advanced_filter_content");
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

function openModal(modal_id) {
    // TODO : check why escClose doesn't work. If there's no solution implement our own by binding keyup event
    switch (modal_id) {
        case 'signup_modal':
            {
                $("#" + modal_id).bPopup({
                    modalColor: '#242223',
                    escClose: true
                });
            }
        case 'signin_modal':
            {
                $("#" + modal_id).bPopup({
                    modalColor: '#242223',
                    onOpen: function () {
                        if ($("#signup_modal").is(":visible")) {
                            $("#signup_modal").bPopup().close();
                        }
                    },
                    escClose: true
                });
            }
    }
}