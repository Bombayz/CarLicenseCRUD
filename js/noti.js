$( document ).ready(function() {
    getCurrentTable();
});

function setStatus(id,to){
    
    $.sweetModal.confirm('คุณแน่ใจหรือไม่ จะย้อนกลับ?', function() {

        dataForm = "action=setStatus&id="+id+"&to="+to;

        $.ajax({
            method:"GET",
            url: "../allservice.php",
            data: dataForm,
            success: function(data){
                getCurrentTable();
                swal("เรียบร้อย", "ยกเลิกส่งงานเรียบร้อยแล้ว !", "success");
                
            }
        });

    });


}

function sendEditData(){
    dataForm = "action=updateUserData&"
    dataForm = dataForm+$("#formEdit").serialize();

    $.ajax({
        method:"GET",
        url: "../allservice.php",
        data: dataForm,
        success: function(data){
            swal("เรียบร้อย", "แก้ไขข้อมูลเรียบร้อยแล้ว !", "success")
            getCurrentTable();
        }
    });
}

function getCurrentTable(){
    dataForm = "action=getCurrentTable"

    $.ajax({
        method:"GET",
        url: "../allservice.php",
        data: dataForm,
        success: function(data){
            if(data['status'] == "ok"){

                $('#getTableWork').DataTable({
                    destroy: true,
                    "data": data['data'],
                    "columns": [
                        { "data": "car_license_1" },
                        { "data": "car_license_2" },
                        { "data": "car_license_3" },
                        { "data": "car_owner_firstname" },
                        { "data": "car_owner_lastname" },
                        { "data": "car_owner_tel" },                        
                        { "data": "car_date_getjob" },
                        { "data": "car_note"},
                        { "data": "status",
                            render: function ( data, type, row ) {
                                return '<a onclick="getUserData('+row['no']+')" data-toggle="modal" data-target="#myModal">'+'ดูข้อมูล'+'</a>'
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

            }else{
                alert("เกิดความผิดพลาดเมื่อเชื่อมต่อ api")
            }
        }
    });

}

function sendMonth(){
    dataForm = "action=getCurrentTable&month="+$('#month').val()

    $.ajax({
        method:"GET",
        url: "../allservice.php",
        data: dataForm,
        success: function(data){
            if(data['status'] == "ok"){

                $('#getTableWork').DataTable({
                    destroy: true,
                    "data": data['data'],
                    "columns": [
                        { "data": "car_license_1" },
                        { "data": "car_license_2" },
                        { "data": "car_license_3" },
                        { "data": "car_owner_firstname" },
                        { "data": "car_owner_lastname" },
                        { "data": "car_owner_tel" },                        
                        { "data": "car_date_getjob" },
                        { "data": "car_note"},
                        { "data": "status",
                            render: function ( data, type, row ) {
                                return '<a onclick="getUserData('+row['no']+')" data-toggle="modal" data-target="#myModal">'+'ดูข้อมูล'+'</a>'
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

            }else{
                alert("เกิดความผิดพลาดเมื่อเชื่อมต่อ api")
            }
        }
    });
}

function getUserData(obj){

    $('#car_license_3_edit option').remove()

    $.getJSON( "../allservice.php?action=selectUserData&number="+obj, function( data ) {
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