function initAnimation() {
    $('.animated').each(function () {
        var aniDuration, aniDelay, aniFillMode, aniName, aniIteration;
        $(this).attr('data-origin-class', $(this).attr('class'));

        aniDuration = $(this).data('ani-duration');
        aniDelay = $(this).data('ani-delay');
        aniIteration = $(this).data('ani-iteration');
        aniIteration = aniIteration || "initial";
        aniName = $(this).data('ani-name');

        if (aniName == undefined) {
            $(this).css({
                'animation-duration': aniDuration,
                '-webkit-animation-duration': aniDuration,
                'animation-delay': aniDelay,
                '-webkit-animation-delay': aniDelay,
                'animation-iteration-count': aniIteration,
                '-webkit-animation-iteration-count': aniIteration
            });
        }
        else {
            $(this).css({
                'visibility': 'hidden',
                'animation-duration': aniDuration,
                '-webkit-animation-duration': aniDuration,
                'animation-delay': aniDelay,
                '-webkit-animation-delay': aniDelay,
                'animation-iteration-count': aniIteration,
                '-webkit-animation-iteration-count': aniIteration,
            });
        }
    });
}

function playAnimation(elem) {
    clearAnimation(elem);
    var aniItems = $(elem).find('.animated');
    $(aniItems).each(function () {
        var aniName = $(this).data('ani-name');
        if (aniName != undefined) {
            $(this).css({ 'visibility': 'visible' });
            $(this).addClass(aniName);
        }
    });
}

function clearAnimation(elem) {
    $(elem + " .animated").each(function () {
        $(this).css({ 'visibility': 'hidden' });
        $(this).attr('class', $(this).data('origin-class'));
    });
}

function startAnimation(elem, callback, timeout, callback_prev) {
    elem = $(elem).get(0);
    if (elem != null) {
        elem.addEventListener("webkitAnimationStart", function () {
            this.removeEventListener("webkitAnimationStart", arguments.callee);
            if (typeof (callback_prev) == 'function') {
                callback_prev();
            }

            if (typeof (callback) == 'function') {
                if (timeout == 0) {
                    callback();
                }
                else {
                    setTimeout(function () {
                        callback();
                    }, timeout || 0);
                }
            }
        });
    }
}

function endAnimation(elem, callback, timeout) {
    elem = elem.get(0);
    if (elem != null) {
        elem.addEventListener("webkitAnimationEnd", function () {
            this.removeEventListener("webkitAnimationEnd", arguments.callee);
            if (typeof (callback) == 'function') {
                if (timeout == 0) {
                    callback(elem);
                }
                else {
                    setTimeout(function () {
                        callback(elem);
                    }, timeout || 0);
                }
            }
        });
    }
}

function endTransition(elem, callback, timeout) {
    elem = elem.get(0);
    if (elem != null) {
        elem.addEventListener("webkitTransitionEnd", function () {
            this.removeEventListener("webkitTransitionEnd", arguments.callee);
            if (typeof (callback) == 'function') {
                if (timeout == 0) {
                    callback();
                }
                else {
                    setTimeout(function () {
                        callback();
                    }, timeout || 0);
                }
            }
        });
    }
}

function nextPage(elem, isHide) {
    if (isHide == undefined) {
        $('.page').removeClass('curr-page');
    }
    $(elem).addClass('curr-page');
    playAnimation(elem);
}


function nextSection(elem, page, isHide) {
    // isHide:是否隐藏原来的元素
    if (page != undefined) {
        nextPage(page, isHide);
        if (isHide == undefined) {
            $(page + ' .section').removeClass('curr-page');
        }
        $(page + ' ' + elem).addClass('curr-page');
        playAnimation(page + ' ' + elem);
    }
    else {
        if (isHide == undefined) {
            $('.section').removeClass('curr-page');
        }
        $(elem).addClass('curr-page');
        playAnimation(elem);
    }
}