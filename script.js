// ==========================================
// 1. التحديد المباشر للعناصر الأولية
// ==========================================
let btn_index = document.querySelector(".btn_index");
let p_index = document.querySelector(".pindex");
let fullname = document.querySelector(".fullname");
let age = document.querySelector(".age");
let email = document.querySelector(".email");
let phone = document.querySelector(".phone");
let password = document.querySelector(".password");
let hint = document.querySelector(".hint");
let login = document.querySelector(".login");
let loginUser = document.querySelector(".user");
let newaccount = document.querySelector(".newaccount");
let addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

// إظهار وإخفاء الفقرة عند الضغط
if (btn_index && p_index) {
    btn_index.onclick = function() {
        p_index.style.visibility = "visible";
    };
    btn_index.ondblclick = function() {
        p_index.style.visibility = "hidden";
    };
}

// زر التلميح والتعبئة التلقائية
if (hint) {
    hint.ondblclick = function(event) {
        event.preventDefault(); 
        if (fullname) fullname.value = "محمد عماد علي الخليدي";
        if (age) age.value = "23";
        if (email) email.value = "mohamed.3alaa@gmail.com";
        if (phone) phone.value = "771793873";
        if (password) password.value = "123456";
        if (loginUser) loginUser.value = "admin";
        window.alert("تم التلميح بنجاح");
    };

    hint.onclick = function(event) {
        event.preventDefault(); 
        if (fullname) fullname.value = "";
        if (age) age.value = "";
        if (email) email.value = "";
        if (phone) phone.value = "";
        if (password) password.value = "";
        if (loginUser) loginUser.value = "";
    };
}

// زر تسجيل البيانات
if (login) {
    login.onclick = function(event) {
        window.alert("تم تسجيل البيانات بنجاح");
    };
}

// زر إنشاء حساب جديد
if (newaccount) {
    newaccount.onclick = function(event) {
        window.alert("قم بتسجيل حساب جديد الان");
        window.location.href = "Newaccount.html";
    };
}



// ==========================================
// 2. إدارة السلة وسجل الطلبات وتطابق البيانات (LocalStorage)
// ==========================================

var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
var ordersHistory = JSON.parse(localStorage.getItem("ordersHistory")) || [
    {
        id: "1001",
        date: "2026-02-15",
        total: 23000,
        status: "تم التسليم",
        items: [{ name: "ملابس / أحذية", price: 23000 }]
    },
    {
        id: "1002",
        date: "2026-02-20",
        total: 8500,
        status: "قيد التوصيل",
        items: [{ name: "وجبات مطعم كرسبي", price: 8500 }]
    }
];

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function saveOrders() {
    localStorage.setItem("ordersHistory", JSON.stringify(ordersHistory));
}

function handleLogin() {
    var userElem = document.getElementById("loginUser");
    var passElem = document.getElementById("loginPass");
    var msgDiv = document.getElementById("loginMsg");
    
    if (!userElem || !passElem || !msgDiv) return;

    var user = userElem.value.trim();
    var pass = passElem.value.trim();
    
    if (user === "admin" && pass === "1234") {
        msgDiv.className = "msg-box msg-success";
        msgDiv.innerHTML = "تم تسجيل الدخول بنجاح!";
        
        setTimeout(function() {
            var loginSec = document.getElementById("loginSection");
            var cartSec = document.getElementById("cartSection");
            if (loginSec) loginSec.style.display = "none";
            if (cartSec) cartSec.style.display = "block";
        }, 400);
    } else {
        msgDiv.className = "msg-box msg-error";
        msgDiv.innerHTML = "قيم غير صحيحة! يرجى إدخال اسم المستخدم وكلمة السر الصحيحة.";
    }
}

function clearCart() {
    // 1. التأكد من أن السلة ليست فارغة بالفعل
    if (!cartItems || cartItems.length === 0) {
        alert("السلة فارغة بالفعل!");
        return;
    }

    // 2. تأكيد إفراغ السلة من المستخدم
    if (confirm("هل أنت تأكد من رغبتك في إفراغ السلة بالكامل؟")) {
        // 3. تفريغ المصفوفة البرمجية
        cartItems = [];

        // 4. حفظ التعديل في الـ LocalStorage (تفريغ المفتاح)
        saveCart(); // أو localStorage.setItem("cartItems", JSON.stringify([]));

        // 5. إعادة تحديث ورسم الجدول في الواجهة
        renderCartTable();

        // 6. إذا كانت هناك أزرار منتجات محددة كـ "في السلة"، يعاد تعيين استايلها
        document.querySelectorAll(".product-card").forEach(function(card) {
            card.classList.remove("in-cart");
            var btn = card.querySelector("button");
            if (btn) {
                btn.textContent = "إضافة إلى السلة";
                btn.style.backgroundColor = "#3498db";
            }
        });

        alert("تم إفراغ السلة بنجاح!");
    }
}

