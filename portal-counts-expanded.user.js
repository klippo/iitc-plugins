// ==UserScript==
// @id             iitc-plugin-portals-count-expanded@yenky
// @name           IITC plugin: Portal counts expanded
// @category       Info
// @version        0.0.1
// @namespace      
// @updateURL      
// @downloadURL    
// @description    Shown the Portal-Counts dialog always visible.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

// PLUGIN START ///////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalcounts.resetCounts = function(){
	$('body > #portalcounts').remove();
}

window.plugin.portalcounts.scanPortals = function(){
	window.plugin.portalcounts.getPortals();

	$('body').append('<div id="portalcounts">'+$('#portalcounts').html()+'</div>');
	$(window.DIALOG_FOCUS).remove();
}

window.plugin.portalcounts.customCSS = function(){
	$('head').append('<style>' +
		'body > #portalcounts{position:absolute;z-index:1000;width:320px;left: initial;transform:scale(0.75);transform-origin:right top;top: 69px;right: 15px;background:rgba(31,67,93,.8);padding:8px;border:1px solid #20A8B1;}' +
		'body > #portalcounts table{margin-top:0;}' +
		'body > #portalcounts table td{background:none;border-bottom: 1px solid rgba(11, 49, 78,.2);}' +
	'</style>');
}

var setup =  function() {
	window.plugin.portalcounts.customCSS();

	window.addHook('mapDataRefreshStart', window.plugin.portalcounts.resetCounts);
	window.addHook('mapDataRefreshEnd', window.plugin.portalcounts.scanPortals);
}

// PLUGIN END //////////////////////////////////////////////////////////
if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);