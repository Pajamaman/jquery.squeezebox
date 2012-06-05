// jquery.squeezebox
// by David Kennedy
// http://daveden.wordpress.com/

(function ($) {
    "use strict";

    var methods = {
        init: function (options) {
            var settings = $.extend({
                event: "click",
                selected: 0
            }, options);

            return this.each(function () {
                var $squeezebox = $(this).addClass("squeezebox"),
                    $boxes = $squeezebox.children("div").addClass("squeezebox-box"),
                    maxHeight = 0,
                    minHeight = 0,
                    squeezeboxHeight = 0,
                    fontSize = $(this).css("font-size").replace("px", "");

                $boxes.each(function () {
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).height();
                        minHeight = $(this).children(":first-child").outerHeight(true);
                    }

                    squeezeboxHeight += minHeight
                        + parseInt($(this).css("padding-top").replace("px", ""), 10)
                        + parseInt($(this).css("padding-bottom").replace("px", ""), 10);

                    $(this).css("overflow", "hidden")
                        .css("height", minHeight / fontSize + "em")
                        .children(":not(:first-child)").hide();
                }).eq(settings.selected).addClass("active")
                    .css("height", maxHeight / fontSize + "em")
                    .children(":not(:first-child)").show();

                $squeezebox.css("height", (squeezeboxHeight + maxHeight - minHeight) / fontSize + "em");

                $boxes[settings.event](function () {
                    $boxes.clearQueue();

                    $(this).siblings(".active").removeClass("active")
                        .animate({
                            "height": minHeight / fontSize + "em"
                        }).promise().done(function () {
                            $(this).children(":not(:first-child)").hide();
                        });

                    $(this).addClass("active")
                        .animate({
                            "height": maxHeight / fontSize + "em"
                        }).children(":not(:first-child)").show();
                });
            });
        }
    };

    $.fn.squeezebox = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jquery.squeezebox");
        }
    };
}(jQuery));