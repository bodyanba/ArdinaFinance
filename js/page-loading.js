if (typeof Pace != "undefined") {
    var soapPageLoadingContent = false;
    var soapPageLoadingProgressInterval = setInterval(function() {
        try {
            if (document.body.className.indexOf("pace-done") != -1) {
                clearInterval(soapPageLoadingProgressInterval);
            }
            if (document.body.className.indexOf("pace-running") == -1) {
                return;
            }
            if (!soapPageLoadingContent) {
				document.getElementsByClassName("pace-activity")[0].innerHTML = 
                    '<img src="../img/logo-load.svg" alt="">' +
                    '<div class="loading-progress-bar">' +
                        '<div class="loading-progress" style="width: 1%;"></div>' +
                    '</div>';
                soapPageLoadingContent = true;
            }

            var percent = document.getElementsByClassName("pace-progress")[0].getAttribute("data-progress-text");
            document.getElementsByClassName("loading-progress")[0].style.width = percent;
        } catch(e) {  }
    }, 50);
}