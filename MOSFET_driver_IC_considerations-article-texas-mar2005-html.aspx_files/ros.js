document.write('<a target="_blank" href="http://ad.doubleclick.net/click;h=v8/3bd3/0/0/%2a/s;44306;0-0;0;31098677;1987-500/500;0/0/0;u=-1;~sscs=%3f"><img src="http://s0.2mdn.net/viewad/817-grey.gif" border=0 alt="Click here to find out more!"></a><!-- Begin Interstitial Ad -->');

if(typeof(dartCallbackObjects) == "undefined")
  var dartCallbackObjects = new Array();
if(typeof(dartCreativeDisplayManagers) == "undefined")
  var dartCreativeDisplayManagers = new Object();
if(typeof(dartMotifAds) == "undefined")
  var dartMotifAds = new Array();
if(!self.dartLoadedGlobalTemplates_63_06) {
  self.dartLoadedGlobalTemplates_63_06 = {};
}
if(self.dartLoadedGlobalTemplates_63_06["@GT_TYPE@"]) {
  self.dartLoadedGlobalTemplates_63_06["@GT_TYPE@"].isLoaded = true;
}

function RichMediaCore_63_06() {
  this.CREATIVE_TYPE_EXPANDING = "ExpandingFlash";
  this.CREATIVE_TYPE_FLOATING = "FloatingFlash";
  this.CREATIVE_TYPE_INPAGE = "InpageFlash";
  this.CREATIVE_TYPE_MULTI_FLOATING = "MultiFloatingFlash";
  this.CREATIVE_TYPE_INPAGE_WITH_FLOATING = "InpageFlashFloatingFlash";
  this.CREATIVE_TYPE_FLOATING_WITH_REMINDER = "FloatingFlashReminderFlash";
  this.CREATIVE_TYPE_INPAGE_WITH_OVERLAY = "InpageFlashOverlayFlash";
  this.ASSET_TYPE_FLOATING = "Floating";
  this.ASSET_TYPE_INPAGE = "Inpage";
  this.ASSET_TYPE_EXPANDING = "Expanding";
  this.ASSET_TYPE_REMINDER = "Reminder";
  this.ASSET_TYPE_OVERLAY = "Overlay";
  this.STANDARD_EVENT_DISPLAY_TIMER = "DISPLAY_TIMER";
  this.STANDARD_EVENT_INTERACTION_TIMER = "INTERACTION_TIMER";
  this.STANDARD_EVENT_INTERACTIVE_IMPRESSION = "EVENT_USER_INTERACTION";
  this.STANDARD_EVENT_FULL_SCREEN_VIDEO_PLAYS = "";
  this.STANDARD_EVENT_FULL_SCREEN_VIDEO_COMPLETES = "";
  this.STANDARD_EVENT_FULL_SCREEN_AVERAGE_VIEW_TIME = "";
  this.STANDARD_EVENT_MANUAL_CLOSE = "EVENT_MANUAL_CLOSE";
  this.STANDARD_EVENT_BACKUP_IMAGE = "BACKUP_IMAGE_IMPRESSION";
  this.STANDARD_EVENT_EXPAND_TIMER = "EXPAND_TIMER";
  this.STANDARD_EVENT_VIDEO_PLAY = "EVENT_VIDEO_PLAY";
  this.STANDARD_EVENT_VIDEO_VIEW_TIMER = "EVENT_VIDEO_VIEW_TIMER";
  this.STANDARD_EVENT_VIDEO_VIEW_COMPLETE = "EVENT_VIDEO_COMPLETE";
  this.STANDARD_EVENT_VIDEO_INTERACTION = "EVENT_VIDEO_INTERACTION";
  this.STANDARD_EVENT_VIDEO_PAUSE = "EVENT_VIDEO_PAUSE";
  this.STANDARD_EVENT_VIDEO_MUTE = "EVENT_VIDEO_MUTE";
  this.STANDARD_EVENT_VIDEO_REPLAY = "EVENT_VIDEO_REPLAY";
  this.STANDARD_EVENT_VIDEO_MIDPOINT = "EVENT_VIDEO_MIDPOINT";
  this.STANDARD_EVENT_VIDEO_FULLSCREEN = "";
  this.STANDARD_EVENT_VIDEO_STOP = "EVENT_VIDEO_STOP";
  this.STANDARD_EVENT_VIDEO_UNMUTE = "EVENT_VIDEO_UNMUTE";
  this.STANDARD_EVENT_FULLSCREEN = "EVENT_FULLSCREEN";
  this.STANDARD_EVENT_DYNAMIC_CREATIVE_IMPRESSION = "DYNAMIC_CREATIVE_IMPRESSION";
  this.STANDARD_EVENT_HTML5_CREATIVE_IMPRESSION = "HTML5_CREATIVE_IMPRESSION";
};
RichMediaCore_63_06.prototype.isPageLoaded = false;
RichMediaCore_63_06.prototype.csiTimes = new Object();
RichMediaCore_63_06.prototype.setCsiEventsRecordedDuringBreakout = function(creative) {
  if(creative.gtStartLoadingTime != undefined)
    this.csiTimes["gb"] = creative.gtStartLoadingTime;
};
RichMediaCore_63_06.prototype.csiHasValidStart = function(creative) {
  return ((creative.csiAdRespTime >= 0) && (creative.csiAdRespTime < 1e5));
};
RichMediaCore_63_06.prototype.shouldReportCsi = function(creative) {
  
  return this.csiHasValidStart(creative) || (Math.floor(Math.random() * 1001) == 1);
};
RichMediaCore_63_06.prototype.shouldCsi = function(asset, creativeType) {
  switch (creativeType) {
    case this.CREATIVE_TYPE_INPAGE_WITH_FLOATING:
      return asset.assetType == this.ASSET_TYPE_INPAGE;
    case this.CREATIVE_TYPE_FLOATING_WITH_REMINDER:
      return asset.assetType == this.ASSET_TYPE_FLOATING;
    case this.CREATIVE_TYPE_INPAGE_WITH_OVERLAY:
      return asset.assetType == this.ASSET_TYPE_INPAGE;
    default: return true;
  }
};
RichMediaCore_63_06.prototype.trackCsiEvent = function(event) {
  this.csiTimes[event] = new Date().getTime();
};
RichMediaCore_63_06.prototype.getCsiServer = function() {
  return (self.location.protocol &&
      self.location.protocol.toString().toLowerCase() == 'https:') ?
        "https://static.doubleclick.net" : "http://static.2mdn.net"; 
};
RichMediaCore_63_06.prototype.reportCsi = function(creative) {
  if (!creative.previewMode && this.shouldReportCsi(creative)) {
    var url = this.getCsiServer() + "/csi/d?s=rmad&v=2&rt=";
    var beginTimes = "";
    var intervals = "";
    for(var event in this.csiTimes) {
      var loadingTime = (this.csiTimes[event] - creative.csiBaseline);
      url += event + "." + (loadingTime > 0 ? loadingTime : 0) + ",";
      if (event == "pb" || event == "gb" || event == "fb" ) {
        beginTimes += event + "." + (loadingTime > 0 ? loadingTime : 0) + ",";
      }
    }
    url = url.replace(/\,$/, '');
    var plcrLoadingTime = this.csiTimes["pe"] - this.csiTimes["pb"];
    var gtLoadingTime = this.csiTimes["ge"] - this.csiTimes["gb"];
    var flashLoadingTime = this.csiTimes["fe"] - this.csiTimes["fb"];
    intervals = "pl." + (plcrLoadingTime > 0 ? plcrLoadingTime : 0) + ","
        + "gl." + (gtLoadingTime > 0 ? gtLoadingTime : 0) + ","
        + "fl." + (flashLoadingTime > 0 ? flashLoadingTime : 0);
    url += "&irt=" + beginTimes.replace(/\,$/, '') + "&it=" + intervals;
    var regEx = new RegExp(/(.*\/\/)/);
    url += "&adi=asd_" + creative.adServer.replace(regEx, '')
          + ",csd_" + creative.mediaServer.replace(regEx, '')
          + ",gt_" + creative.globalTemplateJs.replace(/(.*\/)/, '');
    if (this.csiHasValidStart(creative)) {
      url += "&srt=" + creative.csiAdRespTime;
    }
    this.trackUrl(url, true, creative.previewMode);
  }
};
RichMediaCore_63_06.prototype._isValidStartTime = function(startTime) {
  return this._isValidNumber(startTime);
};
RichMediaCore_63_06.prototype._convertDuration = function(duration) {
  if(duration) {
    duration = duration.toString().toUpperCase();
    switch(duration) {
    case "AUTO": return "AUTO";
    case "NONE": return 0;
    default: return (this._isValidNumber(duration) ? eval(duration) : 0);
    }
  }
  return 0;
};
RichMediaCore_63_06.prototype.convertUnit = function(pos) {
  if(pos != "") {
    pos = pos.toLowerCase().replace(new RegExp("pct", "g"), "%");
    if(pos.indexOf("%") < 0 && pos.indexOf("px") < 0 && pos.indexOf("pxc") < 0)
      pos += "px";
  }
  return pos;
};
RichMediaCore_63_06.prototype._isValidNumber = function(num) {
  var floatNum = parseFloat(num);
  if(isNaN(floatNum) || floatNum < 0)
    return false;
  return (floatNum == num);
};
RichMediaCore_63_06.prototype.writeSurveyURL = function(creative) {
  if(!creative.previewMode && creative.surveyUrl.length > 0) {
    document.write('<scr' + 'ipt src="' + creative.surveyUrl + '" language="JavaScript"></scr' + 'ipt>');
  }
};
RichMediaCore_63_06.prototype.postPublisherData = function(creative, publisherURL) {
  if(!creative.previewMode && this.isInterstitialCreative(creative) && publisherURL != "") {
    var postImg = new Image();
    postImg.src = publisherURL;
  }
};
RichMediaCore_63_06.prototype.isInterstitialCreative = function(creative) {
  return (creative.type == this.CREATIVE_TYPE_FLOATING
          || creative.type == this.CREATIVE_TYPE_FLOATING_WITH_REMINDER
          || creative.type == this.CREATIVE_TYPE_MULTI_FLOATING);
};
RichMediaCore_63_06.prototype.isBrowserComplient = function(plugin) {
  
  return ((this.isAndroid() && this.getAndroidOSVersion() > 2.1) || ((this.isInternetExplorer() || this.isFirefox() || this.isSafari() || this.isChrome()) && (this.isWindows() || this.isMac()))) && plugin > 0 && this.getPluginInfo() >= plugin;
};
RichMediaCore_63_06.prototype.shouldDisplayFloatingAsset = function(duration) {
  return !this.isInternetExplorer() || this._convertDuration(duration) || this.getIEVersion() >= 5.5;
};
RichMediaCore_63_06.prototype.isWindows = function() {
  return (navigator.appVersion.indexOf("Windows") != -1);
};
RichMediaCore_63_06.prototype.isFirefox = function() {
  var appUserAgent = navigator.userAgent.toUpperCase();
  if(appUserAgent.indexOf("GECKO") != -1) {
    if(appUserAgent.indexOf("FIREFOX") != -1) {
      var version = parseFloat(appUserAgent.substr(appUserAgent.lastIndexOf("/") + 1));
      return (version >= 1);
    }
    else if(appUserAgent.indexOf("NETSCAPE") != -1) {
      version = parseFloat(appUserAgent.substr(appUserAgent.lastIndexOf("/") + 1));
      return (version >= 8);
    } else {
      return false;
    }
  }
  else {
    return false;
  }
};
RichMediaCore_63_06.prototype.isSafari = function() {
  var br = "Safari";
  var index = navigator.userAgent.indexOf(br);
  var appVendor = (navigator.vendor != undefined) ? navigator.vendor.toUpperCase() : "";
  return (navigator.appVersion.indexOf(br) != -1) 
      && parseFloat(navigator.userAgent.substring(index + br.length + 1)) >= 312.6
      && (appVendor.indexOf("APPLE") != -1 || (this.isAndroid() && appVendor.indexOf("GOOGLE") != -1));
};
RichMediaCore_63_06.prototype.isChrome = function() {
  var appUserAgent = navigator.userAgent.toUpperCase();
  var appVendor = (navigator.vendor != undefined) ? navigator.vendor.toUpperCase() : "";
  return (appUserAgent.indexOf("CHROME") != -1) && (appVendor.indexOf("GOOGLE") != -1);
};
RichMediaCore_63_06.prototype.isMac = function() {
  return (navigator.appVersion.indexOf("Mac") != -1);
};
RichMediaCore_63_06.prototype.isInternetExplorer = function() {
  return (navigator.appVersion.indexOf("MSIE") != -1 && navigator.userAgent.indexOf("Opera") < 0);
};
RichMediaCore_63_06.prototype.isIPhone = function() {
  return (navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1);
};
RichMediaCore_63_06.prototype.isIPad = function() {
  return (navigator.userAgent.toUpperCase().indexOf("IPAD") != -1);
};
RichMediaCore_63_06.prototype.isAndroid = function() {
  return (navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1);
};
RichMediaCore_63_06.prototype.getAndroidOSVersion = function() {
  var osIndex = navigator.userAgent.toUpperCase().indexOf("ANDROID");
  var indexStr = navigator.userAgent.substring(osIndex + "ANDROID".length + 1);
  return parseFloat(indexStr);
};
RichMediaCore_63_06.prototype.getAndroidBrowserVersion = function() {
  var versionIndex = navigator.userAgent.toUpperCase().indexOf("VERSION");
  var versionStr = navigator.userAgent.substring(versionIndex + "VERSION".length + 1);
  return parseFloat(versionStr);
};
RichMediaCore_63_06.prototype.getIEVersion = function() {
  var version = 0;
  if(this.isInternetExplorer()) {
    var key = "MSIE ";
    var index = navigator.appVersion.indexOf(key) + key.length;
    var subString = navigator.appVersion.substr(index);
    version = parseFloat(subString.substring(0, subString.indexOf(";")));
  }
  return version;
};
RichMediaCore_63_06.prototype.getFirefoxVersion = function() {
  var versionIndex = navigator.userAgent.toUpperCase().indexOf("FIREFOX") + "FIREFOX".length + 1;
  return parseFloat(navigator.userAgent.substring(versionIndex));
};
RichMediaCore_63_06.prototype.getSafariVersion = function() {
  var versionIndex = navigator.userAgent.toUpperCase().indexOf("VERSION") + "VERSION".length + 1;
  return parseFloat(navigator.userAgent.substring(versionIndex));
};
RichMediaCore_63_06.prototype.getChromeVersion = function() {
  var versionIndex = navigator.userAgent.toUpperCase().indexOf("CHROME") + "CHROME".length + 1;
  return parseFloat(navigator.userAgent.substring(versionIndex));
};
RichMediaCore_63_06.prototype.isHTML5SupportedBrowser = function() {
   return !!document.createElement('canvas').getContext;
};
RichMediaCore_63_06.prototype.getPluginInfo = function() {
  return (this.isInternetExplorer() && this.isWindows()) ? this._getIeWindowsFlashPluginVersion() : this._detectNonWindowsFlashPluginVersion();
};
RichMediaCore_63_06.prototype._detectNonWindowsFlashPluginVersion = function() {
  var flashVersion = 0;
  var key = "Shockwave Flash";
  if(navigator.plugins && (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins[key])) {
    var version2Offset = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
    var flashDescription = navigator.plugins[key + version2Offset].description;
    var keyIndex = flashDescription.indexOf(key) + (key.length+1);
    var dotIndex = flashDescription.indexOf(".");
    var majorVersion = flashDescription.substring(keyIndex, dotIndex);
    var descArray = flashDescription.split(" ");
    var minorVersion = (parseInt(descArray[descArray.length - 1].replace(new RegExp("[A-Za-z]", "g"), "")));
    if(isNaN(minorVersion)) {
      minorVersion = "0";
    }
    flashVersion = parseFloat(majorVersion + "." + minorVersion);
    if(flashVersion > 6.0 && flashVersion < 6.65) {
      flashVersion = 0 ;
    }
  }
  return flashVersion;
};
RichMediaCore_63_06.prototype._getIeWindowsFlashPluginVersion = function() {
  var versionStr = "";
  var flashVersion = 0;
  var versionArray = new Array();
  var tempArray = new Array();
  var lineFeed = "\r\n";
  var defSwfVersion = 0;
  var str = 'swfVersion = '+ defSwfVersion + lineFeed +
    'mtfIsOk = ' + false + lineFeed +
    'On Error Resume Next' + lineFeed +
    'set motifSwfObject = CreateObject(\"ShockwaveFlash.ShockwaveFlash\")' + lineFeed +
    'mtfIsOk = IsObject(motifSwfObject)' + lineFeed +
    'if mtfIsOk = true then' + lineFeed +
    'swfVersion = motifSwfObject.GetVariable(\"$version\")' + lineFeed +
    'end if' + lineFeed + '';
  window.execScript(str, "VBScript");
  if(mtfIsOk) {
    versionStr = swfVersion;
    tempArray = versionStr.split(" ");
    if(tempArray.length > 1) {
      versionArray = tempArray[1].split(",");
      var versionMajor = versionArray[0];
      var versionRevision = versionArray[2];
      if(versionMajor > 9 && versionArray.length > 3) {
        versionRevision = versionArray[versionArray.length - 1];
      }
      flashVersion = parseFloat(versionMajor + "." + versionRevision);
    }
  }
  return flashVersion;
};
RichMediaCore_63_06.prototype.trackBackupImageEvent = function(adserverUrl) {
  var activityString = "eid1=9;ecn1=1;etm1=0;";
  var timeStamp = new Date();
  var postImage = document.createElement("IMG");
  postImage.src = adserverUrl + "&timestamp=" + timeStamp.getTime() + ";" + activityString;
};
RichMediaCore_63_06.prototype.trackUrl = function(url, createElement, previewMode) {
  if (previewMode || url == "") {
    return;
  }
  if (createElement) {
    var postImage = document.createElement("IMG");
    postImage.style.visibility = "hidden";
    postImage.style.width = "0px";
    postImage.style.height = "0px";
    postImage.src = url;
    postImage.onload = function() {
      this.parentNode.removeChild(this);
    }
    document.body.appendChild(postImage);
  }
  else {
    document.write('<IMG SRC="'+ url + '" style="display:none" onload="this.parentNode.removeChild(this)" width="0px" height="0px" alt="">');
  }
};
RichMediaCore_63_06.prototype.logThirdPartyImpression = function(creative) {
  this.trackUrl(creative.thirdPartyImpUrl, false, creative.previewMode);
};
RichMediaCore_63_06.prototype.logThirdPartyBackupImageImpression = function(creative, createElement) {
  this.trackUrl(creative.thirdPartyBackupImpUrl, createElement, creative.previewMode);
};
RichMediaCore_63_06.prototype.logThirdPartyRMImpression = function(creative, createElement) {
  this.trackUrl(creative.thirdPartyFlashDisplayUrl, createElement, creative.previewMode);
};
RichMediaCore_63_06.prototype.isPartOfArrayPrototype = function(subject) {
  for(var prototypeItem in Array.prototype) {
    if(prototypeItem == subject) {
      return true;
    }
  }
  return false;
};
RichMediaCore_63_06.prototype.toObject = function(variableName) {
  try {
    if(document.layers) {
      return (document.layers[variableName]) ? eval(document.layers[variableName]) : null;
    }
    else if(document.all && !document.getElementById) {
      return (eval("window." + variableName)) ? eval("window." + variableName) : null;
    }
    else if(document.getElementById && document.body.style) {
      return (document.getElementById(variableName)) ? eval(document.getElementById(variableName)) : null;
    }
  } catch(e){}
  return null;
};
RichMediaCore_63_06.prototype.getCallbackObjectIndex = function(obj) {
  for(var i = 0; i < dartCallbackObjects.length; i++) {
    if(dartCallbackObjects[i] == obj)
      return i;
  }
  dartCallbackObjects[dartCallbackObjects.length] = obj;
  return dartCallbackObjects.length - 1;
};
RichMediaCore_63_06.prototype.registerPageLoadHandler = function(handler, obj) {
  var callback = this.generateGlobalCallback(handler, obj);
  if ((document.readyState && document.readyState == "complete")
          || (this.isFirefox() && this.isPageLoaded)) {
    callback();
    return;
  }
  if (this.isInternetExplorer()) {
    self.attachEvent("onload", callback);
  } else {
    self.addEventListener("load", callback, true);
  }
};
RichMediaCore_63_06.prototype.pageLoaded = function() {
  RichMediaCore_63_06.prototype.isPageLoaded = true;
};
RichMediaCore_63_06.prototype.registerPageUnLoadHandler = function(handler, obj) {
  var callback = this.generateGlobalCallback(handler, obj);
  if(this.isInternetExplorer() && this.isWindows()) {
    self.attachEvent("onunload", callback);
  }
  else if(this.isFirefox() || this.isSafari() || this.isChrome()) {
    self.addEventListener("unload", callback, true);
  }
};
RichMediaCore_63_06.prototype.registerTimeoutHandler = function(timeout, handler, obj) {
  window.setTimeout(this.generateGlobalCallback(handler, obj), timeout);
};
RichMediaCore_63_06.prototype.createFunction = function(name, ownerObject, args) {
  var fun = "dartCallbackObjects[" + this.getCallbackObjectIndex(ownerObject) + "]." + name + "(";
  for(var i = 0; i < args.length; i++) {
    fun += "dartCallbackObjects[" + this.getCallbackObjectIndex(args[i]) + "]";
    if(i != (args.length - 1))
      fun += ",";
  }
  fun += ")";
  return new Function(fun);
};
RichMediaCore_63_06.prototype.generateGlobalCallback = function(handler, obj) {
  if(obj) {
    var index = this.getCallbackObjectIndex(obj);
    handler = "if(dartCallbackObjects["+ index +"] != null) dartCallbackObjects["+ index +"]." + handler;
  }
  return new Function(handler);
};
RichMediaCore_63_06.prototype.registerEventHandler = function(event, element, handler, obj) {
  var callback = this.generateGlobalCallback(handler, obj);
  if(this.isInternetExplorer() && this.isWindows()) {
    self.attachEvent("on" + event, callback);
  }
  else if(this.isFirefox() || this.isSafari() || this.isChrome()) {
    element.addEventListener(event, callback, false);
  }
};
RichMediaCore_63_06.prototype.scheduleCallbackOnLoad = function(callback) {
  var onloadCheckInterval = 200;
  if(window.document.readyState.toLowerCase() == "complete")
    eval(callback);
  else
    this.registerTimeoutHandler(onloadCheckInterval, "scheduleCallbackOnLoad('" + callback + "')", this);
};
RichMediaCore_63_06.prototype.getStyle = function(obj) {
  if(window.getComputedStyle)
    return window.getComputedStyle(obj, "");
  else if(obj.currentStyle)
    return obj.currentStyle;
  else
    return obj.style;
};
RichMediaCore_63_06.prototype.getWindowDimension = function() {
  var dimension = new Object();
  if(document.documentElement && document.compatMode == "CSS1Compat") {
    dimension.width = document.documentElement.clientWidth;
    dimension.height = document.documentElement.clientHeight;
  } else if(document.body && (document.body.clientWidth || document.body.clientHeight) && !this.isSafari()) {
    dimension.width = document.body.clientWidth;
    dimension.height = document.body.clientHeight;
  } else if(typeof(window.innerWidth) == 'number') {
    dimension.width = window.innerWidth;
    dimension.height = window.innerHeight;
  }
  return dimension;
};
RichMediaCore_63_06.prototype.getScrollbarPosition = function() {
  var scrollPos = new Object();
  scrollPos.scrollTop = 0;
  scrollPos.scrollLeft = 0;
  if(typeof(window.pageYOffset) == 'number') {
    scrollPos.scrollTop = window.pageYOffset;
    scrollPos.scrollLeft = window.pageXOffset;
  } else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
    scrollPos.scrollTop = document.body.scrollTop;
    scrollPos.scrollLeft = document.body.scrollLeft;
  } else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
    scrollPos.scrollTop = document.documentElement.scrollTop;
    scrollPos.scrollLeft = document.documentElement.scrollLeft;
  }
  return scrollPos;
};
RichMediaCore_63_06.prototype.isInFriendlyIFrame = function() {
  return this.isWindowAccessible(self.parent);
};
RichMediaCore_63_06.prototype.isWindowAccessible = function(win) {
 try {
  win.document.body;
  return true;
 } catch(e) {
  return false;
 }
};
RichMediaCore_63_06.prototype.isInMsnFriendlyIFrame = function() {
  return (typeof(inDapIF) != "undefined" && inDapIF);
};
RichMediaCore_63_06.prototype.isInAolFriendlyIFrame = function() {
  return (typeof(inFIF) != "undefined" && inFIF);
};
RichMediaCore_63_06.prototype.isInMsnAjaxEnvironment = function() {
  return (typeof(inDapMgrIf) != "undefined" && inDapMgrIf);
};
RichMediaCore_63_06.prototype.isInYahooFriendlyIFrame = function() {
  return (typeof(isAJAX) != "undefined" && isAJAX);
};
RichMediaCore_63_06.prototype.isInClientPreviewIFrame = function() {
  if(typeof(StudioPreviewResponse) != "undefined") {
    return !(new StudioPreviewResponse()).isAdslotDetected;
  } else {
    return false;
  }
};
RichMediaCore_63_06.prototype.isInAdSenseIFrame = function() {
  return (typeof(IN_ADSENSE_IFRAME) != "undefined") && IN_ADSENSE_IFRAME;
};
RichMediaCore_63_06.prototype.isInWinLiveAPIPlatform = function() {
  try {
    return window["$WLXRmAd"] || (window.parent && window.parent["$WLXRmAd"]);
  } catch (e) {
    return false;
  }
};
RichMediaCore_63_06.prototype.isInYahooCrossDomainIframe = function() {
  try {
    return (window.Y && Y.SandBox) ? Y.SandBox.vendor || null : null;
  } catch (e) {
    return false;
  }
};
RichMediaCore_63_06.prototype.checkDimension = function(dim) {
  if (typeof dim == "number") {
    return dim + "px";
  } else {
    return dim + (dim != "" && dim != "auto" && dim.indexOf("px") < 0 ? "px" : "");
  }
};
RichMediaCore_63_06.prototype.setFlashVariable = function(asVersion, flashObject, variableName, value) {
  if (asVersion == 1) {
    flashObject.SetVariable("_root." + variableName, value);
  } else {
    if (!flashObject.changeInputVariable) {
      this.createExternalInterfaceCallbackAccessor(flashObject, "changeInputVariable");
    }
    flashObject.changeInputVariable(variableName, value);
  }
};
RichMediaCore_63_06.prototype.getFlashVariable = function(asVersion, flashObject, variableName) {
  if (asVersion == 1) {
    return flashObject.GetVariable("_root." + variableName);
  } else {
    if (!flashObject.getFlashVariable) {
      this.createExternalInterfaceCallbackAccessor(flashObject, "getFlashVariable");
    }
    return flashObject.getFlashVariable(variableName);
  }
};
RichMediaCore_63_06.prototype.createExternalInterfaceCallbackAccessor = function(flashObject, methodName) {
  if (flashObject[methodName]) return;
  flashObject[methodName] = function() {
    return this.CallFunction(
        '<invoke name="' + methodName + '" returntype="javascript">' +
            __flash__argumentsToXML(arguments, 0) + '</invoke>');
  };
};
RichMediaCore_63_06.prototype.getSalign = function(expandedWidth, expandedHeight, offsetTop, offsetLeft, offsetRight, offsetBottom) {
  var salign = "";
  if (offsetTop == 0 && offsetBottom != expandedHeight) {
    salign += "T";
  } else if (offsetTop != 0 && offsetBottom == expandedHeight) {
    salign += "B";
  }
  if (offsetLeft == 0 && offsetRight != expandedWidth) {
    salign += "L";
  } else if (offsetLeft != 0 && offsetRight == expandedWidth) {
    salign += "R";
  }
  if ((salign == "T" || salign == "B") && (offsetLeft != 0 || offsetRight != expandedWidth)) {
    return "";
  }
  if ((salign == "L" || salign == "R") && (offsetTop != 0 || offsetBottom != expandedHeight)) {
    return "";
  }
  return salign;
};
RichMediaCore_63_06.prototype.usesSalignForExpanding = function(salign, wmode) {
  return ( (this.isMac() && (this.isSafari() || this.isFirefox()))
           || (this.isWindows() && this.isFirefox() && wmode.toLowerCase() == "window") ) && salign.length > 0;
};
RichMediaCore_63_06.prototype.unclipFlashObject = function(asset, width, height, isHTML5) {
  this.clipFlashObject(asset, width, height, "auto", "auto", "auto", "auto", isHTML5);
};


