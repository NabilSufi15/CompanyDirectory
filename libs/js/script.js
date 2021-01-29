$(document).ready(function () {

    //global variables
    let sortValue = $(".nav-item .dropdown-item").attr('data-value');
    let checkbox = [];

    //displays all employees
    const getAll = (sortName) => {
        $.ajax({
            url: "libs/php/getAllEmployees.php",
            type: 'GET',
            dataType: 'json',
            data: {
                sort: sortName
            },
            success: function (result) {
                console.log(result);

                for (let i = 0; i < result['data'].length; i++) {
                    // col-sm-12 col-md-6 col-lg-4
                    $('#info').append('<div id="employee-card" class="col-sm-12 col-md-6 col-lg-3 card m-3"> ' +
                        '<div class="card-header card-title"><strong>' + result['data'][i].firstName + ' ' + result['data'][i].lastName + '</strong></div>' +
                        '<div class="card-body">' +
                        '<div id="info-dep" class="card-title">' + '<strong>Department: </strong>' + result['data'][i].department + '</div>' +
                        '<div class="card-title">' + '<strong>Email: </strong>' + result['data'][i].email + '</strong></div>' +
                        '<div class="card-title">' + '<strong>Location: </strong>' + result['data'][i].location + '</strong></div>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light trashButton" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash"></i></button>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light editButton" data-toggle="modal" data-target="#updateModal"><i class="far fa-edit"></i></button>' +
                        '</div>');
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    // $("#search").on("keyup", function () {
    //     var value = $(this).val().toLowerCase();
    //     $("#info").filter(function () {
    //         $('.card').toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //         console.log(value);
    //     });
    // });

    //search function
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#info div").filter(function() {
            $(this).toggle($(this).find('strong').text().toLowerCase().indexOf(value) > -1)
        });
    });

    //delete employee from database
    const deleteEmployee = (id) => {
        $.ajax({
            url: "libs/php/deleteEmployeeByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (result) {
                console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //add employee into database
    const addEmployee = (firstName, lastName, email, jobTitle, departmentID) => {
        $.ajax({
            url: "libs/php/insertEmployee.php",
            type: 'POST',
            dataType: 'json',
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                jobTitle: jobTitle,
                departmentID: departmentID
            },
            success: function (result) {
                console.log(result);
                getAll();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //add department into database
    const addDepartment = (name, locationID) => {
        $.ajax({
            url: "libs/php/insertDepartment.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name: name,
                locationID: locationID
            },
            success: function (result) {
                console.log(result);
                getAll();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //add location into database
    const addLocation = (name) => {
        $.ajax({
            url: "libs/php/insertLocation.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name: name
            },
            success: function (result) {
                console.log(result);
                getAll();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //update current employee details
    const updateEmployeeDetails = (id, firstName, lastName, email, jobTitle, departmentID) => {
        $.ajax({
            url: "libs/php/updateEmployeeDetails.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                first: firstName,
                last: lastName,
                email: email,
                job: jobTitle,
                depID: departmentID
            },
            success: function (result) {
                console.log(result);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //display employee details within edit modal
    const showEmployeeDetails = (id) => {
        $.ajax({
            url: "libs/php/getEmployeeByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (result) {
                console.log(result);
                $('#updateModal #first-name').val(result['data'][0].firstName);
                $('#updateModal #last-name').val(result['data'][0].lastName);
                $('#updateModal #email').val(result['data'][0].email);
                $('#updateModal #job-title').val(result['data'][0].jobTitle);
                $('#updateModal .custom-select-department').val(result['data'][0].departmentID);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //displays all departments
    const displayAllDepartments = () => {
        $.ajax({
            url: "libs/php/getAllDepartments.php",
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result);

                for (let i = 0; i < result['data'].length; i++) {
                    $('.filter .card-body').append('<div class="form-check mb-2"> ' +
                        '<input ' +
                        'class="form-check-input" ' +
                        'type="checkbox" ' +
                        'id="' + result['data'][i].name + '-Checkbox" ' +
                        'value=' + result['data'][i].id + '> ' +
                        '<label class="form-check-label" for="' + result['data'][i].name + '-Checkbox">' +
                        result['data'][i].name + '</label>' +
                        '</div>');

                    $('.custom-select-department').append('<option value=' + result['data'][i].id + '>' + result['data'][i].name + '</option>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //display all locations
    const displayAllLocations = () => {
        $.ajax({
            url: "libs/php/getAllLocations.php",
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result);

                for (let i = 0; i < result['data'].length; i++) {
                    $('.custom-select-location').append('<option value=' + result['data'][i].id + '>' + result['data'][i].name + '</option>');
                    //$('.custom-select-location').append('<option value=' + [i] + '>' + result['data'][i].name + '</option>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });

    }

    //filters department according to checkboxes
    const filterDepartment = (sortName, dep, dep2, dep3, dep4, dep5, dep6, dep7, dep8, dep9, dep10, dep11, dep12) => {
        $.ajax({
            url: "libs/php/filterDepartments.php",
            type: 'GET',
            dataType: 'json',
            data: {
                sort: sortName,
                depID: dep || 0,
                depID2: dep2 || 0,
                depID3: dep3 || 0,
                depID4: dep4 || 0,
                depID5: dep5 || 0,
                depID6: dep6 || 0,
                depID7: dep7 || 0,
                depID8: dep8 || 0,
                depID9: dep9 || 0,
                depID10: dep10 || 0,
                depID11: dep11 || 0,
                depID12: dep12 || 0
            },
            success: function (result) {
                console.log(result);
                $("#info").empty();
                //col-lg-6 col-md-6 col-12 
                for (let i = 0; i < result['data'].length; i++) {
                    // col-sm-12 col-md-6 col-lg-4
                    $('#info').append('<div class="col-sm-12 col-md-6 col-lg-3 card m-3"> ' +
                        '<div class="card-header card-title"><strong>' + result['data'][i].firstName + ' ' + result['data'][i].lastName + '</strong></div>' +
                        '<div class="card-body">' +
                        '<div id="user-d" class="card-title">' + '<strong>Department: </strong>' + result['data'][i].department + '</div>' +
                        '<div class="card-title">' + '<strong>Email: </strong>' + result['data'][i].email + '</div>' +
                        '<div class="card-title">' + '<strong>Location: </strong>' + result['data'][i].location + '</div>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light trashButton" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash"></i></button>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light editButton" data-toggle="modal" data-target="#updateModal"><i class="far fa-edit"></i></button>' +
                        '</div>');

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //sorts the list of record into a certain order
    $(".nav-item .dropdown-item").click(function () {
        $("#info").empty();
        sortValue = $(this).attr('data-value');

        if ($(".form-check-input:checkbox:checked").length > 0) {
            // any one is checked
            console.log("ye");
            filterDepartment(
                sortValue,
                tmp[0],
                tmp[1],
                tmp[2],
                tmp[3],
                tmp[4],
                tmp[5],
                tmp[6],
                tmp[7],
                tmp[8],
                tmp[9],
                tmp[10],
                tmp[11],
                tmp[12],
            );
        }
        else {
            // none is checked
            console.log("no");
            getAll(sortValue);
        }
    });

    //checks if the checkbox has been checked and filters results
    $(document).on('click', '.form-check-input', function () {
        var checked = $(this).val();

        if ($(this).is(':checked')) {
            checkbox.push(checked);
        } else {
            checkbox.splice($.inArray(checked, checkbox), 1);
        }

        if ($(".form-check-input:checkbox:checked").length > 0) {
            // any one is checked
            console.log("ye");
            filterDepartment(
                sortValue,
                checkbox[0],
                checkbox[1],
                checkbox[2],
                checkbox[3],
                checkbox[4],
                checkbox[5],
                checkbox[6],
                checkbox[7],
                checkbox[8],
                checkbox[9],
                checkbox[10],
                checkbox[11],
                checkbox[12],
            );
        }
        else {
            // none is checked
            console.log("no");
            getAll(sortValue);
        }

    });

    //deletes employee from the database when submitted
    $("#deleteModal").on('shown.bs.modal', function (e) {
        // console.log("off");
        const deleteId = $(e.relatedTarget).data('id');
        console.log(deleteId);

        $("#delete-employee").click(function () {
            deleteEmployee(deleteId);
            console.log(deleteId + " is deleted");
        });
    });

    //adds employee into the databse when submitted
    $("#add-employee").click(function () {
        console.log($('#addEmployeeModal #first-name').val());
        console.log($('#addEmployeeModal #last-name').val());
        console.log($('#addEmployeeModal #email').val());
        console.log($('#addEmployeeModal #job-title').val());
        console.log($('#addEmployeeModal .custom-select-department').val());

        addEmployee($('#addEmployeeModal #first-name').val(),
            $('#addEmployeeModal #last-name').val(),
            $('#addEmployeeModal #email').val(),
            $('#addEmployeeModal #job-title').val(),
            $('#addEmployeeModal .custom-select-department').val()
        );
    });

    //adds employee into the database when submitted
    $("#add-department").click(function () {
        console.log($('#addDepartmentModal #department-name').val());
        console.log($('#addDepartmentModal .custom-select-location').val());
        //displayAllLocations();

        addDepartment($('#addDepartmentModal #department-name').val(),
            $('#addDepartmentModal .custom-select-location').val()
        );
    });

    //adds location into the database when submitted
    $("#add-location").click(function () {
        console.log($('#addLocationModal #location-name').val());

        addLocation($('#addLocationModal #location-name').val()
        );
    });

    //updates employee into the database when submitted
    $("#updateModal").on('shown.bs.modal', function (e) {
        // console.log("off");
        const updateId = $(e.relatedTarget).data('id');

        $("#update-employee").click(function (e) {
            console.log($('#updateModal #first-name').val());
            console.log($('#updateModal #last-name').val());
            console.log($('#updateModal #email').val());
            console.log($('#updateModal #job-title').val());
            console.log($('#updateModal .custom-select-department').val());
            console.log("id: " + updateId);

            updateEmployeeDetails(updateId,
                $('#updateModal #first-name').val(),
                $('#updateModal #last-name').val(),
                $('#updateModal #email').val(),
                $('#updateModal #job-title').val(),
                $('#updateModal .custom-select-department').val()
            );

            getAll("p.firstName");
        });
    });

    // Checks if all section of the forms are filled in
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })();

    getAll(sortValue);
    displayAllLocations();
    displayAllDepartments();

});

