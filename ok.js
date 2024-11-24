// Solo Backend
let Magazzinojs = 353;
let Homejs = 310;
let Loginjs = 44;
let Regjs = 50;
let Viewlogjs = 91;

let Backend = Magazzinojs + Homejs + Loginjs + Regjs + Viewlogjs

// Solo Frontend
let Homecss = 741;
let Homehtml = 165;

let Logincss = 292;
let Loginhtml = 48;

let Regcss = 263;
let Reghtml = 47;

let Viewlogcss = 310;
let Viewloghtml = 71;

let Frontend = Homehtml + Homecss + Loginhtml + Logincss + Reghtml + Regcss + Viewloghtml + Viewlogcss 

let total = Frontend + Backend

console.log(`Backend (js): ${Backend} | Fronted (Html, css): ${Frontend} | Total : ${total}`);
