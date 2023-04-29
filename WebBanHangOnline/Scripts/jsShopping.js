$(document).ready(function () {
    ShowCount();
    $('body').on('click', '.btnAddToCart', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var quatity = 1;
        var tQuantity = $('#quantity_value').text();
        if (tQuantity != '') {
            quatity = parseInt(tQuantity);
        }
        
        //alert(id + " " + quatity);
        $.ajax({
            url: '/shoppingcart/addtocart',
            type: 'POST',
            data: { id: id, quantity: quatity },
            success: function (rs) {
                if (rs.Success) {
                    $('#checkout_items').html(rs.Count);
                    toastr.success(rs.msg, 'Thông báo');
                    //alert(rs.msg);
                }
            }
        });
    });
    $('body').on('click', '.btnUpdate', function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        var quantity = $('#Quantity_' + id).val();
        Update(id, quantity);
    });
    $('body').on('click', '.btnDeleteAll', function (e) {
        e.preventDefault();
        swal({
            title: "Xác nhận xóa?",
            text: "Bạn có chắc muốn xóa hết sản phẩm trong giỏ hàng?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    DeleteAll();
                    swal("Đã xóa hết sản phẩm!", {
                        icon: "success",
                    });
                }
            });
    });

    $('body').on('click', '.btnDelete', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        swal({
            title: "Xác nhận xóa?",
            text: "Bạn có chắc muốn xóa sản phẩm này trong giỏ hàng?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $.ajax({
                        url: '/shoppingcart/Delete',
                        type: 'POST',
                        data: { id: id },
                        success: function (rs) {
                            if (rs.Success) {
                                $('#checkout_items').html(rs.Count);
                                $('#trow_' + id).remove();
                                LoadCart();
                                swal("Sản phẩm đã được xóa!", {
                                    icon: "success",
                                });
                            }
                        }
                    }); 
                }
            });
    });
});



function ShowCount() {
    $.ajax({
        url: '/shoppingcart/ShowCount',
        type: 'GET',
        success: function (rs) {
            $('#checkout_items').html(rs.Count);
        }
    });
}
function DeleteAll() {
    $.ajax({
        url: '/shoppingcart/DeleteAll',
        type: 'POST',
        success: function (rs) {
            if (rs.Success) {
                LoadCart();
            }
        }
    });
}
function Update(id,quantity) {
    $.ajax({
        url: '/shoppingcart/Update',
        type: 'POST',
        data: { id: id, quantity: quantity },
        success: function (rs) {
            if (rs.Success) {
                LoadCart();
            } else {
                toastr.error(rs.msg, 'Thông báo');
                LoadCart();
               // alert(rs.msg);
            }
        }
    });
}

function LoadCart() {
    $.ajax({
        url: '/shoppingcart/Partial_Item_Cart',
        type: 'GET',
        success: function (rs) {
            $('#load_data').html(rs);
        }
    });
}

