if ("undefined" == typeof XIAOMI || !XIAOMI) var XIAOMI = {};

XIAOMI.namespace = function() {
    var I, n, e, f = arguments, r = null;
    for (I = 0; I < f.length; I += 1) for (e = ("" + f[I]).split("."), r = XIAOMI, n = "XIAOMI" == e[0] ? 1 :0; n < e.length; n += 1) r[e[n]] = r[e[n]] || {},
    r = r[e[n]];
    return r;
};

!function() {
    "use strict";
    function e() {
        var e = {
            "&":"&#38;",
            "<":"&#60;",
            ">":"&#62;",
            '"':"&#34;",
            "'":"&#39;",
            "/":"&#47;"
        }, t = /&(?!#?\w+;)|<|>|"|'|\//g;
        return function() {
            return this ? this.replace(t, function(t) {
                return e[t] || t;
            }) :this;
        };
    }
    function t(e, n, r) {
        return ("string" == typeof n ? n :n.toString()).replace(e.define || i, function(t, n, o, a) {
            return 0 === n.indexOf("def.") && (n = n.substring(4)), n in r || (":" === o ? (e.defineParams && a.replace(e.defineParams, function(e, t, o) {
                r[n] = {
                    arg:t,
                    text:o
                };
            }), n in r || (r[n] = a)) :new Function("def", "def['" + n + "']=" + a)(r)), "";
        }).replace(e.use || i, function(n, o) {
            e.useParams && (o = o.replace(e.useParams, function(e, t, n, o) {
                if (r[n] && r[n].arg && o) {
                    var a = (n + ":" + o).replace(/'|\\/g, "_");
                    return r.__exp = r.__exp || {}, r.__exp[a] = r[n].text.replace(new RegExp("(^|[^\\w$])" + r[n].arg + "([^\\w$])", "g"), "$1" + o + "$2"),
                    t + "def.__exp['" + a + "']";
                }
            }));
            var a = new Function("def", "return " + o)(r);
            return a ? t(e, a, r) :a;
        });
    }
    function n(e) {
        return e.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
    }
    var r, o = {
        version:"1.0.0",
        templateSettings:{
            evaluate:/\{\{([\s\S]+?\}?)\}\}/g,
            interpolate:/\{\{=([\s\S]+?)\}\}/g,
            encode:/\{\{!([\s\S]+?)\}\}/g,
            use:/\{\{#([\s\S]+?)\}\}/g,
            useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
            define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
            defineParams:/^\s*([\w$]+):([\s\S]+)/,
            conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
            iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
            varname:"it",
            strip:!0,
            append:!0,
            selfcontained:!1
        },
        template:void 0,
        compile:void 0
    };
    "undefined" != typeof module && module.exports ? module.exports = o :"function" == typeof define && define.amd ? define(function() {
        return o;
    }) :(r = function() {
        return this || (0, eval)("this");
    }(), r.doT = o), String.prototype.encodeHTML = e();
    var a = {
        append:{
            start:"'+(",
            end:")+'",
            endencode:"||'').toString().encodeHTML()+'"
        },
        split:{
            start:"';out+=(",
            end:");out+='",
            endencode:"||'').toString().encodeHTML();out+='"
        }
    }, i = /$^/;
    o.template = function(r, u, c) {
        u = u || o.templateSettings;
        var s, p, l = u.append ? a.append :a.split, d = 0, f = u.use || u.define ? t(u, r, c || {}) :r;
        f = ("var out='" + (u.strip ? f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") :f).replace(/'|\\/g, "\\$&").replace(u.interpolate || i, function(e, t) {
            return l.start + n(t) + l.end;
        }).replace(u.encode || i, function(e, t) {
            return s = !0, l.start + n(t) + l.endencode;
        }).replace(u.conditional || i, function(e, t, r) {
            return t ? r ? "';}else if(" + n(r) + "){out+='" :"';}else{out+='" :r ? "';if(" + n(r) + "){out+='" :"';}out+='";
        }).replace(u.iterate || i, function(e, t, r, o) {
            return t ? (d += 1, p = o || "i" + d, t = n(t), "';var arr" + d + "=" + t + ";if(arr" + d + "){var " + r + "," + p + "=-1,l" + d + "=arr" + d + ".length-1;while(" + p + "<l" + d + "){" + r + "=arr" + d + "[" + p + "+=1];out+='") :"';} } out+='";
        }).replace(u.evaluate || i, function(e, t) {
            return "';" + n(t) + "out+='";
        }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, "").replace(/(\s|;|\}|^|\{)out\+=''\+/g, "$1out+="),
        s && u.selfcontained && (f = "String.prototype.encodeHTML=(" + e.toString() + "());" + f);
        try {
            return new Function(u.varname, f);
        } catch (g) {
            throw "undefined" != typeof console && console.log("Could not create a template function: " + f),
            g;
        }
    }, o.compile = function(e, t) {
        return o.template(e, null, t);
    };
}();