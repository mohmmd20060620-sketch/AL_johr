let btn_index = document.querySelector(".btn_index");
let p_index = document.querySelector(".pindex");
let fullname = document.querySelector(".fullname");
let age = document.querySelector(".age");
let email = document.querySelector(".email");
let phone = document.querySelector(".phone");
let password = document.querySelector(".password");
let hint = document.querySelector(".hint");
let login = document.querySelector(".login");


let addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

if (btn_index && p_index) {
    btn_index.onclick = function() {
        p_index.style.visibility = "visible";
    };
    btn_index.ondblclick = function() {
        p_index.style.visibility = "hidden";
    };
}

if (hint) {
    hint.ondblclick = function(event) {
        event.preventDefault(); 
        fullname.value = "محمد عماد علي الخليدي";
        age.value = "23";
        email.value = "mohamed.3alaa@gmail.com";
        phone.value = "771793873";
        password.value = "123456";
        window.alert("تم التلميح بنجاح");
    };

    hint.onclick = function(event) {
        event.preventDefault(); 
        fullname.value = "";
        age.value = "";
        email.value = "";
        phone.value = "";
        password.value = "";
    };
}

if (login) {
    login.onclick = function(event) {
        window.alert("تم تسجيل البيانات بنجاح");
    };
}

// تطبيق حدث الضغط على كافة أزرار السلة في الصفحة
if (addToCartBtns.length > 0) {
    addToCartBtns.forEach(function(btn) {
        btn.onclick = function(event) {
            btn.innerHTML = "تم التسوق بنجاح";
            btn.style.backgroundColor = "green";
        };
    });
}