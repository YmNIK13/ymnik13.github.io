!function (e) {
    var n = {};

    function r(t) {
        if (n[t]) return n[t].exports;
        var o = n[t] = {i: t, l: !1, exports: {}};
        return e[t].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }

    r.m = e, r.c = n, r.d = function (e, n, t) {
        r.o(e, n) || Object.defineProperty(e, n, {enumerable: !0, get: t})
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, r.t = function (e, n) {
        if (1 & n && (e = r(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var t = Object.create(null);
        if (r.r(t), Object.defineProperty(t, "default", {enumerable: !0, value: e}), 2 & n && "string" != typeof e) for (var o in e) r.d(t, o, function (n) {
            return e[n]
        }.bind(null, o));
        return t
    }, r.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(n, "a", n), n
    }, r.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, r.p = "/build/", r(r.s = "Wl6J")
}({
    Wl6J: function (e, n, r) {
        "use strict";

        function t(e, n) {
            for (var r = 0; r < n.length; r++) {
                var t = n[r];
                t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t)
            }
        }

        r.r(n);
        var o = function () {
            function e() {
                !function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }

            var n, r, o;
            return n = e, o = [{
                key: "addValidationPhone", value: function (e) {
                }
            }, {
                key: "addListenersForOrderSave", value: function (n, r, t) {
                    var o = document.querySelector('form[name="order"]');
                    null !== o && o.addEventListener("submit", (function (a) {
                        var i = document.getElementsByClassName("message-error")[0];
                        if (-1 === i.className.search("hidden") && (i.className = i.className + " hidden"), a.preventDefault(), null !== o) {
                            var u = o.querySelectorAll("input"), c = {};
                            u.forEach((function (e) {
                                c[e.id.replace("order_", "")] = e.value
                            })), void 0 !== c.phone && (c.phone = t(c.phone));
                            var l = {phone: c.phone.replace(/\D/g, ""), source: c.source, country: c.country, landing: c.landing, key: c.key, keyword: c.keyword};
                            e.send(l, (function () {
                                n(), "afterSuccessCallbackSendOrder" in window && "function" == typeof window.afterSuccessCallbackSendOrder && window.afterSuccessCallbackSendOrder(l)
                            }), (function () {
                                i.className = i.className.replace("hidden", "").trim(), r(), "afterErrorCallbackSendOrder" in window && "function" == typeof window.afterErrorCallbackSendOrder && window.afterErrorCallbackSendOrder(l)
                            }))
                        }
                    }))
                }
            }, {
                key: "send", value: function (e, n, r) {
                    try {
                        $.ajax({
                            type: 'POST',
                            url: `https://mastercredit.in.ua/api/order`,
                            data: {order: e},
                            success:  function(data) {
                                document.location.href = 'credit.html?phone=' + e.phone
                            },
                            error: function() {
                                //var o = JSON.parse(t.response);
                                r("Не коректний номер")
                            }
                        });
                    } catch (e) {
                        r(e)
                    }
                }
            }, {
                key: "sendOnlyPhone", value: function (e, n, r) {
                    try {
                        var t = new XMLHttpRequest;
                        t.open("POST", "/api/order"), t.setRequestHeader("Content-Type", "application/json"), t.onload = function () {
                            if (200 === t.status) {
                                var e = JSON.parse(t.response);
                                n(e)
                            } else {
                                console.log("error1");
                                try {
                                    var o = JSON.parse(t.response);
                                    r(o)
                                } catch (e) {
                                    console.log("error"), r(e)
                                }
                            }
                        }, t.send(JSON.stringify({order: {phone: e}}))
                    } catch (e) {
                        r(e)
                    }
                }
            }, {
                key: "isValidPhone", value: function (e) {
                }
            }], (r = null) && t(n.prototype, r), o && t(n, o), e
        }();
        !function () {
            function e(e, n) {
                var r = e.getSelectedCountryData();
                $('input[name ="order[country]"]').val(r.iso2);
                var t = $(n).attr("placeholder");
                t = t.replace(/[0-9]/g, "9"), $(n).inputmask(t)
            }

            function n(e) {
                $(".auth .error-inside").length ? ($(".error-inside").show(), $(".error-inside .fa").attr("data-content", e).popover("show")) : $(".auth input").focus()
            }

            function r() {
                $(".auth .error-inside").length && $(".error-inside").hide()
            }

            window.activeForm = !0, $((function () {
                var t = document.getElementById("progRules");
                !function () {
                    if ("phoneForm" === $('.authForm input[name ="form"]').val()) {
                        var n = document.querySelector("#phone"),
                            r = intlTelInput(n, {customContainer: "Input", separateDialCode: !0, initialCountry: "ua", preferredCountries: ["ua"], hiddenInput: "phoneFull"});
                        $(".iti__country-list").outerWidth($(".iti").width()), n.addEventListener("countrychange", (function () {
                            e(r, n)
                        })), n.addEventListener("input", (function () {
                            var e = $(n).val();
                            "ua" === $('input[name ="order[country]"]').val() && "0" === e.charAt(0) && $(n).val(e.substring(1))
                        })), e(r, n)
                    }
                }(), $(document).on("click", ".authForm #terms", (function (e) {
                    e.preventDefault(), $(".terms").modal()
                })), $(document).on("focus", "#shaker", (function (e) {
                    r()
                })), $(document).on("click", "#progRules", (function (e) {
                    r()
                })), $(document).on("keydown", ".authForm#phoneForm", (function (e) {
                    if (13 === e.keyCode) return e.preventDefault(), !1
                })), $(document).on("submit", ".authForm", (function (e) {
                    if (r(), !t.checked) return n("Треба погодитися з правилами"), !1;
                    var a, i, u;
                    activeForm ? (e.preventDefault(), window.activeForm = !1, $(".authForm button").attr("disabled", !0), o.send((a = $(this), i = a.serializeArray(), u = {}, $.map(i, (function (e, n) {
                        switch (e.name) {
                            case"order[phoneFull]":
                                u.phone = e.value.replace(/[^0-9]/g, "");
                                break;
                            case"order[source]":
                                u.source = e.value;
                                break;
                            case"order[country]":
                                u.country = e.value.toUpperCase();
                                break;
                            case"order[landing]":
                                u.landing = e.value;
                                break;
                            case"order[key]":
                                u.key = e.value;
                                break;
                            case"order[keyword]":
                                u.keyword = e.value
                        }
                    })), u), (function () {
                        window.activeForm = !0, $(".authForm button").attr("disabled", !1)
                    }), (function () {
                        window.activeForm = !0, $(".authForm button").attr("disabled", !1), n("Не коректний номер телефону")
                    }))) : n("Для реєстрації введіть номер телефону")
                }))
            }))
        }()
    }
});