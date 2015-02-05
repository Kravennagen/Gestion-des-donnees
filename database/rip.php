<?php
$reponse = file_get_contents ('xml.xml');
$xml = simplexml_load_string ($reponse);
echo $xml[0];
?>