<?php
require_once "conn.php";
$data = stripslashes(file_get_contents("php://input"));
$dataPelanggan = json_decode($data, true);

$idpelanggan = $dataPelanggan['idpelanggan'];
$pelanggan = $dataPelanggan['pelanggan'];
$alamat = $dataPelanggan['alamat'];
$telp = $dataPelanggan['telp'];

if (!empty($idpelanggan) && !empty($pelanggan) && !empty($alamat) && !empty($telp)) {
    $sql = "UPDATE tblpelanggan SET pelanggan='$pelanggan',alamat='$alamat',telp='$telp' WHERE idpelanggan = $idpelanggan";
    if ($result = mysqli_query($conn, $sql)) {
        echo "Data sudah diubah";
    } else {
        echo "Data gagal diubah";
    }
} else {
    echo "Data Kosong";
}
