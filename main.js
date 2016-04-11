/*
CVS Header
$Header: /var/cvs/CVS/EMA/WebReports/SessionReport/main.js,v 1.1.1.1 2006/06/07 23:10:46 itdn Exp $
*/
var main = {
  myConn:      new Array(), // the XMLHttpRequest
  body:        false, // the body element
  target:      new Array(), // the target container
  response:    new Array(), // the target container
  responsetext:new Array(), // the target container
  loader:      false, // the loader
  debug:       false,
  status1:     false,
  totalcount:  0,
  pendingcalls:0,
  stations:    new Array(),
  /* init() this function takes the ID of the tag that will contain
    the updated data.  It places a please wait message there, and starts
    the XML
    */
  init:        function(){
    /* init() takes three arguments:
       * the id of the controller (select)
       * the id of the submit button
       * the id of the target container */
    /* test for methods & elements */
    if(!document.getElementById ||
       !document.getElementsByTagName) return;
    main.debug    = document.getElementById("debugfield").value;
    main.status1  = document.getElementById("status1");
    main.stations = document.getElementById("stationlist").value.split(',');
    // get the body
    main.body = document.getElementsByTagName('body')[0];
    for (var i = 0; i < main.stations.length; i++ ) {
        var server = main.stations[i];
        main.myConn[i] = new XHConn();
        main.target[i] = document.getElementById(server);
        if(!main.myConn[i]) { alert ('failed XHConn'); return; };
        main.getData(i, server);
        main.pendingcalls++;
    }
    dhtmltooltip.init();
  },
  displayData: function(field, oXML) {
      var valid = oXML.responseText.match(/Known sessions|No session information/i);
      if (valid != null) {
          main.response[field] = oXML;
          RegExp.multiline = true;
          var lines = oXML.responseText.split("\n");
          var linecount = 0;
          var text = "<B>Session/User List</B><UL>";
          for (var i = 0; i < lines.length; i++ ) { 
              var pattern = new RegExp();
              pattern.compile("^(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+\\S+\\s+\\S+" ,"g");
              var result = pattern.exec(lines[i]);
              if (result != null) { 
                  var user = result[3]; 
                  linecount++;
                  if (linecount > 2) {
                      text = text + "<LI>" + user + "</LI>\n";
                  }
              }
          }
          var text = text + "</UL>";
          linecount -= 2;
          main.responsetext[field] = text;
          if (linecount < 0) { linecount = 0; }

          main.target[field].innerHTML = '<DIV class=reportusage ' + 
             'style="width: ' + linecount * 10 + 'px;" ' +
             'id="div' + field + '"' +
             '>' + linecount + 
             '</DIV>';
          var divserv = document.getElementById('div' + field);
          main.addEvent(divserv, 'mouseover',
            new Function("dhtmltooltip.ddrivetip(" +
             "main.responsetext[" + field + "],'gray', 120);"));
          main.addEvent(divserv, 'mouseout',
            new Function("dhtmltooltip.hideddrivetip();"));
          main.totalcount += linecount;
          var totalcountfield = document.getElementById('summarycount');
          totalcountfield.innerHTML = main.totalcount;
      } else {
          main.target[field].innerHTML = '<DIV class=reportfail ' + 
             'style="width: 150px;" id="div' + field + '"' +
             '> Failed to retrieve count' + 
             '</DIV>';
          var divserv = document.getElementById('div' + field);
          main.responsetext[field] = oXML.responseText;
          if (main.debug == 1) {
            main.addEvent(divserv, 'mouseover',
                new Function("dhtmltooltip.ddrivetip(" +
                    "main.responsetext[" + field + "],'gray', 300);"));
            main.addEvent(divserv, 'mouseout',
                new Function("dhtmltooltip.hideddrivetip();"));
          }
      }
      main.pendingcalls--;
      if (main.pendingcalls == 0) {
          var completefield = document.getElementById('summarycomplete');
          completefield.innerHTML = "&nbsp;";
      }
  },
  getData:  function(field, server){ // the Ajax call
    // lets let the user know something is happening (see below)
    /* this is the function that is run
       once the Ajax call completes */
    var fnWhenDone = new Function("oXML", "main.displayData(" + field + 
                                          ", oXML);");
    // use XHConn s connect method
    main.myConn[field].connect('listsessions.php', 
                        'POST',
                        'server=' + server + '&debug=' + main.debug, 
                        fnWhenDone);
  },
  addEvent: function(obj, type, fn){  // the add event function
    if (obj.addEventListener) 
        obj.addEventListener(type, fn, false);
    else if (obj.attachEvent) {
      obj["e"+type+fn] = fn;
      obj[type+fn] = function() {
        obj["e"+type+fn](window.event);
      };
      obj.attachEvent("on"+type, obj[type+fn]);
    }
  }
};
// run the init() method on page load, passing it
//   the required arguments 
main.addEvent(window, 'load',
                     function(){
                       main.init();
                     });

