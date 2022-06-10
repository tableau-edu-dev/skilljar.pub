//selction menu scrolling
function scrollThere(targetElement) {
    var scrollPosition = targetElement.parent().scrollTop();
    var postionOfTargetElement = $("body").scrollTop() + targetElement.offset().top + (-90);
    $('html, body').stop().animate({
        scrollTop: postionOfTargetElement + scrollPosition
    }, 1000, 'swing');
}

// Get HTML head element
var head = document.getElementsByTagName('HEAD')[0];
console.log(head);
// Create new link Element
var link = document.createElement('link');

// set the attributes for link element
link.rel = 'stylesheet';

link.type = 'text/css';

link.href = 'https://tableau-edu-dev.github.io/skilljar.pub/src/pages/catalog/catalog.css';
console.log(link);
// Append link element to HTML head
head.appendChild(link);

$(document).ready(function() {
        if (document.documentElement.lang == 'en-US') {
            //Course header
            $(".coursebox-container[data-tags*='course']").first().addClass('099');
            var nonLPDisplay = '<div class="nonLPDisplay"><br/><h1 style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px; font-size:30px!important;" id="CourseScroll">Courses</h1><p style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px;  ">Interactive courses designed to help you learn how to use Tableau, regardless of your skill level. Hands-on activities and knowledge checks ensure you retain what you learn. Courses are only included with the Creator Subscription.</p></div>';
            $(".coursebox-container[data-tags*='course']").first().before(nonLPDisplay);

            //LP header
            $(".sj-course-series").first().addClass('098');
            var LPDisplay = '<div class="LPDisplay"><br/><h1 style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px; font-size:30px!important;" id="LPScroll">Learning Paths</h1><p style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px;  ">Get the Tableau skills you need. Explore the learning paths below to find the right path for you. Complete a learning path, take the skills assessment, and earn your Tableau Badge today.</p></div>';
            $(".sj-course-series").first().before(LPDisplay);
        } else {
            var NotAvail = '<div class="welcome nihao"><br/><p style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px;  ">Sample eLearning courses currently available only in English. For Tableau Fundamentals, Tableau Intermediate and Tableau Advanced eLearning courses, please purchase a Creator eLearning subscription. Videos available in English with subtitles.<br/><br/>To sample eLearning courses in English, please change the language to English in the language selector above.</p></div><div class="hola"><p style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px;">Actualmente, los cursos de aprendizaje virtual de muestra solo están disponibles en inglés. Para los cursos Aspectos básicos de Tableau, Tableau Nivel intermedio y Tableau Avanzado, es necesario adquirir una suscripción de aprendizaje virtual para usuarios Creator. Videos disponibles en inglés con subtítulos.<br/><br/>Para obtener cursos de aprendizaje virtual de muestra en inglés, cambie el idioma a inglés en el selector de idioma que aparece en la parte superior.</p></div><div class="konnichiwa"><p style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px;  ">eLearning コースのサンプルは、現在英語のみの提供となっています。Tableau Fundamentals (初級～中級)、Tableau Intermediate (中級)  、および Tableau Advanced (高度)   の eLearning コースを利用するには、Creator   向けの eLearning サブスクリプションをご購入ください。字幕付きの英語ビデオをご利用いただけます。<br/><br/>英語での eLearning コースのサンプルにアクセスするには、上部の言語選択メニューの言語を英語に変更してください。</p></div>';
            $(".sj-course-series").first().before(NotAvail);
        }

        //Highlight header visible to all
        $(".coursebox-container[data-tags*='highlight']").first().addClass('097');
        var HIGHLIGHTDisplay = '<div class="HIGHLIGHTDisplay"style="width:100%;"><div class="welcome"><h1 style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px; font-size:30px!important;"> Data Literacy for All</h1><p style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px;  ">Learn foundational analysis concepts to help you gain confidence when working with data.</p></div></div>';

        $(".097").before(HIGHLIGHTDisplay);

        //Pilot header only visible to select groups
        $(".coursebox-container[data-tags*='pilot']").first().addClass('096');
        var PILOTDisplay = '<div class="PILOTDisplay"style="width:100%;"><div class="welcome"><h1 style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px; font-size:30px!important;" >Tableau Desktop Specialist Exam Readiness</h1><p style=" white-space: pre-line; display: block; width:100%;justify-content:center; text-align:center; padding-top:10px;  ">Everything you need to get ready for the exam.</p></div></div>';

        $(".096").before(PILOTDisplay);


        //makes sort menu sticky
        $('.sj-page-catalog').scroll(function() {
            if ($(this).scrollTop() >= 350) {
                $('#sortMenu').addClass("sticky");
            } else {
                $('#sortMenu').removeClass("sticky");
            }
        });



        $('.sj-page-catalog').scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('#tothetop').addClass('show');
            } else {
                $('#tothetop').removeClass('show');
            }
        });

        $('#tothetop').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, '300');
        });
    }

);

