// The following code has been moved to the MainMasterPage.master page due to a clash with the onload event.
/*
window.onload = function() {
	if ( document.forms['embedsearchform'] != null )
	{
		setupDependencies('embedsearchform');
		initListGroup('embedded-search1', document.getElementById("form_manufacturer[]"));
		if (document.getElementById("bit").value=="") {
			initListGroup('embedded-search2a', document.getElementById("form_instruction[]"));
		}
		if (document.getElementById("bit").value=="816") {
			initListGroup('embedded-search2b', document.getElementById("form_instruction[]"));
		}
		if (document.getElementById("bit").value=="32") {
			initListGroup('embedded-search2c', document.getElementById("form_instruction[]"));
		}
		initListGroup('embedded-search3', document.getElementById("form_architecture"));
		initListGroup('embedded-search5', document.getElementById("form_tool_type"));
	}
};
*/

function changeaction(whereto) {
if(whereto=="")
{
	document.getElementById('embedsearchform').action="http://www.embeddeddeveloper.com/search/index.php?searchaction=1";
	initListGroup('embedded-search2a', document.getElementById("form_instruction[]"));
	initListGroup('embedded-search1', document.getElementById("form_manufacturer[]"));
}
if(whereto=="tools")
{
	document.getElementById('embedsearchform').action="http://www.embeddeddeveloper.com/search/index.php?searchaction=2";
	initListGroup('embedded-search3', document.getElementById("form_architecture"));
	initListGroup('embedded-search5', document.getElementById("form_tool_type"));
}
}
function changeactiontools(whereto) {
if(whereto=="tools")
{
	document.getElementById('embedsearchform').action="http://www.embeddeddeveloper.com/search/index.php?searchaction=2";
}
else
{
	document.getElementById('embedsearchform').action="http://www.embeddeddeveloper.com/search/index.php?searchaction=1";
}
}