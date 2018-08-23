'use strict';
// dom stuff
window.addEventListener('DOMContentLoaded', function () {

    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent && !navigator.userAgent.match('CriOS') &&
               !navigator.userAgent.match('FxiOS');

    if (isSafari) {
        var s = document.createElement('style')
        s.innerHTML = `[filter]{filter: none!important}[style*='filter:'] {filter: none!important};`
        document.head.append(s)
    }

    if(window.location.href.indexOf("privacy") === -1) { // Check that we're not on the privacy page (should only set timers on landing page)
        // Toggle to IoT view
        setTimeout(function() {
            document.body.classList.toggle('do')
        }, 4000);
    }

    var resourceIndex = 0

    // setInterval(function() {

    //     document.querySelector('#resources').dataset.index=resourceIndex;
    //     var next = resourceIndex === 2 ? 0 : resourceIndex + 1
    //     goToSlide('#resources', next)
    //     resourceIndex = next

    // }, 10000)

    window.addEventListener('scroll', function() {

        if (window.scrollY > 0) {

            document.body.classList.add('docked')

        } else {

            document.body.classList.remove('docked')

        }

    })

    _doResize()

    var yo = document.querySelector('#yo')
    yo.addEventListener('click', function() {
        document.body.classList.toggle('do')
    })

    var main = document.querySelector('main')

    var _close = function (el) { 

        el.classList.add('hidden')
        document.documentElement.classList.remove('noscroll')

    }

    var _open = function (el) {

        el.classList.remove('hidden')
        document.documentElement.classList.add('noscroll')

    }
 
    Array.prototype.slice.call(document.querySelectorAll('[data-modal-button]')).forEach(function (el) {

        el.addEventListener('click', function (ev) {


            if (!el.dataset.modalButton) throw new Error('closed button that didn\'t have close data-open attr')
            var openEl = document.querySelector(el.dataset.modalButton)
            if (!openEl) throw new Error('no closable element found. selector in data-open is not valid')
            _open(openEl)

        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.modal-close-btn')).forEach(function (el) {

        el.addEventListener('click', function (ev) {

            if (!el.dataset.close) throw new Error('closed button that didn\'t have close data-close attr')
            var closeEl = document.querySelector(el.dataset.close)
            if (!closeEl) throw new Error('no closable element found. selector in data-close is not valid')
            _close(closeEl)

        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.modal')).forEach(function (el) {

        el.addEventListener('click', function (ev) {

            if (ev.target === el)
                _close(el)

        })

    })

    var mobileTrigger = document.querySelector('#mobile-trigger')

    mobileTrigger.addEventListener('click', function (ev) {
        
        var open = main.dataset.showNav
        main.dataset.showNav = open === 'true' ? false : true

    })
    window.addEventListener('click', function (ev) {

        var mobileTrigger = document.querySelector('#mobile-trigger')
        if (mobileTrigger.contains(ev.target)) return 
        
        main.dataset.showNav = 'false'

    })

    if (window.location.pathname == '/thank-you')
        document.querySelector('#confirmation').classList.remove('hidden')

    Array.prototype.slice.call(document.querySelectorAll('.arrow-left')).forEach(function (el) {

        el.addEventListener('click', function (_el) {

            var parent = el.closest('.parent-slider')
            var l = Array.prototype.slice.call(parent.querySelector('.scrollable').children).length
            var index = parent.dataset.index === '0' ? l - 1 : (parseInt(parent.dataset.index) - 1);
            goToSlide('#' + parent.id, index)

        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.arrow-right, [data-clickable]')).forEach(function (el) {

        el.addEventListener('click', function (_el) {

            var parent = el.closest('.parent-slider')
            var l = Array.prototype.slice.call(parent.querySelector('.scrollable').children).length
            if (el.dataset.clickable) {
                var index = parseInt(parent.dataset.index) + parseInt(el.dataset.clickable)
                if (l <= index) index = 0
            } else
                var index = parent.dataset.index.toString() === (l - 1).toString() ? 0 : (parseInt(parent.dataset.index) + 1);
            goToSlide('#' + parent.id, index)

        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.clickables')).forEach(function(el) {

        var parent = el.closest('.parent-slider')
        Array.prototype.slice.call(el.children).forEach(function(_el, index) {

            _el.addEventListener('click', function(ev) {

                goToSlide('#' + parent.id, index)

            })
            
        })

    })

})

function goToSlide(parentId, index, slideBy) {

    var parent = document.querySelector(parentId)
    parent.dataset.index = index
    Array.prototype.slice.call(parent.querySelectorAll(parentId + ' .scrollable')).forEach(function (el) {
        
        // var slideAmount = slideBy ? : index;
        
        var width = el.getBoundingClientRect().width
        el.scrollLeft = (index * width)

    })

}


var _doResize = function () {

}

window.addEventListener('resize', _doResize)