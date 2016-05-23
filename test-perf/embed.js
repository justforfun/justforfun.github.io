/*! custom-embed - v0.0.8 */
!
function (a, b, c) {
    function d() {
        var b = "undefined" != typeof a.jQuery;
        if (b || g === h) {
            if (b) e(a, a.jQuery);
            else if (g === h) throw new Error("The Scribblelive embed requires jQuery");
            clearInterval(f)
        }
        g++
    }
    function e(a, b, c) {
        function d() {
            //var a = ["https://10.20.20.10/", "http://10.20.20.10/", "https://s3.amazonaws.com/customerfiles.scribblelive.com/", "http://s3.amazonaws.com/customerfiles.scribblelive.com/", "http://customerfiles.scribblelive.com.s3.amazonaws.com/"];
            var a = ["https://10.20.20.10/", "http://10.20.20.10/", "https://www.repstatic.it/customerfiles.scribblelive.com/", "http://www.repstatic.it/customerfiles.scribblelive.com/", "http://customerfiles.scribblelive.com.s3.amazonaws.com/"];
            new RegExp(a.join("|")), new Error;
            return a[2]
        }
        function e(a, b, d) {
            var e, f, g = d === c ? 2166136261 : d;
            for (e = 0, f = a.length; f > e; e++) g ^= a.charCodeAt(e), g += (g << 1) + (g << 4) + (g << 7) + (g << 8) + (g << 24);
            return b ? ("0000000" + (g >>> 0).toString(16)).substr(-8) : g >>> 0
        }
        function f(a, b, c) {
            return c.indexOf(a) === b
        }
        function g(a) {
            this.toLoad = b.map(a, function (a) {
                return b.ajax({
                    method: "GET",
                    url: a + "?" + k,
                    crossDomain: !0
                })
            })
        }
        function h(c) {
            c = b.map(c, function (c) {
                return null != c.required && (c.required = b.map(c.required, function (b) {
                    return b.match(/^\/\//) ? a.location.protocol + b : b
                })), c.toLoad = b.map(c.toLoad, function (b) {
                    return b.match(/^\/\//) ? a.location.protocol + b : b
                }), c
            });
            var d = b.map(c, function (a) {
                return a.toLoad
            }),
                e = d.filter(f);
            this.required_with_dependency = c, this.required = e, this.deferreds = [], this.loaded = [], this.pending = [], this.loadingFinished = new b.Deferred
        }
        var i = d.call(),
            j = {
                "key-event": {
                    css_required: [i + "groupo_espresso/css/key_events.css"],
                    js_required: [{
                        required: null,
                        toLoad: [i + "groupo_espresso/js/key_events.js"]
                    }],
                    init: function () {
                        //custom_key_event.init(this), b("head").append('<script src="' + i + 'implementation/custom-embed/latest/js/embed.min.js">')
                        custom_key_event.init(this), b("head").append('<script src="' + i + 'groupo_espresso/custom-embed/latest/js/embed.min.js">')
                    }
                }
            },
            k = (new Date).getTime();
        g.prototype.loading = function () {
            var a = b.when.apply(b, this.toLoad);
            return a.done(function () {
                var a = [];
                "string" == typeof arguments[1] ? a.push(arguments) : a = arguments;
                var c, d, f;
                for (c = 0, d = a.length; d > c; c++) f = a[c][2], f.done(function () {
                    var a = e(this.url, !0);
                    if (0 == b("#" + a).length) {
                        var c = b("<link>", {
                            rel: "stylesheet",
                            id: a,
                            "class": "groupo_espresso",
                            type: "text/css",
                            href: this.url
                        });
                        b('link[rel="stylesheet"].groupo_espresso').length ? c.insertAfter('link[rel="stylesheet"].groupo_espresso:last') : b('link[rel="stylesheet"]:not(.groupo_espresso), style').length ? c.insertBefore(b('link[rel="stylesheet"]:first, style:first').first()) : c.appendTo("head")
                    }
                })
            }).fail(function (a) {
                console.warn(new Error("Loading " + this.url + " failed [" + a.status + "] " + a.statusText))
            }), a
        }, h.prototype.loading = function () {
            return this._checkRequirements(null), this.loadingFinished.promise()
        }, h.prototype._checkRequirements = function (a) {
            var c, d, e, g = this,
                h = b.map(g.required_with_dependency, function (c, d) {
                    if (null == a && null == c.required) return c.toLoad;
                    if (null != c.required) {
                        if (0 <= c.required.indexOf(a) && 1 == c.required.length) return c.toLoad;
                        if (0 <= c.required.indexOf(a) && c.required.length > 1 && (is_loaded = b.map(c.required, function (a) {
                            return 0 <= g.loaded.indexOf(a) ? a : void 0
                        }), is_loaded.length == c.required.length)) return c.toLoad
                    }
                });
            for (h = h.filter(f), c = h.length - 1; c >= 0; c--) e = h[c], (0 <= g.loaded.indexOf(e) || 0 <= g.pending.indexOf(e)) && h.splice(c, 1);
            for (c = 0, d = h.length; d > c; c++) e = h[c], g._getRequiredScript.call(g, e);
            g.loaded.length == g.required.length && g.loadingFinished.resolveWith(b, this.deferreds)
        }, h.prototype._getRequiredScript = function (a) {
            var c = this;
            c.pending.push(a);
            var d = b.ajax({
                dataType: "script",
                cache: !0,
                url: a
            }).done(function () {
                c.loaded.push(this.url), c._checkRequirements(this.url)
            }).fail(function (a) {
                console.warn(new Error("Loading " + this.url + " failed [" + a.status + "] " + a.statusText)), c.loadingFinished.rejectWith(b, this.deferreds)
            });
            c.deferreds.push(d)
        }, b(function () {
            var a = [],
                c = [],
                d = [];
            b(".scrbbl-custom-embed").each(function () {
                var e, f = b(this),
                    g = f.attr("data-src").split("/");
                e = j[g[0]], "undefined" != typeof e && (d.push({
                    src: g[0],
                    element: f
                }), a = b.merge(a, e.css_required), c = b.merge(c, e.js_required))
            }), a = a.filter(f), c = c.filter(f);
            var e = new g(a),
                i = new h(c);
            b.when(e.loading(), i.loading()).done(function () {
                var a, b, c;
                for (a = 0, b = d.length; b > a; a++) c = d[a], j[c.src].init.call(c.element)
            }).fail(function () {
                throw new Error("Failed to load all required resources")
            })
        })
    }
    if ("undefined" == typeof b) var f = setInterval(d, 100),
        g = 0,
        h = 100;
    else e(a, a.jQuery)
}(window, window.jQuery);