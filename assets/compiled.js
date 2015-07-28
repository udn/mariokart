"undefined" == typeof console && function(b) {
    function a() {}
    for (var c = "assert count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd time timeEnd trace warn".split(" "), d; d = c.pop();) b[d] = b[d] || a
}(window.console = window.console || {});
Number.toFixed || (Number.prototype.toFixed = function(b) {
    return Math.round(this * Math.pow(10, b)) / Math.pow(10, b)
});

function hexToRGB(b) {
    b[0] == "#" && (b = b.substr(1));
    if (b.length != 6) return [0, 0, 0];
    var a = [0, 0, 0];
    a[0] = parseInt(b.substr(0, 2), 16);
    a[1] = parseInt(b.substr(2, 2), 16);
    a[2] = parseInt(b.substr(4, 2), 16);
    return a[0] <= 255 && a[1] <= 255 && a[2] <= 255 ? a : [0, 0, 0]
}

function RGBToHex(b) {
    for (var a = [], c = 0; c < 3; c++) {
        a[c] = b[c].toString(16);
        a[c].length < 2 && (a[c] = "0" + a[c])
    }
    return "#" + a.join("")
}
var userInput = {
    _enabled: !0,
    deltaVel: [0, 0],
    touchPos: [],
    keyVel: 100,
    active: [],
    pgup: 33,
    pgdown: 34,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    setEnabled: function(b) {
        userInput._enabled = b;
        if (b == false) userInput.active = []
    },
    inputVel: function() {
        var b = userInput.keyVel,
            a = userInput.deltaVel,
            c;
        for (c in userInput.active)
            if (userInput.active[c] != false) switch (parseInt(c)) {
                case userInput.left:
                    a[0] = a[0] - b;
                    break;
                case userInput.up:
                    a[1] = a[1] - b;
                    break;
                case userInput.right:
                    a[0] = a[0] + b;
                    break;
                case userInput.down:
                    a[1] = a[1] + b;
                    break;
                case 36:
                    director.moveToScene(stage.currentScene)
            }
            userInput.deltaVel = [0, 0];
        return a
    },
    clearInputs: function() {
        userInput.active = []
    },
    onDown: function(b) {
        if (!(b.which < 33 || b.which > 40)) {
            b.preventDefault();
            if (userInput._enabled != false) switch (b.which) {
                case userInput.pgup:
                    director.moveRelativeScene(-1);
                    break;
                case userInput.pgdown:
                    director.moveRelativeScene(1);
                    break;
                default:
                    userInput.active[b.which] = true
            }
        }
    },
    onUp: function(b) {
        b.preventDefault();
        userInput.active[b.which] = false
    },
    onTouchStart: function(b) {
        if (userInput._enabled != false) {
            b.preventDefault();
            var a = b.originalEvent.touches[0];
            userInput.touchPos = [a.pageX, a.pageY];
            $("#loading").text("touch: 0x0 " + b.originalEvent.touches.length)
        }
    },
    onTouchMove: function(b) {
        if (userInput._enabled != false) {
            b.preventDefault();
            var b = b.originalEvent.touches[0],
                a = [userInput.touchPos[0] - b.pageX, userInput.touchPos[1] - b.pageY];
            userInput.touchPos = [b.pageX, b.pageY];
            userInput.deltaVel[0] = userInput.deltaVel[0] + a[0];
            userInput.deltaVel[1] = userInput.deltaVel[1] + a[1];
            $("#loading").text("touch: " + a.join("x"))
        }
    },
    onTouchEnd: function(b) {
        b.preventDefault();
        userInput.touchPos = [null, null];
        $("#loading").text("touchend")
    },
    onScroll: function(b, a, c, d) {
        if (userInput._enabled != false) {
            a = c + d;
            userInput.deltaVel[0] = a < 0 ? userInput.deltaVel[0] + Math.log(-a * 100) * 500 : userInput.deltaVel[0] - Math.log(a * 100) * 500
        }
    }
};
$.fn.extend({
    compatFadeIn: function(b, a) {
        if (director.fx.opacity) return $(this).fadeIn(b, a);
        var c = $(this).css("display", "block");
        typeof a == "function" && a.call();
        return c
    },
    compatFadeOut: function(b, a) {
        if (director.fx.opacity) return $(this).fadeOut(b, a);
        var c = $(this).css("display", "none");
        typeof a == "function" && a.call();
        return c
    },
    compatFaded: function(b) {
        return director.fx.opacity ? $(this).css("opacity", b ? "0.5" : "1") : $(this).css("display", b ? "none" : "block")
    }
});
$(function() {
    var b = new SwfStore({
        namespace: "mariokartwii",
        swf_url: "http://www.nintendo.com.au/gamesites/mariokartwii/flash/storage.swf",
        debug: false,
        onready: function() {
            var a = this.readCookie("mariokartvote"),
                c = b.get("mariokartvote");
            c ? document.cookie = "mariokartvote=" + c + "; expires=Thu, 09 Jun 2011 00:00:00 UTC; path=/" : a && b.set("mariokartvote", a || "")
        },
        onerror: function() {},
        readCookie: function(a) {
            for (var a = a + "=", b = document.cookie.split(";"), d = 0; d < b.length; d++) {
                for (var e = b[d]; e.charAt(0) == " ";) e = e.substring(1, e.length);
                if (e.indexOf(a) == 0) return e.substring(a.length,
                    e.length)
            }
            return null
        }
    })
});
$.easing.jswing = $.easing.swing;
$.extend($.easing, {
    def: "easeOutQuad",
    swing: function(b, a, c, d, e) {
        return $.easing[$.easing.def](b, a, c, d, e)
    },
    easeInQuad: function(b, a, c, d, e) {
        return d * (a = a / e) * a + c
    },
    easeOutQuad: function(b, a, c, d, e) {
        return -d * (a = a / e) * (a - 2) + c
    },
    easeInOutQuad: function(b, a, c, d, e) {
        return (a = a / (e / 2)) < 1 ? d / 2 * a * a + c : -d / 2 * (--a * (a - 2) - 1) + c
    },
    easeInCubic: function(b, a, c, d, e) {
        return d * (a = a / e) * a * a + c
    },
    easeOutCubic: function(b, a, c, d, e) {
        return d * ((a = a / e - 1) * a * a + 1) + c
    },
    easeInOutCubic: function(b, a, c, d, e) {
        return (a = a / (e / 2)) < 1 ? d / 2 * a * a * a + c : d / 2 * ((a = a - 2) *
            a * a + 2) + c
    },
    easeInQuart: function(b, a, c, d, e) {
        return d * (a = a / e) * a * a * a + c
    },
    easeOutQuart: function(b, a, c, d, e) {
        return -d * ((a = a / e - 1) * a * a * a - 1) + c
    },
    easeInOutQuart: function(b, a, c, d, e) {
        return (a = a / (e / 2)) < 1 ? d / 2 * a * a * a * a + c : -d / 2 * ((a = a - 2) * a * a * a - 2) + c
    },
    easeInQuint: function(b, a, c, d, e) {
        return d * (a = a / e) * a * a * a * a + c
    },
    easeOutQuint: function(b, a, c, d, e) {
        return d * ((a = a / e - 1) * a * a * a * a + 1) + c
    },
    easeInOutQuint: function(b, a, c, d, e) {
        return (a = a / (e / 2)) < 1 ? d / 2 * a * a * a * a * a + c : d / 2 * ((a = a - 2) * a * a * a * a + 2) + c
    },
    easeInSine: function(b, a, c, d, e) {
        return -d * Math.cos(a /
            e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function(b, a, c, d, e) {
        return d * Math.sin(a / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function(b, a, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * a / e) - 1) + c
    },
    easeInExpo: function(b, a, c, d, e) {
        return a == 0 ? c : d * Math.pow(2, 10 * (a / e - 1)) + c
    },
    easeOutExpo: function(b, a, c, d, e) {
        return a == e ? c + d : d * (-Math.pow(2, -10 * a / e) + 1) + c
    },
    easeInOutExpo: function(b, a, c, d, e) {
        return a == 0 ? c : a == e ? c + d : (a = a / (e / 2)) < 1 ? d / 2 * Math.pow(2, 10 * (a - 1)) + c : d / 2 * (-Math.pow(2, -10 * --a) + 2) + c
    },
    easeInCirc: function(b, a, c, d, e) {
        return -d * (Math.sqrt(1 - (a =
            a / e) * a) - 1) + c
    },
    easeOutCirc: function(b, a, c, d, e) {
        return d * Math.sqrt(1 - (a = a / e - 1) * a) + c
    },
    easeInOutCirc: function(b, a, c, d, e) {
        return (a = a / (e / 2)) < 1 ? -d / 2 * (Math.sqrt(1 - a * a) - 1) + c : d / 2 * (Math.sqrt(1 - (a = a - 2) * a) + 1) + c
    },
    easeInElastic: function(b, a, c, d, e) {
        var b = 1.70158,
            f = 0,
            j = d;
        if (a == 0) return c;
        if ((a = a / e) == 1) return c + d;
        f || (f = e * 0.3);
        if (j < Math.abs(d)) {
            j = d;
            b = f / 4
        } else b = f / (2 * Math.PI) * Math.asin(d / j);
        return -(j * Math.pow(2, 10 * (a = a - 1)) * Math.sin((a * e - b) * 2 * Math.PI / f)) + c
    },
    easeOutElastic: function(b, a, c, d, e) {
        var b = 1.70158,
            f = 0,
            j = d;
        if (a ==
            0) return c;
        if ((a = a / e) == 1) return c + d;
        f || (f = e * 0.3);
        if (j < Math.abs(d)) {
            j = d;
            b = f / 4
        } else b = f / (2 * Math.PI) * Math.asin(d / j);
        return j * Math.pow(2, -10 * a) * Math.sin((a * e - b) * 2 * Math.PI / f) + d + c
    },
    easeInOutElastic: function(b, a, c, d, e) {
        var b = 1.70158,
            f = 0,
            j = d;
        if (a == 0) return c;
        if ((a = a / (e / 2)) == 2) return c + d;
        f || (f = e * 0.3 * 1.5);
        if (j < Math.abs(d)) {
            j = d;
            b = f / 4
        } else b = f / (2 * Math.PI) * Math.asin(d / j);
        return a < 1 ? -0.5 * j * Math.pow(2, 10 * (a = a - 1)) * Math.sin((a * e - b) * 2 * Math.PI / f) + c : j * Math.pow(2, -10 * (a = a - 1)) * Math.sin((a * e - b) * 2 * Math.PI / f) * 0.5 + d + c
    },
    easeInBack: function(b,
        a, c, d, e, f) {
        f == void 0 && (f = 1.70158);
        return d * (a = a / e) * a * ((f + 1) * a - f) + c
    },
    easeOutBack: function(b, a, c, d, e, f) {
        f == void 0 && (f = 1.70158);
        return d * ((a = a / e - 1) * a * ((f + 1) * a + f) + 1) + c
    },
    easeInOutBack: function(b, a, c, d, e, f) {
        f == void 0 && (f = 1.70158);
        return (a = a / (e / 2)) < 1 ? d / 2 * a * a * (((f = f * 1.525) + 1) * a - f) + c : d / 2 * ((a = a - 2) * a * (((f = f * 1.525) + 1) * a + f) + 2) + c
    },
    easeInBounce: function(b, a, c, d, e) {
        return d - $.easing.easeOutBounce(b, e - a, 0, d, e) + c
    },
    easeOutBounce: function(b, a, c, d, e) {
        return (a = a / e) < 1 / 2.75 ? d * 7.5625 * a * a + c : a < 2 / 2.75 ? d * (7.5625 * (a = a - 1.5 / 2.75) *
            a + 0.75) + c : a < 2.5 / 2.75 ? d * (7.5625 * (a = a - 2.25 / 2.75) * a + 0.9375) + c : d * (7.5625 * (a = a - 2.625 / 2.75) * a + 0.984375) + c
    },
    easeInOutBounce: function(b, a, c, d, e) {
        return a < e / 2 ? $.easing.easeInBounce(b, a * 2, 0, d, e) * 0.5 + c : $.easing.easeOutBounce(b, a * 2 - e, 0, d, e) * 0.5 + d * 0.5 + c
    }
});
(function(b) {
    b.browserTest = function(a, c) {
        var d = function(a, b) {
                for (var c = 0; c < b.length; c = c + 1) a = a.replace(b[c][0], b[c][1]);
                return a
            },
            e = function(a, c, e, B) {
                c = {
                    name: d((c.exec(a) || ["unknown", "unknown"])[1], e)
                };
                c[c.name] = true;
                c.version = (B.exec(a) || ["X", "X", "X", "X"])[3];
                if (c.name.match(/safari/) && c.version > 400) c.version = "2.0";
                if (c.name === "presto") c.version = b.browser.version > 9.27 ? "futhark" : "linear_b";
                c.versionNumber = parseFloat(c.version, 10) || 0;
                c.versionX = c.version !== "X" ? (c.version + "").substr(0, 1) : "X";
                c.className =
                    c.name + c.versionX;
                return c
            },
            a = (a.match(/Opera|Navigator|Minefield|KHTML|Chrome/) ? d(a, [
                [/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ""],
                ["Chrome Safari", "Chrome"],
                ["KHTML", "Konqueror"],
                ["Minefield", "Firefox"],
                ["Navigator", "Netscape"]
            ]) : a).toLowerCase();
        b.browser = b.extend(!c ? b.browser : {}, e(a, /(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/, [], /(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));
        b.layout =
            e(a, /(gecko|konqueror|msie|opera|webkit)/, [
                ["konqueror", "khtml"],
                ["msie", "trident"],
                ["opera", "presto"]
            ], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);
        b.os = {
            name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || ["unknown"])[0].replace("sunos", "solaris")
        };
        c || b("html").addClass([b.os.name, b.browser.name, b.browser.className, b.layout.name, b.layout.className].join(" "))
    };
    b.browserTest(navigator.userAgent)
})(jQuery);
var swfobject = function() {
        function b() {
            if (!w) {
                try {
                    var a = h.getElementsByTagName("body")[0].appendChild(h.createElement("span"));
                    a.parentNode.removeChild(a)
                } catch (b) {
                    return
                }
                w = true;
                for (var a = E.length, c = 0; c < a; c++) E[c]()
            }
        }

        function a(a) {
            w ? a() : E[E.length] = a
        }

        function c(a) {
            if (typeof n.addEventListener != k) n.addEventListener("load", a, false);
            else if (typeof h.addEventListener != k) h.addEventListener("load", a, false);
            else if (typeof n.attachEvent != k) {
                var b = n;
                b.attachEvent("onload", a);
                y[y.length] = [b, "onload", a]
            } else if (typeof n.onload ==
                "function") {
                var c = n.onload;
                n.onload = function() {
                    c();
                    a()
                }
            } else n.onload = a
        }

        function d() {
            var a = s.length;
            if (a > 0)
                for (var b = 0; b < a; b++) {
                    var c = s[b].id,
                        d = s[b].callbackFn,
                        q = {
                            success: false,
                            id: c
                        };
                    if (g.pv[0] > 0) {
                        var h = o(c);
                        if (h)
                            if (F(s[b].swfVersion) && !(g.wk && g.wk < 312)) {
                                x(c, true);
                                if (d) {
                                    q.success = true;
                                    q.ref = e(c);
                                    d(q)
                                }
                            } else if (s[b].expressInstall && f()) {
                            q = {};
                            q.data = s[b].expressInstall;
                            q.width = h.getAttribute("width") || "0";
                            q.height = h.getAttribute("height") || "0";
                            if (h.getAttribute("class")) q.styleclass = h.getAttribute("class");
                            if (h.getAttribute("align")) q.align = h.getAttribute("align");
                            for (var O = {}, h = h.getElementsByTagName("param"), m = h.length, l = 0; l < m; l++) h[l].getAttribute("name").toLowerCase() != "movie" && (O[h[l].getAttribute("name")] = h[l].getAttribute("value"));
                            j(q, O, c, d)
                        } else {
                            t(h);
                            d && d(q)
                        }
                    } else {
                        x(c, true);
                        if (d) {
                            if ((c = e(c)) && typeof c.SetVariable != k) {
                                q.success = true;
                                q.ref = c
                            }
                            d(q)
                        }
                    }
                }
        }

        function e(a) {
            var b = null;
            if ((a = o(a)) && a.nodeName == "OBJECT")
                if (typeof a.SetVariable != k) b = a;
                else(a = a.getElementsByTagName(u)[0]) && (b = a);
            return b
        }

        function f() {
            return !G &&
                F("6.0.65") && (g.win || g.mac) && !(g.wk && g.wk < 312)
        }

        function j(a, b, c, d) {
            G = true;
            K = d || null;
            P = {
                success: false,
                id: c
            };
            var e = o(c);
            if (e) {
                if (e.nodeName == "OBJECT") {
                    C = B(e);
                    H = null
                } else {
                    C = e;
                    H = c
                }
                a.id = Q;
                if (typeof a.width == k || !/%$/.test(a.width) && parseInt(a.width, 10) < 310) a.width = "310";
                if (typeof a.height == k || !/%$/.test(a.height) && parseInt(a.height, 10) < 137) a.height = "137";
                h.title = h.title.slice(0, 47) + " - Flash Player Installation";
                d = g.ie && g.win ? "ActiveX" : "PlugIn";
                d = "MMredirectURL=" + n.location.toString().replace(/&/g, "%26") +
                    "&MMplayerType=" + d + "&MMdoctitle=" + h.title;
                b.flashvars = typeof b.flashvars != k ? b.flashvars + ("&" + d) : d;
                if (g.ie && g.win && e.readyState != 4) {
                    d = h.createElement("div");
                    c = c + "SWFObjectNew";
                    d.setAttribute("id", c);
                    e.parentNode.insertBefore(d, e);
                    e.style.display = "none";
                    (function() {
                        e.readyState == 4 ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                    })()
                }
                L(a, b, c)
            }
        }

        function t(a) {
            if (g.ie && g.win && a.readyState != 4) {
                var b = h.createElement("div");
                a.parentNode.insertBefore(b, a);
                b.parentNode.replaceChild(B(a), b);
                a.style.display =
                    "none";
                (function() {
                    a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
                })()
            } else a.parentNode.replaceChild(B(a), a)
        }

        function B(a) {
            var b = h.createElement("div");
            if (g.win && g.ie) b.innerHTML = a.innerHTML;
            else if (a = a.getElementsByTagName(u)[0])
                if (a = a.childNodes)
                    for (var c = a.length, d = 0; d < c; d++) !(a[d].nodeType == 1 && a[d].nodeName == "PARAM") && a[d].nodeType != 8 && b.appendChild(a[d].cloneNode(true));
            return b
        }

        function L(a, b, c) {
            var d, e = o(c);
            if (g.wk && g.wk < 312) return d;
            if (e) {
                if (typeof a.id == k) a.id =
                    c;
                if (g.ie && g.win) {
                    var f = "",
                        j;
                    for (j in a)
                        if (a[j] != Object.prototype[j]) j.toLowerCase() == "data" ? b.movie = a[j] : j.toLowerCase() == "styleclass" ? f = f + (' class="' + a[j] + '"') : j.toLowerCase() != "classid" && (f = f + (" " + j + '="' + a[j] + '"'));
                    j = "";
                    for (var m in b) b[m] != Object.prototype[m] && (j = j + ('<param name="' + m + '" value="' + b[m] + '" />'));
                    e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + j + "</object>";
                    I[I.length] = a.id;
                    d = o(a.id)
                } else {
                    m = h.createElement(u);
                    m.setAttribute("type", J);
                    for (var l in a) a[l] !=
                        Object.prototype[l] && (l.toLowerCase() == "styleclass" ? m.setAttribute("class", a[l]) : l.toLowerCase() != "classid" && m.setAttribute(l, a[l]));
                    for (f in b)
                        if (b[f] != Object.prototype[f] && f.toLowerCase() != "movie") {
                            a = m;
                            j = f;
                            l = b[f];
                            c = h.createElement("param");
                            c.setAttribute("name", j);
                            c.setAttribute("value", l);
                            a.appendChild(c)
                        }
                    e.parentNode.replaceChild(m, e);
                    d = m
                }
            }
            return d
        }

        function R(a) {
            var b = o(a);
            if (b && b.nodeName == "OBJECT")
                if (g.ie && g.win) {
                    b.style.display = "none";
                    (function() {
                        if (b.readyState == 4) {
                            var c = o(a);
                            if (c) {
                                for (var d in c) typeof c[d] ==
                                    "function" && (c[d] = null);
                                c.parentNode.removeChild(c)
                            }
                        } else setTimeout(arguments.callee, 10)
                    })()
                } else b.parentNode.removeChild(b)
        }

        function o(a) {
            var b = null;
            try {
                b = h.getElementById(a)
            } catch (c) {}
            return b
        }

        function F(a) {
            var b = g.pv,
                a = a.split(".");
            a[0] = parseInt(a[0], 10);
            a[1] = parseInt(a[1], 10) || 0;
            a[2] = parseInt(a[2], 10) || 0;
            return b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? true : false
        }

        function S(a, b, c, d) {
            if (!g.ie || !g.mac) {
                var e = h.getElementsByTagName("head")[0];
                if (e) {
                    c = c && typeof c == "string" ?
                        c : "screen";
                    if (d) M = r = null;
                    if (!r || M != c) {
                        d = h.createElement("style");
                        d.setAttribute("type", "text/css");
                        d.setAttribute("media", c);
                        r = e.appendChild(d);
                        g.ie && (g.win && typeof h.styleSheets != k && h.styleSheets.length > 0) && (r = h.styleSheets[h.styleSheets.length - 1]);
                        M = c
                    }
                    g.ie && g.win ? r && typeof r.addRule == u && r.addRule(a, b) : r && typeof h.createTextNode != k && r.appendChild(h.createTextNode(a + " {" + b + "}"))
                }
            }
        }

        function x(a, b) {
            if (T) {
                var c = b ? "visible" : "hidden";
                w && o(a) ? o(a).style.visibility = c : S("#" + a, "visibility:" + c)
            }
        }

        function U(a) {
            return /[\\\"<>\.;]/.exec(a) !=
                null && typeof encodeURIComponent != k ? encodeURIComponent(a) : a
        }
        var k = "undefined",
            u = "object",
            J = "application/x-shockwave-flash",
            Q = "SWFObjectExprInst",
            n = window,
            h = document,
            v = navigator,
            V = false,
            E = [function() {
                if (V) {
                    var a = h.getElementsByTagName("body")[0],
                        b = h.createElement(u);
                    b.setAttribute("type", J);
                    var c = a.appendChild(b);
                    if (c) {
                        var e = 0;
                        (function() {
                            if (typeof c.GetVariable != k) {
                                var f = c.GetVariable("$version");
                                if (f) {
                                    f = f.split(" ")[1].split(",");
                                    g.pv = [parseInt(f[0], 10), parseInt(f[1], 10), parseInt(f[2], 10)]
                                }
                            } else if (e <
                                10) {
                                e++;
                                setTimeout(arguments.callee, 10);
                                return
                            }
                            a.removeChild(b);
                            c = null;
                            d()
                        })()
                    } else d()
                } else d()
            }],
            s = [],
            I = [],
            y = [],
            C, H, K, P, w = false,
            G = false,
            r, M, T = true,
            g, X = typeof h.getElementById != k && typeof h.getElementsByTagName != k && typeof h.createElement != k,
            z = v.userAgent.toLowerCase(),
            A = v.platform.toLowerCase(),
            Y = A ? /win/.test(A) : /win/.test(z),
            A = A ? /mac/.test(A) : /mac/.test(z),
            z = /webkit/.test(z) ? parseFloat(z.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
            N = !+"\v1",
            D = [0, 0, 0],
            p = null;
        if (typeof v.plugins != k && typeof v.plugins["Shockwave Flash"] ==
            u) {
            if ((p = v.plugins["Shockwave Flash"].description) && !(typeof v.mimeTypes != k && v.mimeTypes[J] && !v.mimeTypes[J].enabledPlugin)) {
                V = true;
                N = false;
                p = p.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                D[0] = parseInt(p.replace(/^(.*)\..*$/, "$1"), 10);
                D[1] = parseInt(p.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                D[2] = /[a-zA-Z]/.test(p) ? parseInt(p.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            }
        } else if (typeof n.ActiveXObject != k) try {
            var W = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            if (W)
                if (p = W.GetVariable("$version")) {
                    N = true;
                    p = p.split(" ")[1].split(",");
                    D = [parseInt(p[0], 10), parseInt(p[1], 10), parseInt(p[2], 10)]
                }
        } catch (Z) {}
        g = {
            w3: X,
            pv: D,
            wk: z,
            ie: N,
            win: Y,
            mac: A
        };
        if (g.w3) {
            (typeof h.readyState != k && h.readyState == "complete" || typeof h.readyState == k && (h.getElementsByTagName("body")[0] || h.body)) && b();
            if (!w) {
                typeof h.addEventListener != k && h.addEventListener("DOMContentLoaded", b, false);
                if (g.ie && g.win) {
                    h.attachEvent("onreadystatechange", function() {
                        if (h.readyState == "complete") {
                            h.detachEvent("onreadystatechange", arguments.callee);
                            b()
                        }
                    });
                    n == top && function() {
                        if (!w) {
                            try {
                                h.documentElement.doScroll("left")
                            } catch (a) {
                                setTimeout(arguments.callee,
                                    0);
                                return
                            }
                            b()
                        }
                    }()
                }
                g.wk && function() {
                    w || (/loaded|complete/.test(h.readyState) ? b() : setTimeout(arguments.callee, 0))
                }();
                c(b)
            }
        }
        g.ie && g.win && window.attachEvent("onunload", function() {
            for (var a = y.length, b = 0; b < a; b++) y[b][0].detachEvent(y[b][1], y[b][2]);
            a = I.length;
            for (b = 0; b < a; b++) R(I[b]);
            for (var c in g) g[c] = null;
            g = null;
            for (var d in swfobject) swfobject[d] = null;
            swfobject = null
        });
        return {
            registerObject: function(a, b, c, d) {
                if (g.w3 && a && b) {
                    var e = {};
                    e.id = a;
                    e.swfVersion = b;
                    e.expressInstall = c;
                    e.callbackFn = d;
                    s[s.length] = e;
                    x(a, false)
                } else d && d({
                    success: false,
                    id: a
                })
            },
            getObjectById: function(a) {
                if (g.w3) return e(a)
            },
            embedSWF: function(b, c, d, e, h, p, n, m, l, o) {
                var t = {
                    success: false,
                    id: c
                };
                if (g.w3 && !(g.wk && g.wk < 312) && b && c && d && e && h) {
                    x(c, false);
                    a(function() {
                        d = d + "";
                        e = e + "";
                        var a = {};
                        if (l && typeof l === u)
                            for (var g in l) a[g] = l[g];
                        a.data = b;
                        a.width = d;
                        a.height = e;
                        g = {};
                        if (m && typeof m === u)
                            for (var r in m) g[r] = m[r];
                        if (n && typeof n === u)
                            for (var s in n) g.flashvars = typeof g.flashvars != k ? g.flashvars + ("&" + s + "=" + n[s]) : s + "=" + n[s];
                        if (F(h)) {
                            r = L(a, g, c);
                            a.id ==
                                c && x(c, true);
                            t.success = true;
                            t.ref = r
                        } else {
                            if (p && f()) {
                                a.data = p;
                                j(a, g, c, o);
                                return
                            }
                            x(c, true)
                        }
                        o && o(t)
                    })
                } else o && o(t)
            },
            switchOffAutoHideShow: function() {
                T = false
            },
            ua: g,
            getFlashPlayerVersion: function() {
                return {
                    major: g.pv[0],
                    minor: g.pv[1],
                    release: g.pv[2]
                }
            },
            hasFlashPlayerVersion: F,
            createSWF: function(a, b, c) {
                if (g.w3) return L(a, b, c)
            },
            showExpressInstall: function(a, b, c, d) {
                g.w3 && f() && j(a, b, c, d)
            },
            removeSWF: function(a) {
                g.w3 && R(a)
            },
            createCSS: function(a, b, c, d) {
                g.w3 && S(a, b, c, d)
            },
            addDomLoadEvent: a,
            addLoadEvent: c,
            getQueryParamValue: function(a) {
                var b =
                    h.location.search || h.location.hash;
                if (b) {
                    /\?/.test(b) && (b = b.split("?")[1]);
                    if (a == null) return U(b);
                    for (var b = b.split("&"), c = 0; c < b.length; c++)
                        if (b[c].substring(0, b[c].indexOf("=")) == a) return U(b[c].substring(b[c].indexOf("=") + 1))
                }
                return ""
            },
            expressInstallCallback: function() {
                if (G) {
                    var a = o(Q);
                    if (a && C) {
                        a.parentNode.replaceChild(C, a);
                        if (H) {
                            x(H, true);
                            if (g.ie && g.win) C.style.display = "block"
                        }
                        K && K(P)
                    }
                    G = false
                }
            }
        }
    }(),
    baseScene = {
        id: "",
        size: [600, 600],
        center: [0, 0],
        sideQuest: !1,
        triggers: [],
        elements: [],
        nextScene: function(b) {
            return typeof scenes[b +
                1] == "undefined" ? -1 : b + 1
        },
        prevScene: function(b) {
            return b - 1
        },
        onCreate: function() {},
        onActivate: function() {},
        onDeactivate: function() {},
        onHash: function() {},
        state: 0
    },
    scenes = [{
        id: "home",
        size: [1400, 600],
        backgroundColor: "#ffffff",
        elements: [{
            pos: [0, 85],
            layer: 6,
            html: '<div id="keys_alert"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/global/keys_alert.png" /></div>'
        }, {
            pos: [0, -180],
            layer: 3,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_home/logo.png" id="home_logo" />'
        }, {
            pos: [0, 0],
            layer: 3.5,
            html: '<div id="home_video"><div id="home_video_player"></div></div>'
        }, {
            pos: [-243, -30],
            image: "scene_home/luigi.png",
            layer: 4
        }, {
            pos: [260, 0],
            image: "scene_home/mario.png",
            layer: 4
        }, {
            pos: [185, -76.75],
            image: "scene_home/mario_head.png",
            layer: 4
        }, {
            pos: [0, 130],
            layer: 4.5,
            html: '<div id="home_ctas"><a class="highlights" href="#highlights">Check out all the best moments from our live filming</a><a class="competition" href="#competition">Download official Mario Kart Wii scorecard</a><a class="rediscover" href="#rediscover">Revisit the magic of Mario Kart</a><a class="attack" href="#attack">Red shell your mates on Facebook!</a><a class="rainbow" href="#rainbow">Tips &amp; tricks</a></div>'
        }, {
            pos: [495, -25],
            image: "scene_home/mushroom.png",
            layer: 3
        }, {
            pos: [520, -50],
            image: "scene_home/mushroom2.png",
            layer: 2
        }, {
            pos: [-420, 80],
            image: "scene_home/shell1.png",
            layer: 3.2
        }, {
            pos: [-490, -20],
            image: "scene_home/shell2.png",
            layer: 3
        }, {
            pos: [350, 20],
            image: "scene_home/blueshell.png",
            layer: 6
        }, {
            pos: [-290, 120],
            image: "scene_home/banana.png",
            layer: 4
        }, {
            pos: [190, -100],
            layer: 6,
            html: '<a href="http://www.nintendo.com/wii/mariokarttournaments" target="_blank" id="tournamentLink"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_home/cta_tournament.png" /></a>'
        }, {
            pos: [-350, 50],
            layer: 2,
            html: '<div class="roadtile" style="width:2100px" />'
        }],
        prevScene: function() {
            return false
        },
        onCreate: function() {
            $("#home_ctas").parent().attr("id", "home_ctas_parent");
            $("#home_logo").parent().attr("id", "home_logo_parent");
            $("#tournamentLink").click(function() {
                return confirm("You are now leaving nintendo.com.au to an external website. Some product information may not be relevant to Australia and New Zealand.\r\nIf this link does not work, please disable popup blocking on your web browser.",
                    "")
            });
            // this.videoplayer = new scene_videoplayer("home_video_player", [{
            //     flv: "videos/tvc/tvc_1.flv",
            //     ogg: "videos/tvc/tvc_1.ogv",
            //     mp4: "videos/tvc/tvc_1.m4v"
            // }, {
            //     flv: "videos/tvc/tvc_2.flv",
            //     ogg: "videos/tvc/tvc_2.ogv",
            //     mp4: "videos/tvc/tvc_2.m4v"
            // }, {
            //     flv: "videos/tvc/tvc_3.flv",
            //     ogg: "videos/tvc/tvc_3.ogv",
            //     mp4: "videos/tvc/tvc_3.m4v"
            // }], "home_video")
        },
        onActivate: function(b) {
            $("#home_ctas").compatFadeIn();
            var a = $("#keys_alert");
            a.click(function() {
                $(this).compatFadeOut(400)
            });
            setTimeout(function() {
                a.click()
            }, 5E3);
            // this.videoplayer.play();
            b && setTimeout(function() {
                var a = $("#keys_alert").compatFadeIn(1200);
                stage.positionElement.call(a.get(0))
            }, 300)
        },
        onDeactivate: function() {
            this.videoplayer.pause()
        },
        triggers: [{
            atX: 20,
            onForward: function() {
                $("#keys_alert").compatFadeOut(400)
            }
        }, {
            atX: -20,
            onBackward: function() {
                $("#keys_alert").compatFadeOut(400)
            }
        }]
    }, {
        id: "competition",
        size: [1100, 600],
        center: [1250, 0],
        elements: [{
            pos: [0, -20],
            image: "scene_comp/frame.png",
            layer: 3
        }, {
            pos: [240, -90],
            layer: 4,
            html: '<a href="#highlights"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_comp/bubble.png" /></a>'
        }, {
            pos: [290, 140],
            image: "scene_comp/greenshell2.png",
            layer: 3.2
        }, {
            pos: [320, 140],
            image: "scene_comp/greenshell1.png",
            layer: 4
        }, {
            pos: [-335, 0],
            image: "scene_comp/luigi.png",
            layer: 4
        }, {
            pos: [-133, -10],
            layer: 3,
            html: '<div class="comp_blurb"><p>Lucky winners in NSW were picked to hold a Mario Kart Party at their home and invite their friends! Their prize included a Mario Kart Party at their home, with fun tournaments, prizes and goodie bags! Check back here to see more fun snaps.</p></div>'
        }, {
            pos: [132, -11],
            layer: 3,
            html: '<div class="comp_blurb scorecard"><p>Whether you are a Mario Kart champion from 15 years ago or the new champ, challenge your family and friends and use this handy scorecard to help you find out who\u2019s the best driver in your house!</p></div>'
        }, {
            pos: [-170, 77],
            layer: 3,
            html: '<a href="#party"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_comp/checkphotos.png" /></a>'
        }, {
            pos: [138, 77],
            layer: 3,
            html: '<a href="files/mario_kart_wii_scorecard.pdf" target="_blank" id="link_scorecard"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_comp/download.png" /></a>'
        }, {
            pos: [0, 50],
            layer: 2,
            html: '<div class="roadtile" style="width:1100px" />'
        }, {
            pos: [480, 20],
            image: "scene_comp/itembox.png",
            layer: 2
        }],
        onCreate: function() {
            this.photos = new scene_photos($("#photoSwitcher"), "images/scene_comp/gallery_#.png", 3)
        },
        onActivate: function() {},
        onDeactivate: function() {},
        nextScene: function(b) {
            return b + 2
        }
    }, {
        id: "party",
        size: [1100, 600],
        center: [1250, -600],
        sideQuest: !0,
        elements: [{
            pos: [0, -30],
            image: "scene_partyphotos/background.png",
            layer: 3
        }, {
            pos: [0, 116],
            layer: 3.7,
            html: '<a href="#competition"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_gallery/but_back.png" /></a>'
        }, {
            pos: [0, -20],
            layer: 4,
            html: '<div id="partyphotos"><ul class="partyphotos"><li><a href="#party/photo1"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_1.jpg" />Austin\'s Party</a></li><li><a href="#party/photo2"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_2.jpg" />Austin\'s Party</a></li><li><a href="#party/photo3"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_3.jpg" />Austin\'s Party</a></li><li><a href="#party/photo4"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_4.jpg" />Austin\'s Party</a></li><li><a href="#party/photo5"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_5.jpg" />Peta-Louise\'s Party</a></li><li><a href="#party/photo6"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_6.jpg" />Peta-Louise\'s Party</a></li><li><a href="#party/photo7"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_7.jpg" />Peta-Louise\'s Party</a></li><li><a href="#party/photo8"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_8.jpg" />Peta-Louise\'s Party</a></li><li><a href="#party/photo11"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_11.jpg" />Joshua\'s Party</a></li><li><a href="#party/photo12"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_12.jpg" />Joshua\'s Party</a></li><li><a href="#party/photo13"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_13.jpg" />Joshua\'s Party</a></li><li><a href="#party/photo14"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_14.jpg" />Joshua\'s Party</a></li><li><a href="#party/photo9"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_9.jpg" />Zac Dane\'s Party</a></li><li><a href="#party/photo10"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_10.jpg" />Zac Dane\'s Party</a></li><li><a href="#party/photo15"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_15.jpg" />Zac Dane\'s Party</a></li><li><a href="#party/photo16"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_16.jpg" />Zac Dane\'s Party</a></li><li><a href="#party/photo17"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_17.jpg" />Joshua\'s Party</a></li><li><a href="#party/photo18"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_18.jpg" />Joshua\'s Party</a></li><li><a href="#party/photo19"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_19.jpg" />Joshua\'s Party</a></li><li><a href="#party/photo20"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_20.jpg" />Joshua\'s Party</a></li><li><a href="#party/photo21"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_21.jpg" />Jack\'s Party</a></li><li><a href="#party/photo22"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_22.jpg" />Jack\'s Party</a></li><li><a href="#party/photo23"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_23.jpg" />Jack\'s Party</a></li><li><a href="#party/photo24"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_24.jpg" />Jack\'s Party</a></li><li><a href="#party/photo25"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_25.jpg" />Jakob\'s Party</a></li><li><a href="#party/photo26"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_26.jpg" />Jakob\'s Party</a></li><li><a href="#party/photo27"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_27.jpg" />Jakob\'s Party</a></li><li><a href="#party/photo28"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_28.jpg" />Jakob\'s Party</a></li><li><a href="#party/photo29"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_29.jpg" />Harry\'s Party</a></li><li><a href="#party/photo30"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_30.jpg" />Harry\'s Party</a></li><li><a href="#party/photo31"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_31.jpg" />Harry\'s Party</a></li><li><a href="#party/photo32"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_32.jpg" />Harry\'s Party</a></li><li><a href="#party/photo33"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_33.jpg" />Yasmin\'s Party</a></li><li><a href="#party/photo34"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_34.jpg" />Yasmin\'s Party</a></li><li><a href="#party/photo35"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_35.jpg" />Yasmin\'s Party</a></li><li><a href="#party/photo36"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/photo_36.jpg" />Yasmin\'s Party</a></li></ul></div>'
        }, {
            pos: [0, -7],
            layer: 4,
            html: '<div id="partypager" class="paging"></div>'
        }],
        onCreate: function() {
            this.pager = new scene_pager($("#partyphotos ul"), $("#partypager"), 8)
        },
        onHash: function(b) {
            if (b.indexOf("photo") >= 0) {
                var a, b = b.match(/\d+$/);
                b.length && (a = parseInt(b.shift(), 10));
                a > 0 && new modalPopup.create('<a href="#party" class="close"></a><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_partyphotos/big/photo_' + a + '.jpg" />', "partymodal")
            }
        },
        nextScene: function() {
            return -1
        },
        prevScene: function() {
            return -1
        },
        onActivate: function(b) {
            if (b) this.onHash(window.location.hash)
        }
    }, {
        id: "highlights",
        size: [1100, 600],
        center: [2350, 0],
        elements: [{
            pos: [0, 0],
            image: "scene_highlights/frame.png",
            layer: 3
        }, {
            pos: [0, -20],
            layer: 3,
            html: '<div id="highlightsgallery" class="gallery"><a class="pageLeft"></a><a class="pageRight"></a><div class="ajaxgallery"></div></div>'
        }, {
            pos: [-30, 135],
            layer: 3,
            html: '<div id="highlights_legal">*Please note, this voting will not determine the videos to appear in the final TV campaign. Competition closed June 6. <a target="_blank" href="voting_tac.html">Terms & Conditions</a></div>'
        }, {
            pos: [-315, -5],
            image: "scene_gallery/mario.png",
            layer: 5
        }, {
            pos: [-600, -95],
            image: "scene_gallery/screen1.png",
            layer: 3
        }, {
            pos: [-450, -20],
            image: "scene_gallery/screen2.png",
            layer: 4
        }, {
            pos: [450, 10],
            image: "scene_gallery/screen3.png",
            layer: 2.5
        }, {
            pos: [470, -70],
            image: "scene_gallery/screen4.png",
            layer: 3
        }, {
            pos: [-235, -145],
            layer: 3.5,
            html: '<a href="#gallery"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_highlights/gallery_bubble.png" /></a>'
        }, {
            pos: [185, -105],
            layer: 5,
            html: '<a href="#rainbow"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_highlights/lakitu.png" /></a>'
        }, {
            pos: [290, 140],
            image: "scene_gallery/bobomb.png",
            layer: 3.5
        }, {
            pos: [280, -65],
            layer: 4.2,
            html: '<a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_gallery/bubble.png" /></a>'
        }, {
            pos: [0, 50],
            layer: 2,
            html: '<div class="roadtile" style="width:1100px" />'
        }],
        onCreate: function() {
            this.gallery = new scene_gallery("highlights", $("#highlightsgallery"), {
                url: "ajax/highlights.json.php"
            }, {
                video: '<div class="video"><a class="videolink" href="#highlights/video{id}"><div class="hover"></div><div class="thumb"><img src="{thumb}" /></div><span class="title{votesplace}">Highlight {num}</span><div class="votes">{votes}</div></a></div>',
                popup: '<a href="#highlights" class="close"></a><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_gallery/popup/window.png" width="859" height="516" /><div class="videoplayer"></div><div class="names"></div><a class="social fb"></a><a class="social twitter"></a><a class="social email"></a>'
            });
            $("a.vote").live("click", function() {
                var b = modalPopup.create('<div id="highlights_voting"><div class="votestatus"><strong>Voting...</strong></div></div>'),
                    a = $(".votestatus", b).addClass("loading"),
                    c = $(this).parents(".video").find("div.votes");
                $.post("ajax/vote.json.php", {
                    id: $(this).data("id")
                }, function(b) {
                    a.compatFadeOut(200, function() {
                        a.removeClass("loading").compatFadeIn(200);
                        if (b.status == "success") {
                            a.html("<strong>Thanks for voting!</strong> You can vote again tomorrow.");
                            var e = b.votes + " vote" + (b.votes > 1 ? "s" : "");
                            c.html().indexOf("vote") > 0 ? c.html(c.html().replace(/[0-9]+ vote[s]*/, e)) : c.html(e)
                        } else a.html(b.error)
                    });
                    setTimeout(function() {
                        modalPopup.close.call(a)
                    }, 3E3)
                }, "json")
            })
        },
        onHash: function(b) {
            if (b.indexOf("video") >= 0) {
                var a, b =
                    b.match(/\d+$/);
                b.length && (a = parseInt(b.shift(), 10));
                a > 0 && this.gallery.popup(a)
            } else if (b.indexOf("prizes") >= 0) {
                var c = this.gallery;
                modalPopup.create('<a href="#highlights" class="close"></a><div id="highlights_prizes"><div class="blurb">Make sure you vote for your favourite Mario Kart Wii Video. The winning players will win:</div><div class="first"><strong>1st Ranked Video</strong><p>Each person in the video wins a Wii&trade; Console and a copy of Mario Kart&trade;Wii</p></div><div class="second"><strong>2nd and 3rd Ranked Videos</strong><p>Each person in the video wins a copy of the Mario game of their choice&mdash; to be selected from Mario Kart Wii, New SUPER MARIO BROS.&trade; Wii, or Super Mario Galaxy&trade; 2</p></div></div>',
                    "",
                    function() {
                        c.updateHash()
                    })
            } else {
                if (b)
                    if (b = b.match(/page:(\d+)/)) this.gallery.page = parseInt(b.pop());
                this.gallery.load()
            }
        },
        onActivate: function(b) {
            if (b) this.onHash(window.location.hash);
            else this.gallery.updateHash()
        },
        onDeactivate: function() {},
        prevScene: function(b) {
            return b - 2
        },
        nextScene: function(b) {
            return b + 3
        }
    }, {
        id: "gallery",
        size: [1100, 600],
        center: [2350, -600],
        sideQuest: !0,
        elements: [{
            pos: [0, -120],
            image: "scene_gallery/background.png",
            layer: 3
        }, {
            pos: [0, 180],
            image: "scene_gallery/blob.png",
            layer: 3
        }, {
            pos: [0,
                143
            ],
            layer: 3.7,
            html: '<a href="#highlights"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_gallery/but_back.png" /></a>'
        }, {
            pos: [0, 0],
            layer: 4,
            html: '<div id="videogallery" class="gallery"><input name="gallery_name" class="filter_name" placeholder="Search by Name" /><select name="gallery_state" class="filter_state"><option value="all">All states</option><option>VIC</option><option>NSW</option></select><select name="gallery_date" class="filter_date"><option value="all">All dates</option><option value="2011-04-09">9th April</option><option value="2011-04-10">10th April</option><option value="2011-04-11">11th April</option><option value="2011-04-12">12th April</option><option value="2011-04-13">13th April</option><option value="2011-04-14">14th April</option><option value="2011-04-15">15th April</option><option value="2011-04-16">16th April</option><option value="2011-04-17">17th April</option></select><a class="pageLeft"></a><a class="pageRight"></a><div class="ajaxgallery"></div></div>'
        }, {
            pos: [-255, 0],
            image: "scene_gallery/cloud.png",
            layer: 5
        }, {
            pos: [260, 0],
            image: "scene_gallery/star.png",
            layer: 5
        }],
        onCreate: function() {
            this.gallery = new scene_gallery("gallery", $("#videogallery"), {
                url: "ajax/gallery.json.php"
            }, {
                video: '<div class="video"><a class="videolink" href="#gallery/video{id}"><div class="hover"></div><div class="thumb"><img src="{thumb}" /></div><span class="title">{names}</span><span class="date">{state}, {date}</span></a></div>',
                popup: '<a href="#gallery/listing" class="close"></a><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_gallery/popup/window.png" width="859" height="516" /><div class="videoplayer"></div><div class="names"></div><a class="social fb"></a><a class="social twitter"></a><a class="social email"></a>'
            })
        },
        nextScene: function() {
            return -1
        },
        prevScene: function() {
            return -1
        },
        onActivate: function(b) {
            if (b) {
                this.onHash(window.location.hash);
                b = this.gallery.filters;
                b.name.length > 0 && $(".filter_name").val(b.name).removeClass("placeholder");
                $(".filter_state").val(b.state);
                $(".filter_date").val(b.date)
            } else this.gallery.updateHash()
        },
        onDeactivate: function() {},
        onHash: function(b) {
            if (b.indexOf("video") >= 0) {
                var a, b = b.match(/\d+$/);
                b.length && (a = parseInt(b.shift(), 10));
                a > 0 && this.gallery.popup(a)
            } else if (b.indexOf("listing") >=
                0) this.gallery.updateHash();
            else {
                if (b) {
                    var c, d, e;
                    (a = b.match(/page:(\d+)/)) && (c = parseInt(a.pop()));
                    (a = b.match(/name:([^\/]+)/i)) && (name = a.pop());
                    (a = b.match(/state:(VIC|NSW)/i)) && (d = a.pop());
                    (a = b.match(/date:(\d+-\d+-\d+)/)) && (e = a.pop());
                    if (c) this.gallery.page = c;
                    this.gallery.updateFilters(name, d, e)
                }
                this.gallery.load()
            }
        }
    }, {
        id: "rainbow",
        size: [1100, 600],
        center: [2350, -1200],
        sideQuest: !0,
        elements: [{
            pos: [0, -30],
            image: "scene_rainbow/background.png",
            layer: 3
        }, {
            pos: [0, -30],
            image: "scene_rainbow/rainbow.png",
            layer: 3.4
        }, {
            pos: [0, 81],
            layer: 3.7,
            html: '<a href="#highlights"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_gallery/but_back.png" /></a>'
        }, {
            pos: [0, -20],
            layer: 4,
            html: '<div id="rainbowroad" class="rainbowroad"><a href="#rainbow/hints64"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_rainbow/video_1.png" /><span class="title">Mario Kart&trade; 64 Hints</span>Click here to view</a><a href="#rainbow/hintsds"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_rainbow/video_2.png" /><span class="title">Mario Kart&reg; DS Hints</span>Click here to view</a><a href="#rainbow/hintswii"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_rainbow/video_3.png" /><span class="title">Mario Kart Wii&trade; Hints</span>Click here to view</a></div>'
        }],
        onCreate: function() {},
        nextScene: function() {
            return -1
        },
        prevScene: function() {
            return -1
        },
        onActivate: function(b) {
            if (b) this.onHash(window.location.hash)
        },
        onDeactivate: function() {},
        onHash: function(b) {
            if (b.indexOf("hints") >= 0) {
                var a = "../videos/rainbow/";
                if (b.indexOf("hints64") >= 0) a = a + "n64.flv";
                else if (b.indexOf("hintsds") >= 0) a = a + "ds.flv";
                else if (b.indexOf("hintswii") >= 0) a = a + "wii.flv";
                else return;
                modalPopup.create('<a href="#rainbow" class="close"></a><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_rainbow/popup_frame.png" width="696" height="516" /><div class="videoplayer"></div>',
                    "videopopup").find(".videoplayer").html('<embed src="flash/video.swf" type="application/x-shockwave-flash" width="476" height="303" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" flashvars="videoSource=' + a + '"></embed>')
            }
        }
    }, {
        id: "attack",
        size: [1100, 600],
        center: [3450, 510],
        elements: [{
            pos: [-520, -200],
            image: "scene_attack/roadangle.png",
            layer: 2
        }, {
            pos: [0, -30],
            image: "scene_attack/frame.png",
            layer: 3
        }, {
            pos: [-133, -190],
            layer: 3.1,
            html: '<div id="attack_title" class="attack"></div>'
        }, {
            pos: [-60, -136],
            layer: 3.1,
            html: '<div id="attack_subtitle" class="attack"></div>'
        }, {
            pos: [-40, -18],
            layer: 3.2,
            html: '<ul id="attackbuttons"><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_redshell.png" id="redshell" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_spinyshell.png" id="spinyshell" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_bobomb.png" id="bobomb" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_bulletbill.png" id="bulletbill" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_lightning.png" id="lightning" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_pow.png" id="pow" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_star.png" id="star" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_greenshell.png" id="greenshell" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_goldmush.png" id="goldmushroom" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_fakeitem.png" id="fakeitem" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_blooper.png" id="blooper" /></a></li><li><a href="#attack"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/but_banana.png" id="banana" /></a></li></ul>'
        }, {
            pos: [0, 105],
            layer: 3,
            html: '<div id="attackpager" class="paging"></div>'
        }, {
            pos: [250, -95],
            layer: 5,
            html: '<a href="#rediscover"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/bubble.png" /></a>'
        }, {
            pos: [250, -10],
            image: "scene_attack/bowser.png",
            layer: 4
        }, {
            pos: [-675, -280],
            layer: 2,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/smoke.png" id="attack_smoke" />'
        }, {
            pos: [-680, -270],
            layer: 2,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/wario.png" id="attack_wario" />'
        }, {
            pos: [35, 51],
            layer: 2,
            html: '<div class="roadtile2" style="width:1030px" />'
        }],
        onCreate: function() {
            window.fbAsyncInit =
                function() {
                    FB.init({
                        appId: scene_facebook.application_id,
                        status: true,
                        cookie: true,
                        oauth: true,
                        xfbml: false
                    });
                    $("#attackbuttons img").each(function(a, b) {
                        var d = $(b);
                        d.addClass("active").click(function() {
                            scene_facebook.attackFriend(d.attr("id"))
                        })
                    })
                };
            if (window.fbPreload) window.fbAsyncInit();
            else {
                var b = document.createElement("script");
                b.src = document.location.protocol + "//connect.facebook.net/en_US/all.js";
                b.async = true;
                document.getElementById("fb-root").appendChild(b)
            }
            this.pager = new scene_pager($("#attackbuttons"),
                $("#attackpager"), 6, this.onPageChange)
        },
        onPageChange: function(b) {
            var b = b % 2,
                a = ["defend", "attack"];
            scene_facebook.attackMode = a[b];
            $("#attack_title").delay(100).compatFadeOut(250, function() {
                $("#attack_title").removeClass("defend attack").addClass(a[b])
            }).compatFadeIn(250);
            $("#attack_subtitle").delay(50).compatFadeOut(200, function() {
                $("#attack_subtitle").removeClass("defend attack").addClass(a[b])
            }).compatFadeIn(250)
        },
        prevScene: function(b) {
            return b - 3
        },
        onHash: function(b) {
            if (b) {
                var a;
                (b = b.match(/attack\/([a-z]+)/)) &&
                (a = b.pop());
                b = $("li #" + a).parents("li:first");
                if (a && b.length) {
                    b.addClass("highlight");
                    if (b.index() > 6) {
                        this.pager.page = 2;
                        this.pager.update()
                    }
                }
            }
        },
        onActivate: function() {
            $("#rating").removeClass("newg newgonline oldg");
            $("#attack_smoke").compatFadeIn(500).parent().css("marginTop", 70).animate({
                marginTop: "0px"
            }, {
                duration: 3500,
                easing: "easeOutQuart",
                queue: false
            });
            $("#attack_wario").compatFadeIn(200).parent().css("marginTop", 0).animate({
                marginTop: "+=170px"
            }, {
                duration: 1200,
                easing: "easeOutQuart",
                queue: false
            })
        },
        onDeactivate: function() {
            $("#attack_smoke, #attack_wario").compatFadeOut(200)
        }
    }, {
        id: "rediscover",
        size: [1100, 600],
        center: [4550, 510],
        elements: [{
            pos: [0, -20],
            image: "scene_rediscover/frame.png",
            layer: 4
        }, {
            pos: [0, -75],
            image: "scene_rediscover/title.png",
            layer: 4.1
        }, {
            pos: [0, -16],
            image: "scene_rediscover/subtitle.png",
            layer: 4.05
        }, {
            pos: [0, 43],
            layer: 4,
            html: '<div id="rediscover_handsmask"><img id="rediscover_hands" src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_rediscover/hands_masked.png" /></div>'
        }, {
            pos: [0, -20],
            layer: 4.2,
            html: '<a href="#snes" id="rediscover_biglink"></a>'
        }, {
            pos: [190, -140],
            layer: 4,
            html: '<a href="#snes"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_attack/bubble.png" /></a>'
        }, {
            pos: [-300, 10],
            image: "scene_rediscover/newmario.png",
            layer: 3
        }, {
            pos: [300, 0],
            image: "scene_rediscover/oldmario.png",
            layer: 3
        }, {
            pos: [10, -80],
            layer: 1,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_rediscover/years2.png" id="rediscover_years2" />'
        }, {
            pos: [0, -100],
            layer: 2,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_rediscover/years1.png" id="rediscover_years1" />'
        }, {
            pos: [-50, 51],
            layer: 2,
            html: '<div class="roadtile2" style="width:1000px" />'
        }],
        onCreate: function() {
            $("#rediscover_years1, #rediscover_years2").hide();
            stage.onFrameCallbacks.push(function() {
                if (scenes[7].state == 2) {
                    var b = scenes[7].elements[3].pos,
                        a = scenes[7].center,
                        c = document.getElementById("rediscover_handsmask");
                    if (c.style) c.style.backgroundPosition = (stage.stageX - a[0] + b[0]) * 0.3 + 110 + "px " + (stage.stageY - a[1] + b[1] + 180) * 0.3 + "px"
                }
            })
        },
        onActivate: function() {
            $("#rediscover_years1, #rediscover_years2").compatFadeIn(400);
            $("#rating").removeClass("newg newgonline oldg")
        },
        onDeactivate: function() {
            $("#rediscover_years1, #rediscover_years2").compatFadeOut(400)
        }
    }, {
        id: "snes",
        size: [1300, 600],
        center: [5750, 1183],
        elements: [{
            pos: [-510, -280],
            image: "scene_snes/roadangle.png",
            layer: 2
        }, {
            pos: [-510, -280],
            layer: 3.1,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/bowser.png" id="snes_bowser" />'
        }, {
            pos: [-570, -380],
            layer: 3,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/bowser_star1.png" id="snes_bowser_star1" />'
        }, {
            pos: [-540, -395],
            layer: 3,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/bowser_star2.png" id="snes_bowser_star2" />'
        }, {
            pos: [-600, -400],
            layer: 3,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/bowser_shell.png" id="snes_bowser_shell" />'
        }, {
            pos: [0, 0],
            image: "scene_snes/frame.png",
            layer: 3
        }, {
            pos: [-122, -85],
            image: "scene_snes/logo.png",
            layer: 3.3
        }, {
            pos: [-120, 80],
            layer: 3.2,
            html: '<a href="#snes/video"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/button.png" /></a>'
        }, {
            pos: [-122, 2],
            layer: 3.1,
            html: '<div class="history_blurb"><strong>Ladies and gentlemen, start your engines</strong><p>Get-in, sit-down, and buckle-up to experience frantic kart racing with the Super Nintendo&trade; game that started it all. In Super Mario Kart&trade;, players could master the unique driving styles of Mario, Luigi, the Princess and more! You could race against a friend or go head-to-head in Battle Mode.</p><p><a target="_blank" href="http://www.nintendo.com.au/index.php?action=catalogue&prodcat_id=6&prod_id=20234&pageID=4">Available for download on Virtual Console</a></p>'
        }, {
            pos: [-325, 20],
            image: "scene_snes/dk.png",
            layer: 4
        }, {
            pos: [186, -5],
            layer: 4,
            html: '<div id="snes_photos" class="photo"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/photo_1.png" /></div>'
        }, {
            pos: [-178, 132],
            layer: 3,
            html: '<div id="snes_social"></div>'
        }, {
            pos: [160, 130],
            layer: 4.1,
            html: '<a href="#n64" class="scene_next"></a>'
        }, {
            pos: [-160, 130],
            layer: 4.1,
            html: '<a href="#rediscover" class="scene_prev"></a>'
        }, {
            pos: [190, 51],
            layer: 2,
            html: '<div class="roadtile3" style="width:920px" />'
        }],
        triggers: [{
            atX: -70,
            onForward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] +
                    scenes[stage.currentScene].size[0] / 2.5)
            },
            onBackward: function() {
                scene_lakitu.hide()
            }
        }],
        onHash: function(b) {
            b.indexOf("video") >= 0 && modalPopup.create(scene_html.historyVideo("../videos/history/snes.flv", this.id), "", function() {
                window.location.hash = "snes"
            })
        },
        onCreate: function() {
            this.photos = new scene_photos($("#snes_photos"), "images/scene_snes/photo_#.png", 2);
            $("#snes_social").html(scene_html.social(this.id));
            $("#snes_bowser, #snes_bowser_star1, #snes_bowser_star2, #snes_bowser_shell").hide()
        },
        onActivate: function(b) {
            var a =
                this.photos;
            this.photoTimer = setInterval(function() {
                a.cycle()
            }, 5E3);
            $("#rating").addClass("oldg").removeClass("newg newgonline");
            $("#snes_bowser").compatFadeIn(300).css({
                position: "relative",
                left: 200,
                bottom: 75
            }).animate({
                left: 0,
                bottom: 0
            }, {
                duration: 1500,
                easing: "easeOutQuart",
                queue: false
            });
            $("#snes_bowser_star1").delay(600).css({
                position: "relative",
                opacity: "hide",
                left: 30,
                top: 25
            }).animate({
                left: 0,
                top: 0,
                opacity: "show"
            }, {
                duration: 300,
                easing: "easeOutExpo",
                queue: true
            });
            $("#snes_bowser_star2").delay(600).css({
                position: "relative",
                opacity: "hide",
                right: 15,
                top: 35
            }).animate({
                right: 0,
                top: 0,
                opacity: "show"
            }, {
                duration: 500,
                easing: "easeOutExpo",
                queue: true
            });
            $("#snes_bowser_shell").delay(300).show().css({
                position: "relative",
                opacity: 0,
                left: 180,
                top: 20
            }).animate({
                left: 0,
                top: 0,
                opacity: 5
            }, {
                duration: 900,
                easing: "easeOutQuart",
                queue: true
            });
            b && scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2.5)
        },
        onDeactivate: function() {
            clearInterval(this.photoTimer);
            $("#snes_bowser, #snes_bowser_star1, #snes_bowser_star2, #snes_bowser_shell").compatFadeOut()
        }
    }, {
        id: "n64",
        size: [1100, 600],
        center: [6950, 1183],
        elements: [{
            pos: [0, 0],
            image: "scene_n64/frame.png",
            layer: 3
        }, {
            pos: [-122, -80],
            image: "scene_n64/logo.png",
            layer: 3.3
        }, {
            pos: [-120, 80],
            layer: 3.2,
            html: '<a href="#n64/video"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/button.png" /></a>'
        }, {
            pos: [-122, 0],
            layer: 3.1,
            html: '<div class="history_blurb"><strong>Three... Two... One... GO!</strong><p>Put the pedal to the metal in this worthy successor to the Super NES&reg; classic, Super Mario Kart&reg;. Players could race solo in the Mario GP or get their friends to "bring it on" in the highly competitive 4 player Battle mode. With improved courses and the revolutionary head-to-head four-player mode, Mario Kart&trade; 64 won the hearts of racing fans the world over.</p><p><a target="_blank" href="http://www.nintendo.com.au/index.php?action=catalogue&prodcat_id=6&prod_id=19796&pageID=4">Available for download on Virtual Console</p>'
        }, {
            pos: [-600, 35],
            image: "scene_n64/yoshi_luigi.png",
            layer: 2.5
        }, {
            pos: [360, 75],
            image: "scene_n64/flip_car.png",
            layer: 3.5
        }, {
            pos: [490, -10],
            image: "scene_n64/flip_toad.png",
            layer: 4
        }, {
            pos: [115, 0],
            layer: 4,
            html: '<div id="n64_photos" class="photo"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_n64/photo_1.png" /></div>'
        }, {
            pos: [-178, 132],
            layer: 3,
            html: '<div id="n64_social"></div>'
        }, {
            pos: [160, 130],
            layer: 4.1,
            html: '<a href="#gba" class="scene_next"></a>'
        }, {
            pos: [-160, 130],
            layer: 4.1,
            html: '<a href="#snes" class="scene_prev"></a>'
        }, {
            pos: [0, 51],
            layer: 2,
            html: '<div class="roadtile3" style="width:1100px" />'
        }],
        triggers: [{
            atX: -150,
            onForward: function() {
                scene_lakitu.hide()
            },
            onBackward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] - scenes[stage.currentScene].size[0] / 2)
            }
        }, {
            atX: -70,
            onForward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2)
            },
            onBackward: function() {
                scene_lakitu.hide()
            }
        }],
        onHash: function(b) {
            b.indexOf("video") >= 0 && modalPopup.create(scene_html.historyVideo("../videos/history/n64.flv",
                this.id), "", function() {
                window.location.hash = "n64"
            })
        },
        onCreate: function() {
            this.photos = new scene_photos($("#n64_photos"), "images/scene_n64/photo_#.png", 2);
            $("#n64_social").html(scene_html.social(this.id))
        },
        onActivate: function(b) {
            var a = this.photos;
            this.photoTimer = setInterval(function() {
                a.cycle()
            }, 5E3);
            $("#rating").addClass("oldg").removeClass("newg newgonline");
            b && scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2.5)
        },
        onDeactivate: function() {
            clearInterval(this.photoTimer)
        }
    }, {
        id: "gba",
        size: [1100, 600],
        center: [8050, 1183],
        elements: [{
            pos: [0, 0],
            image: "scene_gba/frame.png",
            layer: 3
        }, {
            pos: [132, -89],
            image: "scene_gba/logo.png",
            layer: 3.3
        }, {
            pos: [138, 80],
            layer: 3.2,
            html: '<a href="#gba/video"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/button.png" /></a>'
        }, {
            pos: [140, -3],
            layer: 3.1,
            html: '<div class="history_blurb"><strong>Get Supercharged!</strong><p>The first Mario Kart released on a hand-held, Mario Kart&trade;: Super Circuit on the Game Boy Advance&trade; put the power in the palm of your hand! It included everyone\'s favourite kart-racing characters and 20 new tracks loaded with classic power-ups. Players could burn rubber in Grand Prix, race their pals or shift gears for the mayhem of battle mode.</p>'
        }, {
            pos: [-435, 60],
            image: "scene_gba/dk.png",
            layer: 3.6
        }, {
            pos: [333, 112],
            image: "scene_gba/mario.png",
            layer: 3
        }, {
            pos: [-120, -5],
            layer: 4,
            html: '<div id="gba_photos" class="photo"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_gba/photo_1.png" /></div>'
        }, {
            pos: [115, 132],
            layer: 3,
            html: '<div id="gba_social"></div>'
        }, {
            pos: [160, 130],
            layer: 4.1,
            html: '<a href="#gamecube" class="scene_next"></a>'
        }, {
            pos: [-160, 130],
            layer: 4.1,
            html: '<a href="#n64" class="scene_prev"></a>'
        }, {
            pos: [0, 51],
            layer: 2,
            html: '<div class="roadtile3" style="width:1100px" />'
        }],
        triggers: [{
            atX: -150,
            onForward: function() {
                scene_lakitu.hide()
            },
            onBackward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] - scenes[stage.currentScene].size[0] / 2)
            }
        }, {
            atX: -70,
            onForward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2)
            },
            onBackward: function() {
                scene_lakitu.hide()
            }
        }],
        onHash: function(b) {
            b.indexOf("video") >= 0 && modalPopup.create(scene_html.historyVideo("../videos/history/gba.flv", this.id), "", function() {
                window.location.hash =
                    "gba"
            })
        },
        onCreate: function() {
            this.photos = new scene_photos($("#gba_photos"), "images/scene_gba/photo_#.png", 2);
            $("#gba_social").html(scene_html.social(this.id))
        },
        onActivate: function(b) {
            var a = this.photos;
            this.photoTimer = setInterval(function() {
                a.cycle()
            }, 5E3);
            $("#rating").addClass("oldg").removeClass("newg newgonline");
            b && scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2.5)
        },
        onDeactivate: function() {
            clearInterval(this.photoTimer)
        }
    }, {
        id: "gamecube",
        size: [1100, 600],
        center: [9150, 1183],
        elements: [{
            pos: [0, 0],
            image: "scene_gamecube/frame.png",
            layer: 3
        }, {
            pos: [-122, -80],
            image: "scene_gamecube/logo.png",
            layer: 3.3
        }, {
            pos: [-122, 80],
            layer: 3.2,
            html: '<a href="#gamecube/video"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/button.png" /></a>'
        }, {
            pos: [-130, 5],
            layer: 3.1,
            html: '<div class="history_blurb"><strong>Double the Fun!</strong><p>The GameCube&trade; classic, Mario Kart&trade;: Double Dash introduced an unprecedented 16 players team racing, with two players per kart. Connecting up to 8 GameCube\'s with the LAN adaptor, each kart held two racers that could switch places at any time. Players could team up with family and friends and choose from a huge cast of favourites.</p>'
        }, {
            pos: [-440, 35],
            image: "scene_gamecube/warios.png",
            layer: 3.2
        }, {
            pos: [140, -5],
            layer: 4,
            html: '<div id="gamecube_photos" class="photo"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_gamecube/photo_1.png" /></div>'
        }, {
            pos: [-178, 132],
            layer: 3,
            html: '<div id="gamecube_social"></div>'
        }, {
            pos: [160, 130],
            layer: 4.1,
            html: '<a href="#ds" class="scene_next"></a>'
        }, {
            pos: [-160, 130],
            layer: 4.1,
            html: '<a href="#gba" class="scene_prev"></a>'
        }, {
            pos: [0, 51],
            layer: 2,
            html: '<div class="roadtile3" style="width:1100px" />'
        }],
        triggers: [{
            atX: -150,
            onForward: function() {
                scene_lakitu.hide()
            },
            onBackward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] - scenes[stage.currentScene].size[0] / 2)
            }
        }, {
            atX: -70,
            onForward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2)
            },
            onBackward: function() {
                scene_lakitu.hide()
            }
        }],
        onHash: function(b) {
            b.indexOf("video") >= 0 && modalPopup.create(scene_html.historyVideo("../videos/history/gcn.flv", this.id), "", function() {
                window.location.hash = "gamecube"
            })
        },
        onCreate: function() {
            this.photos = new scene_photos($("#gamecube_photos"),
                "images/scene_gamecube/photo_#.png", 2);
            $("#gamecube_social").html(scene_html.social(this.id))
        },
        onActivate: function(b) {
            var a = this.photos;
            this.photoTimer = setInterval(function() {
                a.cycle()
            }, 5E3);
            $("#rating").addClass("oldg").removeClass("newg newgonline");
            b && scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2.5)
        },
        onDeactivate: function() {
            clearInterval(this.photoTimer)
        }
    }, {
        id: "ds",
        size: [1100, 600],
        center: [10250, 1183],
        elements: [{
            pos: [0, 0],
            image: "scene_ds/frame.png",
            layer: 3
        }, {
            pos: [-122, -85],
            image: "scene_ds/logo.png",
            layer: 3.3
        }, {
            pos: [-260, 60],
            image: "scene_ds/wifi.png",
            layer: 3.2
        }, {
            pos: [-122, 80],
            layer: 3.2,
            html: '<a href="#ds/video"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/button.png" /></a>'
        }, {
            pos: [-122, 5],
            layer: 3.1,
            html: '<div class="history_blurb"><strong>Time to race... no wires attached</strong><p>In Mario Kart&trade; DS the acclaimed Mario Kart series goes wireless and online, letting players race and battle with up to eight karts at once. An all-star cast that includes Mario, Luigi, Peach, Yoshi, Donkey Kong, Wario, Bowser and Toad round up a lineup of more than 30 courses drawn from every previous Mario Kart game.</p>'
        }, {
            pos: [-600, 25],
            image: "scene_ds/dk_attacking.png",
            layer: 2.5
        }, {
            pos: [-510, 100],
            layer: 2.9,
            html: '<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_ds/shell.png" id="ds_dkshell" />'
        }, {
            pos: [-470, 100],
            image: "scene_ds/luigi.png",
            layer: 3.7
        }, {
            pos: [-330, 80],
            image: "scene_ds/mario.png",
            layer: 3.6
        }, {
            pos: [80, 140],
            image: "scene_ds/shyguy.png",
            layer: 4
        }, {
            pos: [400, 35],
            image: "scene_ds/mario_racecar.png",
            layer: 2.7
        }, {
            pos: [180, -25],
            layer: 4,
            html: '<div id="ds_photos" class="photo"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_ds/photo_1.png" /></div>'
        }, {
            pos: [-178, 132],
            layer: 3,
            html: '<div id="ds_social"></div>'
        }, {
            pos: [160, 130],
            layer: 4.1,
            html: '<a href="#wii" class="scene_next"></a>'
        }, {
            pos: [-160, 130],
            layer: 4.1,
            html: '<a href="#gamecube" class="scene_prev"></a>'
        }, {
            pos: [0, 51],
            layer: 2,
            html: '<div class="roadtile3" style="width:1100px" />'
        }],
        triggers: [{
            atX: -150,
            onForward: function() {
                scene_lakitu.hide()
            },
            onBackward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] - scenes[stage.currentScene].size[0] / 2)
            }
        }, {
            atX: -70,
            onForward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] +
                    scenes[stage.currentScene].size[0] / 2)
            },
            onBackward: function() {
                scene_lakitu.hide()
            }
        }],
        onHash: function(b) {
            b.indexOf("video") >= 0 && modalPopup.create(scene_html.historyVideo("../videos/history/ds.flv", this.id), "", function() {
                window.location.hash = "ds"
            })
        },
        onCreate: function() {
            this.photos = new scene_photos($("#ds_photos"), "images/scene_ds/photo_#.png", 2);
            $("#ds_social").html(scene_html.social(this.id));
            $("#ds_dkshell").hide()
        },
        onActivate: function(b) {
            var a = this.photos;
            this.photoTimer = setInterval(function() {
                    a.cycle()
                },
                5E3);
            $("#rating").addClass("newg").removeClass("newgonline oldg");
            $("#ds_dkshell").compatFadeIn(300).css({
                position: "relative",
                right: 200,
                bottom: 60
            }).animate({
                right: 0,
                bottom: 0
            }, {
                duration: 1E3,
                easing: "easeOutQuart",
                queue: false
            });
            b && scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2.5)
        },
        onDeactivate: function() {
            clearInterval(this.photoTimer);
            $("#ds_dkshell").compatFadeOut()
        }
    }, {
        id: "wii",
        size: [1100, 600],
        center: [11350, 1183],
        elements: [{
            pos: [0, 0],
            image: "scene_wii/frame.png",
            layer: 3
        }, {
            pos: [-122, -90],
            image: "scene_wii/logo.png",
            layer: 3.3
        }, {
            pos: [-260, 60],
            image: "scene_ds/wifi.png",
            layer: 3.2
        }, {
            pos: [-122, 80],
            layer: 3.2,
            html: '<a href="#wii/video"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_snes/button.png" /></a>'
        }, {
            pos: [-122, 0],
            layer: 3.1,
            html: '<div class="history_blurb"><strong>Get behind the wheel.</strong><p>Mario Kart&trade; Wii brings the iconic Mario Kart franchise onto Wii&trade; for the very first time. With a host of features including the Wii Wheel&trade;, classic and new race tracks, never-before seen Mario Kart characters, new  vehicles, Nintendo Wi-Fi Connection, and even a new Wii channel \u2013 the Mario Kart Channel. Mario Kart Wii is a must have for every Wii owner.</p>'
        }, {
            pos: [-450, 25],
            image: "scene_wii/boy_woahhh.png",
            layer: 2.8
        }, {
            pos: [135, -10],
            layer: 4,
            html: '<div id="wii_photos" class="photo"><img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/scene_wii/photo_1.png" /></div>'
        }, {
            pos: [-178, 132],
            layer: 3,
            html: '<div id="wii_social"></div>'
        }, {
            pos: [-160, 130],
            layer: 4.1,
            html: '<a href="#ds" class="scene_prev"></a>'
        }, {
            pos: [0, 51],
            layer: 2,
            html: '<div class="roadtile3" style="width:1100px" />'
        }, {
            pos: [1410, 232],
            image: "scene_wii/end_road.png",
            layer: 2
        }, {
            pos: [840, 50],
            image: "scene_wii/end_chars.png",
            layer: 2.1
        }],
        triggers: [{
            atX: -100,
            onForward: function() {
                scene_lakitu.hide()
            },
            onBackward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] - scenes[stage.currentScene].size[0] / 2)
            }
        }, {
            atX: -10,
            onForward: function() {
                scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2)
            },
            onBackward: function() {
                scene_lakitu.hide()
            }
        }],
        onHash: function(b) {
            b.indexOf("video") >= 0 && modalPopup.create(scene_html.historyVideo("../videos/history/wii.flv", this.id), "", function() {
                window.location.hash = "wii"
            })
        },
        onCreate: function() {
            this.photos =
                new scene_photos($("#wii_photos"), "images/scene_wii/photo_#.png", 2);
            $("#wii_social").html(scene_html.social(this.id))
        },
        onActivate: function(b) {
            var a = this.photos;
            this.photoTimer = setInterval(function() {
                a.cycle()
            }, 5E3);
            $("#rating").addClass("newgonline").removeClass("newg oldg");
            b && scene_lakitu.show(scenes[stage.currentScene].center[0] + scenes[stage.currentScene].size[0] / 2.5)
        },
        onDeactivate: function() {
            clearInterval(this.photoTimer)
        }
    }, {
        id: "end",
        sideQuest: !0,
        size: [100, 600],
        center: [11950, 1183],
        elements: []
    }],
    scene_html = {
        social: function(b) {
            var b = "http://www.nintendo.com.au/gamesites/mariokartwii/history.php?era=" + b,
                a = $('<div class="social_links" />');
            a.append($('<a class="fb"> </a>').attr({
                href: "http://www.facebook.com/sharer.php?u=" + encodeURI(b),
                target: "_blank",
                title: "Share this page on Facebook"
            }));
            a.append($('<a class="twitter"> </a>').attr({
                href: "http://www.twitter.com/share?url=" + encodeURI(b),
                target: "_blank",
                title: "Tweet this page"
            }));
            a.append($('<a class="email"> </a>').attr({
                href: "mailto:&subject=Check out the Mario Kart Wii site!&body=" +
                    encodeURI(b),
                target: "_blank",
                title: "Send this page to a friend"
            }));
            a.append("Share, tweet or email your mates");
            return a
        },
        historyVideo: function(b, a) {
            return '<a href="#' + a + '" class="close"></a><div id="history_video"><div class="videoplayer"><embed src="flash/video.swf" type="application/x-shockwave-flash" width="476" height="303" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" flashvars="videoSource=' + b + '"></embed></div></div>'
        }
    },
    scene_videoplayer = function(b, a, c) {
        this.elem = $("#" +
            b);
        this.videos = a;
        this.swfFile = c;
        this.playlistIndex = 0;
        this.type = null;
        for (var d = this, e = {}, f = 0; f < a.length; f++) a[f].flv && (e["videoSource" + (f + 1)] = "../" + a[f].flv);
        swfobject.embedSWF("flash/" + c + ".swf", b, this.elem.width(), this.elem.height(), "9", "", e, {
            allowscriptaccess: "always",
            allowfullscreen: "true",
            wmode: "transparent"
        }, {}, function(a) {
            if (a.success) {
                d.type = "flash";
                d.elem = $("#" + a.id)
            } else d.insertHtml(b)
        })
    };
