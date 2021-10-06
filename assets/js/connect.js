$(window).on("load", function () {
    setTimeout(function() {
    $('body').addClass('no-loader')}, 1000)
});
function InitLogin() {
    $('body').addClass('auth-page');
    $('body').addClass('auth-image');
}
function RemoveLogin() {
    $('body').removeClass('auth-page');
    $('body').removeClass('auth-image');
}
function InitERP() {
    $('*')
    .filter((idx, el) => !(el instanceof HTMLIFrameElement))
    .contents()
    .each(() => {
        try {
            if (this.nodeType === Node.COMMENT_NODE) {
                $(this).remove();
            }
        } catch (e) {
            console.error(e);
        }
    });
    window.MobileERP.clickA();
    window.MobileERP.connectSidebar();
    window.MobileERP.dark_theme();
    window.MobileERP.plugins_init();
}
const submenu_animation_speed = 200;
window.MobileERP = {
        clickA: function () {
            $("a").click(function (e) {
                if ($(this).attr("href").indexOf('#0') > -1 || $(this).attr("href").indexOf('#') > -1) {
                    event.stopPropagation();
                    e.preventDefault();
                }
            });
        },
        simulateClick:function (elem) {
            // Create our event (with options)
            var evt = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            // If cancelled, don't dispatch our event
            var canceled = !elem.dispatchEvent(evt);
        },
        connectSidebar:function () {
            var select_sub_menus = $('.accordion-menu li:not(.open) ul'),
                active_page_sub_menu_link = $('.accordion-menu li.active-page > a');

            // Hide all sub-menus
            select_sub_menus.hide();

            // Accordion
            $('.accordion-menu li a').on('click', function () {
                var sub_menu = $(this).next('ul'),
                    parent_list_el = $(this).parent('li'),
                    active_list_element = $('.accordion-menu > li.open'),
                    show_sub_menu = function () {
                        sub_menu.slideDown(submenu_animation_speed);
                        parent_list_el.addClass('open');
                    },
                    hide_sub_menu = function () {
                        sub_menu.slideUp(submenu_animation_speed);
                        parent_list_el.removeClass('open');
                    },
                    hide_active_menu = function () {
                        $('.accordion-menu > li.open > ul').slideUp(submenu_animation_speed);
                        active_list_element.removeClass('open');
                    };

                if (sub_menu.length) {

                    if (!parent_list_el.hasClass('open')) {
                        if (active_list_element.length) {
                            hide_active_menu();
                        };
                        show_sub_menu();
                    } else {
                        hide_sub_menu();
                    };

                    return false;

                };
            });

            $('#sidebar-state').on('click', function () {
                $('body').toggleClass('compact-sidebar');
            });
            

            $(window).click(function () {
                if ($('body').hasClass('small-screen-sidebar-active')) {
                    var navToggle = document.querySelector('.small-screens-sidebar-link a');
                    simulateClick(navToggle);
                }
            });

            $('.small-screens-sidebar-link a').on('click', function () {
                $('body').toggleClass('small-screen-sidebar-active');
                event.stopPropagation();
            });

            $('#sidebar-close').on('click', function () {
                $('body').toggleClass('small-screen-sidebar-active');
            });
            
            //$('.page-sidebar').click(function (event) {
            //    event.stopPropagation();
            //});
            
            //$('.horizontal-bar').click(function (event) {
            //    event.stopPropagation();
            //});

            $('.hide-horizontal-bar').on('click', function () {
                $('body').toggleClass('small-screen-sidebar-active');
            });


            var horizontal_sub_menus = $('.horizontal-bar-menu li:not(.open) ul');

            // Hide all sub-menus
            horizontal_sub_menus.hide();
            
            // Accordion
            $('.horizontal-bar-menu li a').on('click', function () {
                var sub_menu = $(this).next('ul'),
                    parent_list_el = $(this).parent('li'),
                    active_list_element = $('.horizontal-bar-menu > ul > li.open'),
                    show_sub_menu = function () {
                        sub_menu.slideDown(submenu_animation_speed);
                        parent_list_el.addClass('open');
                    },
                    hide_sub_menu = function () {
                        sub_menu.slideUp(submenu_animation_speed);
                        parent_list_el.removeClass('open');
                    },
                    hide_active_menu = function () {
                        $('.horizontal-bar-menu > ul > li.open > ul').slideUp(submenu_animation_speed);
                        active_list_element.removeClass('open');
                    };

                if (sub_menu.length) {

                    if (!parent_list_el.hasClass('open')) {
                        if (active_list_element.length) {
                            hide_active_menu();
                        };
                        show_sub_menu();
                    } else {
                        hide_sub_menu();
                    };

                    return false;

                };
            });
        },
        dark_theme: function () {

            if (localStorage.getItem('theme') == 'dark') {
                $('body').addClass('dark-theme');
            }

            if (localStorage.getItem('theme') != 'dark' && $('body').hasClass('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            }

            $('#dark-theme-toggle').on('click', function () {
                $('body').toggleClass('dark-theme');
                if ($('body').hasClass('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
                event.preventDefault();
            });
        },
        plugins_init: function () {

            if ($(window).width() > 767) {
                // Slimscroll
                $('.slimscroll').slimScroll({
                    wheelStep: 5,
                    touchScrollStep: 30,
                    opacity: 0
                }).mouseover(function () {
                    $(this).next('.slimScrollBar').css('opacity', 0.4);
                });
            }

            $('[data-toggle="popover"]').popover();
            $('[data-toggle="tooltip"]').tooltip(); // gives the scroll position

            window.addEventListener('load', function () {
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);

        }
}
function Print(html) {
    var myWindow = window.open("", "Payment Receipt", "width=300px,height=250px");
    myWindow.document.documentElement.innerHTML = html;
    myWindow.print();
}
function Debug(object) {
    console.log(object);
}
function Alert(message) {
    alert(message);
}
function Toast(title, message, type) {
    $.toast({
        heading: title,
        text: message,
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: type,
        hideAfter: 3500,
        stack: 6
    });
}
function Confirm(title, message, type, confirmButtonText, cancelButtonText, dotnetHelper, returnFunction) {
    swal({
        title: title,
        text: message,
        type: type,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        closeOnConfirm: true,
    }, function () {
        dotnetHelper.invokeMethodAsync(returnFunction);
    });
}
function MessageConfirm(title, message) {
    swal(title, message);
}