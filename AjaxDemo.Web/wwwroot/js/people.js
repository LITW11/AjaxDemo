$(() => {

    const modal = new bootstrap.Modal($(".modal")[0]);

    function refreshTable(cb) {
        $(".table tr:gt(1)").remove();
        $("#spinner-row").show();
        $.get('/home/getpeople', function (people) {
            $("#spinner-row").hide();
            people.forEach(function (person) {
                $("tbody").append(`
                <tr>
                    <td>${person.firstName}</td>
                    <td>${person.lastName}</td>
                    <td>${person.age}</td>
                    <td>
                        <button class='btn btn-warning' data-person-id='${person.id}'>Edit</button>
                        <button class='btn btn-danger ml-3' data-person-id='${person.id}'>Delete</button>
                    </td>
                </tr>`)
            });

            if (cb) {
                cb();
            }
        });
    }

    refreshTable();

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        $(".modal-title").text('Add Person');
        $("#save-person").show();
        $("#update-person").hide();
        modal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            refreshTable(() => {
                modal.hide();
            });
           
        });
    });

    $("table").on('click', '.btn-danger', function () {
        const button = $(this);
        const personId = button.data('person-id');
        $.post('/home/deleteperson', { id: personId }, function () {
            refreshTable();
        });
    });

    $("table").on('click', '.btn-warning', function () {
        const button = $(this);
        const personId = button.data('person-id');
        $(".modal-title").text('Edit Person');
        $.get('/home/getpersonbyid', { id: personId }, function ({firstName, lastName, age}) {
            $("#firstName").val(firstName);
            $("#lastName").val(lastName);
            $("#age").val(age);
            $("#save-person").hide();
            $("#update-person").show();
            $(".modal").data('edit-person-id', personId);
            modal.show();
        });
    });

    $("#update-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();
        const id = $(".modal").data('edit-person-id');

        $.post('/home/updateperson', {id, firstName, lastName, age }, function () {
            modal.hide();
            refreshTable();
        });
    })
})