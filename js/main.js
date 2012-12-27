$(function () {
    $('#scrollable, #resume_image_container').each(
        function () {
            $(this).jScrollPane(
                {
                    showArrows: $(this).is('.arrow'),
                    autoReinitialise: true
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
                    if ($(window).width < 481) {
                        api.destroy();
                    }
                }
            );
        }
    )

    $('#scrollable, #resume_image_container').jScrollPane({ autoReinitialise: true });
    $('.mobile-favorites-slider-wrapper').jScrollPane({ autoReinitialise: true });
    $('#scrollable, .jspContainer,.jspPane, .profiles, #resume_image_container').unbind('mousewheel');

    $('#scrollable').each(function () {
        var scrollPane = $(this).jScrollPane();
        var api = scrollPane.data('jsp');
        scrollPane.bind(
            'mousewheel',
            function (event, delta, deltaX, deltaY) {
                var original_delta = event.originalEvent.wheelDelta;
                api.scrollByX(original_delta * -1);
                return false;
            }
        );
    });

    $('.placeholder').focus(function () {

        var input = $(this);
        var placeholder_value = input.attr('placeholder');
        if (input.val() == placeholder_value) {
            input.val('');
            input.removeClass('placeholder_css');
        }
    }).blur(function () {
        var input = $(this);
        var placeholder_value = input.attr('placeholder');
        if (input.val() == '' || input.val() == placeholder_value) {
            input.addClass('placeholder_css');
            input.val(placeholder_value);
        }
    }).blur();
});


function showPortfolio() {
    $('.favoritesScrollPH').hide();
    $('.connectionsScrollPH').hide();
    $('.portfolioScrollPH').fadeIn('fast');
    $('.rhs_menu_item').removeClass('selected');
    $('#rhs_portfolio').addClass('selected');
    reInitializeJScroll();
}
function showFavorites() {
    $('.portfolioScrollPH').hide();
    $('.connectionsScrollPH').hide();
    $('.favoritesScrollPH').fadeIn('fast');
    $('.rhs_menu_item').removeClass('selected');
    $('#rhs_favorites').addClass('selected');
    reInitializeJScroll();
}
function showConnections() {
    $('.portfolioScrollPH').hide();
    $('.favoritesScrollPH').hide();
    $('.connectionsScrollPH').fadeIn('fast');
    $('.rhs_menu_item').removeClass('selected');
    $('#rhs_connections').addClass('selected');
    reInitializeJScroll();
}

function pwdFocus() {
    $('#fakepassword').hide();
    $('#password').show();
    $('#password').focus();
}

function pwdBlur() {
    if ($('#password').attr('value') == '') {
        $('#password').hide();
        $('#fakepassword').show();
    }
}

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

var __clicked_element;
$('.clickable_element').mouseup(function () { __clicked_element = $(this); });

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
        case 'contact_modal':
            {
                var last_item_id = '';
                var element_origin_name = modal_id.split('_')[0];
                $('.rhs_menu_item').each(function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                        last_item_id = $(this).attr('id');
                    }
                });
                $('#rhs_' + element_origin_name).addClass('selected');
                $("#" + modal_id).bPopup({
                    onClose: function () {
                        $('#rhs_' + element_origin_name).removeClass('selected');
                        $('#' + last_item_id).addClass('selected');
                    }
                });
            }
        case 'portfolio_modal':
            {
                //  find src of clicked element img and insert its _origin.jpg as a source for modal image
                var img = __clicked_element.find('.portfolio_item_img').attr('src').split('/')[1].replace('portfolio_', '').replace('.jpg', '_origin.jpg');
                var description = __clicked_element.find('.pi_label').html();

                $('#image_container').html('<img id="modal_image_preview" src="images/' + img + '" />');

                $('.pm_label').html(description);

                $('#' + modal_id).bPopup();
            }
        case 'resume_modal':
            {
                var last_item_id = '';
                var element_origin_name = modal_id.split('_')[0];
                $('.rhs_menu_item').each(function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                        last_item_id = $(this).attr('id');
                    }
                });
                $('#rhs_' + element_origin_name).addClass('selected');
                $('#' + modal_id).bPopup({
                    onClose: function () {
                        $('#rhs_' + element_origin_name).removeClass('selected');
                        $('#' + last_item_id).addClass('selected');
                    }
                }).show();
            }
    }
}

function reInitializeJScroll()
{
    $('#scrollable').each(function () {
        var scrollPane = $(this).jScrollPane();
        var api = scrollPane.data('jsp');
        api.reinitialise();
        scrollPane.bind(
            'mousewheel',
            function (event, delta, deltaX, deltaY) {
                var original_delta = event.originalEvent.wheelDelta;
                api.scrollByX(original_delta * -1);
                return false;
            }
        );
    });
}


//Mobile menu behaviour
$(document).ready(function () {
    $('.mobile-menu-content-ph').each(function () {

        $(this).slideUp();
    });

    $('.mobile-menu-item').click(function () {

        if ($(this).hasClass('active') == true) {

            $(this).removeClass('active');
            $(this).find('.mtitle').css('background-image', 'url(images/m-menu-arrow.png)');

        }
        else {

            $(this).addClass('active');
            $(this).find('.mtitle').css('background-image', 'url(images/m-menu-arrow-active.png)');
        }
        $(this).next().slideToggle(500)

    });    $('.mob-fav-profiles .portfolio_item.narrow_item').click(function () {

        $('.mobile-menu').hide();
        $('.m-portforlio-full').fadeIn();

    })
});