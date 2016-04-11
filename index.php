<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- CVS/RCS Header
$Header: /var/cvs/CVS/EMA/WebReports/SessionReport/index.php,v 1.2 2006/06/09 18:58:48 itdn Exp $
-->
<html>
<head>
  <meta content="text/html; charset=ISO-8859-1"
        http-equiv="content-type">
  <title>EMA - Active Sessions</title>
  <LINK REL=stylesheet type="text/css" HREF="SessionReport.css">
  <script type="text/javascript" src="XHConn.js"></script>
  <script type="text/javascript" src="dhtmltooltip.js"></script>
  <script type="text/javascript" src="main.js"></script>
</head>
<body>
<?php 
include "HTML/Form.php";

function debuglog($mesg) {
    global $debug;
    if (isset($debug) && $debug != 0 && isset($mesg)) { 
        error_log($mesg."\n",0); 
    }
}

$station_list = array('phxdcw2svrema01',
                      'phxdcw2svrema02',
                      'phxdcw2svrema03',
                      'phxdcw2svrema04',
                      'phxdcw2svrema05',
                      'phxdcw2svrema06',
                      'phxdcw2svrema07',
                      'phxdcw2svrema08',
                      'phxdcw2svrema09',
                      'phxdcw2svrema10',
                      'phxdcw2svrema11',);

if (! isset($debug)) { $debug = 0; }

?>

<table border=0 
        style="text-align: left; width: 100%; height: 100%;"
        cellpadding="0" cellspacing="0">
    <tr class="header">
      <td colspan="2" rowspan="1">
      <table class=header 
         border="0" 
         cellpadding="0" 
         cellspacing="0">
          <tr>
             <td class=logobox>
                <img alt="" src="images/dot_clear.gif" 
                     style="width: 135px; height: 0px;">
                <img alt="DHL Logo" src="images/logo-dhl.gif"
                    style="width: 90px; height: 34px;"> 
             </td>
             <td class=titlebox>
                <h1>EMA</H1>
                <h2>System Usage Report</h2>
             </td>
            <td style="width: 135px; vertical-align: top;"><br>
            </td>
          </tr>
      </table>
      </td>
    </tr>
    <tr>
      <td>
      <table class=report>
      <?
      $row = 0;
      foreach ( $station_list as $station ) { 
      print "<tr class=" . ($row % 2 ? "reporteven" : "reportodd") . ">";
      ?>
      <TH class=reportserver><? print $station;?></TH>
      <TD id="<?print $station;?>">
      <DIV class=reportusage">retrieving data....</DIV>
      </TD>
      </tr>
      <?$row++; } ?>
      </table>
      <BR>
      <table>
      <tr>
        <td class=summary>
          Total Session Count: 
        </td>
        <td class=summarycount>
          <span id="summarycount">0</span>
          <span class=summarycomplete id="summarycomplete">(incomplete count)</span>
        </td>
      </tr>
      </table>
      </td>
    </tr>
</table>
<br>
<br>
<div style="visibility: hidden">
<form>
<input id="debugfield" name="debug"  value="<?print $debug?>">
<input id="stationlist" name="stationlist" 
       value="<?print join(',',$station_list)?>">
</form>
<div style="position: absolute; left: 500px; top: 10px; height: 60px; width: 300px; z-index: 100; background-color: red; color: white;" id="status1">blah!</div>
</div>
</body>
</html>
