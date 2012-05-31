// jquery.squeezebox
// by David Kennedy
// http://daveden.wordpress.com/

(function($) {
    var methods = {
        init: function(options) {
            var settings = $.extend({
                event: "click"
            }, options);
            
            return this.each(function() {
                var $squeezebox = $(this).addClass("squeezebox"),
                    $boxes =  $squeezebox.children("div").addClass("squeezebox-box"),
                    $headers = $boxes.children(":first-child"),
                    maxHeight = 0,
                    totalHeight = 0,
                    headerHeight = $headers.first().outerHeight(),
                    fontSize = $(this).css("font-size").replace("px", "");
                
                $boxes.each(function() {
                    if ($(this).outerHeight() > maxHeight) {
                        maxHeight = $(this).outerHeight();
                    }
                });
                
                for (var i = 1; i < $headers.length; i++) {
                    totalHeight += headerHeight;
                }
                totalHeight += maxHeight;
                
                $squeezebox.css({
                    "height": (totalHeight / fontSize) + "em",
                    "overflow": "hidden",
                    "position": "relative"
                });
                
                $boxes.css("overflow", "hidden");
                
                $boxes.first().css("height", (maxHeight / fontSize) + "em").addClass("active");
                
                $boxes.not(":first-child").css("height", (headerHeight / fontSize) + "em");
                
                $boxes.last().css({
                    "position": "absolute",
                    "bottom": 0
                });
                
                $boxes[settings.event](function() {
                    $boxes.clearQueue();
                    
                    var $activeBox = $(this).siblings(".active"),
                        $box = $(this);
                    
                    $activeBox.animate({
                        "height": (headerHeight / fontSize) + "em"
                    }).removeClass("active").children(":not(:first-child)");
                    
                    $box.animate({
                        "height": (maxHeight / fontSize) + "em"
                    }).addClass("active").children(":not(:first-child)");
                });
            });
        }
    };
    
    $.fn.squeezebox = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jquery.squeezebox");
        }
    };
})(jQuery);