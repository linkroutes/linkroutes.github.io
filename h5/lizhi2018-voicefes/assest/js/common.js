
// 打开Loading
function OpenLoading() {
    $('.page-loading').removeClass('page-hide');
}

// 关闭Loading
function CloseLoading() {
    $('.page-loading').addClass('page-hide');
}

$("body").ajaxStart(function () {
    OpenLoading();
});
$("body").ajaxComplete(function () {
    CloseLoading();
});

function addClass(elem, cls, timer) {
    for (var i = 0; i < $(elem).length; i++) {
        var item = $(elem)[i];
        var old_cls = $(item).data('cls');

        if (old_cls == undefined) {
            old_cls = $(item).attr('class');
            $(item).data('cls', old_cls);
        }

        $(item).removeClass();

        timer = timer || 0;
        setTimeout(function () {
            $(item).addClass(old_cls).addClass(cls);
            $(item).data('dynamic-class', cls);
        }, timer)
       
    }
}

var COUNTDOWN = function () {
    this.interrupt = 0;
    this.countdown = function (time, update_func, complete_func) {
        var self = this;
        if (time <= 0) {
            complete_func(time);
        }
        else {
            update_func(time);
            self.interrupt = setTimeout(function () {
                --time;
                self.countdown(time, update_func, complete_func, self.interrupt);
            }, 1000)
        }
    },
        this.clear = function () {
            clearInterval(this.interrupt);
        }
}
