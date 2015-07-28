/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function($){var types=["DOMMouseScroll","mousewheel"];if($.event.fixHooks)for(var i=types.length;i;)$.event.fixHooks[types[--i]]=$.event.mouseHooks;$.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var i=types.length;i;)this.addEventListener(types[--i],handler,false);else this.onmousewheel=handler},teardown:function(){if(this.removeEventListener)for(var i=types.length;i;)this.removeEventListener(types[--i],handler,false);else this.onmousewheel=null}};$.fn.extend({mousewheel:function(fn){return fn?
this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta)delta=orgEvent.wheelDelta/120;if(orgEvent.detail)delta=-orgEvent.detail/3;deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=
-1*delta}if(orgEvent.wheelDeltaY!==undefined)deltaY=orgEvent.wheelDeltaY/120;if(orgEvent.wheelDeltaX!==undefined)deltaX=-1*orgEvent.wheelDeltaX/120;args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args)}})(jQuery);

 /*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
/**
* SwfStore - a JavaScript library for cross-domain flash cookies
*
* http://github.com/nfriedly/Javascript-Flash-Cookies
*
* Copyright (c) 2010 by Nathan Friedly - Http://nfriedly.com
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/
 (function(){function d(a){if(typeof a==="function")throw"SwfStore Error: Functions cannot be used as keys or values.";}var g=0,i=/[^a-z0-9_]/ig;window.SwfStore=function(a){function e(b){var c=document.createElement("div");document.body.appendChild(c);c.id="SwfStore_"+a.namespace+"_"+g++;if(!b)c.style.position="absolute",c.style.top="-2000px",c.style.left="-2000px";return c}var a=a||{},f={swf_url:"storage.swf",namespace:"swfstore",debug:!1,timeout:10,onready:null,onerror:null},b;for(b in f)f.hasOwnProperty(b)&&
(a.hasOwnProperty(b)||(a[b]=f[b]));a.namespace=a.namespace.replace(i,"_");if(window.SwfStore[a.namespace])throw"There is already an instance of SwfStore using the '"+a.namespace+"' namespace. Use that instance or specify an alternate namespace in the config.";this.config=a;if(a.debug){if(typeof console==="undefined"){var d=e(!0);window.console={log:function(a){var c=e(!0);c.innerHTML=a;d.appendChild(c)}}}this.log=function(b,c,d){c=c==="swfStore"?"swf":c;if(typeof console[b]!=="undefined")console[b]("SwfStore - "+
a.namespace+" ("+c+"): "+d);else console.log("SwfStore - "+a.namespace+": "+b+" ("+c+"): "+d)}}else this.log=function(){};this.log("info","js","Initializing...");SwfStore[a.namespace]=this;f=e(a.debug);b="SwfStore_"+a.namespace+"_"+g++;var h="logfn=SwfStore."+a.namespace+".log&amp;onload=SwfStore."+a.namespace+".onload&amp;onerror=SwfStore."+a.namespace+".onerror&amp;LSOName="+a.namespace;f.innerHTML='<object height="100" width="500" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+
b+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">\t<param value="'+a.swf_url+'" name="movie">\t<param value="'+h+'" name="FlashVars">\t<param value="always" name="allowScriptAccess">\t<embed height="375" align="middle" width="500" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+h+'" type="application/x-shockwave-flash" allowscriptaccess="always" quality="high" loop="false" play="true" name="'+b+'" bgcolor="#ffffff" src="'+a.swf_url+'"></object>';this.swf=document[b]||
window[b];this._timeout=setTimeout(function(){SwfStore[a.namespace].log("error","js","Timeout reached, assuming "+a.swf_url+" failed to load and firing the onerror callback.");if(a.onerror)a.onerror()},a.timeout*1E3)};SwfStore.prototype={version:"1.5",ready:!1,set:function(a,e){this._checkReady();d(a);d(e);this.swf.set(a,e)},get:function(a){this._checkReady();d(a);return this.swf.get(a)},getAll:function(){this._checkReady();var a=this.swf.getAll();a.__flashBugFix&&delete a.__flashBugFix;return a},
clear:function(a){this._checkReady();d(a);this.swf.clear(a)},_checkReady:function(){if(!this.ready)throw"SwfStore is not yet finished initializing. Pass a config.onready callback or wait until this.ready is true before trying to use a SwfStore instance.";},onload:function(){var a=this;setTimeout(function(){clearTimeout(a._timeout);a.ready=!0;a.set("__flashBugFix","1");if(a.config.onready)a.config.onready()},0)},onerror:function(){clearTimeout(this._timeout);if(this.config.onerror)this.config.onerror()}}})();