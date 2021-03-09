$(function () {
    let id = "";
    let pelanggan = "";
    let alamat = "";
    let telp = "";

    $("#submit").click(function (e) {
        e.preventDefault();
        id = $("#idpelanggan").val();;
        pelanggan = $("#pelanggan").val();
        alamat = $("#alamat").val();
        telp = $("#telp").val();

        if (id == "") {
            insertData();
        } else {
            updateData();
        }

        $("#idpelanggan").val("");
        $("#pelanggan").val("");
        $("#alamat").val("");
        $("#telp").val("");
    });

    $("#btnTambah").click(function (e) {
        e.preventDefault();
        $("#title").html("Tambah data");
        $("#idpelanggan").val("");
        $("#pelanggan").val("");
        $("#alamat").val("");
        $("#telp").val("");
    });

    $("tbody").on("click", ".btnHapus", function () {
        let id = $(this).attr("data-id");
        if (confirm("Apakah anda yakin?")) {
            deleteData(id);
        }
    });

    $("tbody").on("click", ".btnUbah", function () {
        let pelanggan = $(this).attr("data-pelanggan").split(',');
        $("#title").html("Ubah data");
        $("#idpelanggan").val(pelanggan[0]);
        $("#pelanggan").val(pelanggan[1]);
        $("#alamat").val(pelanggan[2]);
        $("#telp").val(pelanggan[3]);
    });

    function selectData() {
        $.ajax({
            type: "get",
            url: "php/select.php",
            cache: false,
            dataType: "json",
            success: function (response) {
                let out = "";
                let no = 1;
                $.each(response, (key, val) => {
                    out += `<tr>
                        <th scope="row">${no++}</th>
                        <td>${val.pelanggan}</td>
                        <td>${val.alamat}</td>
                        <td>${val.telp}</td>
                        <td><button type="button" class="btn btn-danger btnHapus" data-id=${val.idpelanggan}>Hapus</button></td>
                        <td><button type="button" class="btn btn-warning btnUbah" data-bs-toggle="modal" data-bs-target="#exampleModal" data-pelanggan='${val.idpelanggan},${val.pelanggan},${val.alamat},${val.telp}'>Ubah</button></td>
                    </tr>`;
                });
                $("#isiData").html(out);
            }
        });
    }
    function insertData() {
        let dataPelanggan = {
            pelanggan: pelanggan,
            alamat: alamat,
            telp: telp
        }

        $.ajax({
            type: "post",
            url: "php/insert.php",
            cache: false,
            data: JSON.stringify(dataPelanggan),
            success: function (response) {
                alert(response);
                selectData();
            }
        });
    }
    function deleteData(id) {
        let dataPelanggan = {
            idpelanggan: id
        }

        $.ajax({
            type: "post",
            url: "php/delete.php",
            cache: false,
            data: JSON.stringify(dataPelanggan),
            success: function (response) {
                alert(response);
                selectData();
            }
        });
    }
    function updateData() {
        let dataPelanggan = {
            idpelanggan: id,
            pelanggan: pelanggan,
            alamat: alamat,
            telp: telp
        }

        $.ajax({
            type: "post",
            url: "php/update.php",
            cache: false,
            data: JSON.stringify(dataPelanggan),
            success: function (response) {
                alert(response);
                selectData();
            }
        });
    }

    selectData();
});