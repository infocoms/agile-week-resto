document.getElementById('email').addEventListener("input", checkemail());


function checkemail () {
    let input = document.getElementById("email");
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value))
    {
       input.addClass = "bg-error";
    }
    input.style.border.color = "red";

}
