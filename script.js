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

        var getitem = arrayitem.find(x => x.email === formdata.email);

        if(getitem != undefined) {
            getitem.firstname = formdata.firstname,
            getitem.lastname = formdata.lastname,
            getitem.email = formdata.email,
            getitem.password = formdata.password,
            getitem.telephone = formdata.telephone

            $('#firstname').attr('value', '');
            $('#lastname').attr('value', '');
            $('#email').attr('value', '');
            $('#password').attr('value', '');
            $('#telephone').attr('value', '');
        }else{
            arrayitem.push(formdata);
        }
        // console.log(getitem);

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

function EditItem(ele) {

    var allitem = JSON.parse(localStorage.getItem("arrayitem"));

    var edititem = allitem.find(x => x.email === ele);
    // console.log(edititem);

    $('#firstname').attr('value', edititem.firstname);
    $('#lastname').attr('value', edititem.lastname);
    $('#email').attr('value', edititem.email);
    $('#password').attr('value', edititem.password);
    $('#telephone').attr('value', edititem.telephone);

}