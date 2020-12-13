// Retrieves all departments
// function getAllDepartments() {
//     $.ajax({
//         url: "libs/php/getAllDepartments.php",
//         type: 'GET',
//         dataType: 'json',
//         success: function (result) {
//             console.log(result);
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             console.log(`Database error: ${textStatus}`);
//         }
//     });
// }

function getAllDepartments() {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                console.log("works");
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

getAllDepartments();

    
