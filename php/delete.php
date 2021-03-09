<?php
require_once "conn.php";
$data = stripslashes(file_get_contents("php://input"));
$dataPelanggan = json_decode($data, true);

$idpelanggan = $dataPelanggan['idpelanggan'];

if (!empty($idpelanggan)) {
    $sql = "DELETE FROM tblpelanggan WHERE idpelanggan = $idpelanggan";
    if ($result = mysqli_query($conn, $sql)) {
        echo "Data sudah dihapus";
    } else {
        echo "Data gagal dihapus";
    }
} else {
    echo "Data Kosong";
}
