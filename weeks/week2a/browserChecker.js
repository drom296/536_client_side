/*
	Don't you DARE use this as a general checker - this is for specific checking ONLY
*/

var isPc = (navigator.userAgent.indexOf("Windows") != -1); 
var isMac = (navigator.userAgent.indexOf("Mac") != -1); 
var isNS = (navigator.appName == "Netscape"); 
var isSafari = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Safari") != -1));
var isNSMac = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Mac") != -1)); 
var isNSPc = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Windows") != -1)); 
var isNS4 = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Gecko") == -1)); 
var isNS4Mac = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Mac") != -1) && (navigator.userAgent.indexOf("Gecko") == -1)); 
var isNS4Pc = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Win") != -1) && (navigator.userAgent.indexOf("Gecko") == -1)); 
var isNS6 = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Gecko") != -1)); 
var isNS6Mac = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Mac") != -1) && (navigator.userAgent.indexOf("Gecko") != -1)); 
var isNS6Pc = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Windows") != -1) && (navigator.userAgent.indexOf("Gecko") != -1)); 
var isIE = ((navigator.userAgent.indexOf("MSIE") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIEMac = ((navigator.userAgent.indexOf("MSIE") != -1) && (navigator.userAgent.indexOf("Mac") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIEPc = ((navigator.userAgent.indexOf("MSIE") != -1) && (navigator.userAgent.indexOf("Windows") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIE5 = ((navigator.userAgent.indexOf("MSIE 5.") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIE5Mac = ((navigator.userAgent.indexOf("MSIE 5.") != -1) && (navigator.userAgent.indexOf("Mac") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIE5Pc = ((navigator.userAgent.indexOf("MSIE 5.0") != -1) && (navigator.userAgent.indexOf("Windows") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIE55Pc = ((navigator.userAgent.indexOf("MSIE 5.5") != -1) && (navigator.userAgent.indexOf("Windows") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIE6 = ((navigator.userAgent.indexOf("MSIE 6.") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIE6Mac = ((navigator.userAgent.indexOf("MSIE 6.") != -1) && (navigator.userAgent.indexOf("Mac") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIE6Pc = ((navigator.userAgent.indexOf("MSIE 6.") != -1) && (navigator.userAgent.indexOf("Windows") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIE6Pc2K = ((navigator.userAgent.indexOf("MSIE 6.") != -1) && (navigator.userAgent.indexOf("Windows NT 5.0") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isIE6PcXP = ((navigator.userAgent.indexOf("MSIE 6.") != -1) && (navigator.userAgent.indexOf("Windows NT 5.1") != -1) && (navigator.userAgent.indexOf("Opera") == -1)); 
var isOpera = (navigator.userAgent.indexOf("Opera") != -1); 
var isOpera5 = (navigator.userAgent.indexOf("Opera 5.") != -1); 
var isOpera5Mac = ((navigator.userAgent.indexOf("Opera 5.") != -1) && (navigator.userAgent.indexOf("Mac") != -1)); 
var isOpera5Pc = ((navigator.userAgent.indexOf("Opera 5.") != -1) && (navigator.userAgent.indexOf("Windows") != -1)); 