$(() => {

    const modal = new bootstrap.Modal($(".modal")[0]);

    function loadPeople() {
        $.get('/home/getpeople', function (people) {
            $("tbody tr").remove();
            people.forEach(person => {
                $("tbody").append(`
<tr>
    <td>${person.id}</td>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
</tr>
`);
            });
        });
    }

    loadPeople();

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        modal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        //const person = {
        //    firstName,
        //    lastName,
        //    age
        //}

        //$.post('/home/addperson', person, function (newPerson) {
        //    modal.hide();
        //    loadPeople();
        //});

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            modal.hide();
            loadPeople();
        });


    });
})