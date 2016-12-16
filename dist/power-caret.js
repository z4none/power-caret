;(function ($, window, document, undefined) {
    var pluginName = 'powerCaret',
        defaults = {
            caretWidth: 2
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.pluginName = pluginName;

        this.init();

        return $(this.element);
    }

    Plugin.prototype.init = function() {
        var editCtrl = this;

        var editFontSize = parseFloat(getComputedStyle(editCtrl.element).getPropertyValue('font-size'));
        var caret = this.caret = $("<div>");
        caret.addClass("power-caret blink");
        caret.css({
            height: editFontSize + "px",
            width: this.options.caretWidth + "px",
            marginLeft: - (this.options.caretWidth/2) + "px"
        });

        var caretMoveTimmer = null;
        $(this.element)
        .addClass("edit-ctrl")
        .focus(function(){
            caret.show();
        })
        .blur(function(){
            caret.hide();
        })
        .on("click input scroll", function(e){
            editCtrl.caretMove(e);
        })
        .on("input", function(){
            caret.addClass("pop")
            .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
                caret.removeClass("pop");
            });
        })
        .on("keydown", function(e){
            clearInterval(caretMoveTimmer);
            caretMoveTimmer = setInterval(function(){
                editCtrl.caretMove(e);
            }, 10);
            caret.removeClass("blink")
        })
        .on("keyup", function(e){
            clearInterval(caretMoveTimmer);
            caret.addClass("blink")
        })

        this.editWrapper = $(this.element).wrap("<span class='edit-wrapper'></span>").parent()[0];
        caret.hide().appendTo($(this.editWrapper));
    };

    Plugin.prototype.caretMove = function(e) {
        var pos = getCaretCoordinates(this.element, this.element.selectionEnd, {
            debug: false
        });
        
        var x = this.editWrapper.offsetLeft - this.element.scrollLeft + pos.left;
        var y = this.editWrapper.offsetTop - this.element.scrollTop + pos.top;

        this.caret.css({
            left: x - this.editWrapper.offsetLeft,
            top: y - this.editWrapper.offsetTop 
        });

        if(this.options.onCaretMove) {
            this.options.onCaretMove(e, x, y)
        }
    }

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);