$(document).ready(() => {
    displaydata();

    $("#myform").submit((event) => {
        event.preventDefault();

        var formdata = {
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            telephone: $("#telephone").val(),
        };

        var arrayitem = JSON.parse(localStorage.getItem("arrayitem") || "[]");

        var edit = arrayitem.filter(x => x.email === formdata.email);

        if(edit.length == 1){
            arrayitem.forEach((e) => {
                if(e.email == edit[0].email){
                    e.firstname = formdata.firstname,
                    e.lastname = formdata.lastname,
                    e.email = formdata.email,
                    e.password = formdata.password,
                    e.telephone = formdata.telephone
                }   
            })
            $('#firstname').attr('value', '');
            $('#lastname').attr('value', '');
            $('#email').attr('value', '');
            $('#password').attr('value', '');
            $('#telephone').attr('value', '');

        }else{
            arrayitem.push(formdata);
        }

        localStorage.setItem("arrayitem", JSON.stringify(arrayitem));

        $("#myform").each(function () {
            this.reset();
        })

        displaydata();
    })
})

function displaydata() {

    $("#mytable").empty();
    var item = JSON.parse(localStorage.getItem("arrayitem"));
    item.forEach((elem) => {
        $("#mytable").append(
            `<tr>
            <td>${elem.firstname}</td>
            <td>${elem.lastname}</td>
            <td>${elem.email}</td>
            <td>${elem.password}</td>
            <td>${elem.telephone}</td>
            <td>
            <i id="delicon" class="fa-solid fa-trash fa-lg" onclick="deleteItem('${elem.email}')"></i>
            </td>
            <td>
            <i id ="editicon" class="fa-sharp fa-solid fa-pen-to-square fa-lg" onclick="EditItem('${elem.email}')"></i>
            </td>
            </tr>`
        )
    })


}

function deleteItem(ele) {

    var allitem = JSON.parse(localStorage.getItem("arrayitem"));
    const newitem = allitem.filter(x => x.email !== ele);

    localStorage.setItem("arrayitem", JSON.stringify(newitem));
    displaydata();
}

function EditItem(ele){

    var allitem = JSON.parse(localStorage.getItem("arrayitem"));

    var edititem = allitem.filter(x => x.email === ele);
    // console.log(edititem);

    $('#firstname').attr('value', edititem[0].firstname);
    $('#lastname').attr('value', edititem[0].lastname);
    $('#email').attr('value', edititem[0].email);
    $('#password').attr('value', edititem[0].password);
    $('#telephone').attr('value', edititem[0].telephone);

}