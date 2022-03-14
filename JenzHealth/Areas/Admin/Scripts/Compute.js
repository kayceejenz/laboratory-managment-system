﻿$("#FinishBtn").click(function () {
    Swal.fire({
        title: 'Confirmation',
        text: "Are you sure, you want to proceed with this operation?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, proceed!'
    }).then((result) => {
        if (result.value) {
            var labnote = $("#labnote").val();
            var billnumber = $("#billnumber").val();
            var specimencollectedID = $("#specimencollectedID").val();

            let results = [];
            var tbodys = $("#resultBody").find("tbody");
            $.each(tbodys, function (i, tbody) {
                $.each(tbody.children, function (i, tr) {
                    // Prepare result
                    let result = {};
                    result.ServiceID = tr.children[0].dataset.parent;
                    result.BillInvoiceNumber = billnumber;
                    result.KeyID = tr.children[0].dataset.child;
                    result.Key = tr.children[0].innerText;
                    result.Value = tr.children[1].getElementsByClassName("value")[0].value;
                    result.RangeID = tr.children[3].getElementsByClassName("rangeID")[0].value;

                    // Add to result to list
                    results.push(result);
                });
            });
           
             //Send ajax call to server
                $.ajax({
                    url: 'UpdateLabResults',
                    method: 'Post',
                    dataType: "json",
                    data: { results: results,labnote: labnote },
                    success: function (response) {
                        location.href = "Prepare?ID=" + specimencollectedID + "&Saved=" + response;
                    }
                })
        }
        else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Cancelled :)',
                'error'
            )
        }
    })
})

$(".rangeID").on("change", function (e) {
    var select = e.target;
    var unit = select.options[select.selectedIndex].dataset.unit;
    select.parentElement.parentElement.children[2].children[0].value = unit;
})