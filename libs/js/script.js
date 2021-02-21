$(document).ready(function () {

    //global variables
    let sortValue = $(".nav-sort-item .dropdown-item").attr('data-value');
    let checkbox = [];
    let employee = true;
    let department = false;
    let location = false;
    let deleteId;

    //displays all employees
    const displayAllEmployees = (sortName) => {
        $.ajax({
            url: "libs/php/getAllEmployees.php",
            type: 'GET',
            dataType: 'json',
            data: {
                sort: sortName
            },
            success: function (result) {
                // console.log(result);
                // console.log(`employee = ${employee}, department = ${department}, location = ${location}`)

                $("#info").empty();
                employee = true;
                department = false;
                location = false;

                for (let i = 0; i < result['data'].length; i++) {
                    $('#info').append('<div id="employee' + result['data'][i].id + '" class="col-sm-12 col-md-6 col-lg-4 mt-3" data-role="employee-details"> ' +
                        '<div class="card"> ' +
                        '<div class="card-title font-weight-bold card-header text-center info-text">' + result['data'][i].firstName + ' ' + result['data'][i].lastName + '</div>' +
                        '<div class="card-body">' +
                        '<div class="card-text info-text m-1">' + '<strong>Department: </strong>' + result['data'][i].department + '</div>' +
                        '<div class="card-text info-text m-1">' + '<strong>Email: </strong>' + result['data'][i].email + '</div>' +
                        '<div class="card-text info-text m-1">' + '<strong>Location: </strong>' + result['data'][i].location + '</strong></div>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light trash-button float-right m-1" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash"></i></button>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light edit-button float-right m-1" data-toggle="modal" data-target="#updateEmployeeModal"><i class="far fa-edit"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //search function
    $("#search").on("keyup keypress", function (e) {

        if (e.keyCode == 13) {
            e.preventDefault();
        }

        var value = $(this).val().toLowerCase();

        $('div[data-role="employee-details"]').filter(function () {
            $(this).toggle($(this).find('.info-text').text().toLowerCase().indexOf(value) > -1)
        });

        $('div[data-role="department-details"]').filter(function () {
            $(this).toggle($(this).find('.info-text').text().toLowerCase().indexOf(value) > -1)
        });

        $('div[data-role="location-details"]').filter(function () {
            $(this).toggle($(this).find('.info-text').text().toLowerCase().indexOf(value) > -1)
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
                // console.log(result);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
                // console.warn(jqXHR.responseText);
            }
        });
    }

    //add employee into database
    const addEmployee = (firstName, lastName, jobTitle, email, departmentID) => {
        $.ajax({
            url: "libs/php/insertEmployee.php",
            type: 'POST',
            dataType: 'json',
            data: {
                firstName: firstName,
                lastName: lastName,
                jobTitle: jobTitle,
                email: email,
                departmentID: departmentID
            },
            success: function (result) {
                // console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
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
                // console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //delete department from database
    const deleteDepartment = (id) => {
        $.ajax({
            url: "libs/php/deleteDepartmentByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (result) {
                // console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
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
                // console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //delete Location from database
    const deleteLocation = (id) => {
        $.ajax({
            url: "libs/php/deleteLocationByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (result) {
                // console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
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
                // console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //update current department details
    const updateDepartmentDetails = (id, department, locationID) => {
        $.ajax({
            url: "libs/php/updateDepartmentDetails.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                department: department,
                locationID: locationID
            },
            success: function (result) {
                // console.log(result);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //update current department details
    const updateLocationDetails = (id, location) => {
        $.ajax({
            url: "libs/php/updateLocationDetails.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                location: location,
            },
            success: function (result) {
                // console.log(result);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //display employee details within update employee modal
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
                $('#updateEmployeeModal .first-name').val(result['data'][0].firstName);
                $('#updateEmployeeModal .last-name').val(result['data'][0].lastName);
                $('#updateEmployeeModal .email').val(result['data'][0].email);
                $('#updateEmployeeModal .job-title').val(result['data'][0].jobTitle);
                $('#updateEmployeeModal .custom-select-department').val(result['data'][0].departmentID);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //display department details within update employee modal
    const showDepartmentDetails = (id) => {
        $.ajax({
            url: "libs/php/getDepartmentByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (result) {
                // console.log(result);
                $('#updateDepartmentModal .department-name').val(result['data'][0].name);
                $('#updateDepartmentModal .custom-select-location').val(result['data'][0].locationID);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //display department details within update employee modal
    const showLocationDetails = (id) => {
        $.ajax({
            url: "libs/php/getLocationByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (result) {
                // console.log(result);
                $('#updateLocationModal .location-name').val(result['data'][0].name);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
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
                // console.log(result);
                $('.filter .card-body').empty();
                $('.custom-select-department').html('');

                for (let i = 0; i < result['data'].length; i++) {
                    $('.filter .card-body').append(
                        '<div class="form-check card-text text-wrap mb-2"> ' +
                        '<input ' +
                        'class="form-check-input checkbox-list" ' +
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
                // console.log(jqXHR, textStatus, errorThrown);
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
                // console.log(result);

                $('.custom-select-location').html('');

                for (let i = 0; i < result['data'].length; i++) {
                    $('.custom-select-location').append('<option value=' + result['data'][i].id + '>' + result['data'][i].name + '</option>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
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
                // console.log(result);
                $("#info").empty();

                for (let i = 0; i < result['data'].length; i++) {
                    $('#info').append('<div class="col-sm-12 col-md-6 col-lg-4 mt-3" data-role="employee-details"> ' +
                        '<div class="card" data-role="employee-details"> ' +
                        '<div class="card-title font-weight-bold card-header text-center info-text">' + result['data'][i].firstName + ' ' + result['data'][i].lastName + '</div>' +
                        '<div class="card-body">' +
                        '<div class="card-text info-text m-1">' + '<strong>Department: </strong>' + result['data'][i].department + '</div>' +
                        '<div class="card-text info-text m-1">' + '<strong>Email: </strong>' + result['data'][i].email + '</div>' +
                        '<div class="card-text info-text m-1">' + '<strong>Location: </strong>' + result['data'][i].location + '</strong></div>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light trash-button float-right m-1" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash"></i></button>' +
                        '<button id="test" type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light edit-button float-right m-1" data-toggle="modal" data-target="#updateEmployeeModal"><i class="far fa-edit"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    //sorts the list of record into a certain order
    $(".nav-sort-item .dropdown-item").click(function () {
        $("#info").empty();
        // console.log($(".form-check-input:checkbox:checked").length);
        sortValue = $(this).attr('data-value');

        if ($(".form-check-input:checkbox:checked").length > 0) {
            // any one is checked
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
            displayAllEmployees(sortValue);
        }
    });

    //checks if the checkbox has been checked and filters results
    $(document).on('click', '.form-check-input', function () {
        $("#info").empty();
        var checked = $(this).val();

        if ($(this).is(':checked')) {
            checkbox.push(checked);
        } else {
            checkbox.splice($.inArray(checked, checkbox), 1);
        }

        if ($(".form-check-input:checkbox:checked").length > 0) {
            // any one is checked
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
            displayAllEmployees(sortValue);
        }

    });

    //load employee data
    $("#load-employee").click(function () {
        $(".nav-sort-item .nav-link").removeClass("disabled");
        $('.checkbox-list').prop('disabled', false);
        // console.log("load employee");
        displayAllEmployees(sortValue);
    })

    //load department data
    $("#load-department").click(function () {
        $(".nav-sort-item .nav-link").addClass("disabled");
        $('.checkbox-list').prop('disabled', true);

        $.ajax({
            url: "libs/php/getDepartmentDetails.php",
            type: 'GET',
            dataType: 'json',
            data: {
            },
            success: function (result) {
                $("#info").empty();
                employee = false;
                department = true;
                location = false;
                // console.log(result);
                for (let i = 0; i < result['data'].length; i++) {
                    $('#info').append('<div id="department' + result['data'][i].id + '" class="col-sm-12 col-md-6 col-lg-4 mt-3" data-role="department-details"> ' +
                        '<div class="card"> ' +
                        '<div class="card-title card-header font-weight-bold text-center info-text">' + result['data'][i].department + '</div>' +
                        '<div class="card-body">' +
                        '<div class="card-text info-text m-1">' + '<strong>Location: </strong>' + result['data'][i].location + '</strong></div>' +
                        '<div class="card-text info-text m-1">' + '<strong>Employees: </strong>' + result['data'][i].employee + '</strong></div>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light trash-button float-right m-1" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash"></i></button>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light edit-button float-right m-1" data-toggle="modal" data-target="#updateDepartmentModal"><i class="far fa-edit"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    })

    //load location data
    $("#load-location").click(function () {
        $(".nav-sort-item .nav-link").addClass("disabled");
        $('.checkbox-list').prop('disabled', true);
        $.ajax({
            url: "libs/php/getLocationDetails.php",
            type: 'GET',
            dataType: 'json',
            data: {
            },
            success: function (result) {
                // console.log(result);
                // console.log(`employee = ${employee}, department = ${department}, location = ${location}`);

                $("#info").empty();
                employee = false;
                department = false;
                location = true;

                for (let i = 0; i < result['data'].length; i++) {
                    $('#info').append('<div id="location' + result['data'][i].id + '" class="col-sm-12 col-md-6 col-lg-4 mt-3" data-role="location-details"> ' +
                        '<div class="card"> ' +
                        '<div class="card-title card-header font-weight-bold text-center info-text">' + result['data'][i].name + '</div>' +
                        '<div class="card-body">' +
                        '<div class="card-text info-text m-1">' + '<strong>Department: </strong>' + result['data'][i].department + '</strong></div>' +
                        '<div class="card-text info-text m-1">' + '<strong>Employees: </strong>' + result['data'][i].employee + '</strong></div>' +
                        '<button type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light trash-button float-right m-1" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash"></i></button>' +
                        '<button id="test" type="button" data-id=' + result['data'][i].id + ' class="btn btn-secondary btn-light edit-button float-right m-1" data-toggle="modal" data-target="#updateLocationModal"><i class="far fa-edit"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    })

    //shows employee details within update modal box
    $(document).on('click', '[data-role="employee-details"] .edit-button', function () {
        showEmployeeDetails($(this).data('id'));
    });

    //shows department details within update modal box
    $(document).on('click', '[data-role="department-details"] .edit-button', function () {
        showDepartmentDetails($(this).data('id'));
    });

    //shows location details within update modal box
    $(document).on('click', '[data-role="location-details"] .edit-button', function () {
        showLocationDetails($(this).data('id'));
    });

    //deletes data from the database when submitted
    $("#deleteModal").on('shown.bs.modal', function (e) {
        deleteId = $(e.relatedTarget).data('id');

        //deletes employee from the database when submitted
        if (employee) {
            $("#delete-record").removeClass("delete-location");
            $("#delete-record").removeClass("delete-department");
            $("#delete-record").addClass("delete-employee");

            $(".delete-employee").click(function () {
                displayAllEmployees(sortValue);

                deleteEmployee(deleteId);
                $(`#employee${deleteId}`).modal('hide');
            });

            //deletes department from the database when submitted
        } else if (department) {
            $("#delete-record").removeClass("delete-employee");
            $("#delete-record").removeClass("delete-location");
            $("#delete-record").addClass("delete-department");

            $(".delete-department").click(function () {
                displayAllDepartments();
                $("#load-department").click();

                deleteDepartment(deleteId);
                $(`#department${deleteId}`).modal('hide');
            });

            //deletes location from the database when submitted
        } else if (location) {
            $("#delete-record").removeClass("delete-employee");
            $("#delete-record").removeClass("delete-department");
            $("#delete-record").addClass("delete-location");

            $(".delete-location").click(function () {
                displayAllLocations();
                $("#load-location").click();

                deleteLocation(deleteId);
                $(`#location${deleteId}`).modal('hide');
            });

        }
    });

    //adds employee into the databse when submitted
    $("#add-employee").click(function (e) {
        // console.log($('#addEmployeeModal .first-name').val());
        // console.log($('#addEmployeeModal .last-name').val());
        // console.log("email: " + $('#addEmployeeModal .email').val());
        // console.log("job: " + $('#addEmployeeModal .job-title').val());
        // console.log($('#addEmployeeModal .custom-select-department').val());

        if ($('#addEmployeeModal .first-name').val() !== "" &&
            $('#addEmployeeModal .last-name').val() !== "" &&
            $('#addEmployeeModal .email').val().indexOf('@') > -1 &&
            $("#addEmployeeModal .job-title").val() !== "" &&
            $('#addEmployeeModal .custom-select-department').val() !== "") {

            addEmployee($('#addEmployeeModal .first-name').val(),
                $('#addEmployeeModal .last-name').val(),
                $('#addEmployeeModal .email').val(),
                $('#addEmployeeModal .job-title').val(),
                $('#addEmployeeModal .custom-select-department').val()
            );

            displayAllEmployees(sortValue);

            // $('#add-employee').attr("data-dismiss","modal");  
            $('#addEmployeeModal').modal('hide');
            $("#add-employee-form").trigger("reset");
        }

    });

    //adds department into the database when submitted
    $("#add-department").click(function () {
        // console.log($('#addDepartmentModal .department-name').val());
        // console.log($('#addDepartmentModal .custom-select-location').val());

        if ($('#addDepartmentModal .department-name').val() !== "" &&
            $('#addDepartmentModal .custom-select-location').val() !== "") {

            addDepartment($('#addDepartmentModal .department-name').val(),
                $('#addDepartmentModal .custom-select-location').val()
            );

            $("#load-department").click();
            displayAllDepartments();

            $('#addDepartmentModal').modal('hide');
            $("#add-department-form").trigger("reset");
        }
    });

    //adds location into the database when submitted
    $("#add-location").click(function () {
        // console.log($('#addLocationModal .location-name').val());

        if ($('#addLocationModal .location-name').val() !== "") {

            addLocation($('#addLocationModal .location-name').val());

            displayAllLocations();
            $("#load-location").click();

            $('#addLocationModal').modal('hide');
            $("#add-location-form").trigger("reset");

        }
    });

    //updates employee into the database when submitted
    $("#updateEmployeeModal").on('shown.bs.modal', function (e) {
        const updateId = $(e.relatedTarget).data('id');

        $("#update-employee").click(function (e) {
            console.log($('#updateEmployeeModal .first-name').val());
            console.log($('#updateEmployeeModal .last-name').val());
            console.log($('#updateEmployeeModal .email').val());
            console.log($('#updateEmployeeModal .job-title').val());
            console.log($('#updateEmployeeModal .custom-select-department').val());
            console.log("id: " + updateId);

            if ($('#updateEmployeeModal .first-name').val() !== "" &&
                $('#updateEmployeeModal .last-name').val() !== "" &&
                $('#updateEmployeeModal .email').val().indexOf('@') > -1 &&
                $("#updateEmployeeModal .job-title").val() !== "" &&
                $('#updateEmployeeModal .custom-select-department').val() !== "") {

                updateEmployeeDetails(updateId,
                    $('#updateEmployeeModal .first-name').val(),
                    $('#updateEmployeeModal .last-name').val(),
                    $('#updateEmployeeModal .email').val(),
                    $('#updateEmployeeModal .job-title').val(),
                    $('#updateEmployeeModal .custom-select-department').val()
                );

                $('#updateEmployeeModal').modal('hide');
                displayAllEmployees(sortValue);
            }

        });
    });

    //updates department into the database when submitted
    $("#updateDepartmentModal").on('shown.bs.modal', function (e) {
        const updateId = $(e.relatedTarget).data('id');

        $("#update-department").click(function (e) {
            // console.log($('#updateDepartmentModal .department-name').val());
            // console.log($('#updateDepartmentModal .custom-select-location').val());
            // console.log("id: " + updateId);

            if ($('#updateDepartmentModal .department-name').val() !== "" &&
                $('#updateDepartmentModal .custom-select-location').val() !== "") {

                updateDepartmentDetails(updateId,
                    $('#updateDepartmentModal .department-name').val(),
                    $('#updateDepartmentModal .custom-select-location').val()
                );
                
                displayAllDepartments();
                
                $("#load-department").click();
                $('#updateDepartmentModal').modal('hide');
        
            }

            
        });
    });

    //updates loacation into the database when submitted
    $("#updateLocationModal").on('shown.bs.modal', function (e) {
        const updateId = $(e.relatedTarget).data('id');

        $("#update-location").click(function () {
            // console.log($('#updateLocationModal .location-name').val());
            // console.log("id: " + updateId);

            if ($('#updateLocationModal .location-name').val() !== "") {

                updateLocationDetails(updateId,
                    $('#updateLocationModal .location-name').val()
                );

                displayAllLocations();

                $('#updateLocationModal').modal('hide');
                $("#load-location").click();
            }
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

    //scroll to the top of the page
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    displayAllEmployees(sortValue);
    displayAllLocations();
    displayAllDepartments();
});