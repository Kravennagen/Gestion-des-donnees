<?php
try {
    $user='root';
    $pass='louis';
    $dbh = new PDO('mysql:host=localhost;dbname=stations', $user, $pass);
    $dbh->exec("SET CHARACTER SET utf8");
}
catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}
header('Content-Type: application/json');
if (empty($_GET['type']) || empty($_GET['lat']) || empty($_GET['long']) || empty($_GET['rad']))
    die();
$lat = $_GET['lat'];
$long = $_GET['long'];
$rad = $_GET['rad'];
$query = "SELECT * FROM ";
$where = "WHERE ";
$type = $_GET[type];
$betwlat = "BETWEEN :lat -:rad AND :lat +:rad";
$betwlng = "BETWEEN :lng -:rad AND :lng +:rad";
if ($type == 'electric')
    $where .= "latitude $betwlat AND longitude $betwlng"; 
if ($type == 'gas')
    $where .= "SUBSTRING_INDEX(latlng,',',1) $betwlat AND SUBSTRING_INDEX(latlng,',',-1) $betwlng"; 
$shh = $dbh->prepare("$query $type $where");
$shh->execute(array(':lat' => $lat, ':lng' => $long, ':rad' => $rad));
/* var_dump($shh->errorInfo()); */
/* var_dump($shh); */
$result = $shh->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);
?>