RichMediaCore_63_06.prototype.clipFlashObject = function(asset, width, height, offsetTop, offsetRight, offsetBottom, offsetLeft, isHTML5) {
  width        = this.checkDimension(width);
  height       = this.checkDimension(height);
  offsetTop    = this.checkDimension(offsetTop);
  offsetRight  = this.checkDimension(offsetRight);
  offsetBottom = this.checkDimension(offsetBottom);
  offsetLeft   = this.checkDimension(offsetLeft);
  var isSafariMac = this.isMac() && this.isSafari();
  if (isHTML5 || (!(isSafariMac && (this.getSafariVersion() > 5
      || asset.pushContents)) && this.usesSalignForExpanding(
          asset.salign, asset.wmode))) {
    var assetId = (isHTML5 ? "IFRAME_" : "FLASH_") + asset.variableName;
    var assetElement = this.toObject(assetId);
    if (assetElement) {
      assetElement.style.width = width;
      assetElement.style.height = height;
      assetElement.width = width;
      assetElement.height = height;
      assetElement.style.marginLeft = offsetLeft == "auto" ? "0px" : offsetLeft;
      assetElement.style.marginTop = offsetTop == "auto" ? "0px" : offsetTop;
    }
  }
  var expDiv = this.toObject("DIV_" + asset.variableName);
  if (expDiv) {
    
    if (isSafariMac) {
      expDiv.style.height = height;
      expDiv.style.width = width;
    }
    expDiv.style.clip = "rect(" + offsetTop + " " + offsetRight + " " + offsetBottom + " " + offsetLeft + ")";
  }
  
  if (asset.pushContents && this.getIEVersion() >= 8) {
    this.redrawIE8ForPushdown();
  }
};
RichMediaCore_63_06.prototype.redrawIE8ForPushdown = function() {
  var bodyStyle = document.body.style.display;
  document.body.style.display = 'block';
  document.body.style.display = bodyStyle;
};
RichMediaCore_63_06.prototype.getSitePageUrl = function(creative) {
  if (creative.type == this.CREATIVE_TYPE_INPAGE_WITH_OVERLAY) {
    return "";
  }
  if (creative.previewMode) {
    return creative.livePreviewSiteUrl;
  } else {
    if (creative.type == this.CREATIVE_TYPE_INPAGE && creative.servingMethod == "i") {
      return self.document.referrer;
    } else {
      return self.location.href;
    }
  }
};
RichMediaCore_63_06.prototype.getElementPosition = function(obj) {
  var adPosition = new Object();
  if(obj.getBoundingClientRect) {
    adPosition.left = obj.getBoundingClientRect().left;
    adPosition.top = obj.getBoundingClientRect().top;
  } else {
    adPosition.left = 0;
    adPosition.top = 0;
    if (obj.offsetParent) {
      do {
        adPosition.left += obj.offsetLeft;
        adPosition.top += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }
    var windowScroll = this.getScrollbarPosition();
    adPosition.top -= windowScroll.scrollTop;
    adPosition.left -= windowScroll.scrollLeft;
  }
  return adPosition;
};
RichMediaCore_63_06.prototype.isFlashObjectReady = function(asVersion, flashObject, assetName) {
  if(asVersion == 1) {
    return (flashObject && (typeof(flashObject.PercentLoaded) != "undefined") && flashObject.PercentLoaded() > 0
        && this.getAsset(assetName).conduitInitialized);
  } else {
    return flashObject != null && (typeof(flashObject.changeInputVariable) != "undefined");
  }
};

RichMediaCore_63_06.prototype.getSiteHost = function(pageUrl) {
  var siteHost = "";
  if((pageUrl.length >= 7) && (pageUrl.substr(0, 7) == "http://"))
    siteHost = pageUrl.substr(7);
  else if((pageUrl.length >= 8) && (pageUrl.substr(0, 8) == "https://"))
  siteHost = pageUrl.substr(8);
  else
    siteHost = pageUrl;
  var index = siteHost.indexOf("/");
  if(index > 0)
    siteHost = siteHost.substr(0, index);
  return siteHost;
};
RichMediaCore_63_06.prototype.getSiteProtocol = function(pageUrl) {
  var siteProtocol = "";
  if((pageUrl.length >= 5) && (pageUrl.substr(0, 5) == "http:"))
    siteProtocol = "http:";
  else if((pageUrl.length >= 6) && (pageUrl.substr(0, 6) == "https:"))
  siteProtocol = "https:";
  else
    siteProtocol = "http:";
  return siteProtocol;
};

document.write('\n');

function IFrameBuster_63_06() {
};
IFrameBuster_63_06.prototype = new RichMediaCore_63_06;
IFrameBuster_63_06.prototype.displayImageOnFailureBreakout = function(variableName, target, hRef, imgSrc, width, height, altText, creative) {
  var expandingUtil = new DARTExpandingUtil_63_06();
  expandingUtil.displayImage(variableName, target, hRef, imgSrc, width, height, altText, creative);
}
IFrameBuster_63_06.prototype.writeIFrame = function(creative, plcrJs, globalTemplateJs, args) {
  if(this.isInFriendlyIFrame()) {
    this.processFriendlyIFrameBreakout(creative, plcrJs, globalTemplateJs);
  } else {
    this.processBreakoutUsingPublisherFile(creative, plcrJs, globalTemplateJs, args);
  }
};
IFrameBuster_63_06.prototype.processFriendlyIFrameBreakout = function(creative, plcrJs, globalTemplateJs) {
  creative.MsnDapIF = this.isInMsnAjaxEnvironment();
  var iframe = this.getContainerIframe(self);
  var targetWindow = self.parent;
  
  if (targetWindow != top && this.isWindowAccessible(targetWindow.parent)) {
    var parentIframe = this.getContainerIframe(targetWindow);
    if (parentIframe.width == iframe.width && parentIframe.height == iframe.height) {
      targetWindow = targetWindow.parent;
      iframe = parentIframe;
    }
  }
  if (!iframe.MotifIFrameIDArray) {
    iframe.MotifIFrameIDArray = new Array();
  }
  iframe.MotifIFrameIDArray[iframe.MotifIFrameIDArray.length] = creative.creativeIdentifier;
  iframe.originalWidth = iframe.width;
  iframe.originalHeight = iframe.height;
  this.targetWindow = targetWindow;
  if(typeof(targetWindow.richMediaIframeBreakoutCreatives) == "undefined") {
    targetWindow.richMediaIframeBreakoutCreatives = new Array();
  }
  if(creative.isInterstitial && this.isInterstitialPlaying(targetWindow)) {
    return;
  }
  
  if(creative.isInterstitial) {
    this.setInterstitialPlaying(targetWindow);
  }
  creative.plcrScript = plcrJs;
  creative.sourceIframe = iframe;
  targetWindow.richMediaIframeBreakoutCreatives[targetWindow.richMediaIframeBreakoutCreatives.length] = creative;
  var shouldRemove = false;
  var oldCreativeId = 0;
  
  if(this.isInternetExplorer()) {
    if(typeof(targetWindow.oldCreatives) == "undefined") {
      targetWindow.oldCreatives = {};
    } else {
      if(typeof(targetWindow.oldCreatives[iframe.id]) != "undefined") {
        shouldRemove = true;
        oldCreativeId = targetWindow.oldCreatives[iframe.id].id;
      }
    }
    targetWindow.oldCreatives[iframe.id] = {
      id: creative.creativeIdentifier
    };
  }
  if(creative.customScriptFileUrl != "") {
    this.loadScriptFile(targetWindow, creative, iframe, creative.customScriptFileUrl, false);
  }
  if(this.checkAndLoadGlobalTemplate(targetWindow, creative, iframe, globalTemplateJs)) {
    if(shouldRemove) {
      (new targetWindow.IFrameCreativeRenderer_63_06()).removeCreative(oldCreativeId, false);
    }
    (new targetWindow.IFrameCreativeRenderer_63_06()).loadPlCrJs(plcrJs, iframe, targetWindow);
  }
  var unloadCallback = "removeCreative('" + creative.globalTemplateVersion + "','" + creative.creativeIdentifier + "', false)";
  this.registerPageUnLoadHandler(unloadCallback, this);
};
IFrameBuster_63_06.prototype.removeCreative = function(gtVersion, creativeIdentifier, deleteOnlyJSObjects) {
  var iframeObj = this.getDARTIFrameObject();
    iframeObj.removeCreative(creativeIdentifier, deleteOnlyJSObjects);
};
IFrameBuster_63_06.prototype.getDARTIFrameObject = function() {
  return eval("(new this.targetWindow.IFrameCreativeRenderer_63_06())");
};
IFrameBuster_63_06.prototype.processBreakoutUsingPublisherFile = function(creative, plcrJs, globalTemplateJs, args) {
  var docReferrer = self.document.referrer;
  if(docReferrer == "") {
    try {
      docReferrer = self.parent.location.href;
      if(docReferrer == "")
        return;
    }
    catch(e) {
      return;
    }
  }
  if(creative.previewMode)
    docReferrer = self.location.href;
  var filePath = "";
  if(filePath == "")
    filePath = "/doubleclick/DARTIframe.html";
  else
    filePath += "DARTIframe.html";
  var mediaServer = "http://s0.2mdn.net/879366";
  var siteProtocol = this.getSiteProtocol(docReferrer);
  var siteHost = this.getSiteHost(docReferrer);
  siteHost = siteProtocol + "//" + siteHost + filePath;
  var adParameters = escape(this.serialize(creative));
  var getSizeLimit = 1800;
  var staticParams = "&gtVersion=" + escape(creative.globalTemplateVersion)
    + "&mediaserver=" + escape(mediaServer)
    + "&cid=" + escape(creative.creativeIdentifier) + "&plcrjs=" + escape(plcrJs)
    + "&globalTemplateJs=" + escape(globalTemplateJs)
    + "&customScriptFile=" + escape(creative.customScriptFileUrl);
  var masterParamLength = getSizeLimit - staticParams.length - siteHost.length - "?adParams=".length;
  var needSlaves = false;
  if(masterParamLength >= adParameters.length)
    masterParamLength = adParameters.length;
  else
    needSlaves = true;
  var slaveParams = "";
  var slaveParamLength = 0;
  var numberOfSlaves = 0;
  if(needSlaves) {
    slaveParams = "&gtVersion=" + escape(creative.globalTemplateVersion)
      + "&mediaserver=" + escape(mediaServer) + "&cid=" + escape(creative.creativeIdentifier);
    slaveParamLength = getSizeLimit - siteHost.length - "?adParams=".length - slaveParams.length - "&index=".length;
    numberOfSlaves = Math.ceil((adParameters.length - masterParamLength)/slaveParamLength);
  }
  masterParamLength = this.adjustParamLength(adParameters, masterParamLength);
  var masterParams = adParameters.substring(0, masterParamLength);
  var iframeLocation = siteHost + "?adParams=" + masterParams + staticParams + "&needSlaves=" + needSlaves + "&numberOfSlaves=" + numberOfSlaves;
  var shouldCallback = args != undefined;
  
  
  this.createIframe(iframeLocation, creative.creativeIdentifier, shouldCallback, args);
  if(needSlaves) {
    adParameters = adParameters.substring(masterParamLength);
    var paramLength = 0;
    var slaveIndex = 0;
    while(adParameters.length > 0) {
      paramLength = (slaveParamLength >= adParameters.length) ?
                    adParameters.length : this.adjustParamLength(adParameters, slaveParamLength);
      this.writeSlaveIFrame(siteHost, adParameters.substring(0, paramLength), slaveParams, slaveIndex++, creative.creativeIdentifier);
      adParameters = adParameters.substring(paramLength);
    }
  }
};
IFrameBuster_63_06.prototype.adjustParamLength = function (params, paramLength) {
  for (var i = 1; i < 3; i++) {
    if(params.charAt(paramLength - i) == "%")
      return paramLength - i;
    }
  return paramLength;
};
IFrameBuster_63_06.prototype.writeSlaveIFrame = function(siteHost, adParams, slaveParams, index, cid) {
  var iframeLocation = siteHost + "?adParams=" + adParams + slaveParams + "&index=" + index;
  
  if(this.isFirefox() || this.isSafari() || this.isChrome()) {
    this.createIframe(iframeLocation, cid + "_" + index);
  }
  else {
    document.write("<iframe src='" + iframeLocation + "' name='" + cid + "_" + index + "' width='0px' height='0px' frameborder='0' scrolling='no'></iframe>");
  }
};
IFrameBuster_63_06.prototype.createIframe = function(iframeLocation, iframeName, shouldCallback, args) {
  var  iframe = document.createElement("IFRAME");
  iframe.setAttribute("name", iframeName);
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.frameBorder = "0";
  iframe.scrolling = "no";
  if(document.body) {
    document.body.appendChild(iframe);
  } else {
    document.documentElement.appendChild(iframe);
  }
  iframe.setAttribute("src", iframeLocation);
  if(shouldCallback) {
    var callback = this.createFunction("displayImageOnFailureBreakout", this, args);
    if(this.isFirefox() || this.isSafari() || this.isChrome()) {
      iframe.addEventListener("load", callback, true); 
    }
    else if(this.isInternetExplorer())
      iframe.attachEvent("onload", callback);
  }
};
IFrameBuster_63_06.prototype.isInIFrame = function() {
  var pageIFrameRequest = "";
  var iframeReq = "";
  if(this.isInAdSenseIFrame() || this.isInYahooCrossDomainIframe())
    return false;
  if(this.isInClientPreviewIFrame())
    return true;
  if(typeof(iframeRequest) != "undefined")
    pageIFrameRequest = iframeRequest;
  if(iframeReq != "")
    pageIFrameRequest = iframeReq;
  if(self == top)
    return false;
  else if(String(pageIFrameRequest).toLowerCase() == "false")
    return false;
  else if(self.location.href.toLowerCase().indexOf("doubleclick.net/adi") > -1)
    return true;
  else if(("j") == "i")
    return true;
  else
    return this.checkWithTryCatch();
};
IFrameBuster_63_06.prototype.checkWithTryCatch = function() {
  try {
    if(self.parent.document) {
      if(self.parent.document.getElementsByTagName("frame").length == 0) {
        var frames = self.parent.frames;
        for(var i = 0; i < frames.length; i++) {
          if(frames[i] == self)
            return true;
        }
      }
    }
    else if ((this.isSafari() || this.isChrome()) && self.parent.document == undefined) {
      return true;
    }
    return false;
  }
  catch(e) {
    return true;
  }
};
IFrameBuster_63_06.prototype.isBreakoutSuccessful = function() {
  try {
    return (self.frames[0].frames.length > 0 && typeof(self.frames[0].frames['DARTMotifIFrame']) != "undefined");
  }
  catch(e) {
    return true;
  }
};
IFrameBuster_63_06.prototype.getContainerIframe = function(hostWindow) {
  if(this.isFirefox() || this.isSafari() || this.isChrome()) {
    var iframeElements = hostWindow.parent.document.getElementsByTagName("iframe");
    for(var k = 0; k < iframeElements.length; k++) {
      var iframeEle = iframeElements[k];
      if(iframeEle.contentWindow == hostWindow) {
        return iframeEle;
      }
    }
    return null;
  }
  var targetWindow = hostWindow.parent;
  var frames = targetWindow.frames;
  for(var i = 0; i < frames.length; i++) {
    if(frames[i] == hostWindow) {
      return targetWindow.document.getElementsByTagName("iframe")[i];
    }
  }
  return null;
};
IFrameBuster_63_06.prototype.isInterstitialPlaying = function(targetWindow) {
  return (typeof(targetWindow.DoNotDisplayIA) == "number");
};
IFrameBuster_63_06.prototype.setInterstitialPlaying = function(targetWindow) {
  this.createJSVariable(targetWindow, "DoNotDisplayIA", 1);
};
IFrameBuster_63_06.prototype.createJSVariable = function(targetWindow, variableName, variableValue) {
  targetWindow[variableName] = variableValue;
};
IFrameBuster_63_06.prototype.serialize = function(obj) {
  var str = "";
  for(var key in obj) {
    str += escape(key) + "=";
    str += escape(obj[key]) + "&";
  }
  return str.substr(0, str.length - 1);
};
IFrameBuster_63_06.prototype.checkAndLoadGlobalTemplate = function(targetWindow, creative, iframe, jsFile) {
    var key = "";
    if(creative.type == this.CREATIVE_TYPE_EXPANDING) {
        key = "expandingIframe";
    } else if(creative.type == this.CREATIVE_TYPE_FLOATING
        || creative.type == this.CREATIVE_TYPE_MULTI_FLOATING) {
        key = "floatingIframe";
    } else if(creative.type == this.CREATIVE_TYPE_INPAGE_WITH_FLOATING) {
        key = "inpageFloatingIframe";
    }
    var shouldLoad = false;
    if(!targetWindow.dartLoadedGlobalTemplates_63_06) {
      targetWindow.dartLoadedGlobalTemplates_63_06 = {};
      shouldLoad = true;
    }
    var map = targetWindow.dartLoadedGlobalTemplates_63_06;
    if(!map[key]) {
      map[key] = {
        isLoading: false,
        isLoaded: false
      };
      shouldLoad = true;
    }
    if(shouldLoad) {
      this.loadScriptFile(targetWindow, creative, iframe, jsFile, true);
      map[key].isLoading = true;
      return false;
    } else {
      return map[key].isLoaded;
  }
};
IFrameBuster_63_06.prototype.loadScriptFile = function(targetWindow, creative, iframe, jsFile, isGlobalTemplate) {
    var script = targetWindow.document.createElement("SCRIPT");
    if(isGlobalTemplate) {
      creative.gtStartLoadingTime = new Date().getTime();
    }
    script.src = jsFile;
    var elements = targetWindow.document.getElementsByTagName("head");
    if(this.isInternetExplorer() && elements.length > 0) {
      elements[0].appendChild(script);
    } else if(iframe.parentNode.parentNode) {
      iframe.parentNode.parentNode.appendChild(script);
    } else {
      iframe.parentNode.insertBefore(script, iframe);
    }
};

document.write('\n \n              ');

              function PlcrInfo(filename, uid) {
                this.filename = filename;
                this.uniqueId = uid;
              }
              var richMediaPlcrMap = {};
              richMediaPlcrMap["0"] = new PlcrInfo("plcr_45151150_1321369814495.js", "1321369811176");
              var richMediaPlcrMap_1321369811176 = richMediaPlcrMap;
              var plcrInfo_1321369811176 = richMediaPlcrMap_1321369811176["249052498"];
              if (!plcrInfo_1321369811176) {
                plcrInfo_1321369811176 = richMediaPlcrMap_1321369811176["0"];
              }
              function RichMediaCreative_1321369811176(type) {
                var core = new RichMediaCore_63_06();
                this.creativeIdentifier = "GlobalTemplate_" + "1321369811176" + (new Date()).getTime();
                this.mtfNoFlush = "".toLowerCase();
                this.globalTemplateVersion = "63_06";
                this.isInterstitial = true;
                this.mediaServer = "http://s0.2mdn.net";
                this.adServer = "http://ad.doubleclick.net";
                this.adserverUrl = "http://ad.doubleclick.net/activity;src=1608326;met=1;v=1;pid=31098677;aid=249052498;ko=1;cid=45133362;rid=45151150;rv=1;";
                this.stringPostingUrl = "http://ad.doubleclick.net/activity;src=1608326;stragg=1;v=1;pid=31098677;aid=249052498;ko=1;cid=45133362;rid=45151150;rv=1;rn=4881399;";
                this.swfParams = 'src=1608326&rv=1&rid=45151150';
                this.renderingId = "45151150";
                this.previewMode = (("%PreviewMode" == "true") ? true : false);
                this.debugEventsMode = (("%DebugEventsMode" == "true") ? true : false);
                this.pubHideObjects = "";
                this.pubHideApplets = "";
                this.mtfInline = ("".toLowerCase() == "true");
                this.pubTop  = core.convertUnit("");
                this.pubLeft = core.convertUnit("");
                this.pubTopFloat = "";
                this.pubRightFloat = ""
                this.pubBottomFloat = ""
                this.pubLeftFloat = ""
                this.pubDuration = "";
                this.pubWMode = "";
                this.pubTopDuration = "";
                this.pubTopWMode = "";
                this.pubRightDuration = "";
                this.pubRightWMode = "";
                this.pubBottomDuration = "";
                this.pubBottomWMode = "";
                this.pubLeftDuration = "";
                this.pubLeftWMode = "";
                this.isRelativeBody = ("" == "relative") ? true : false;
                this.debugJSMode = ("" == "true") ? true : false;
                this.adjustOverflow = ("" == "true");
                this.asContext = (('' != "") ? ('&keywords=' + '') : "")
                                  + (('' != "") ? ('&latitude=' + '') : "")
                                  + (('' != "") ? ('&longitude=' + '') : "");
                this.clickThroughUrl = "http://ad.doubleclick.net/click%3Bh%3Dv8/3bd3/2/0/%2a/z%3B249052498%3B0-0%3B1%3B31098677%3B255-0/0%3B45133362/45151150/1%3Bu%3D-1%3B%7Esscs%3D%3f";
                this.clickN = "";
                this.type = type;
                this.uniqueId = plcrInfo_1321369811176.uniqueId;
                this.thirdPartyImpUrl = "";
                this.thirdPartyFlashDisplayUrl = "";
                this.thirdPartyBackupImpUrl = "";
                this.surveyUrl = "";
                this.googleContextDiscoveryUrl = "http://pagead2.googlesyndication.com/pagead/ads?client=dclk-3pas-query&output=xml&geo=true";
                this.livePreviewSiteUrl = "%LivePreviewSiteUrl";
                this.customScriptFileUrl = "";
                this.servingMethod = "j";
                this.mode = "Flash";
                this.isHTML5Creative = this.mode.toLowerCase().indexOf("html5") != -1;
                if(this.previewMode && this.googleContextDiscoveryUrl.indexOf("adtest=on") == -1) {
                  this.googleContextDiscoveryUrl += "&adtest=on";
                }
                this.isHTML5PreviewMode = "%HTML5Preview" == "true";
                this.forceHTML5Creative = ("" == "true") && core.isHTML5SupportedBrowser();
                this.impressionUrl = "http://ad.doubleclick.net/imp;v7;j;249052498;0-0;1;31098677;0/0;45133362/45151150/1;;~okv=;pos=rightcornerpeel;sec=ros;tile=3;dcopt=ist;sz=500x500;u=-1;~cs=x%3f";
                this.macro_j = "0-239762423";
                this.macro_eenv = "j";
                this.macro_g = "ct=BD&st=&ac=2&zp=&bw=4&dma=1&city=1037";
                this.macro_s = "hbp.ep";
                this.macro_eaid = "249052498";
                this.macro_n = "4881399";
                this.macro_m = "0";
                this.macro_erid = "45151150";
                this.macro_ebuy = "6001753";
                this.macro_ecid = "45133362";
                this.macro_erv = "1";
                this.macro_epid = "31098677";
                this.macro_eadv = "1608326";
                this.macro_esid = "433243";
                this.macro_ekid = "1";
              }
              eval("RichMediaCreative_"+plcrInfo_1321369811176.uniqueId+" = RichMediaCreative_1321369811176;");
              
document.write('\n          \n          ');

          var shouldDisplay = (typeof(DoNotDisplayIA) == "number") ? false : true;
          var DoNotDisplayIA = 1;
          function generateFloatingFlashCode() {
            var core = new RichMediaCore_63_06();
            var creative = new RichMediaCreative_1321369811176(core.CREATIVE_TYPE_FLOATING);
            RichMediaCreative_1321369811176.prototype.csiBaseline = new Date().getTime();
            RichMediaCreative_1321369811176.prototype.csiAdRespTime =
                isNaN("") ? -1 : RichMediaCreative_1321369811176.prototype.csiBaseline - parseFloat("");
            if(shouldDisplay && (core.isBrowserComplient(8) ||
                (creative.isHTML5Creative && core.isHTML5SupportedBrowser()))) {
              RichMediaCreative_1321369811176.prototype.shouldDisplayFlashAsset = !creative.forceHTML5Creative
                  && core.isBrowserComplient(8);
              var plcrJs = "http://s0.2mdn.net/1608326/" + plcrInfo_1321369811176.filename;
              if(core.shouldDisplayFloatingAsset("none")) {
                var iframeBuster = new IFrameBuster_63_06();
                if(iframeBuster.isInIFrame()) {
                  var iframeJs = "http://s0.2mdn.net/879366/floatingIframeGlobalTemplate_v2_63_06"
                      + (creative.debugJSMode ? "_origin" : "" ) + ".js";
                  RichMediaCreative_1321369811176.prototype.globalTemplateJs = iframeJs;
                  iframeBuster.writeIFrame(creative, plcrJs, iframeJs);
                }
                else {
                  if(creative.customScriptFileUrl != "") {
                    document.write('<scr' + 'ipt src="' + creative.customScriptFileUrl + '" language="JavaScript"></scr' + 'ipt>');
                  }
                  RichMediaCreative_1321369811176.prototype.globalTemplateJs = "http://s0.2mdn.net/879366/floatingGlobalTemplate_v2_63_06"
                      + (creative.debugJSMode ? "_origin" : "" ) + ".js";
                  RichMediaCore_63_06.prototype.trackCsiEvent("pb");  
                  document.write('<scr' + 'ipt src="' + plcrJs + '" language="JavaScript"></scr' + 'ipt>');
                }
                core.logThirdPartyImpression(creative);
                core.postPublisherData(creative, "");
                core.writeSurveyURL(creative);
                if(core.isInMsnAjaxEnvironment()) {
                  document.close();
                }
              }
            }
          }
          generateFloatingFlashCode();
          
document.write('');