// إضافة المعامل storeName لدالة التبديل
// تعديل دالة عرض الجدول لتقرأ اسم المحل الديناميكي

// 1. دالة إضافة / إزالة المنتج من السلة
function toggleCartItem(id, name, price, storeName, qty, button) {
    var card = button ? button.closest(".product-card") : document.querySelector('.product-card[data-id="' + id + '"]');
    var targetBtn = button || (card ? card.querySelector("button") : null);

    // تحويل الكمية والسعر إلى أرقام صريحة لتجنب الدمج النصي
    var parsedQty = parseInt(qty, 10);
    if (isNaN(parsedQty) || parsedQty < 1) {
        parsedQty = 1;
    }
    var parsedPrice = Number(price) || 0;

    var index = cartItems.findIndex(function(item) { return item.id === id; });
    
    if (index === -1) {
        cartItems.push({ 
            id: id, 
            name: name, 
            price: parsedPrice, 
            store: storeName || "عام",
            quantity: parsedQty // حفظ الكمية كرقم صحيح
        });
        
        if (card) card.classList.add("in-cart");
        if (targetBtn) {
            targetBtn.textContent = "إزالة من السلة";
            targetBtn.style.backgroundColor = "green";
        }
    } else {
        cartItems.splice(index, 1);
        if (card) card.classList.remove("in-cart");
        if (targetBtn) {
            targetBtn.textContent = "إضافة إلى السلة";
            targetBtn.style.backgroundColor = "#3498db";
        }
    }
    saveCart();
    renderCartTable();
}

// 2. دالة تحديث الكمية مباشرة من داخل جدول السلة
function updateCartQuantity(id, newQty) {
    var qty = parseInt(newQty);
    if (isNaN(qty) || qty < 1) {
        qty = 1;
    }

    var item = cartItems.find(function(item) { return item.id === id; });
    if (item) {
        item.quantity = qty;
        saveCart();
        renderCartTable();
    }
}

// 3. دالة عرض جدول السلة مع إمكانية تعديل الكمية
function renderCartTable() {
    var tbody = document.getElementById("cartTableBody");
    var totalElem = document.getElementById("cartTotalPrice");
    if (!tbody) return;

    tbody.innerHTML = "";
    var total = 0;

    if (cartItems.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>السلة فارغة حالياً</td></tr>";
    } else {
        cartItems.forEach(function(item) {
            var itemQty = item.quantity || 1;
            var itemTotalPrice = item.price * itemQty;
            total += itemTotalPrice;

            var tr = document.createElement("tr");
            
            // إضافة حقل <input> في خانة الكمية ليتمكن المستخدم من تعديلها داخل السلة في أي وقت
            tr.innerHTML = "<td>" + item.name + "</td>" +
                           "<td>" + item.store + "</td>" +
                           "<td><input type='number' min='1' value='" + itemQty + "' style='width: 55px; text-align: center;' onchange=\"updateCartQuantity('" + item.id + "', this.value)\" onkeyup=\"updateCartQuantity('" + item.id + "', this.value)\"></td>" +
                           "<td>" + item.price + " ريال</td>" +
                           "<td>" + itemTotalPrice + " ريال</td>";
                           
            tbody.appendChild(tr);
        });
    }

    if (totalElem) {
        totalElem.textContent = total + " ريال";
    }
}


