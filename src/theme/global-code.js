  var isSamples = (window.location.hostname == "elearning-samples.tableau.com");
  var isExplorer = (window.location.hostname == "explorer-elearning.tableau.com");

  var redirectURLs = {
    "https://elearning.tableau.com/series/web-author": "https://elearning.tableau.com/path/author-learning-path",
    "https://elearning.tableau.com/series/author": "https://elearning.tableau.com/path/author-learning-path",
    "https://explorer-elearning.tableau.com/series/web-author": "https://explorer-elearning.tableau.com/path/author-learning-path"
  }

  var curLang = "default";

  var LangMapToSJLang = {
    "en-US": {"sj_id": "1bzdyi075jus", "path": "/", "wisepopLang": "en-US"},
    "ja-JP": {"sj_id": "3gl30vyogvnmu", "path": "/page/ja", "wisepopLang": "ja"},
    "default": {"sj_id": "1bzdyi075jus", "path": "/", "wisepopLang": "en-US"},
    "es-ES": {"sj_id": "38ih51ma7efg9", "path": "/page/es", "wisepopLang": "es-MX"},
    "zh-CN": {"sj_id": "2o6kwj7e3az2f", "path": "/page/zh", "wisepopLang": "zh-Hans"},
    "ko-KR": {"sj_id": "3jpgmwcua6fbf", "path": "/page/ko", "wisepopLang": "en-US"},
    "de-DE": {"sj_id": "xjnyp0weakhy", "path": "/page/de", "wisepopLang": "en-US"},
    "fr-FR": {"sj_id": "1gxn7bum6r96j", "path": "/page/fr", "wisepopLang": "en-US"}
  }

  var SJLangToLangMap =
  {
    "1bzdyi075jus": "en-US",
    "3gl30vyogvnmu": "ja-JP",
    "38ih51ma7efg9": "es-ES",
    "2o6kwj7e3az2f": "zh-CN",
    "3jpgmwcua6fbf": "ko-KR",
    "xjnyp0weakhy": "de-DE",
    "1gxn7bum6r96j": "fr-FR"
  }

  function getDataFromLang(lang)
  {
    if(lang in LangMapToSJLang)
    {
      return LangMapToSJLang[lang];
    }
    else
    {
      return LangMapToSJLang["default"];
    }
  }

  function getLangFromSJLang(sjLang)
  {
    if(sjLang in SJLangToLangMap)
    {
      return SJLangToLangMap[sjLang];
    }
    return "en-US";
  }

  function getPickerPath()
  {
    //grab the language code that the user just selected
    var languageCode = $('#languagePackSelect option:selected').val();
    //send that code through the language map above to get the redirect URL
    var redirectURL = getDataFromLang(getLangFromSJLang(languageCode))["path"];
    console.log(redirectURL);
    $.cookie('sj_lp', languageCode, {
      path: '/'
    });
    return redirectURL;
  }

  function selectLanguage(cookieId)
  {
    $.cookie('sj_lp', cookieId, {path: '/'});
    window.location.reload(true);
  }

  function checkLanguage(lang)
  {
    var curSJLang = getLangFromSJLang($.cookie('sj_lp'));
    return lang == curSJLang;
  }

  function detectLanguage()
  {
    curLang = getLangFromSJLang($.cookie('sj_lp'));
  }

  function generateCourseTile(href, title, image, desc, tags)
  {
    var lowerTags = "";
    for (let i = 0; i < tags.length; i++) {
      lowerTags += tags[i].toLowerCase();
      if (i + 1 < tags.length)
        lowerTags += ",";
    }

    var output = "<a href=\"" + href + "\" title=\"" + title + "\" class=\"coursebox-container course theme-color-border-hover theme-no-hover welcome\" data-type=\"-c\" data-tags=\"" + lowerTags + "\">";
    output += "<div class=\"sj-ribbon-wrapper  hide\"><div class=\"sj-ribbon \"><span class=\"sj-ribbon-text\"></span></div></div>";
    output += "<div class=\"coursebox-image\"><img src=\"" + image + "\" data-src=\"" + image + "\" alt=\"" + title + "\"></div>";
    output += "<div class=\"coursebox-text\">" + title + "</div>";
    output += "";
    output += "<div class=\"storefront-price\"><span>FREE</span></div>";
    output += "<div class=\"course-time coursebox-callout\"><span></span></div>";
    output += "<div class=\"coursebox-tags\">";
    for (let i = 0; i < tags.length; i++)
    {
      output += "<span class=\"coursebox-tag\" data-tag=\"" + tags[i].toLowerCase() + "\"><span>" + tags[i] + "</span></span>";
    }
    output += "</div>";
    output += "<span class=\"clearfix\"></span>";
    output += "</a>";
  }

  /* May no longer need this function due to change in support case logging */
  function buildSupportLink(data)
  {
    var output = "<a href=\"mailto:";
    output += data["path"];
    output += "?subject=" + encodeURIComponent(data["subject"]);
    output += "&body=" + encodeURIComponent(data["body"]);
    output += "\" target=\"_blank\">" + data["label"] + "</a>";

    return output;
  }

  function checkRedirects()
  {
    var current = location.protocol + '//' + location.host + location.pathname;
    if(current in redirectURLs)
    {
      window.location.replace(redirectURLs[current]);
    }
  }

  /* START Language Picker */
    //when the user changes the language in the language picker, do this..
    if (!isExplorer)
    {
      $(document.body).on('change', '#languagePackSelect', function() {
          $('#languagePackSelect').attr('disabled', 'disabled');
          if ($('.sj-page-catalog').length || $('.sj-page-other').length) //only redirects if they are on a Page
          {
            window.location.replace(getPickerPath());
          }
      });
    }
  /* END Language Picker */

  /* START WisePop Loader */
    var siteKey = "jfAwR29161"; //Creator and Explorer key
    if(isSamples)
      siteKey = "7XkKdLEzqT";

    (function(W,i,s,e,P,o,p){W['WisePopsObject']=P;W[P]=W[P]||function(){(W[P].q=W[P].q||[]).push(arguments)},W[P].l=1*new Date();o=i.createElement(s),p=i.getElementsByTagName(s)[0];o.defer=1;o.src=e;p.parentNode.insertBefore(o,p)})(window,document,'script','//loader.wisepops.com/get-loader.js?v=1&site='+siteKey,'wisepops');
  /* END WisePop Loader */

  $(document).ready(function() {
    checkRedirects();
    detectLanguage();
    var n =  new Date();
    var y = n.getFullYear();

    if(isSamples)
    {
      /* START Samples Specific Code (I think) */
      console.log("loading sample code");
      $('.purchase-button.disabled').attr('href', 'https://buy.tableau.com/en-us/elearning').prepend('Buy eLearning Subscription<i style="font-size:12px" class="fa">&nbsp;&nbsp;&#xf023;</i>');
      $('.sj-page-series').find('.sj-registration-closed').append('<i class="fa lockDown">&#xf023;</i>');

      $('.lockDown').css(
      {
          'color': '#777',
          'float': 'left',
          'height': '100px',
          'padding-right': '15px',
          'position':'absolute',
          'top':'20px',
          'left':'115px',
          'text-shadow': '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'
      });
      /* END Samples Specific Code */
    }

    //Swap in new globe
    $("<style> .fa-globe:before {content:unset;} </style>").appendTo("head");
    $('.fa-globe').html('<img id="globe-svg" src="https://style.tableau.com/sites/default/files/2021-03/globe.svg">');

    /* START Google Tag Manager */
    var dataLayer = [];
    (
        function(w,d,s,l,i){
          w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        }
    )
    (window,document,'script','dataLayer','GTM-BVCN');
    /* END Google Tag Manager */

    /* START Catalog Bottom Section */
      $('#catalog-content').append($('#bottom-section').detach());
      $('#bottom-section').show();
    /* END Catalog Bottom Section */

    /* START Breadcrumb Navigation */
      var path = location.pathname;
      var pathWords = path.replace(/-/g, " ");
      var parts = pathWords.split('/');
      var homeTest = window.location.href;

      parts.shift();
      if (parts.indexOf('series') > -1 || parts.indexOf('path') > -1) {
          parts[0] = '<a  href="' + window.location.origin + '"> HOME </a>';
          parts[1] = '<a href="' + $('.back-to-catalog').attr('href') + '">' + parts[1] + '</a>';
          var breadcrumbs = '<div id="breadCrumbs">' + parts.join(' &gt; ') + '</div>';

          $('.catalog-header').prepend(breadcrumbs);
          $('.top-row-grey').prepend(breadcrumbs);
          $("#breadCrumbs").css({
              'display': 'block',
              'font-size': '.6875em',
              'font-family': '"Benton Sans Medium", Helvetica, sans-serif',
              'text-transform': 'uppercase',
              'letter-spacing': '1px',
              'font-weight': 'normal',
              'font-style': 'normal',
              '-webkit-font-smoothing': 'antialiased',
              'text-transform': 'uppercase',
              'position': 'relative',
              'z-index': '99'
          });

          $('.back-to-catalog').css({
              'display': 'none'
          });
      }
      else if (parts.indexOf('series') > -1 || parts.indexOf('path') > -1)
      {
          parts[0] = '<a  href="' + window.location.origin + '"> HOME </a>';
          var breadcrumbs = '<div id="breadCrumbs">' + parts.join(' &gt; ') + '</div>';

          $('.catalog-header').prepend(breadcrumbs);
          $('.top-row-grey').prepend(breadcrumbs);
          $("#breadCrumbs").css({
              'display': 'block',
              'font-size': '.6875em',
              'font-family': '"Benton Sans Medium", Helvetica, sans-serif',
              'text-transform': 'uppercase',
              'letter-spacing': '1px',
              'font-weight': 'normal',
              'font-style': 'normal',
              '-webkit-font-smoothing': 'antialiased',
              'text-transform': 'uppercase',
              'position': 'relative',
              'top': '-10px',
              'z-index': '99'
          });
          $('.back-to-catalog').css({
              'display': 'none'
          });
      }
      else
      {
          $("#breadCrumbs").css({
              'display': 'none'
          });
          $("#CTA1").css({
              'display': 'none'
          });
          $("#CTA2").css({
              'display': 'none'
          });
      }

      $("#breadCrumbs a").each(function(i) {
          if (($(this).attr('href') == '/') || ($(this).attr('href') == 'undefined')) {
              $(this).attr("href", $(location).attr('href'))
          }});
    /* END Breadcrumb Navigation */

    /* START Hide Purchase Buttons */
      if (window.location.origin.indexOf("visual-analytics") > -1)
      {
          $("#purchase-button-wrapper-large").css(
          {
              'display': 'none'
          });
      }

      if (window.location.origin.indexOf("server-architecture") > -1)
      {
          $("#purchase-button-wrapper-large").css(
          {
              'display': 'none'
          });
      }

      if (window.location.href.endsWith("server-administration"))
      {
          $("#purchase-button-wrapper-large").css(
          {
              'display': 'none'
          });
      }
    /* END Hide Purchase Buttons */

    /* START Language Picker Init */

      var picker = $('.language-pack-wrapper');
      picker.detach();

      if(!isExplorer)
      {
        $('#header-right').prepend(picker);
        picker.css('display', 'none');

        $(".sj-course-series").addClass('welcome');
        $(".course[data-tags*='english']:visible").addClass('welcome');
        $(".course[data-tags*='jian-ti-zhong-wen']").addClass('nihao');
        $(".course[data-tags*='ri-ben-yu']").addClass('konnichiwa');
        $(".course[data-tags*='espanol']").addClass('hola');
      }
    /* END Language Picker Init */

    /* START Language Check */
    if(!isExplorer)
    {
      if ($('.sj-page-catalog').length || $('.sj-page-other').length) //if we are on ANY Page, catalog or custom
      {
          //Only run this the first time the user hits the page from signing in
          //if(isSkilljarFirstPageviewSinceAuth)

          //Only run this the first time the user hits the page from joining eLearning
          if(isSkilljarFirstPageviewSinceNewDomainMembership)
          {
            var curTabLang = $.cookie('tableauLang'); //gets the current TabID language
            var curSJLang = getLangFromSJLang($.cookie('sj_lp')); //gets the current SJ language pack
            var langData = getDataFromLang(curTabLang); //Get target URL for the TabID language
            var url = langData["path"];

            if(curTabLang != curSJLang || window.location.href.substring(window.location.href.length - url.length) != url) //if they are different
            {
              //Set skilljar language pack to match
              $.cookie('sj_lp', langData["sj_id"]);
              //go to the new URL for that language
              window.location.replace(url);
              /*if(window.location.href.substring(window.location.href.length - url.length) != url)
              {
                window.location.replace(url);
              }*/
            }
          }
          else if ($('.sj-page-catalog-root').length) //we are on the root (base) course catalog page
          {
                var redirectURL = getPickerPath();
                if(window.location.href.substring(window.location.href.length - redirectURL.length) != redirectURL)
                {
                    window.location.replace(redirectURL);
                }
          }
      }
      else
      {
          if ($('div#main-container[data-tags*="espanol"]').length && !checkLanguage("es-ES"))
          {
              selectLanguage(getDataFromLang("es-ES")["sj_id"]);
              return;
          }
          if ($('div#main-container[data-tags*="jian-ti-zhong-wen"]').length && !checkLanguage("zh-CN"))
          {
              selectLanguage(getDataFromLang("zh-CN")["sj_id"]);
              return;
          }
          if ($('div#main-container[data-tags*="ri-ben-yu"]').length && !checkLanguage("ja-JP"))
          {
              selectLanguage(getDataFromLang("ja-JP")["sj_id"]);
              return;
          }
      }

      wisepops('properties', {languageSelect:getDataFromLang(curLang)["wisepopLang"]});
    }
    /* END Language Check */

    /* START Footer Init */
      var FooterData = {
        "EULA" : {
          "default": {"label": "Tableau Terms &amp; Conditions", "path": "https://www.tableau.com/eula"},
          "en-US": {"label": "Tableau Terms &amp; Conditions", "path": "https://www.tableau.com/eula"},
          "ja-JP": {"label": "Tableau 利用規約", "path": "https://www.tableau.com/eula"},
          "es-ES": {"label": "Términos y condiciones de Tableau", "path": "https://www.tableau.com/eula"},
          "zh-CN": {"label": "Tableau 条款和条件", "path": "https://www.tableau.com/eula"},
          "ko-KR": {"label": "Tableau 이용 약관", "path": "https://www.tableau.com/eula"},
          "de-DE": {"label": "Tableau-AGB", "path": "https://www.tableau.com/eula"},
          "fr-FR": {"label": "Conditions générales Tableau", "path": "https://www.tableau.com/eula"}
        },
        "FAQ" : {
          "default": {"label": "FAQ", "path": "https://community.tableau.com/s/elearning"},
          "en-US": {"label": "FAQ", "path": "https://community.tableau.com/s/elearning"},
          "ja-JP": {"label": "FAQ", "path": "https://community.tableau.com/s/elearning"},
          "es-ES": {"label": "Preguntas frecuentes", "path": "https://community.tableau.com/s/elearning"},
          "zh-CN": {"label": "FAQ", "path": "https://community.tableau.com/s/elearning"},
          "ko-KR": {"label": "FAQ", "path": "https://community.tableau.com/s/elearning"},
          "de-DE": {"label": "Häufig gestellte Fragen", "path": "https://community.tableau.com/s/elearning"},
          "fr-FR": {"label": "FAQ", "path": "https://community.tableau.com/s/elearning"}
        },
        "Forums" : {
          "default": {"label": "Tableau Community Forums", "path": "https://community.tableau.com/"},
          "en-US": {"label": "Tableau Community Forums", "path": "https://community.tableau.com/"},
          "ja-JP": {"label": "Tableau コミュニティフォーラム", "path": "https://community.tableau.com/"},
          "es-ES": {"label": "Foros de la comunidad de Tableau", "path": "https://community.tableau.com/"},
          "zh-CN": {"label": "Tableau 社区论坛", "path": "https://community.tableau.com/"},
          "ko-KR": {"label": "Tableau 커뮤니티 포럼", "path": "https://community.tableau.com/"},
          "de-DE": {"label": "Tableau Community-Foren", "path": "https://community.tableau.com/"},
          "fr-FR": {"label": "Forums de la Communauté Tableau", "path": "https://community.tableau.com/"}
        },
        "Cookies" : {
          "default": {"label": "Cookie Preferences"},
          "en-US": {"label": "Cookie Preferences"},
          "ja-JP": {"label": "Cookieの環境設定"},
          "es-ES": {"label": "Preferencias de cookies"},
          "zh-CN": {"label": "Cookie 偏好设置"},
          "ko-KR": {"label": "쿠키 환경 설정"},
          "de-DE": {"label": "Cookie-Einstellungen"},
          "fr-FR": {"label": "Préférences en matière de cookies"}
        },
        "Privacy" : {
          "default": {"label": "Your Privacy Choices", "path": "https://www.salesforce.com/form/other/privacy-request/"},
          "en-US": {"label": "Your Privacy Choices", "path": "https://www.salesforce.com/form/other/privacy-request/"},
          "ja-JP": {"label": "お客様によるプライバシー設定の選択肢", "path": "https://www.salesforce.com/form/other/privacy-request/"},
          "es-ES": {"label": "Sus opciones de privacidad", "path": "https://www.salesforce.com/form/other/privacy-request/"},
          "zh-CN": {"label": "您的隐私选择", "path": "https://www.salesforce.com/form/other/privacy-request/"},
          "ko-KR": {"label": "귀하의 개인정보 보호 선택", "path": "https://www.salesforce.com/form/other/privacy-request/"},
          "de-DE": {"label": "Ihre Datenschutzauswahlen", "path": "https://www.salesforce.com/form/other/privacy-request/"},
          "fr-FR": {"label": "Vos Choix en Matière de Confidentialité", "path": "https://www.salesforce.com/form/other/privacy-request/"}
        },
        "Support" : {
          "default": {
            "label": "Support",
            "path": "https://trailhead.salesforce.com/help?support=home&category=Trailhead%20Academy&casereason=e-Learning",
            "subject": "eLearning Technical Support Case",
            "body": "Please fill in the following information to help us resolve the issue you are experiencing.\r\n\t * Your Name: \r\n\t* Your Tableau eLearning email address: \r\n\t* Browser Name: \r\n\t* URL\\Link: \r\n\t* Issue (Please describe the issue you are experiencing): \r\n"
          },
          "en-US": {
            "label": "Support",
            "path": "https://trailhead.salesforce.com/help?support=home&category=Trailhead%20Academy&casereason=e-Learning",
            "subject": "eLearning Technical Support Case",
            "body": "Please fill in the following information to help us resolve the issue you are experiencing.\r\n\t* Your Name: \r\n\t* Your Tableau eLearning email address: \r\n\t* Browser Name: \r\n\t* URL\\Link: \r\n\t* Issue (Please describe the issue you are experiencing): \r\n"
          },
          "ja-JP": {
            "label": "サポート",
            "path": "https://trailhead.salesforce.com/help?support=home&category=Trailhead%20Academy&casereason=e-Learning",
            "subject": "eLearning Technical Support Case",
            "body": "問題解決を迅速にサポートできるよう、以下の情報を入力してください。\r\n\t* 氏名: \r\n\t* Tableaueラーニングの電子メールアドレス: \r\n\t* ブラウザ名: \r\n\t* URL\\リンク: \r\n\t* 問題の説明 (現在体験している問題について説明してください): \r\n"
          },
          "es-ES": {
            "label": "Soporte",
            "path": "https://trailhead.salesforce.com/help?support=home&category=Trailhead%20Academy&casereason=e-Learning",
            "subject": "eLearning Technical Support Case",
            "body": "Complete la siguiente información para ayudarnos a solucionar el problema que está experimentando.\r\n\t* Su nombre: \r\n\t* Dirección de correo electrónico de Tableau eLearning: \r\n\t* Nombre del navegador: \r\n\t* URL\\enlace: \r\n\t* Problema (Describa el problema que está experimentando): \r\n"
          },
          "zh-CN": {
            "label": "支持",
            "path": "https://trailhead.salesforce.com/help?support=home&category=Trailhead%20Academy&casereason=e-Learning",
            "subject": "eLearning Technical Support Case",
            "body": "请输入以下信息，以助我们为您解决遇到的问题。\r\n\t* 您的姓名: \r\n\t* Tableau 在线学习电子邮件地址: \r\n\t* 浏览器名称: \r\n\t* URL\\链接: \r\n\t* 问题（请描述您遇到的问题): \r\n"
          },
          "ko-KR": {
            "label": "지원",
            "path": "https://trailhead.salesforce.com/help?support=home&category=Trailhead%20Academy&casereason=e-Learning",
            "subject": "온라인 학습 기술 지원 사례",
            "body": "발생한 문제를 해결하는 데 도움이 되도록 다음 정보를 입력해 주십시오.\r\n\t* 이름: \r\n\t* Tableau 온라인 학습 이메일 주소: \r\n\t* 브라우저 이름: \r\n\t* URL\\링크: \r\n\t* 문제(발생한 문제를 설명해 주십시오): \r\n"
          },
          "de-DE": {
            "label": "Support",
            "path": "https://trailhead.salesforce.com/help?support=home&category=Trailhead%20Academy&casereason=e-Learning",
            "subject": "eLearning Technischer Support-Fall",
            "body": "Bitte machen Sie folgende Angaben, damit wir Ihr Problem lösen können.\r\n\t* Ihr Name: \r\n\t* Ihre bei Tableau eLearning hinterlegte E-Mail-Adresse: \r\n\t* Browser-Name: \r\n\t* URL\\Link: \r\n\t* Problem (Bitte beschreiben Sie Ihr Problem.): \r\n"
          },
          "fr-FR": {
            "label": "Assistance",
            "path": "https://trailhead.salesforce.com/help?support=home&category=Trailhead%20Academy&casereason=e-Learning",
            "subject": "Demande d’assistance technique eLearning",
            "body": "Veuillez indiquer les informations suivantes afin de nous aider à résoudre votre problème.\r\n\t* Nom: \r\n\t* E-mail eLearning Tableau: \r\n\t* Navigateur utilisé: \r\n\t* URL\\Lien: \r\n\t* Problème (veuillez décrire le problème que vous rencontrez): \r\n"
          }
        },
        "Exit" : {
          "default": {"label": "Exit"},
          "en-US": {"label": "Exit"},
          "ja-JP": {"label": "終了"},
          "es-ES": {"label": "Salir"},
          "zh-CN": {"label": "退出"},
          "ko-KR": {"label": "종료"},
          "de-DE": {"label": "Schließen"},
          "fr-FR": {"label": "Quitter"}
        }
      }

      var Overview = null;
      if($('#cp-content-2').length)
      {
        // more than one lesson
        Overview =  $('#returnToOverview').attr('href');
      }
      else
      {
        Overview = $('.back-to-catalog').attr('href');
      }

      if ($('#footer-left').length)
      {
        $('#footer-left').html('<ul><li>© '+ y +' </li><li><a href="' + FooterData["EULA"][curLang]["path"] + '" target="_blank">' + FooterData["EULA"][curLang]["label"] + '</a></li><li><a href="' + FooterData["FAQ"][curLang]["path"] + '" target="_blank">' + FooterData["FAQ"][curLang]["label"] + '</a></li><li><a href="' + FooterData["Forums"][curLang]["path"] + '" target="_blank">' + FooterData["Forums"][curLang]["label"] + '</a></li><li><a href="' + FooterData["Support"][curLang]["path"] + '" target="_blank">' + FooterData["Support"][curLang]["label"] + '</a></li><li><a href="' + FooterData["Privacy"][curLang]["path"] + '" target="_blank"><img style="width: 30px; height: 15px;" src="//www.salesforce.com/content/dam/web/global/svg-icons/icon-cpra.svg"> ' + FooterData["Privacy"][curLang]["label"] + '</a></li></ul>');

        /* future footer that contains OneTrust link */
        //$('#footer-left').html('<ul><li>© '+ y +' </li><li><a href="' + FooterData["EULA"][curLang]["path"] + '" target="_blank">' + FooterData["EULA"][curLang]["label"] + '</a></li><li><a href="' + FooterData["FAQ"][curLang]["path"] + '" target="_blank">' + FooterData["FAQ"][curLang]["label"] + '</a></li><li><a href="' + FooterData["Forums"][curLang]["path"] + '" target="_blank">' + FooterData["Forums"][curLang]["label"] + '</a></li><li>' + buildSupportLink(FooterData["Support"][curLang]) + '</li><li><a href="#" data-ignore-geolocation="true" class="optanon-toggle-display">' + FooterData["Cookies"][curLang]["label"] + '</a></li><li><a href="' + FooterData["Privacy"][curLang]["path"] + '" target="_blank"><img style="width: 30px; height: 15px;" src="//www.salesforce.com/content/dam/web/global/svg-icons/icon-cpra.svg"> ' + FooterData["Privacy"][curLang]["label"] + '</a></li></ul>');
      }
      else if ($('#lp-footer').length)
      {
        // Lesson page
        $('#lp-footer').append('<div class="support-link-outer"><div class="support-link-inner"><a href="' + FooterData["Support"][curLang]["path"] + '" target="_blank">' + FooterData["Support"][curLang]["label"] + '</a>&nbsp | &nbsp<a href="' + Overview +'" target="_self" id="BTOverview" class="lesson-support-link">' + FooterData["Exit"][curLang]["label"] + '</a></div></div>');
      }
    /* END Footer Init */


  });
