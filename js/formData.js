function sendData(){
    dataForm = "action=insert&"
    dataForm = dataForm+$("#formInsert").serialize();

    $.ajax({
        method:"POST",
        url: "action/insert.php",
        data: dataForm,
        success: function(data){
            swal("เรียบร้อย", "บันทึกข้อมูลเรียบร้อยแล้ว !", "success")
            $("#cardInsert").fadeOut("slow");
        }
    });
}

function sendEditData(){
    dataForm = "action=updateUserData&"
    dataForm = dataForm+$("#formEdit").serialize();

    $.ajax({
        method:"GET",
        url: "allservice.php",
        data: dataForm,
        success: function(data){
            swal("เรียบร้อย", "แก้ไขข้อมูลเรียบร้อยแล้ว !", "success")
            getData();
        }
    });
}

function setStatus(id,to){
 
    $.sweetModal.prompt('หมายเหตุ', null, null, function(val) {
	    
        if (val) {
            dataForm = "action=setStatus&id="+id+"&to="+to+"&note="+val;
        }else{
            dataForm = "action=setStatus&id="+id+"&to="+to;
        }
        
        $.ajax({
            method:"GET",
            url: "allservice.php",
            data: dataForm,
            success: function(data){
                swal("เรียบร้อย", "รับงานเรียบร้อยแล้ว !", "success");
                getData();
            }
        });


    });
}

function getData(){
    dataForm = "action=search&"
    dataForm = dataForm+$("#formSearch").serialize();

     $.ajax({
        method:"GET",
        url: "allservice.php",
        data: dataForm,
        success: function(data){

            // alert(data['data']);

            if(data['status'] == "notFound"){
                $('#car_license_1').val("")
                $('#car_license_2').val("")
                $('#car_brand').val("")
                $('#car_body_number').val("")
                $('#car_tax_day').val("")
                $('#car_owner_firstname').val("")
                $('#car_owner_lastname').val("")
                $('#car_identity_number').val("")
                $('#car_owner_address').text("")
                $('#car_owner_tel').val("")
                
                swal({
                    title: 'ไม่พบข้อมูล',
                    type: 'warning',
                    showCloseButton: true,
                    confirmButtonText:
                        'OK',
                })

                $("#cardInsert").fadeIn("slow");


            }else{

                $('#foundNumber').text(data['data'].length +" ข้อมูล")
                $("#cardInsert").fadeOut("slow");
                $("#cardShow").fadeIn("slow");

                $('#example').DataTable({
                    destroy: true,
                    
                    "data": data['data'],
                    "columns": [
                        { "data": "car_license_1" },
                        { "data": "car_license_2" },
                        { "data": "car_license_3" },
                        { "data": "car_owner_firstname" },
                        { "data": "car_owner_lastname" },
                        { "data": "car_owner_tel" },                        
                        { "data": "car_tax_day" },
                        { "data": "status",
                            render: function ( data, type, row ) {
                                if(data == 2){
                                    return 'รับงาน'
                                }else if(data == 3){
                                    return 'ส่งงานเรียบร้อยแล้ว'
                                }else{
                                    return 'ว่าง'
                                }

                            }
                        },
                        
                        { "data": "car_owner_lastname",
                            render: function ( data, type, row ) {
                                return '<a onclick="getUserData('+row['0']+')" data-toggle="modal" data-target="#myModal">'+'ดูข้อมูล'+'</a>'
                            }
                        
                         },
                    ],
                    "language": {
                    "lengthMenu": "แสดง _MENU_ รายการ/หน้า",
                    "zeroRecords": "ไม่พบข้อมูล",
                    "info": "กำลังแสดงหน้า _PAGE_ จาก _PAGES_",
                    "previous":"ก่อนหน้า",
                    "search":"ค้นหา",
                    "infoEmpty": "ไม่พบข้อมูล",
                    "infoFiltered": "(filtered from _MAX_ total records)",
                    "emptyTable":     "ไม่พบข้อมูล",
                    "loadingRecords": "กำลังโหลด",
                    "processing":     "Processing...",
                    "paginate": {
                            "first":      "หน้าแรก",
                            "last":       "หน้าสุดท้าย",
                            "next":       "ถัดไป",
                            "previous":   "ก่อนหน้า"
                        }
                    },
                });




            }
        }
    });

}

function getUserData(obj){

    $('#car_license_3_edit option').remove()

    $.getJSON( "allservice.php?action=selectUserData&number="+obj, function( data ) {
        $.each( data, function( key, val ) {
            $('#no').val(val['no'])
            $('#car_license_1_edit').val(val['car_license_1'])
            $('#car_license_2_edit').val(val['car_license_2'])
            $('#car_license_3_edit').append("<option>"+val['car_license_3']+"</option>")
            $('#car_brand_edit').val(val['car_brand'])
            
            if(val['car_type'] == '1'){
                $('#car_type_edit').val('1')

            }else if(val['car_type'] == '2'){
                $('#car_type_edit').val('2')

            }else if(val['car_type'] == '3'){
                $('#car_type_edit').val('3')

            }else if(val['car_type'] == '12'){
                $('#car_type_edit').val('12')
                
            }else{
                $('#car_type_edit').val('13')
            }

            $('#car_body_number_edit').val(val['car_body_number'])
            $('#car_tax_day_edit').val(val['car_tax_day'])
            $('#car_owner_firstname_edit').val(val['car_owner_firstname'])
            $('#car_owner_lastname_edit').val(val['car_owner_lastname'])
            $('#car_identity_number_edit').val(val['car_identity_number'])
            $('#car_owner_address_edit').text(val['car_owner_address'])
            $('#car_owner_tel_edit').val(val['car_owner_tel'])
            
        });

        $('#setStatus').attr( "onclick", 'setStatus('+$('#no').val()+',2)' );

        $.getJSON("province.json", function(data){
        $.each(data, function(key, val){
           	$.each(val, function(key, val){
                $('#car_license_3_edit').append("<option>"+val['PROVINCE_NAME']+"</option>")
			});
        });
    });

    });

    
    
}

function openCardInsert(){
    $("#cardInsert").fadeIn("slow");
    alertify.success("Success notification");
}

$( document ).ready(function() {
    $.getJSON("province.json", function(data){
        $.each(data, function(key, val){
           	$.each(val, function(key, val){
                $('#car_license_3_head').append("<option>"+val['PROVINCE_NAME']+"</option>")
                $('#car_license_3').append("<option>"+val['PROVINCE_NAME']+"</option>")
			});
        });
    });

    

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
    });

    $(document).keypress(function (e) {
        if (e.which == 13) {
            getData();
        }
    });

});