function checkout() {
    // 1. التحقق من وجود عناصر في السلة
    if (!cartItems || cartItems.length === 0) {
        alert("السلة فارغة! يرجى إضافة منتجات أولاً.");
        return;
    }

    // 2. حساب إجمالي الطلب شاملاً كل الكميات المحدثة
    var totalAmount = 0;
    cartItems.forEach(function(item) {
        var qty = Number(item.quantity) || 1;
        var price = Number(item.price) || 0;
        totalAmount += (price * qty);
    });

    // 3. قراءة سجل الطلبات السابق من localStorage
    var orders = JSON.parse(localStorage.getItem("ordersHistory")) || JSON.parse(localStorage.getItem("orders")) || [];

    // 4. توليد رقم طلب جديد تلقائياً
    var newOrderId = "#" + (1001 + orders.length);

    // 5. الحصول على التاريخ الحالي
    var today = new Date().toISOString().split('T')[0];

    // 6. إنشاء كائن الطلب الجديد
    var newOrder = {
        id: newOrderId,
        date: today,
        total: totalAmount,
        status: "قيد المراجعة",
        items: JSON.parse(JSON.stringify(cartItems)) // حفظ نسخة من العناصر بالكميات الحالية
    };

    // 7. حفظ الطلب في مصفوفة الطلبات بالـ localStorage
    orders.unshift(newOrder);
    localStorage.setItem("ordersHistory", JSON.stringify(orders));
    localStorage.setItem("orders", JSON.stringify(orders)); // للحفاظ على التوافق

    // 8. تفريغ السلة وتحديث الواجهة
    cartItems = [];
    if (typeof saveCart === "function") saveCart();
    if (typeof renderCartTable === "function") renderCartTable();

    // 9. تنبيه المستخدم والتوجيه لصفحة الطلبات
    alert("تم إرسال طلبك بنجاح!\nرقم الطلب: " + newOrderId + "\nالإجمالي: " + totalAmount + " ريال");
    
    // التوجيه إلى صفحة الطلبات (تأكد من اسم الملف لديك)
    window.location.href = "orders.html";
}

