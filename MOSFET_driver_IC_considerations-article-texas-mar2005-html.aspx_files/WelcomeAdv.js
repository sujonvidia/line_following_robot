// JScript File
function setCookie(c_name,value)
{
    var exdate=new Date();
    exdate.setHours(23,59,59);
    document.cookie=c_name+ "=" +escape(value)+ ";expires="+exdate.toGMTString();
}

function getCookie(c_name)
{
    if (document.cookie.length>0)
      {
          c_start=document.cookie.indexOf(c_name + "=");
          if (c_start!=-1)
            { 
                c_start=c_start + c_name.length+1; 
                c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            }
      }
    return "";
}

var agreewin;
var width;
var height; 
var time;
var secs;
function agree(width, height, time)
{
if(window.navigator.cookieEnabled)
{
if(!isNaN(getCookie("WelcomeAd")))
{
    if(parseInt(getCookie("WelcomeAd")) != 1)
    {
       secs = time;
       agreewin = dhtmlmodal.open("agreebox", "iframe", "Welcome.aspx", "", "width=" + width + ",height=" + height + ", center=1, resize=0, title=0, border=0, scrolling=0", "undefined") 
       setCookie("WelcomeAd",1);   
       timedMsg();
    }
}
}
}

function cd()
{
   rdo();
}
function rdo()
{
    secs--;

    if((secs == 0)) 
    {
        CloseWindow();
    }
    else
    {
     cd = setTimeout("rdo()",1000);
    }
}
function timedMsg()
{
    cd = setTimeout("rdo()",1000);
}

/*the following functions are for welcome.aspx page, timeinsecs come from webconfig*/
var timeinsecs;
var secs1;
function cd1(timeinsecs)
{
   secs1 = timeinsecs;
   rdo1();
}
function rdo1()
{
   secs1--;
   document.forms[0].txtMsg.value = "Window will close in " + secs1 + " seconds.";
   if((secs1 == 0)) 
   {
      CloseWindow();
   }
   else
   {
      cd1 = setTimeout("rdo1()",1000);
   }
} 
function CloseWindow()
{
    agreewin.hide();
    return true;
}     
