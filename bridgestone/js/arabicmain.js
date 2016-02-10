﻿$(function () {

    $('.lgarea').find('img').first().addClass('fullwidth logo');
    $('footer').find('img').first().addClass('footlogo Absolute-Center');

    $('input').iCheck({
        checkboxClass: 'icheckbox_square-grey',
        radioClass: 'iradio_square-grey',
        increaseArea: '20%' // optional
    });+

    function removeparent(pTags, ifTag) {
        pTags.each(function () {
            var me = $(this);
            if (me.parent().is(ifTag)) {
                me.unwrap();
            }
        });

    }

    removeparent($('.myanimbox img'), "p");
    removeparent($('footer').find('img'), "p");
    removeparent($('.lgarea').find('img'), "p");
    removeparent($('.flist').find('img'), "p");

    var nextpage = $('#nexttpage');
    $('.puthere a').attr('href', nextpage.text());


    //show image preview
    function showpreview(img, err_div, file) {
        var typesarray = ["image/png", "image/jpg", "image/gif", "image/svg", "image/jpeg"];
        var filename = file.files[0].name;
        var size = file.files[0].size;
        var type = file.files[0].type;
        var actual_input = $(file);
        var preview = img;
        var error_div = err_div;
        if ($.inArray(type, typesarray) < 0) {
            error_div.html('Invalid image type').css('color', 'red');
            $(file).val(''); //empty the input element
            return false;
        }
        if (size > 943000000) {
            error_div.html('Image cannot be above 900mb large').css('color', 'red');
            $(file).val('');
            return false;
        }
        error_div.html('');
        if (file.files && file.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                preview.attr('src', "/images/user-200.png");
                preview.attr('src', e.target.result).css('display', 'block');
            };
            reader.readAsDataURL(file.files[0]);
        }
    }

    if ($('#uploadBtn').length > 0) {
        document.getElementById("uploadBtn").onchange = function () {
            document.getElementById("uploadFile").value = this.value;
            showpreview($('.imgprev'), $('.error_div'), this);
        };
    }



    $('.gotopro').click(function () {
        var elem = $('.' + $(this).data('elem'));
        var fir = elem.offset().top;
        $('html, body').animate({
            scrollTop: fir - 50
        }, 1000);
    });

    $('header').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass('animated slideInDown');
    });

    $('.clientarrr').removeClass('hide');
    //start js
    var dwidth = window.innerWidth;
    var dheight = window.innerHeight;

    function dyheight() {

        if (dwidth > 767) {
            $('.homeanimarea').css('height', (dheight - $('header').height()) + 'px');
        }
    }

    //if (dwidth > 768) {
    //    $(window).scroll(function () {
    //        if ($(window).scrollTop() > 500) {
    //            $('header').addClass('floatinghead animated slideInDown');
    //        } else {
    //            $('header').removeClass('floatinghead animated slideInDown');
    //        }
    //    });
    //}

    dyheight();

    function callgallery() {
        if ($('.myanimbox').length > 0) {
            dwidth = window.innerWidth;
            dheight = window.innerHeight;
            $('.myanimbox').cycle({
                before: function (currSlideElement, nextSlideElement, options, forwardFlag) {
                    //alert($(currSlideElement).find('.textsplash').attr('class'));

                },
                after: function (currSlideElement, nextSlideElement, options, forwardFlag) {

                }
            });
        }

    }

    callgallery();

    function animtextsplash() {
        if ($('.textsplash').length > 0) {
            $('.textsplash').css('right', $('.container').first().css('margin-right') + '');
        }
        if ($('.textbanner').length > 0 && dwidth > 765) {
            if (dwidth > 1024) {
                $('.textbanner').css('right', parseInt($('.container').first().css('margin-right'), 10) + 90 + 'px');
            } else {
                $('.textbanner').css('right', parseInt($('.container').first().css('margin-right'), 10) + 50 + 'px');
            }

        }
    }
    animtextsplash();

    window.addEventListener("resize", function () {
        dyheight();
        callgallery();
        animtextsplash()
    });

    // Listen for orientation changes
    window.addEventListener("orientationchange", function () {
        // Announce the new orientation number
        dyheight();
        callgallery();
    }, false);

    if (dwidth < 1025) {
        $('header').find('.col-md-6').first().removeClass('col-md-6');
        $('header').find('.col-md-4').first().removeClass('col-md-4');
        $('header').find('.col-md-2').first().removeClass('col-md-2');
    }

    if (dwidth < 764) {
        $('#mainmenu').removeClass('hidden-xs').attr('id', 'replacediv').parent().attr('id', 'menu2');
        $('#menu2').mmenu({
            extensions: ['effect-listitems-slide', 'pageshadow', 'theme-dark'],
            header: true,
            position: "left",
            direction: "left",
            footer: true,
            searchfield: true,
            footer: {
                add: true,
                content: $('.gticket').html()
            },

            iconPanels: {
                add: true,
                visible: 1
            },
            navbars: {
                height: 3,
                content: [
                    $('.searchareabar').html() + '<div class="ticketdiv">' + $('.gticket').html() + '</div>' + '<div class="glyphicon glyphicon-remove-circle whitetext closer"></div>'
                ]
            },
            navbar: {
                add: false
            }, counters: true
        }).on('click',
                        'a[href^="#/"]',
                        function () {

                            //alert( "Thank you for clicking, but that's a demo link." );
                            return false;
                        }
                    );

        var API = $("#menu2").data("mmenu");

        $(".closer").click(function () {
            API.close();
        });

    }

    //other stuff
    $('.theaboutlist li').click(function () {
        var clicked = $(this);
        var me = $(this).children('a').first();

        if (!me.hasClass('actively')) {
            var fd = 100;
            if ($('.headban2').length > 0) {
                fd = 300;
                if (dwidth < 800) {
                    fd = 700;
                }
            }
            var fir = $('.headban,.headban2').first().offset().top;
            var index = clicked.index();
            $('.theaboutlist li a').removeClass('actively');
            me.addClass('actively');
            $('.sidecontent').removeClass('activelyselected').fadeOut();

            var divtoshow = $('.sidecontent').eq(index);
            divtoshow.fadeIn(500).addClass('activelyselected');
            $('html, body').animate({
                scrollTop: (fir + fd)
            }, 1000);
            return false;

        }
    });

    //owl carousal
    if ($('.owl-carouselz').length > 0) {
        $('.owl-carouselz').owlCarousel({
            rtl: true,
            loop: true,
            autoplay: true,
            margin: 10,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            },
            navText: ["<i class='glyphicon glyphicon-triangle-left'></i>", "<i class='glyphicon glyphicon-triangle-right'></i>"]
        })
        //$("#owl-example").owlCarousel({
        //    autoPlay: 5000, //Set AutoPlay to 5 seconds
        //    items: 7,
        //    itemsDesktop: [1199, 3],
        //    itemsDesktopSmall: [979, 3],
        //    rtl:true,
        //    pagination: false,
        //    navigation: true,
        //    navigationText: ["<i class='glyphicon glyphicon-triangle-left'></i>", "<i class='glyphicon glyphicon-triangle-right'></i>"]
        //});
    }

    //owl carousal
    if ($('.bcaro').length > 0) {

        $('.bcaro').owlCarousel({
            rtl: true,
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            },
            navText: ["<i class='glyphicon glyphicon-triangle-left'></i>", "<i class='glyphicon glyphicon-triangle-right'></i>"]
        })

        $('.lnk').click(function (i) {
            var me = $(this);
            var index = me.index();

            $('.bcaro').trigger('to.owl.carousel', index)
            return false;
        });

        //$(".bcaro").owlCarousel({
        //    items: 1,
        //    rtl:true,
        //    itemsDesktop: [1199, 3],
        //    itemsDesktopSmall: [979, 3],
        //    pagination: false,
        //    navigation: true,
        //    navigationText: ["<i class='glyphicon glyphicon-triangle-left'></i>", "<i class='glyphicon glyphicon-triangle-right'></i>"]
        //});
    }

    $('.opendrop').click(function () {
        var me = $(this);
        var fir = me.offset().top;
        if ($('.opendrop ul:visible').length > 0) {
            $('.opendrop ul:visible').slideToggle(500);
        }
        me.find('ul, ol').first().slideToggle(500, function () {
            $('html, body').animate({
                scrollTop: fir - 200
            }, 1000);
        });
    });

    $('.maps').click(function () {
        $('.maps iframe').css("pointer-events", "auto");
    });

    $('.seacrbtn').click(function () {
        $('.sacher').toggleClass('hidden-xs visible-sm visible-md');
    });




    var options = {
        beforeSubmit: showRequest,
        uploadProgress: progressbar,
        error: show_error,
        forceSync: true,
        beforeSend: beforesend,
        success: showResponse  // post-submit callback 
    };

    $('.myform').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });
    function beforesend() {
        $('.loadingmsg').slideDown(100);

    }
    function progressbar(event, position, total, percentComplete) {

    }

    function showResponse(responseText, statusText, xhr, $form) {
        //handle response
        $('.loadingmsg').slideUp(500);
        if (responseText == "") {
            $('.myalert').removeClass('alert-success').addClass('alert-error').slideDown(500).html("<b>failed</b> - Failed to send message");
        } else if (responseText.indexOf('mandatorymsgerror') > -1) {
            $('.myalert').removeClass('alert-success').addClass('alert-error').slideDown(500).html(responseText);
        } else {
            $('.myalert').removeClass('alert-error').addClass('alert-success').slideDown(500).html(responseText);
            if ($form.hasClass('showbro')) {
                $('.downloadfile').fadeIn(1000).find('a').attr('href', '/uploadfiles/arabic.pdf');

                var firr = $('.downloadfile').first().offset().top;
                $('html, body').animate({
                    scrollTop: firr
                }, 1000);
            }

            if ($form.hasClass('showspon')) {
                $('.downloadfile').fadeIn(1000).find('a').attr('href', '/uploadfiles/english sponsorship.pdf');

                var firr = $('.downloadfile').first().offset().top;
                $('html, body').animate({
                    scrollTop: firr
                }, 1000);
            }

            if ($form.hasClass('compete')) {
                setTimeout(function () {
                    location.reload();
                }, 3000)
            }

        }


        setTimeout(function () { $('.myalert').slideUp(500) }, 10000);
    }
    function showRequest(formData, jqForm, options) {


    }
    function show_error($form) {
        $('.loadingmsg').hide(500);
        $('.myalert').removeClass('alert-success').addClass('alert-error').slideDown(500).html("<b>failed</b> - Failed to send message");
    }

})