// عرض قائمة الطلبات داخل صفحة orders.html
function renderOrdersTable() {
    var tbody = document.getElementById("ordersTableBody");
    if (!tbody) return;

    var orders = JSON.parse(localStorage.getItem("ordersHistory")) || JSON.parse(localStorage.getItem("orders")) || [];
    tbody.innerHTML = "";

    if (orders.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>لا توجد طلبات سابقة حتى الآن</td></tr>";
        return;
    }

    orders.forEach(function(order) {
        var tr = document.createElement("tr");

        // تنظيف المعرف تماماً من علامات # المكررة
        var rawId = String(order.id).replace(/#/g, ''); 
        var displayId = "#" + rawId; // للعرض المنسق فقط

        var totalFormatted = Number(order.total) ? Number(order.total).toLocaleString() + " ريال" : "0 ريال";

        // نمرر rawId الخالي من # لتفادي مشاكل الـ JavaScript
        tr.innerHTML = "<td>" + displayId + "</td>" +
                       "<td>" + order.date + "</td>" +
                       "<td>" + totalFormatted + "</td>" +
                       "<td>" + order.status + "</td>" +
                       "<td><button class='view-btn' onclick=\"showOrderDetails('" + rawId + "')\">عرض</button></td>";

        tbody.appendChild(tr);
    });
}

// عرض تفاصيل الطلب في النافذة المنبثقة
function showOrderDetails(rawId) {
    var orders = JSON.parse(localStorage.getItem("ordersHistory")) || JSON.parse(localStorage.getItem("orders")) || [];
    
    // البحث عن الطلب مع تجريد الـ ID من علامات المربع #
    var order = orders.find(function(o) { 
        return String(o.id).replace(/#/g, '') === String(rawId).replace(/#/g, ''); 
    });

    if (!order) {
        alert("لم يتم العثور على تفاصيل هذا الطلب!");
        return;
    }

    // بناء قائمة المنتجات المشتراة
    var itemsListHtml = "";
    if (order.items && order.items.length > 0) {
        order.items.forEach(function(item) {
            var qty = Number(item.quantity) || 1;
            var itemTotal = Number(item.price) * qty;
            itemsListHtml += "<li style='border-bottom: 1px dashed #ccc; padding: 5px 0;'>" + 
                                "<strong>" + item.name + "</strong> (" + (item.store || "عام") + ")<br>" + 
                                "الكمية: " + qty + " × " + item.price + " ريال = <strong>" + itemTotal.toLocaleString() + " ريال</strong>" +
                             "</li>";
        });
    } else {
        itemsListHtml = "<li>لا توجد تفاصيل للمنتجات في هذا الطلب</li>";
    }

    // تعبئة البيانات داخل العناصر المحددة بالـ IDs
    document.getElementById("modalOrderId").textContent = "طلب رقم #" + String(order.id).replace(/#/g, '');
    document.getElementById("modalOrderDate").textContent = "التاريخ: " + order.date;
    document.getElementById("modalOrderStatus").textContent = "الحالة: " + order.status;
    document.getElementById("modalOrderItems").innerHTML = itemsListHtml;
    document.getElementById("modalOrderTotal").textContent = "الإجمالي: " + Number(order.total).toLocaleString() + " ريال";

    // إظهار النافذة
    var modal = document.getElementById("orderDetailsModal");
    if (modal) {
        modal.style.display = "block";
    }
}

function closeOrderModal() {
    var modal = document.getElementById("orderDetailsModal");
    if (modal) {
        modal.style.display = "none";
    }
}
function previewCartDetails() {
    if (!cartItems || cartItems.length === 0) {
        alert("السلة فارغة حالياً!");
        return;
    }

    var detailsText = "تفاصيل السلة الحالية:\n\n";
    var total = 0;

    cartItems.forEach(function(item, index) {
        var qty = Number(item.quantity) || 1;
        var subtotal = Number(item.price) * qty;
        total += subtotal;
        detailsText += (index + 1) + ". " + item.name + " (" + item.store + ")\n" +
                       "   الكمية: " + qty + " | السعر: " + item.price + " ريال | الإجمالي: " + subtotal + " ريال\n\n";
    });

    detailsText += "التكلفة الإجمالية: " + total.toLocaleString() + " ريال";
    alert(detailsText);
}

function closeOrderModal() {
    var modal = document.getElementById("orderDetailsModal");
    if (modal) modal.style.display = "none";
}

function closeOrderDetailsModal() {
    var modal = document.getElementById("orderDetailsModal");
    if (modal) modal.style.display = "none";
}

// تحديث حالة الأزرار عند التنقل بين صفحات المنتجات
function syncProductButtons() {
    cartItems.forEach(function(item) {
        var card = document.getElementById("product-" + item.id);
        if (card) {
            card.classList.add("in-cart");
            var btn = card.querySelector("button");
            if (btn) btn.textContent = "ازالة من السلة";
        }
    });
}

// ==========================================
// 3. أحداث النماذج وحقول الإدخال
// ==========================================

function handleInputFocus(inputElement) {
    inputElement.style.backgroundColor = "#fffde7";
    let status = document.getElementById("formStatus");
    if (status) status.innerHTML = "تنبيه: أنت الآن داخل حقل الإدخال";
}

function handleInputBlur(inputElement) {
    inputElement.style.backgroundColor = "#ffffff";
    let status = document.getElementById("formStatus");
    if (status) status.innerHTML = "تنبيه: خرجت من حقل الإدخال";
}

function handleInputTextChange(inputElement) {
    var currentText = inputElement.value;
    let status = document.getElementById("formStatus");
    if (status) status.innerHTML = "الكتابة الحالية: " + currentText + " (عدد الحروف: " + currentText.length + ")";
}

function handleSelectChange(selectElement) {
    var selectedValue = selectElement.value;
    let status = document.getElementById("formStatus");
    if (status) status.innerHTML = "تم اختيار الدولة: " + (selectedValue ? selectedValue : "لم يتم الاختيار");
}

function handleRadioChange(radioElement) {
    let status = document.getElementById("formStatus");
    if (status) status.innerHTML = "تم الاختيار: " + radioElement.value;
}

function handleCheckboxChange(checkboxElement) {
    let status = document.getElementById("formStatus");
    if (status) {
        if (checkboxElement.checked) {
            status.innerHTML = "تمت الموافقة على الشروط والأحكام ✓";
        } else {
            status.innerHTML = "لم تتم الموافقة على الشروط ✗";
        }
    }
}

function handleInvalidInput(inputElement) {
    let status = document.getElementById("formStatus");
    if (status) status.innerHTML = "<span style='color:red;'>خطأ: هذا الحقل مطلوب ولا يمكن تركه فارغاً!</span>";
}

function handleFormSubmit(event) {
    event.preventDefault();
    let status = document.getElementById("formStatus");
    if (status) status.innerHTML = "<span style='color:green;'>تم إرسال النموذج بنجاح ورصد البيانات!</span>";
}

function checkCommentsLength(textarea) {
    if (textarea.value.length > 100) {
        textarea.value = textarea.value.substring(0, 100);
        alert("تنبيه: تم إدخال أكثر من 100 محرف. تم حذف المحارف الزائدة.");
    }
}

// تنفيذ التهيئة عند تحميل المستند
document.addEventListener("DOMContentLoaded", function() {
    renderCartTable();
    renderOrdersTable();
    syncProductButtons();
});