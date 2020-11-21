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

var width;
var height; 
function newwindow(width, height)
{
  if(window.navigator.cookieEnabled)
  {
    if(!isNaN(getCookie("Advertisement")))
    {
      if(parseInt(getCookie("Advertisement")) != 1)
      {
         theNewWindow = window.open("Advertisement.aspx", "", "width=" + width + ",height=" + height + ", center=1, resize=0, title=0, border=0, scrolling=0, location=0, status=0"); 
         setCookie("Advertisement",1);  
         theNewWindow.blur();
      }
    }
  }
}
