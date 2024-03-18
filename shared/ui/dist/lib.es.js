import xr from "react";
import le, { css as H } from "styled-components";
var X = { exports: {} }, D = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kr;
function ue() {
  if (kr)
    return D;
  kr = 1;
  var p = xr, y = Symbol.for("react.element"), C = Symbol.for("react.fragment"), k = Object.prototype.hasOwnProperty, A = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, $ = { key: !0, ref: !0, __self: !0, __source: !0 };
  function P(E, s, T) {
    var v, g = {}, _ = null, I = null;
    T !== void 0 && (_ = "" + T), s.key !== void 0 && (_ = "" + s.key), s.ref !== void 0 && (I = s.ref);
    for (v in s)
      k.call(s, v) && !$.hasOwnProperty(v) && (g[v] = s[v]);
    if (E && E.defaultProps)
      for (v in s = E.defaultProps, s)
        g[v] === void 0 && (g[v] = s[v]);
    return { $$typeof: y, type: E, key: _, ref: I, props: g, _owner: A.current };
  }
  return D.Fragment = C, D.jsx = P, D.jsxs = P, D;
}
var F = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tr;
function ce() {
  return Tr || (Tr = 1, process.env.NODE_ENV !== "production" && function() {
    var p = xr, y = Symbol.for("react.element"), C = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), $ = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), E = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), I = Symbol.for("react.offscreen"), Z = Symbol.iterator, Or = "@@iterator";
    function wr(r) {
      if (r === null || typeof r != "object")
        return null;
      var e = Z && r[Z] || r[Or];
      return typeof e == "function" ? e : null;
    }
    var x = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function f(r) {
      {
        for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++)
          a[o - 1] = arguments[o];
        Cr("error", r, a);
      }
    }
    function Cr(r, e, a) {
      {
        var o = x.ReactDebugCurrentFrame, i = o.getStackAddendum();
        i !== "" && (e += "%s", a = a.concat([i]));
        var l = a.map(function(n) {
          return String(n);
        });
        l.unshift("Warning: " + e), Function.prototype.apply.call(console[r], console, l);
      }
    }
    var Pr = !1, Sr = !1, jr = !1, Dr = !1, Fr = !1, Q;
    Q = Symbol.for("react.module.reference");
    function Ar(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === k || r === $ || Fr || r === A || r === T || r === v || Dr || r === I || Pr || Sr || jr || typeof r == "object" && r !== null && (r.$$typeof === _ || r.$$typeof === g || r.$$typeof === P || r.$$typeof === E || r.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === Q || r.getModuleId !== void 0));
    }
    function $r(r, e, a) {
      var o = r.displayName;
      if (o)
        return o;
      var i = e.displayName || e.name || "";
      return i !== "" ? a + "(" + i + ")" : a;
    }
    function rr(r) {
      return r.displayName || "Context";
    }
    function h(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case k:
          return "Fragment";
        case C:
          return "Portal";
        case $:
          return "Profiler";
        case A:
          return "StrictMode";
        case T:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case E:
            var e = r;
            return rr(e) + ".Consumer";
          case P:
            var a = r;
            return rr(a._context) + ".Provider";
          case s:
            return $r(r, r.render, "ForwardRef");
          case g:
            var o = r.displayName || null;
            return o !== null ? o : h(r.type) || "Memo";
          case _: {
            var i = r, l = i._payload, n = i._init;
            try {
              return h(n(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var R = Object.assign, S = 0, er, ar, or, tr, nr, ir, lr;
    function ur() {
    }
    ur.__reactDisabledLog = !0;
    function Ir() {
      {
        if (S === 0) {
          er = console.log, ar = console.info, or = console.warn, tr = console.error, nr = console.group, ir = console.groupCollapsed, lr = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: ur,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        S++;
      }
    }
    function Wr() {
      {
        if (S--, S === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: R({}, r, {
              value: er
            }),
            info: R({}, r, {
              value: ar
            }),
            warn: R({}, r, {
              value: or
            }),
            error: R({}, r, {
              value: tr
            }),
            group: R({}, r, {
              value: nr
            }),
            groupCollapsed: R({}, r, {
              value: ir
            }),
            groupEnd: R({}, r, {
              value: lr
            })
          });
        }
        S < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var M = x.ReactCurrentDispatcher, U;
    function W(r, e, a) {
      {
        if (U === void 0)
          try {
            throw Error();
          } catch (i) {
            var o = i.stack.trim().match(/\n( *(at )?)/);
            U = o && o[1] || "";
          }
        return `
` + U + r;
      }
    }
    var B = !1, Y;
    {
      var Yr = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new Yr();
    }
    function cr(r, e) {
      if (!r || B)
        return "";
      {
        var a = Y.get(r);
        if (a !== void 0)
          return a;
      }
      var o;
      B = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = M.current, M.current = null, Ir();
      try {
        if (e) {
          var n = function() {
            throw Error();
          };
          if (Object.defineProperty(n.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(n, []);
            } catch (m) {
              o = m;
            }
            Reflect.construct(r, [], n);
          } else {
            try {
              n.call();
            } catch (m) {
              o = m;
            }
            r.call(n.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (m) {
            o = m;
          }
          r();
        }
      } catch (m) {
        if (m && o && typeof m.stack == "string") {
          for (var t = m.stack.split(`
`), d = o.stack.split(`
`), u = t.length - 1, c = d.length - 1; u >= 1 && c >= 0 && t[u] !== d[c]; )
            c--;
          for (; u >= 1 && c >= 0; u--, c--)
            if (t[u] !== d[c]) {
              if (u !== 1 || c !== 1)
                do
                  if (u--, c--, c < 0 || t[u] !== d[c]) {
                    var b = `
` + t[u].replace(" at new ", " at ");
                    return r.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", r.displayName)), typeof r == "function" && Y.set(r, b), b;
                  }
                while (u >= 1 && c >= 0);
              break;
            }
        }
      } finally {
        B = !1, M.current = l, Wr(), Error.prepareStackTrace = i;
      }
      var w = r ? r.displayName || r.name : "", Rr = w ? W(w) : "";
      return typeof r == "function" && Y.set(r, Rr), Rr;
    }
    function Nr(r, e, a) {
      return cr(r, !1);
    }
    function Lr(r) {
      var e = r.prototype;
      return !!(e && e.isReactComponent);
    }
    function N(r, e, a) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return cr(r, Lr(r));
      if (typeof r == "string")
        return W(r);
      switch (r) {
        case T:
          return W("Suspense");
        case v:
          return W("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case s:
            return Nr(r.render);
          case g:
            return N(r.type, e, a);
          case _: {
            var o = r, i = o._payload, l = o._init;
            try {
              return N(l(i), e, a);
            } catch {
            }
          }
        }
      return "";
    }
    var L = Object.prototype.hasOwnProperty, sr = {}, fr = x.ReactDebugCurrentFrame;
    function V(r) {
      if (r) {
        var e = r._owner, a = N(r.type, r._source, e ? e.type : null);
        fr.setExtraStackFrame(a);
      } else
        fr.setExtraStackFrame(null);
    }
    function Vr(r, e, a, o, i) {
      {
        var l = Function.call.bind(L);
        for (var n in r)
          if (l(r, n)) {
            var t = void 0;
            try {
              if (typeof r[n] != "function") {
                var d = Error((o || "React class") + ": " + a + " type `" + n + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[n] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw d.name = "Invariant Violation", d;
              }
              t = r[n](e, n, o, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (u) {
              t = u;
            }
            t && !(t instanceof Error) && (V(i), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", a, n, typeof t), V(null)), t instanceof Error && !(t.message in sr) && (sr[t.message] = !0, V(i), f("Failed %s type: %s", a, t.message), V(null));
          }
      }
    }
    var Mr = Array.isArray;
    function q(r) {
      return Mr(r);
    }
    function Ur(r) {
      {
        var e = typeof Symbol == "function" && Symbol.toStringTag, a = e && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return a;
      }
    }
    function Br(r) {
      try {
        return dr(r), !1;
      } catch {
        return !0;
      }
    }
    function dr(r) {
      return "" + r;
    }
    function vr(r) {
      if (Br(r))
        return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ur(r)), dr(r);
    }
    var j = x.ReactCurrentOwner, qr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, br, pr, z;
    z = {};
    function zr(r) {
      if (L.call(r, "ref")) {
        var e = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (e && e.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function Jr(r) {
      if (L.call(r, "key")) {
        var e = Object.getOwnPropertyDescriptor(r, "key").get;
        if (e && e.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function Gr(r, e) {
      if (typeof r.ref == "string" && j.current && e && j.current.stateNode !== e) {
        var a = h(j.current.type);
        z[a] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', h(j.current.type), r.ref), z[a] = !0);
      }
    }
    function Kr(r, e) {
      {
        var a = function() {
          br || (br = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", e));
        };
        a.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function Hr(r, e) {
      {
        var a = function() {
          pr || (pr = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", e));
        };
        a.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var Xr = function(r, e, a, o, i, l, n) {
      var t = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: y,
        // Built-in properties that belong on the element
        type: r,
        key: e,
        ref: a,
        props: n,
        // Record the component responsible for creating this element.
        _owner: l
      };
      return t._store = {}, Object.defineProperty(t._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(t, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.defineProperty(t, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.freeze && (Object.freeze(t.props), Object.freeze(t)), t;
    };
    function Zr(r, e, a, o, i) {
      {
        var l, n = {}, t = null, d = null;
        a !== void 0 && (vr(a), t = "" + a), Jr(e) && (vr(e.key), t = "" + e.key), zr(e) && (d = e.ref, Gr(e, i));
        for (l in e)
          L.call(e, l) && !qr.hasOwnProperty(l) && (n[l] = e[l]);
        if (r && r.defaultProps) {
          var u = r.defaultProps;
          for (l in u)
            n[l] === void 0 && (n[l] = u[l]);
        }
        if (t || d) {
          var c = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          t && Kr(n, c), d && Hr(n, c);
        }
        return Xr(r, t, d, i, o, j.current, n);
      }
    }
    var J = x.ReactCurrentOwner, gr = x.ReactDebugCurrentFrame;
    function O(r) {
      if (r) {
        var e = r._owner, a = N(r.type, r._source, e ? e.type : null);
        gr.setExtraStackFrame(a);
      } else
        gr.setExtraStackFrame(null);
    }
    var G;
    G = !1;
    function K(r) {
      return typeof r == "object" && r !== null && r.$$typeof === y;
    }
    function hr() {
      {
        if (J.current) {
          var r = h(J.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Qr(r) {
      {
        if (r !== void 0) {
          var e = r.fileName.replace(/^.*[\\\/]/, ""), a = r.lineNumber;
          return `

Check your code at ` + e + ":" + a + ".";
        }
        return "";
      }
    }
    var mr = {};
    function re(r) {
      {
        var e = hr();
        if (!e) {
          var a = typeof r == "string" ? r : r.displayName || r.name;
          a && (e = `

Check the top-level render call using <` + a + ">.");
        }
        return e;
      }
    }
    function yr(r, e) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var a = re(e);
        if (mr[a])
          return;
        mr[a] = !0;
        var o = "";
        r && r._owner && r._owner !== J.current && (o = " It was passed a child from " + h(r._owner.type) + "."), O(r), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, o), O(null);
      }
    }
    function Er(r, e) {
      {
        if (typeof r != "object")
          return;
        if (q(r))
          for (var a = 0; a < r.length; a++) {
            var o = r[a];
            K(o) && yr(o, e);
          }
        else if (K(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var i = wr(r);
          if (typeof i == "function" && i !== r.entries)
            for (var l = i.call(r), n; !(n = l.next()).done; )
              K(n.value) && yr(n.value, e);
        }
      }
    }
    function ee(r) {
      {
        var e = r.type;
        if (e == null || typeof e == "string")
          return;
        var a;
        if (typeof e == "function")
          a = e.propTypes;
        else if (typeof e == "object" && (e.$$typeof === s || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        e.$$typeof === g))
          a = e.propTypes;
        else
          return;
        if (a) {
          var o = h(e);
          Vr(a, r.props, "prop", o, r);
        } else if (e.PropTypes !== void 0 && !G) {
          G = !0;
          var i = h(e);
          f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
        }
        typeof e.getDefaultProps == "function" && !e.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ae(r) {
      {
        for (var e = Object.keys(r.props), a = 0; a < e.length; a++) {
          var o = e[a];
          if (o !== "children" && o !== "key") {
            O(r), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), O(null);
            break;
          }
        }
        r.ref !== null && (O(r), f("Invalid attribute `ref` supplied to `React.Fragment`."), O(null));
      }
    }
    function _r(r, e, a, o, i, l) {
      {
        var n = Ar(r);
        if (!n) {
          var t = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (t += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var d = Qr(i);
          d ? t += d : t += hr();
          var u;
          r === null ? u = "null" : q(r) ? u = "array" : r !== void 0 && r.$$typeof === y ? (u = "<" + (h(r.type) || "Unknown") + " />", t = " Did you accidentally export a JSX literal instead of a component?") : u = typeof r, f("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", u, t);
        }
        var c = Zr(r, e, a, i, l);
        if (c == null)
          return c;
        if (n) {
          var b = e.children;
          if (b !== void 0)
            if (o)
              if (q(b)) {
                for (var w = 0; w < b.length; w++)
                  Er(b[w], r);
                Object.freeze && Object.freeze(b);
              } else
                f("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Er(b, r);
        }
        return r === k ? ae(c) : ee(c), c;
      }
    }
    function oe(r, e, a) {
      return _r(r, e, a, !0);
    }
    function te(r, e, a) {
      return _r(r, e, a, !1);
    }
    var ne = te, ie = oe;
    F.Fragment = k, F.jsx = ne, F.jsxs = ie;
  }()), F;
}
process.env.NODE_ENV === "production" ? X.exports = ue() : X.exports = ce();
var se = X.exports;
const fe = le.button.withConfig({
  displayName: "Button",
  componentId: "sc-n2xprm-0"
})(["display:flex;align-items:center;justify-content:center;outline:none;cursor:pointer;border:none;", " ", "  ", ""], (p) => p.$variant === "full" && H(["--label-color:hsl(0,0%,100%);--background-color:hsl(230,60%,50%);--border-color:hsl(230,60%,50%);color:var(--label-color);background-color:var(--background-color);border-color:var(--border-color);border-width:4px;border-style:solid;padding:10px 64px;border-radius:8px;font-size:18px;&:hover{--background-hover-color:hsl(230,60%,55%);background-color:var(--background-hover-color);}&:active{--background-active-color:hsl(230,60%,60%);background-color:var(--background-active-color);}&:disabled{--label-disabled-color:hsl(0,0%,100%);--background-disabled-color:hsl(0,0%,63%);--border-disabled-color:hsl(0,0%,63%);color:var(--label-disabled-color);background-color:var(--background-disabled-color);border-color:var(--border-disabled-color);}"]), (p) => p.$variant === "stroke" && H(["--label-color:hsl(230,60%,50%);--background-color:hsl(0,0%,100%);--border-color:hsl(230,60%,50%);color:var(--label-color);background-color:var(--background-color);border-color:var(--border-color);border-width:4px;border-style:solid;padding:10px 64px;border-radius:8px;font-size:18px;&:hover{--background-hover-color:hsl(230,55%,80%);background-color:var(--background-hover-color);}&:active{--background-active-color:hsl(230,55%,85%);background-color:var(--background-active-color);}&:disabled{--label-disabled-color:hsl(0,0%,63%);--background-disabled-color-color:hsl(0,0%,100%);--border-disabled-color:hsl(0,0%,63%);color:var(--label-disabled-color);background-color:var(--background-disabled-color);border-color:var(--border-disabled-color);}"]), (p) => p.$variant === "link" && H(["--label-color:hsl(230,60%,50%);--background-color:hsla(0,0%,0%,0);color:var(--label-color);background-color:var(--background-color);font-size:18px;&:hover{--label-color:hsl(230,55%,80%);color:var(--label-color);}&:active{--label-color:hsl(230,55%,85%);color:var(--label-color);}&:disabled{--label-color:hsl(0,0%,63%);color:var(--label-color);}"])), be = ({
  children: p,
  varian: y = "full",
  ...C
}) => /* @__PURE__ */ se.jsx(fe, { ...C, $variant: y, children: p });
export {
  be as Button
};
