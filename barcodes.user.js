// ==UserScript==
// @id             iitc-plugin-barcodes@3ch01c
// @name           IITC plugin: Replace player names with more easily remembered names
// @category       Portal Info
// @version        0.0.1.20150908.134600
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://github.com/3ch01c/iitc-plugins/raw/master/barcodes.user.js
// @downloadURL    https://github.com/3ch01c/iitc-plugins/raw/master/barcodes.user.js
// @description    [local-2015-09-08-134600] Show resonator energy percentage on resonator energy bar in portal detail panel.
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

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'local';
plugin_info.dateTimeVersion = '20150902.50048';
plugin_info.pluginId = 'barcodes';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.barcodes = function() {};
window.plugin.barcodes.nameMap = {
  "IIllIlIlIIlIIll": "SmurfStalkin",
  "lIIIIIIIIlIlIIl": "BK2OI",
  "IllIIIllIIIIlII": "Krapos",
  "lIIllIIllIlIIlI": "Soulweeper",
  "IIIlIIIlllIIlII": "Heisenturd",
  "IIllIllIllIllI": "ProgramError",
  "IlIIIlIIlIIllll": "midnight1994"
}
window.plugin.barcodes.replaceNames = function(data) {
  $(".nickname").each(function(index, value){
    value = $(value);
    value.text(window.plugin.barcodes.decode(value.text()));
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