scene_videoplayer.prototype.insertHtml = function(b) {
    b = $('<div class="html5video" id="' + b + '"><video></video><div class="controls"><a class="play"></a><a class="mute"></a></div></div>').css("visibility", "visible");
    $.browser.className == "msie9" && b.html(b.html().replace("<video", '<video src="videos/tvc/tvc_1.mp4"'));
    $(this.elem).replaceWith(b);
    b.find(".play").bind("click", function() {
        a.togglePlay()
    });
    b.find(".mute").bind("click", function() {
        a.toggleMute()
    });
    b.find(".fullscreen").bind("click", function() {
        a.fullscreen()
    });
    this.elem = b.children("video");
    var a = this;
    this.elem.bind("ended", function() {
        a.next()
    });
    this.updateHtml(this.playlistIndex)
};
scene_videoplayer.prototype.updateHtml = function(b) {
    var a = "",
        c;
    for (c in this.videos[b]) a = a + ('<source src="' + this.videos[b][c] + '" type="video/' + c + '" />');
    this.elem.html(a)
};
scene_videoplayer.prototype.play = function() {
    if (this.type == "flash" && typeof this.elem[0].playTVC == "function") this.elem[0].playTVC();
    else if (typeof this.elem[0].play == "function") {
        this.elem[0].play();
        this.elem.parent().find(".play").removeClass("paused")
    } else {
        var b = this;
        setTimeout(function() {
            b.play()
        }, 400)
    }
};
scene_videoplayer.prototype.pause = function() {
    if (this.type == "flash" && typeof this.elem[0].stopTVC == "function") this.elem[0].stopTVC();
    else if (typeof this.elem[0].pause == "function") {
        this.elem[0].pause();
        this.elem.parent().find(".play").addClass("paused")
    }
};
scene_videoplayer.prototype.togglePlay = function() {
    this.elem[0].paused ? this.play() : this.pause()
};
scene_videoplayer.prototype.toggleMute = function() {
    this.elem[0].muted = !this.elem[0].muted
};
scene_videoplayer.prototype.fullscreen = function() {
    this.elem.toggleClass("fullscreen")
};
scene_videoplayer.prototype.next = function() {
    this.playlistIndex = (this.playlistIndex + 1) % this.videos.length;
    this.updateHtml(this.playlistIndex)
};
var scene_photos = function(b, a, c) {
    this.elem = b;
    this.imagePath = a;
    this.maxImages = c;
    this.curImage = 0;
    this.animating = false;
    b.find(".photoLeft").click(jQuery.proxy(this.prev, this));
    b.find(".photoRight").click(jQuery.proxy(this.next, this));
    this.forcePosition();
    director.loading(-1);
    this.next()
};
scene_photos.prototype.forcePosition = function() {
    var b = this.elem.parents(".prop"),
        a = b.find(".photo");
    stage.loadedElement(b);
    if (a) {
        var c = a.width(),
            a = a.height();
        if (c > 0 && a > 0) {
            b.css({
                width: c,
                height: a
            });
            return
        }
    }
    var d = this;
    setTimeout(function() {
        d.forcePosition()
    }, 300)
};
scene_photos.prototype.next = function() {
    if (!(this.curImage >= this.maxImages) && !this.animating) {
        this.curImage++;
        this.update()
    }
};
scene_photos.prototype.prev = function() {
    if (!(this.curImage <= 1) && !this.animating) {
        this.curImage--;
        this.update.call(this)
    }
};
scene_photos.prototype.cycle = function() {
    if (!this.animating) {
        this.curImage = this.curImage % this.maxImages + 1;
        this.update.call(this)
    }
};
scene_photos.prototype.update = function() {
    var b = $(this.elem).closest(".prop");
    b.find(".photoLeft").compatFaded(this.curImage == 1);
    b.find(".photoRight").compatFaded(this.curImage == this.maxImages);
    var a = this.imagePath.replace("#", this.curImage),
        c = b.find(".photo");
    this.animating = true;
    var d = this;
    c.compatFadeOut(200, function() {
        var b = $('<img src="' + a + '" />');
        b.bind("load", function() {
            c.compatFadeIn(400, function() {
                d.animating = false
            })
        });
        c.html(b)
    })
};
var scene_gallery = function(b, a, c, d) {
    this.baseHash = b;
    this.ajaxUrl = c.url || "ajax/gallery.json.php";
    this.page = 1;
    this.total = 0;
    this.ajaxPending = null;
    this.filters = {
        name: "",
        state: "all",
        date: "all"
    };
    this.templates = d;
    this.elem = a;
    this.baseParams = c;
    a.find(".pageLeft").click(jQuery.proxy(this.prevPage, this));
    a.find(".pageRight").click(jQuery.proxy(this.nextPage, this));
    a.find("select").change(jQuery.proxy(this.refresh, this));
    var e = this;
    a.find("input").bind("change blur keypress", function(a) {
        clearTimeout(this.inputDelay);
        a.which == 13 ? e.refresh.call(e) : this.inputDelay = setTimeout(function() {
            e.refresh.call(e)
        }, 1200)
    })
};
scene_gallery.prototype = {
    load: function() {
        this.elem.find(".ajaxgallery").css("background", "url('images/ajaxloading.gif') center center no-repeat").children().compatFadeOut(200);
        var b = $.extend({}, this.baseParams, {
            page: this.page
        });
        if (this.filters.name.length) b.name = this.filters.name;
        if (this.filters.state.length) b.state = this.filters.state;
        if (this.filters.date.length) b.date = this.filters.date;
        if (this.ajaxPending) {
            this.ajaxPending.abort();
            director.loading(-1)
        }
        this.ajaxPending = $.getJSON(this.ajaxUrl, b, jQuery.proxy(this.populate,
            this));
        director.loading(1)
    },
    populate: function(b) {
        director.loading(-1);
        var a = this.elem,
            c = "",
            d = $(".ajaxgallery", a);
        if (b)
            if (b.total == 0) {
                this.total = b.total;
                c = "No results found!"
            } else {
                this.total = b.total;
                for (var e = 0; e < b.videos.length; e++) {
                    var f = parseInt(b.videos[e].votes),
                        j = "",
                        f = f == 1 ? f + " vote" : f > 1 ? f + " votes" : "";
                    if (b.videos[e].votesplace) {
                        j = " " + b.videos[e].votesplace;
                        j.indexOf("first") >= 0 ? f = f + "<br /><em>1st place</em>" : j.indexOf("second") >= 0 ? f = f + "<br /><em>2nd place</em>" : j.indexOf("third") >= 0 && (f = f + "<br /><em>3rd place</em>")
                    }
                    c =
                        c + this.templates.video.replace(/{id}/g, b.videos[e].id).replace("{num}", parseInt(b.videos[e].id, 10)).replace("{thumb}", b.videos[e].thumb).replace("{names}", b.videos[e].names).replace("{state}", b.videos[e].state).replace("{date}", b.videos[e].date).replace("{votes}", f).replace("{votesplace}", j)
                }
            } else {
            this.total = 0;
            c = "Videos not available at this time."
        }
        a.find(".pageRight").compatFaded(this.page * 10 >= this.total);
        a.find(".pageLeft").compatFaded(this.page <= 1);
        d.compatFadeOut(200, function() {
            d.css("background",
                "none").html(c)
        }).compatFadeIn(200)
    },
    refresh: function() {
        var b = this.filters,
            a = this.elem;
        this.page = 1;
        b.name = $("input.filter_name", a).val();
        if (b.name == $("input.filter_name", a).attr("placeholder")) b.name = "";
        b.state = $("select.filter_state", a).val();
        b.date = $("select.filter_date", a).val();
        this.updateHash()
    },
    updateFilters: function(b, a, c) {
        this.filters = {
            name: typeof b == "undefined" ? "" : b,
            state: typeof a == "undefined" ? "" : a,
            date: typeof c == "undefined" ? "" : c
        }
    },
    nextPage: function() {
        if (this.page * 10 < this.total) {
            this.page++;
            this.updateHash()
        }
    },
    prevPage: function() {
        if (this.page > 1) {
            this.page--;
            this.updateHash()
        }
    },
    updateHash: function() {
        var b = this.filters,
            a = this.baseHash;
        this.page > 1 && (a = a + ("/page:" + this.page));
        b.name && b.name.length > 0 && (a = a + ("/name:" + b.name));
        b.state && b.state != "all" && (a = a + ("/state:" + b.state));
        b.date && b.date != "all" && (a = a + ("/date:" + b.date));
        window.location.hash = a + "";
        $(window).hashchange()
    },
    popup: function(b) {
        var a = this,
            c = modalPopup.create(this.templates.popup, "videopopup", function() {
                a.updateHash()
            });
        c.find(".videoplayer").css("backgroundImage",
            "../images/ajaxloading.gif");
        c.find(".social.fb").attr({
            href: "http://www.facebook.com/sharer.php?u=" + encodeURI(window.location.href),
            target: "_blank",
            title: "Share this video on Facebook"
        });
        c.find(".social.twitter").attr({
            href: "http://www.twitter.com/share?url=" + encodeURI(window.location.href),
            target: "_blank",
            title: "Tweet this video"
        });
        c.find(".social.email").attr({
            href: "mailto:&subject=Check out this Mario Kart Wii video!&body=" + encodeURI(window.location.href),
            target: "_blank",
            title: "Send this video to a friend"
        });
        $.getJSON(this.ajaxUrl, $.extend({}, this.baseParams, {
            id: b
        }), jQuery.proxy(this.populatePopup, c))
    },
    populatePopup: function(b) {
        for (var b = b.videos[0], a = "", c = b.names.split(","), d = 0; d < c.length; d++) a = a + ('<div class="p' + (d + 1) + '">' + jQuery.trim(c[d]) + "</div>");
        c = $(this);
        c.find(".names").html(a);
        c.find(".videoplayer").css("backgroundImage", "none").html('<embed src="flash/video.swf" type="application/x-shockwave-flash" width="476" height="303" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" flashvars="videoSource=' +
            b.video + '.mp4"></embed>')
    }
};
var scene_pager = function(b, a, c, d) {
    this.pagedElem = b;
    this.pagingElem = a;
    this.perPage = c;
    this.changeCallback = d;
    this.page = 1;
    this.total = b.children().length;
    if (!(this.total <= c)) {
        var e = this,
            b = $('<a class="pageLeft"></a>');
        b.click(function() {
            if (e.page > 1) {
                e.page--;
                e.update()
            }
        });
        c = $('<a class="pageRight"></a>');
        c.click(function() {
            if (e.page < e.total / e.perPage) {
                e.page++;
                e.update()
            }
        });
        a.append(b, '<div class="pages"></div>', c);
        this.update()
    }
};
scene_pager.prototype = {
    update: function() {
        var b = this,
            a = this.pagedElem,
            c = this.page;
        a.compatFadeOut(200, function() {
            a.children().each(function(a) {
                a < (c - 1) * b.perPage || a >= c * b.perPage ? $(this).css("display", "none") : $(this).css("display", "block")
            })
        }).compatFadeIn(200);
        for (var d = this.pagingElem.find(".pages").empty(), e = 1; e <= Math.ceil(this.total / this.perPage); e++) d.append('<div class="page' + (this.page == e ? " active" : "") + '"></div>');
        typeof this.changeCallback == "function" && this.changeCallback.call(this, this.page)
    }
};
scene_facebook = {
    application_id: 0xa3c22621707f,
    attackId: "",
    attackUrl: "http://www.nintendo.com.au/gamesites/mariokartwii/attack.php?with=",
    attackMode: "attack",
    attackStrings: "{name} has hit you with a Red Shell! Visit the Mario Kart website to defend, or attack them back!;{name} has hit you with a Spiny Shell! Visit the Mario Kart website to defend, or attack them back!;{name} has lobbed a Bob-omb your way! Visit the Mario Kart website to defend, or attack them back!;{name} has sent Bullet Bill out to get you! Visit the Mario Kart website to defend, or attack them back!;{name} has shrunk everyone with a bolt of lightning. Visit the Mario Kart website to defend, or attack them back!;{name} has spun everyone around using a POW block! Visit the Mario Kart website to defend, or attack them back!;I have used a Super Star. I am now invincible! Visit the Mario Kart website to play Mario Kart Wii Facebook Attack!;I have shot out a Green Shell to defend myself! Visit the Mario Kart website to play Mario Kart Wii Facebook Attack!;I have used a Gold Mushroom for maximum turbo boost! Visit the Mario Kart website to play Mario Kart Wii Facebook Attack!;I have dropped a Fake Item box. Watch Out! Visit the Mario Kart website to play Mario Kart Wii Facebook Attack!;I have sprayed you all with Blooper ink! Visit the Mario Kart website to play Mario Kart Wii Facebook Attack!;I have dropped Banana's all over the racetrack! Visit the Mario Kart website to play Mario Kart Wii Facebook Attack!".split(";"),
    session: null,
    authenticate: function(b) {
        FB.getLoginStatus(function(a) {
            if (a.authResponse) {
                scene_facebook.session = a.authResponse;
                FB.api("/me?fields=first_name", function(a) {
                    if (a.first_name) {
                        scene_facebook.user_name = a.first_name;
                        scene_facebook.user_id = a.id
                    }
                });
                b(a.authResponse)
            } else FB.login(function(a) {
                if (a.authResponse) {
                    scene_facebook.session = a.authResponse;
                    b(a.authResponse)
                }
            }, {
                scope: "publish_stream"
            })
        })
    },
    attackFriend: function(b) {
        scene_facebook.attackId = b;
        var a = $("#" + b).parents("li:first").index();
        scene_facebook.attackDesc =
            scene_facebook.attackStrings[a];
        scene_facebook.session ? scene_facebook.attackMode == "defend" ? scene_facebook.doAttack.call($(), scene_facebook.user_id) : scene_facebook.generateFriendsList(scene_facebook.session) : scene_facebook.authenticate(function() {
            scene_facebook.attackFriend(b)
        })
    },
    generateFriendsList: function(b) {
        var b = FB.Data.query("SELECT name, uid FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1={0}) ORDER BY name", parseInt(b.userID)),
            a = modalPopup.create('<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/loading.gif" />');
        b.wait(function(b) {
            for (var d = $('<div class="FB_friendsList"></div>'), e = $('<ul id="friendslist"></ul>'), f = 0; f < b.length; f++) $('<li class="friend_item"><h3 class="friend_name">' + b[f].name + '</h3><a class="button attack">Attack!</a></li>').appendTo(e).data("uid", b[f].uid);
            if (b.length <= 0) e.append('<li class="friend_item">Add some friends to Facebook to send them attacks!</li>');
            else e.find("li").one("mousemove", function() {
                var a = $(this),
                    b = a.data("uid");
                if (b) {
                    a = $('<img class="profile_pic" src="http://graph.facebook.com/' +
                        b + '/picture" />').prependTo(a);
                    a.css({
                        width: 1,
                        height: 50
                    }).animate({
                        width: "50px"
                    }, 200);
                    a.bind("load", function() {
                        $(this).stop(true).css("width", "50px")
                    })
                }
            });
            e.appendTo(d);
            b = $('<div class="buttons"></div>').appendTo(d);
            $('<a class="button close">Close</a>').appendTo(b);
            b = $('<div class="paging">').prependTo(b);
            new scene_pager(e, b, 100);
            d.find(".button.attack").click(function(a) {
                a.preventDefault();
                a = $(this).parents(".friend_item").data("uid");
                scene_facebook.doAttack.call(this, a)
            });
            modalPopup.close.call(a);
            modalPopup.create(d)
        })
    },
    doAttack: function(b) {
        var a = $(this);
        if (scene_facebook.attackDesc) var c = scene_facebook.attackDesc.replace("{name}", scene_facebook.user_name || "Your friend");
        var d = scene_facebook.attackMode.charAt(0).toUpperCase() + scene_facebook.attackMode.substr(1).toLowerCase();
        FB.ui({
            to: b,
            method: "feed",
            name: "Mario Kart Wii Experience - " + d + "!",
            link: scene_facebook.attackUrl + scene_facebook.attackId,
            description: c
        }, function(b) {
            b && b.post_id ? a.parents(".friend_item").addClass("attacked") : a.parents(".friend_item").addClass("attack-error")
        })
    },
    sendTofriend: function() {}
};
var scene_lakitu = {
        memories_phrases: [],
        memoriesIndex: null,
        ajaxLoading: !1,
        updateTimer: null,
        elem: null,
        position: [0, 7],
        visible: !1,
        create: function() {
            if (this.ajaxLoading == false) {
                this.ajaxLoading = true;
                var b = this;
                $.getJSON("ajax/memories.json.js", function(a) {
                    if (a.length) {
                        b.memories_phrases = a;
                        b.memoriesIndex = 12;
                        stage.onFrameCallbacks.push(function() {
                            b.onFrame()
                        });
                        b.show()
                    }
                });
                this.elem = $('<div id="history_lakitu"><a class="left"></a><a class="right"></a><div class="blurb"></div></div>');
                this.elem.find("a.left").bind("click",
                    function() {
                        scene_lakitu.update(-1)
                    });
                this.elem.find("a.right").bind("click", function() {
                    scene_lakitu.update(1)
                });
                this.elem.css({
                    left: -200,
                    opacity: "hide"
                });
                this.elem.appendTo("#container")
            }
        },
        update: function(b) {
            this.elem == null && this.create();
            if (this.memoriesIndex != null) {
                if (b > 0) this.memoriesIndex = (this.memoriesIndex + 1) % (this.memories_phrases.length - 1);
                else if (b < 0) {
                    this.memoriesIndex--;
                    if (this.memoriesIndex < 0) this.memoriesIndex = this.memoriesIndex + (this.memories_phrases.length - 1)
                } else this.memoriesIndex =
                    Math.floor(this.memories_phrases.length * Math.random());
                this.elem.find(".blurb:first").hide().compatFadeIn(400).html('"' + this.memories_phrases[this.memoriesIndex] + '"');
                clearTimeout(this.updateTimer);
                this.updateTimer = setTimeout(function() {
                    scene_lakitu.update()
                }, b === void 0 ? 7E3 : 15E3)
            }
        },
        show: function(b) {
            b && (this.position[0] = b - 80);
            this.elem == null && this.create();
            if (this.memoriesIndex != null) {
                this.update();
                this.visible == false ? this.elem.css({
                    top: -300,
                    opacity: 0,
                    marginTop: 0
                }) : this.elem.css({
                    top: -100,
                    opacity: 0
                });
                this.elem.stop(true).compatFadeIn(200).animate({
                    top: this.position[1],
                    opacity: 1
                }, {
                    duration: 1300,
                    easing: "easeOutQuart",
                    complete: function() {
                        scene_lakitu.elem.css("opacity", 1)
                    }
                });
                scene_lakitu.bounce();
                scene_lakitu.visible = true
            }
        },
        hide: function() {
            if (this.elem != null) {
                clearTimeout(this.updateTimer);
                this.elem.stop(true).compatFadeOut(600, function() {
                    scene_lakitu.visible = false
                });
                this.elem.clearQueue("bounce")
            }
        },
        bounce: function() {
            this.elem.queue("bounce", [function() {
                $(this).animate({
                    marginBottom: "30px"
                }, {
                    duration: 2E3,
                    easing: "easeInOutQuad",
                    queue: false,
                    complete: function() {
                        $(this).dequeue("bounce")
                    }
                })
            }, function() {
                $(this).animate({
                    marginBottom: "0px"
                }, {
                    duration: 2E3,
                    easing: "easeInOutQuad",
                    queue: "bounce",
                    complete: function() {
                        scene_lakitu.bounce()
                    }
                })
            }]);
            this.elem.dequeue("bounce")
        },
        onFrame: function() {
            scene_lakitu.visible && scene_lakitu.elem.css("left", stage.width / 2 - 136.5 - (stage.stageX - scene_lakitu.position[0]))
        }
    },
    director = {
        fx: {
            opacity: !0,
            anims: !0
        },
        status: function(b) {
            $("#status").text(b)
        },
        init: function() {
            if (!($.browser.name ==
                    "msie" && $.browser.versionNumber <= 6)) {
                $(".jsshow").css("display", "block");
                var b = $("#container");
                $(document).keydown(userInput.onDown).keyup(userInput.onUp);
                $(b).bind({
                    touchmove: userInput.onTouchMove,
                    touchstart: userInput.onTouchStart,
                    touchend: userInput.onTouchEnd,
                    touchcancel: userInput.onTouchEnd
                });
                $(window).blur(userInput.clearInputs);
                $(document).bind("gesturestart gesturechange", function(a) {
                    a.preventDefault()
                });
                $(document).bind("mousedown mouseup", function(a) {
                    a.target.tagName == "IMG" && a.preventDefault()
                });
                $(b).mousewheel(userInput.onScroll);
                $(window).resize(director.onResize);
                $(window).hashchange(director.onHashChange);
                if ($.browser.name == "msie" && $.browser.version <= 8) director.fx.opacity = false;
                miniMap.init();
                stage.init();
                director.checkFlyovers()
            }
        },
        loadingCount: 0,
        loading: function(b) {
            director.loadingCount = director.loadingCount + b;
            director.loadingCount <= 0 ? $("#loading").compatFadeOut("fast") : director.loadingCount >= 1 && $("#loading").compatFadeIn("fast").css("margin-bottom", director.loadingCount - 1 + "px")
        },
        onResize: function() {
            stage.onResize();
            stage.positionElements();
            director.checkFlyovers()
        },
        onHashChange: function() {
            var b = window.location.hash.substr(1).split("/").shift(),
                a = 0;
            if (b.length)
                for (var c = 0; c < scenes.length; c++)
                    if (scenes[c].id == b) {
                        a = c;
                        break
                    }
            if (stage.currentScene != a) director.moveToScene(a);
            else scenes[stage.currentScene].onHash(window.location.hash)
        },
        autoMoveTo: null,
        autoMoveFrom: null,
        autoMoveTimes: null,
        moveToScene: function(b) {
            if (userInput._enabled != false) {
                userInput.setEnabled(false);
                director.autoMoveFrom = [stage.stageX, stage.stageY];
                director.autoMoveTo = [scenes[b].center[0], scenes[b].center[1]];
                var a = (new Date).getTime();
                director.autoMoveTimes = [a, a + 1500];
                stage.createScene(b)
            }
        },
        moveRelativeScene: function(b) {
            if (userInput._enabled != false) {
                b = b < 0 ? scenes[stage.currentScene].prevScene(stage.currentScene) : scenes[stage.currentScene].nextScene(stage.currentScene);
                parseInt(b) >= 0 && director.moveToScene(b)
            }
        },
        autoMovement: function() {
            if (director.autoMoveTo == null) return [0, 0];
            if (Math.abs(stage.stageX - director.autoMoveTo[0]) < 4 && Math.abs(stage.stageY -
                    director.autoMoveTo[1]) < 4) {
                userInput.setEnabled(true);
                director.autoMoveTo = null;
                return [0, 0]
            }
            var b = (new Date).getTime() - director.autoMoveTimes[0],
                a = director.autoMoveTimes[1] - director.autoMoveTimes[0],
                c = director.autoMoveTo[0] - director.autoMoveFrom[0],
                d = director.autoMoveTo[1] - director.autoMoveFrom[1];
            if ((b = (b > a ? a : b) / (a / 2)) < 1) {
                a = c / 2 * Math.pow(b, 4) + director.autoMoveFrom[0];
                b = d / 2 * Math.pow(b, 4) + director.autoMoveFrom[1]
            } else {
                b = b - 2;
                a = -c / 2 * (Math.pow(b, 4) - 2) + director.autoMoveFrom[0];
                b = -d / 2 * (Math.pow(b, 4) - 2) + director.autoMoveFrom[1]
            }
            return [stage.stageX -
                a, stage.stageY - b
            ]
        },
        checkFlyovers: function() {
            var b = $("#comingsoon"),
                a = $("#learnmore"),
                c = $("#home_logo_parent:visible");
            c.length && (stage.height < 650 ? c.removeClass("bigscreen") : c.addClass("bigscreen"));
            stage.currentScene < 1 || stage.currentScene > 5 ? b.hasClass("invisible") || b.compatFadeOut().addClass("invisible") : b.hasClass("invisible") && b.compatFadeIn().removeClass("invisible");
            stage.currentScene == 0 ? a.animate({
                top: "0px"
            }, 1E3).removeClass("invisible") : stage.height < 710 ? a.hasClass("invisible") || a.animate({
                    top: "-51px"
                },
                1E3).addClass("invisible") : a.hasClass("invisible") && a.animate({
                top: "0px"
            }, 1E3).removeClass("invisible")
        },
        sceneHandlers: function(b) {
            $("[placeholder]", b).each(function() {
                var a = $(this);
                if (a.val() == "" || a.val() == a.attr("placeholder")) {
                    a.addClass("placeholder");
                    a.val(a.attr("placeholder"))
                }
            }).focus(function() {
                var a = $(this);
                if (a.val() == a.attr("placeholder")) {
                    a.val("");
                    a.removeClass("placeholder")
                }
            }).blur(function() {
                var a = $(this);
                if (a.val() == "" || a.val() == a.attr("placeholder")) {
                    a.addClass("placeholder");
                    a.val(a.attr("placeholder"))
                }
            }).parents("form").submit(function() {
                $(this).find("[placeholder]").each(function() {
                    var a =
                        $(this);
                    a.val() == a.attr("placeholder") && a.val("")
                })
            })
        }
    },
    stage = {
        frameTimer: 0,
        stageX: 0,
        stageY: 0,
        stageOffset: [0, 0],
        wishVel: [0, 0],
        width: $(window).width(),
        height: $(window).height(),
        onFrameCallbacks: [],
        lastFrameTime: 0,
        friction: 45,
        llaxability: 4,
        fpsHistory: {
            timerDelays: [16, 25, 33, 40],
            curDelay: 0,
            slowFrames: 0,
            history: [],
            lastI: -1,
            add: function(b) {
                this.lastI = ++this.lastI % 30;
                this.history[this.lastI] = b;
                b > this.timerDelays[this.curDelay] * 0.001 + 0.03 ? this.slowFrames++ : this.slowFrames = 0;
                if (this.slowFrames > 21 && this.curDelay +
                    1 < this.timerDelays.length) {
                    this.slowFrames = 0;
                    this.curDelay++;
                    clearInterval(stage.frameTimer);
                    stage.frameTimer = setInterval(stage.onFrame, this.timerDelays[this.curDelay])
                }
            },
            average: function() {
                var b = 0,
                    a;
                for (a in this.history) b = b + this.history[a];
                return b / this.history.length
            }
        },
        currentScene: null,
        init: function() {
            var b, a = window.location.hash.substr(1).split("/").shift() || "home",
                c;
            for (c in scenes) {
                scenes[c] = $.extend({}, baseScene, scenes[c]);
                scenes[c].id == a && (b = c)
            }
            b = b || 0;
            stage.createScene(b);
            stage.stageX = scenes[b].center[0];
            stage.stageY = scenes[b].center[1];
            stage.wishVel[1] = -10;
            stage.activateScene(b, true);
            stage.positionElements(b);
            stage.checkSceneBounds(scenes[b]);
            scenes[b].onHash(window.location.hash);
            stage.frameTimer = setInterval(stage.onFrame, 16);
            stage.lastFrameTime = (new Date).getTime()
        },
        onResize: function() {
            stage.width = $(window).width();
            stage.height = $(window).height();
            stage.checkSceneBounds(scenes[stage.currentScene])
        },
        onFrame: function() {
            var b = (new Date).getTime(),
                a = (b - stage.lastFrameTime) / 1E3;
            stage.lastFrameTime = b;
            stage.fpsHistory.add(a);
            if (stage.currentScene != null) {
                var b = scenes[stage.currentScene],
                    c, d = userInput.inputVel();
                if (d[1] != 0 || d[0] != 0)
                    for (c = 0; c <= 1; c++) stage.wishVel[c] = stage.wishVel[c] + d[c] * a;
                d = 900 * a;
                for (c = 0; c <= 1; c++) stage.wishVel[c] >= d ? stage.wishVel[c] = d : stage.wishVel[c] < -d && (stage.wishVel[c] = -d);
                a = stage.friction * a;
                for (c = 0; c <= 1; c++) stage.wishVel[c] = stage.wishVel[c] > a ? stage.wishVel[c] - a : stage.wishVel[c] < -a ? stage.wishVel[c] + a : 0;
                a = stage.stageX >= b.center[0] ? b.nextScene(stage.currentScene) : b.prevScene(stage.currentScene);
                if (userInput._enabled == true) {
                    b = parseInt(a) >= 0 && typeof scenes[a] != "undefined" ? stage.perfectCenterY(b.center, scenes[a].center) : b.center[1];
                    stage.wishVel[1] = stage.wishVel[1] - (stage.stageY + stage.wishVel[1] - b) / 15
                }
                stage.panStage(stage.wishVel[0], stage.wishVel[1]);
                for (c = 0; c < stage.onFrameCallbacks.length; c++) stage.onFrameCallbacks[c].call()
            }
        },
        panStage: function(b, a) {
            var c = director.autoMovement(),
                b = b - c[0],
                a = a - c[1],
                b = b.toFixed(1),
                a = a.toFixed(1);
            if (!(b == 0 && a == 0)) {
                var c = scenes[stage.currentScene],
                    d;
                if (b > 0) {
                    var e =
                        c.center[0] + c.size[0] / 2;
                    stage.stageX + b >= e && (d = c.nextScene(stage.currentScene))
                } else if (b < 0) {
                    e = c.center[0] - c.size[0] / 2;
                    stage.stageX + b < e && (d = c.prevScene(stage.currentScene))
                }
                if (typeof d == "undefined" || d < 0)
                    if (a > 0) {
                        e = c.center[1] + c.size[1] / 2;
                        stage.stageY + a >= e && (d = stage.sceneAtPoint([stage.stageX + b, stage.stageY + a]))
                    } else if (a < 0) {
                    e = c.center[1] - c.size[1] / 2;
                    stage.stageY + a < e && (d = stage.sceneAtPoint([stage.stageX + b, stage.stageY + a]))
                }
                if (parseInt(d) >= 0 && stage.currentScene != d) {
                    c = scenes[d];
                    c.state < 2 && stage.createScene(d);
                    stage.activateScene(d)
                }
                if (c.triggers.length)
                    for (d = 0; d < c.triggers.length; d++) {
                        e = c.triggers[d].atX + scenes[stage.currentScene].center[0];
                        if (typeof c.triggers[d].onForward == "function" && stage.stageX < e && stage.stageX + b >= e) c.triggers[d].onForward();
                        else if (typeof c.triggers[d].onBackward == "function" && stage.stageX > e && stage.stageX + b <= e) c.triggers[d].onBackward()
                    }
                stage.stageX = parseFloat(stage.stageX + b);
                stage.stageY = parseFloat(stage.stageY + a);
                stage.positionElements();
                miniMap.updatePlayer();
                stage.checkSceneBounds(c)
            }
        },
        sceneAtPoint: function(b) {
            for (var a = 0; a < scenes.length; a++)
                if (b[0] < scenes[a].center[0] + scenes[a].size[0] / 2 && b[0] >= scenes[a].center[0] - scenes[a].size[0] / 2 && b[1] < scenes[a].center[1] + scenes[a].size[1] / 2 && b[1] >= scenes[a].center[1] - scenes[a].size[1] / 2) return a;
            return null
        },
        checkSceneBounds: function(b) {
            var a;
            a = b.nextScene(stage.currentScene);
            stage.stageX + stage.width / 2 >= b.center[0] + b.size[0] / 2 ? parseInt(a) >= 0 ? stage.createScene(a) : stage.stageX > b.center[0] + 200 && (stage.wishVel[0] = stage.wishVel[0] - 10 * (stage.stageX -
                b.center[0] * 0.015)) : parseInt(a) >= 0 && scenes[a].state >= 2 && stage.hideScene(a);
            a = b.prevScene(stage.currentScene);
            stage.stageX - stage.width / 2 <= b.center[0] - b.size[0] / 2 ? parseInt(a) >= 0 ? stage.createScene(a) : stage.stageX < b.center[0] - 200 && (stage.wishVel[0] = stage.wishVel[0] + 10 * (b.center[0] - stage.stageX * 0.015)) : parseInt(a) >= 0 && scenes[a].state >= 2 && stage.hideScene(a)
        },
        perfectCenterY: function(b, a) {
            return -(a[1] - b[1]) / 2 * (Math.cos(Math.PI * ((stage.stageX - b[0]) / (a[0] - b[0]))) - 1) + b[1]
        },
        preloadScene: function(b) {
            if (!(scene[b].state >
                    0))
                for (var a, c = 0; c < scenes[b].elements.length; c++)
                    if (a = scenes[b].elements[c].image)(new Image).src = a
        },
        createScene: function(b) {
            if (typeof scenes[b] == "undefined") return false;
            var a = scenes[b];
            if (a.state >= 1) return stage.showScene(b);
            var c = $("#container");
            a.state = 2;
            for (i in a.elements) {
                var d = a.elements[i],
                    e;
                if (d.html) {
                    e = $("<div>" + d.html + "</div>");
                    if (d.html.indexOf("<img") >= 0) e.find("img").bind("load", stage.loadedElement);
                    else {
                        e.css({
                            top: -2E3,
                            left: -2E3
                        });
                        setTimeout(function() {
                                stage.loadedElement.call(e.get(0))
                            },
                            800)
                    }
                } else {
                    e = $('<img src="http://www.nintendo.com.au/gamesites/mariokartwii/images/' + d.image + '" />');
                    e.bind("load", stage.loadedElement)
                }
                director.loading(1);
                d.scene = b;
                d.DOMElement = e;
                e.data("propIndex", [b, i].join());
                e.css({
                    visibility: "hidden",
                    position: "absolute",
                    zIndex: Math.floor(d.layer * 10)
                });
                d.layer = 1 + (d.layer - 2) * stage.llaxability * 0.1;
                e.addClass("prop");
                c.append(e)
            }
            director.sceneHandlers(null);
            a.onCreate()
        },
        activateScene: function(b, a) {
            if (!a) scenes[stage.currentScene].onDeactivate();
            $("#container");
            var c = scenes[b];
            stage.currentScene = parseInt(b);
            miniMap.updateActive(b);
            if (!a) window.location.hash = c.id;
            c.onActivate(a);
            director.checkFlyovers()
        },
        showScene: function(b) {
            if (!(scenes[b].state >= 2)) {
                var a = $("#container"),
                    c;
                for (c in scenes[b].elements) a.append(scenes[b].elements[c].DOMElement);
                scenes[b].state = 2
            }
        },
        hideScene: function(b) {
            if (typeof scenes[b] == "undefined" || scenes[b].state < 2) return false;
            var a = scenes[b].elements,
                c;
            for (c in a) scenes[b].elements[c].DOMElement.detach();
            scenes[b].state = 1
        },
        loadedElement: function() {
            var b = $(this).closest(".prop");
            stage.positionProp(b);
            director.loading(-1)
        },
        positionElements: function(b) {
            if (typeof b == "undefined")
                for (b = 0; b < scenes.length; b++) {
                    if (!(scenes[b].state < 2))
                        for (var a in scenes[b].elements) stage.positionElement.call(scenes[b].elements[a])
                } else
                    for (a in scenes[b].elements) stage.positionElement.call(scenes[b].elements[a])
        },
        positionProp: function(b) {
            if ((b = b.data("propIndex")) && b.length > 0) {
                b = b.split(",");
                b = scenes[b[0]].elements[b[1]];
                typeof b == "object" && stage.positionElement.call(b)
            }
        },
        positionElement: function() {
            if (this.DOMElement !=
                void 0) {
                var b = this.DOMElement[0],
                    a = this,
                    c = $.layout.className;
                if (a.size === void 0 || c == "trident8" || c == "trident7" || c == "trident9" || c == "prestof") {
                    var d = [parseFloat(b.offsetWidth), parseFloat(b.offsetHeight)];
                    if (d[0] > 0 && d[1] > 0) a.size = d;
                    else {
                        setTimeout(function() {
                            stage.positionElement.call(a)
                        }, 500);
                        return
                    }
                }
                var d = scenes[a.scene],
                    e = (stage.stageY - (d.center[1] + a.pos[1])) * a.layer;
                b.style.left = stage.width / 2 - a.size[0] / 2 - (stage.stageX - (d.center[0] + a.pos[0])) * a.layer + "px";
                b.style.top = stage.height / 2 - a.size[1] / 2 - e + "px";
                if (a.loaded != true) {
                    b.style.visibility = "visible";
                    b.style.position = "absolute";
                    a.loaded = true;
                    a.html && (a.html.indexOf("home_video") > -1 && (c == "trident8" || c == "trident7" || c == "prestof")) && stage.panStage(0, -5)
                }
            }
        }
    },
    miniMap = {
        init: function() {
            var b = $("#minimap");
            miniMap.create(b);
            b.find(".left .button").click(function() {
                director.moveRelativeScene(-1)
            });
            b.find(".right .button").click(function() {
                director.moveRelativeScene(1)
            });
            b.find("li .number").click(function() {
                var a = parseInt($(this).data("index"));
                a >= 0 && director.moveToScene(a)
            });
            b.find("li .number").mouseover(function() {
                var a = $(this),
                    c = a.position();
                c.left = c.left + ($(".shifter", b).position().left + 2);
                a = parseInt(a.data("index"));
                if (a >= 0) {
                    a = $('<div class="tooltip ' + scenes[a].id + '" />');
                    a.css({
                        position: "absolute",
                        top: "auto",
                        bottom: 42,
                        left: c.left - 97,
                        opacity: "hide"
                    });
                    c = {
                        opacity: "show"
                    };
                    if (!($.browser.name == "firefox" && $.browser.versionX <= 3)) c.bottom = "+=4px";
                    a.animate(c);
                    a.appendTo(b)
                }
            });
            b.find("li .number").mouseout(function() {
                parseInt($(this).data("index")) >= 0 && $(".tooltip", b).stop(true).compatFadeOut(200,
                    function() {
                        $(this).remove()
                    })
            });
            for (var a = b.find("ol"), c = a.find("li").length; c < 7; c++) a.append('<li class="inactive"><span class="number">' + (c + 1) + "</span></li>");
            setTimeout(function() {
                miniMap.updatePlayer(stage.stageX)
            }, 300)
        },
        create: function(b) {
            for (var a = "", c = 1, d = 0; d < scenes.length; d++) scenes[d].sideQuest != true && (a = a + ('<li><span class="number" data-index="' + d + '">' + c++ + "</span></li>"));
            b.find("ol:first").html(a)
        },
        updatePlayer: function() {
            if (stage.currentScene != null) {
                for (var b = 0, a = 0; a <= stage.currentScene; a++) scenes[a].sideQuest !=
                    true && b++;
                var a = $("#minimap"),
                    c = a.find("li").width(),
                    d = scenes[stage.currentScene],
                    e = [d.center[0] - d.size[0] / 2, d.center[0] + d.size[0] / 2],
                    e = (stage.stageX - e[0]) / (e[1] - e[0]) - 0.5,
                    d = b >= a.find("li").length && e > 0 || d.sideQuest == true ? b * c - 17.5 : (b + e) * c - 17.5,
                    f = a.find("ol").children().length * c,
                    j = a.find(".shifter"),
                    t = j.width();
                d + 17 < t / 2 ? j.scrollLeft(0) : d - 17 > f - t / 2 ? j.scrollLeft(f - t + 17) : j.scrollLeft((b + e) * c - t / 2);
                a.find("#player").css("left", d)
            }
        },
        updateActive: function(b) {
            var a = $("#minimap"),
                c = 0,
                d = 0;
            a.find("li").each(function() {
                c++;
                var a = $(this);
                if (a.children("span").data("index") <= b) {
                    a.addClass("active");
                    d++
                } else a.removeClass("active")
            });
            a.find(".left .button").compatFaded(b == 0);
            a.find(".right .button").compatFaded(b == scenes.length - 1)
        }
    },
    modalPopup = {
        create: function(b, a, c) {
            $("div.modalPopup").hide();
            userInput.setEnabled(false);
            var d = $('<div class="modalPopup">').html(b);
            a && d.addClass(a);
            if (c) modalPopup.closeCallback = c;
            d.hide();
            d.find("img").bind("load", modalPopup.position);
            d.find("a.close").click(function() {
                $(document).click()
            });
            d.click(function(a) {
                a.stopPropagation()
            });
            $(document).one("click", jQuery.proxy(modalPopup.close, d));
            $("#container").append(d);
            d.compatFadeIn(200);
            setTimeout(function() {
                modalPopup.position.call(d)
            }, 200);
            modalPopup.position.call(d);
            return d
        },
        position: function() {
            var b = $(this).closest(".modalPopup"),
                a = scenes[stage.currentScene].center;
            b.width() > 0 && b.height() > 0 && b.css({
                left: a[0] - stage.stageX + stage.width / 2 - b.width() / 2,
                top: a[1] - stage.stageY + stage.height / 2 - b.height() / 2
            })
        },
        close: function() {
            var b = $(this).closest(".modalPopup");
            b.find("video, embed").remove();
            b.compatFadeOut(200, function() {
                b.remove()
            });
            userInput.setEnabled(true);
            typeof FB == "object" && FB.Dialog.remove(FB.Dialog._active);
            if (typeof modalPopup.closeCallback == "function") {
                modalPopup.closeCallback();
                modalPopup.closeCallback = null
            }
        }
    };
$(director.init);