//hide/show headers on search
$('#catalogSearchInput').focus(function() {
    $('.LPDisplay').css({
        'display': 'none'
    });
    $('.nonLPDisplay').css({
        'display': 'none'
    });
    $('.PILOTDisplay').css({
        'display': 'none'
    });
    $('.HILIGHTDisplay').css({
        'display': 'none'
    });
});
$('#catalogSearchInput').focusout(function() {
    if ($('.list-view').hasClass('search')) {
        $('.PILOTDisplay').css({
            'display': 'none'
        });
        $('.HIGHLIGHTDisplay').css({
            'display': 'none'
        });
        $('.LPDisplay').css({
            'display': 'none'
        });
        $('.nonLPDisplay').css({
            'display': 'none'
        });
    } else {
        setTimeout(function() {
            $(".coursebox-container[data-tags*='highlight']").filter(":visible").first().addClass('097');
            $(".coursebox-container[data-tags*='pilot']").filter(":visible").first().addClass('096');
            $(".sj-course-series[data-tags*='learning-path']:not(.sj-course-series[data-tags*='pilot'])").filter(":visible").first().addClass('098');
            $(".coursebox-container[data-tags*='course']").filter(":visible").first().addClass('099');

            $(".097").delay(200).before($('.HIGHLIGHTDisplay'));
            $(".096").delay(200).before($('.PILOTDisplay'));
            $(".098").delay(200).before($('.LPDisplay'));
            $(".099").delay(200).before($('.nonLPDisplay'));
            $('.LPDisplay').css({
                'display': 'block'
            });
            $('.HIGHLIGHTDisplay').css({
                'display': 'block'
            });
            $('.PILOTDisplay').css({
                'display': 'block'
            });
            $('.nonLPDisplay').css({
                'display': 'block'
            });
        }, 200);
    }
});
//add lock icon to paid content on front page
$(document).ready(function() {
        $('.course-listing').find('.sj-registration-closed').append('<i class="fa lockDown">&#xf023;</i>');
    }

);
$(document).on('click', 'ul li', function() {
        $(this).addClass('active').siblings().removeClass('active')
    }

);

//All Content Button
$(document).on('click', '#allBtn', function(event) {
        event.preventDefault();
        $('html,body').stop().animate({
            scrollTop: ('0') + $(window).scrollTop()
        }, 500);
        $('.course').css({
            'opacity': '0.2'
        });
        $('.course').animate({
            opacity: 1.0
        });
        //return false;
    }

);
//creator button
$(document).on('click', '#creatorBtn', function(e) {
        e.preventDefault();
        scrollThere($('#LPScroll'));
        $('.course[data-tags*="course"]').css({});
        $('.course.sj-course-series').not("[data-tags*='creator']").css({});
        $('.course.sj-course-series[data-tags*="creator"]').css({
            opacity: .2
        });
        $('.course.sj-course-series[data-tags*="explorer"]').css({
            opacity: .2
        });
        $('.course.sj-course-series[data-tags*="creator"]').animate({
            opacity: 1.0
        });
        $('.course.sj-course-series[data-tags*="explorer"]').animate({
            opacity: 1.0
        });
        $('.course[data-tags*="course"]').animate({
            opacity: 1.0
        });
    }

);
//explorer button
$(document).on('click', '#explorerBtn', function(e) {
        e.preventDefault();
        scrollThere($('#LPScroll'));
        $('.course[data-tags*="legacy"]').css({});
        $('.course.sj-course-series').not("[data-tags*='explorer']").css({});
        $('.course.sj-course-series[data-tags*="explorer"]').css({

            'opacity': '.2'
        });
        $('.course.sj-course-series[data-tags*="explorer"]').animate({
            opacity: 1.0
        });
        $('.course[data-tags*="course"]').animate({
            opacity: .2
        });
        $('.course.sj-course-series').not("[data-tags*='explorer']").animate({
            opacity: .2
        });
        return false;
    }

);
//course button
$(document).on('click', '#courseBtn', function(e) {
        e.preventDefault();
        scrollThere($('#CourseScroll'));
        $('.sj-course-series').css({});
        $('.course[data-tags*="course"]').css({
            'opacity': '.2'
        });
        $('.course[data-tags*="course"]').animate({
            opacity: 1.0
        });
        $('.sj-course-series').animate({
            opacity: .2
        });
    }

);
