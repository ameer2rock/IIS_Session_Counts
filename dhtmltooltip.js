/***********************************************
* Cool DHTML tooltip script- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

var dhtmltooltip = {
    offsetxpoint:   -60, //Customize x offset of tooltip
    offsetypoint:   20, //Customize y offset of tooltip
    ie:             false,
    ns6:            false,
    enabletip:      false,
    tipobj:         false,
    init: function(){
        dhtmltooltip.ie = document.all
        dhtmltooltip.ns6= document.getElementById && !document.all
        // create a new div
        var body  =  document.getElementsByTagName('body')[0];
        dhtmltooltip.tipobj    = document.createElement('div');
        dhtmltooltip.tipobj.id = 'dhthmltooltip';
        dhtmltooltip.tipobj.style.position = 'absolute';
        dhtmltooltip.tipobj.style.width    = '150px';
        dhtmltooltip.tipobj.style.border   = '2px solid black';
        dhtmltooltip.tipobj.style.padding  = '2px';
        dhtmltooltip.tipobj.style.backgroundColor  = 'lightyellow';
        dhtmltooltip.tipobj.style.visibility = 'hidden';
        dhtmltooltip.tipobj.style.zIndex  = '100';
        // append it to the body
        body.appendChild(dhtmltooltip.tipobj);
        document.onmousemove=dhtmltooltip.positiontip
    },
    ietruebody: function(){
        return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
    },
    ddrivetip: function(thetext, thecolor, thewidth){
        if (dhtmltooltip.ns6||dhtmltooltip.ie){
            if (typeof thewidth!="undefined") dhtmltooltip.tipobj.style.width=thewidth+"px"
            if (typeof thecolor!="undefined" && thecolor!="") dhtmltooltip.tipobj.style.backgroundColor=thecolor
            dhtmltooltip.tipobj.innerHTML=thetext
            dhtmltooltip.enabletip=true
            return false
        }
    },
    positiontip: function(e){
        if (dhtmltooltip.enabletip){
            var curX=(dhtmltooltip.ns6) ? 
                        e.pageX 
                        : 
                        event.clientX+dhtmltooltip.ietruebody().scrollLeft;
            var curY=(dhtmltooltip.ns6) ? 
                        e.pageY 
                        : 
                        event.clientY+dhtmltooltip.ietruebody().scrollTop;

            //Find out how close the mouse is to the corner of the window
            var rightedge=dhtmltooltip.ie&&!window.opera? 
                            dhtmltooltip.ietruebody().clientWidth-event.clientX-dhtmltooltip.offsetxpoint 
                            : 
                            window.innerWidth-e.clientX-dhtmltooltip.offsetxpoint-20
            var bottomedge=dhtmltooltip.ie&&!window.opera? 
                            dhtmltooltip.ietruebody().clientHeight-event.clientY-dhtmltooltip.offsetypoint 
                            : 
                            window.innerHeight-e.clientY-dhtmltooltip.offsetypoint-20

            var leftedge=(dhtmltooltip.offsetxpoint<0)? 
                            dhtmltooltip.offsetxpoint*(-1) 
                            : 
                            -1000

            //if the horizontal distance isnt enough to accomodate the width of the context menu
            if (rightedge<dhtmltooltip.tipobj.offsetWidth)
                //move the horizontal position of the menu to the left by its width
                dhtmltooltip.tipobj.style.left=dhtmltooltip.ie? dhtmltooltip.ietruebody().scrollLeft+event.clientX-dhtmltooltip.tipobj.offsetWidth+"px" : window.pageXOffset+e.clientX-dhtmltooltip.tipobj.offsetWidth+"px"
            else if (curX<leftedge)
                    dhtmltooltip.tipobj.style.left="5px"
                else
                    //position the horizontal position of the menu where the mouse is positioned
                    dhtmltooltip.tipobj.style.left=curX+dhtmltooltip.offsetxpoint+"px"

            main.status1.innerHTML='curX: ' + curX + ' curY: ' + curY + 
                                   ' leftedge: ' + leftedge + 
                                   ' bottom: ' + bottomedge + "<BR>" +
                                   'left: ' + dhtmltooltip.tipobj.style.left;
            //same concept with the vertical position
            if (bottomedge<dhtmltooltip.tipobj.offsetHeight)
                dhtmltooltip.tipobj.style.top=dhtmltooltip.ie? dhtmltooltip.ietruebody().scrollTop+event.clientY-dhtmltooltip.tipobj.offsetHeight-dhtmltooltip.offsetypoint+"px" : window.pageYOffset+e.clientY-dhtmltooltip.tipobj.offsetHeight-dhtmltooltip.offsetypoint+"px"
            else
                dhtmltooltip.tipobj.style.top=curY+dhtmltooltip.offsetypoint+"px"
            dhtmltooltip.tipobj.style.visibility="visible"
        }
    },
    hideddrivetip: function(){
        if (dhtmltooltip.ns6||dhtmltooltip.ie){
            dhtmltooltip.enabletip=false
            dhtmltooltip.tipobj.style.visibility="hidden"
            dhtmltooltip.tipobj.style.left="-1000px"
            dhtmltooltip.tipobj.style.backgroundColor=''
            dhtmltooltip.tipobj.style.width=''
        }
    }
}


