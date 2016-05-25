/*! custom-embed - v0.0.8 */
(function(window, $, undefined) {
    if (typeof $ === "undefined") {
        var intervalWaitjQuery = setInterval(waitjQuery, 100), tries = 0, maxTries = 100;
        function waitjQuery() {
            var jQueryFound = typeof window.jQuery !== "undefined";
            if (jQueryFound || tries === maxTries) {
                if (jQueryFound) {
                    jQueryLoaded(window, window.jQuery);
                } else if (tries === maxTries) {
                    throw new Error("The Scribblelive embed requires jQuery");
                }
                clearInterval(intervalWaitjQuery);
            }
            tries++;
        }
    } else {
        jQueryLoaded(window, window.jQuery);
    }
    function jQueryLoaded(window, $, undefined) {
        function getScriptDomain() {
            var whitelist = [ "https://10.20.20.10/", "http://10.20.20.10/","https://www.repstatic.it/customerfiles.scribblelive.com/groupo_espresso/", "https://s3.amazonaws.com/customerfiles.scribblelive.com/", "http://s3.amazonaws.com/customerfiles.scribblelive.com/", "http://customerfiles.scribblelive.com.s3.amazonaws.com/" ], reWhiteList = new RegExp(whitelist.join("|")), err = new Error(), match;
            return whitelist[2];
        }
        var root = getScriptDomain.call();
        var modules = {
            "key-event": {
                css_required: [ root + "css/key_events.css" ],
                js_required: [ {
                    required: null,
                    toLoad: [ root + "js/key_events.js" ]
                } ],
                init: function() {
                    custom_key_event.init(this);
                    $("head").append('<script src="' + root + 'implementation/custom-embed/latest/js/embed.min.js">');
                }
            }
        };
        function hashFnv32a(str, asString, seed) {
            var i, l, hval = seed === undefined ? 2166136261 : seed;
            for (i = 0, l = str.length; i < l; i++) {
                hval ^= str.charCodeAt(i);
                hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
            }
            if (asString) {
                return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
            }
            return hval >>> 0;
        }
        function array_unique(value, index, self) {
            return self.indexOf(value) === index;
        }
        var rand = new Date().getTime();
        function LoadRequiredStylesheets(required) {
            this.toLoad = $.map(required, function(url) {
                return $.ajax({
                    method: "GET",
                    url: url + "?" + rand,
                    crossDomain: true
                });
            });
        }
        LoadRequiredStylesheets.prototype.loading = function() {
            var dfd = $.when.apply($, this.toLoad);
            dfd.done(function() {
                var list = [];
                if (typeof arguments[1] === "string") {
                    list.push(arguments);
                } else {
                    list = arguments;
                }
                var i, len, dfd;
                for (i = 0, len = list.length; i < len; i++) {
                    dfd = list[i][2];
                    dfd.done(function() {
                        var key = hashFnv32a(this.url, true);
                        if ($("#" + key).length == 0) {
                            var stylesheet = $("<link>", {
                                rel: "stylesheet",
                                id: key,
                                "class": "groupo_espresso",
                                type: "text/css",
                                href: this.url
                            });
                            if ($('link[rel="stylesheet"].groupo_espresso').length) {
                                stylesheet.insertAfter('link[rel="stylesheet"].groupo_espresso:last');
                            } else if ($('link[rel="stylesheet"]:not(.groupo_espresso), style').length) {
                                stylesheet.insertBefore($('link[rel="stylesheet"]:first, style:first').first());
                            } else {
                                stylesheet.appendTo("head");
                            }
                        }
                    });
                }
            }).fail(function(jqXHR) {
                console.warn(new Error("Loading " + this.url + " failed [" + jqXHR.status + "] " + jqXHR.statusText));
            });
            return dfd;
        };
        function LoadRequiredJavascript(required_with_dependency) {
            required_with_dependency = $.map(required_with_dependency, function(el) {
                if (el.required != null) {
                    el.required = $.map(el.required, function(url) {
                        if (url.match(/^\/\//)) return window.location.protocol + url;
                        return url;
                    });
                }
                el.toLoad = $.map(el.toLoad, function(url) {
                    if (url.match(/^\/\//)) return window.location.protocol + url;
                    return url;
                });
                return el;
            });
            var list_required = $.map(required_with_dependency, function(el) {
                return el.toLoad;
            });
            var unique_required = list_required.filter(array_unique);
            this.required_with_dependency = required_with_dependency;
            this.required = unique_required;
            this.deferreds = [];
            this.loaded = [];
            this.pending = [];
            this.loadingFinished = new $.Deferred();
        }
        LoadRequiredJavascript.prototype.loading = function() {
            this._checkRequirements(null);
            return this.loadingFinished.promise();
        };
        LoadRequiredJavascript.prototype._checkRequirements = function(loaded) {
            var _self = this, i, len, url;
            var toLoad = $.map(_self.required_with_dependency, function(element, index) {
                if (loaded == null && element.required == null) return element.toLoad;
                if (element.required != null) {
                    if (0 <= element.required.indexOf(loaded) && element.required.length == 1) {
                        return element.toLoad;
                    } else if (0 <= element.required.indexOf(loaded) && element.required.length > 1) {
                        is_loaded = $.map(element.required, function(url) {
                            if (0 <= _self.loaded.indexOf(url)) return url;
                            return;
                        });
                        if (is_loaded.length == element.required.length) return element.toLoad;
                    }
                }
            });
            toLoad = toLoad.filter(array_unique);
            for (i = toLoad.length - 1; i >= 0; i--) {
                url = toLoad[i];
                if (0 <= _self.loaded.indexOf(url) || 0 <= _self.pending.indexOf(url)) {
                    toLoad.splice(i, 1);
                }
            }
            for (i = 0, len = toLoad.length; i < len; i++) {
                url = toLoad[i];
                _self._getRequiredScript.call(_self, url);
            }
            if (_self.loaded.length == _self.required.length) {
                _self.loadingFinished.resolveWith($, this.deferreds);
            }
        };
        LoadRequiredJavascript.prototype._getRequiredScript = function(url) {
            var _self = this;
            _self.pending.push(url);
            var dfd = $.ajax({
                dataType: "script",
                cache: true,
                url: url
            }).done(function() {
                _self.loaded.push(this.url);
                _self._checkRequirements(this.url);
            }).fail(function(jqXHR) {
                console.warn(new Error("Loading " + this.url + " failed [" + jqXHR.status + "] " + jqXHR.statusText));
                _self.loadingFinished.rejectWith($, this.deferreds);
            });
            _self.deferreds.push(dfd);
        };
        $(function() {
            var css_required = [], js_required = [], modules_to_load = [];
            $(".scrbbl-custom-embed").each(function() {
                var $this = $(this), source = $this.attr("data-src").split("/"), module, i, l, src;
                if (module = modules[source[0]], "undefined" !== typeof module) {
                    modules_to_load.push({
                        src: source[0],
                        element: $this
                    });
                    css_required = $.merge(css_required, module.css_required);
                    js_required = $.merge(js_required, module.js_required);
                }
            });
            css_required = css_required.filter(array_unique);
            js_required = js_required.filter(array_unique);
            var lrs = new LoadRequiredStylesheets(css_required);
            var lrj = new LoadRequiredJavascript(js_required);
            $.when(lrs.loading(), lrj.loading()).done(function() {
                var i, len, m;
                for (i = 0, len = modules_to_load.length; i < len; i++) {
                    m = modules_to_load[i];
                    modules[m.src].init.call(m.element);
                }
            }).fail(function() {
                throw new Error("Failed to load all required resources");
            });
        });
    }
})(window, window.jQuery);