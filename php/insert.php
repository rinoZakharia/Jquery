<?php
require_once "conn.php";
$data = stripslashes(file_get_contents("php://input"));
$dataPelanggan = json_decode($data, true);

$pelanggan = $dataPelanggan['pelanggan'];
$alamat = $dataPelanggan['alamat'];
$telp = $dataPelanggan['telp'];

if (!empty($pelanggan) && !empty($alamat) && !empty($telp)) {
    $sql = "INSERT INTO tblpelanggan VALUES('','$pelanggan','$alamat','$telp','','','1')";
    if ($result = mysqli_query($conn, $sql)) {
        echo "Data sudah disimpan";
    } else {
        echo "Data gagal disimpan";
    }
} else {
    echo "Data Kosong";
}
