// ==UserScript==
// @id             iitc-plugin-barcodes@3ch01c
// @name           IITC plugin: Replace player names with more easily remembered names
// @category       Portal Info
// @version        0.0.1.20160106.0922
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://github.com/3ch01c/iitc-plugins/raw/master/barcodes.user.js
// @downloadURL    https://github.com/3ch01c/iitc-plugins/raw/master/barcodes.user.js
// @description    [local-2016-01-06-092200] Show resonator energy percentage on resonator energy bar in portal detail panel.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @include        https://www.ingress.com/mission/*
// @include        http://www.ingress.com/mission/*
// @match          https://www.ingress.com/mission/*
// @match          http://www.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.barcodes = function() {};
window.plugin.barcodes.nameMap = {
  "IIllIlIlIIlIIll": "SmurfStalkin",
  "lIIIIIIIIlIlIIl": "BK2OI",
  "IllIIIllIIIIlII": "Krapos",
  "lIIllIIllIlIIlI": "Soulweeper",
  "IIIlIIIlllIIlII": "Heisenturd",
  "IIllIllIllIllI": "ProgrumUrrhurr",
  "IlIIIlIIlIIllll": "midnight1994",
  "lIIlIllIIIIllIl": "gotmystogan",
  "lIIIIIlIIlIIIIl": "akio",
  "llIlIIIlIlIlllI": "Harooukin",
  "IIIIllIlIIlIIll": "Xandercat",
  "IlllIIIIIllIlII": "catwoman",
  "IIllIIlIIllIllI": "5r"
}

window.chat.nicknameClicked = function(event, nickname) {
  var hookData = { event: event, nickname: nickname };

  if (window.runHooks('nicknameClicked', hookData)) {
    if (window.plugin.barcodes.decode(nickname) !== nickname) {
      window.chat.addNickname('@' + nickname + " (" + window.plugin.barcodes.decode(nickname) + ")");
    }
    else {
      window.chat.addNickname('@' + nickname);
    }
  }

  event.preventDefault();
  event.stopPropagation();
  return false;
}
window.plugin.barcodes.replaceNames = function(data) {
  console.log(this);
  $(".nickname, .pl_nudge_player").each(function(index, value){
    value = $(value);
    var nickname = window.plugin.barcodes.decode(value.text());
    value.text(nickname);
  });
  $(".pl_nudge_player").each(function(index, value){
    value = $(value);
    var nickname = value.text();
    nickname = nickname.substring(1,nickname.length);
    nickname = window.plugin.barcodes.decode(nickname);
    value.text("@" + nickname);
  });
}
window.plugin.barcodes.decode = function(barcode) {
  if (barcode in window.plugin.barcodes.nameMap){
    return window.plugin.barcodes.nameMap[barcode];
  }
  else {
    return barcode;
  }
}

var setup =  function() {
  window.addHook('nicknameClicked', window.plugin.barcodes.replaceNames);
}

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
