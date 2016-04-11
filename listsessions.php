<?php
require_once "HTTP/Request.php";

if (isset($server)) {
    $req =& new HTTP_Request("http://$server/scripts/listsessions.asp");
    if (!PEAR::isError($req->sendRequest())) {
        echo $req->getResponseBody();
    }
} else {
    print "blah!";
}

?>


