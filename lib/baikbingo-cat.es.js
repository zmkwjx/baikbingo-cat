var c = Object.defineProperty;
var u = (e, t, s) => t in e ? c(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var i = (e, t, s) => (u(e, typeof t != "symbol" ? t + "" : t, s), s);
var h, l = new Uint8Array(16);
function d() {
  if (!h && (h = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !h))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return h(l);
}
const f = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function m(e) {
  return typeof e == "string" && f.test(e);
}
var n = [];
for (var a = 0; a < 256; ++a)
  n.push((a + 256).toString(16).substr(1));
function p(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, s = (n[e[t + 0]] + n[e[t + 1]] + n[e[t + 2]] + n[e[t + 3]] + "-" + n[e[t + 4]] + n[e[t + 5]] + "-" + n[e[t + 6]] + n[e[t + 7]] + "-" + n[e[t + 8]] + n[e[t + 9]] + "-" + n[e[t + 10]] + n[e[t + 11]] + n[e[t + 12]] + n[e[t + 13]] + n[e[t + 14]] + n[e[t + 15]]).toLowerCase();
  if (!m(s))
    throw TypeError("Stringified UUID is invalid");
  return s;
}
function g(e, t, s) {
  e = e || {};
  var o = e.random || (e.rng || d)();
  if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, t) {
    s = s || 0;
    for (var r = 0; r < 16; ++r)
      t[s + r] = o[r];
    return t;
  }
  return p(o);
}
class v {
  constructor(t) {
    i(this, "store");
    i(this, "themeMap");
    i(this, "clientId", g());
    this.store = t, this.themeMap = /* @__PURE__ */ new Map(), this.connect();
  }
  connect() {
    this.store.addClient(this);
  }
  disconnect() {
    this.store.delClient(this);
  }
  send(t, s) {
    this.store.taskPush({
      theme: t,
      clientId: this.clientId,
      timestamp: new Date().getTime(),
      data: s
    });
  }
  receive(t, s) {
    s && this.themeMap.set(t, s);
  }
  getTheme(t) {
    return (s) => new Promise((o) => {
      o(this.themeMap.get(t)(s));
    });
  }
  hasTheme(t) {
    return this.themeMap.has(t);
  }
}
class y {
  constructor(t) {
    i(this, "store");
    i(this, "lock", null);
    this.store = t;
  }
  dispatch() {
    this.lock === null && (this.lock = setTimeout(async () => {
      const t = this.store.taskShift();
      t && await this.handler(t), this.lock = null, this.dispatch();
    }));
  }
  handler(t) {
    return Promise.all(this.store.getClientTheme(t.theme, t));
  }
}
class C {
  constructor() {
    i(this, "clientList");
    i(this, "serverInfo");
    i(this, "taskList");
    i(this, "taskPush", (t) => {
      this.taskList.push(t), this.serverInfo.dispatch();
    });
    i(this, "taskShift", () => this.taskList.shift());
    i(this, "getClientTheme", (t, s) => {
      const o = [];
      return this.clientList.forEach((r) => {
        r.hasTheme(t) && o.push(r.getTheme(t)(s));
      }), o;
    });
    i(this, "addClient", (t) => {
      this.clientList.add(t);
    });
    i(this, "delClient", (t) => {
      this.clientList.delete(t);
    });
    this.serverInfo = new y(this), this.clientList = /* @__PURE__ */ new Set(), this.taskList = [];
  }
}
const w = new C(), L = () => new v(w);
export {
  L as useCatCore
};
//# sourceMappingURL=baikbingo-cat.es.js.map
