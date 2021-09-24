function adatper(callback) {
    var zWidth = 640;
    var zHeight = 1136;

    var w = window.innerWidth;
    var h = window.innerHeight;
    var z1 = w / h;
    var z2 = zWidth / zHeight;

    $('.container, .page, .scroll-view').css({
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px'
    });

    var bjZoom = Math.max(window.innerWidth / zWidth, window.innerHeight / zHeight);
    var contentZoom = Math.min(window.innerWidth / zWidth, window.innerHeight / zHeight);

    var x1 = ((window.innerWidth - zWidth * bjZoom) / 2).toFixed(2);
    var y1 = ((window.innerHeight - zHeight * bjZoom) / 2).toFixed(2);

    var x2 = ((window.innerWidth - zWidth * contentZoom) / 2).toFixed(2);
    var y2 = ((window.innerHeight - zHeight * contentZoom) / 2).toFixed(2);

    $('.bg').css({
        'transform': 'translate(' + x1 + 'px, ' + y1 + 'px) scale(' + bjZoom + ')',
        '-webkit-transform': 'translate(' + x1 + 'px, ' + y1 + 'px) scale(' + bjZoom + ')',
    });

    $('.content').css({
        'transform': 'translate(' + x2 + 'px, ' + y2 + 'px) scale(' + contentZoom + ')',
        '-webkit-transform': 'translate(' + x2 + 'px, ' + y2 + 'px) scale(' + contentZoom + ')',
    });

    var zoomWidth = window.innerWidth / zWidth;
   $('.scroll-view').css({
        'transform': 'scale(' + zoomWidth + ')',
        '-webkit-transform': 'scale(' + zoomWidth + ')',
        'width': w / zoomWidth + 'px',
        'height' : h / zoomWidth  + 'px'
    });

    $('.definezoom').css({
        zoom: bjZoom
    });

    // 高度缩放
    var hZoom = window.innerHeight / zHeight;
    $('.content-x-scroll-view').css({
        width: window.innerWidth / hZoom + 'px',
        height: window.innerHeight / hZoom + 'px',
        '-webkit-transform': 'scale(' + hZoom + ')'
    });

    if (typeof (callback) == 'function') {
        callback();
    }
}

