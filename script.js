document.addEventListener('DOMContentLoaded', function () {

    // 1. إظهار وإخفاء الإرشادات (DOM Manipulation & Show/Hide Toggle)
    const toggleBtn = document.getElementById('toggleBtn');
    const infoBox = document.getElementById('infoBox');

    if (toggleBtn && infoBox) {
        toggleBtn.addEventListener('click', function () {
            if (infoBox.style.display === 'none') {
                infoBox.style.display = 'block';
                toggleBtn.textContent = 'إخفاء الإرشادات';
            } else {
                infoBox.style.display = 'none';
                toggleBtn.textContent = 'إظهار الإرشادات';
            }
        });
    }

    // 2. التفاعل مع أزرار "أضف للسلة" (Events Click & Style DOM)
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.textContent = 'تمت الإضافة!';
            this.style.backgroundColor = '#27ae60';
        });
    });

    // 3. التحقق من صحة النموذج مع رسالة Popup منبثقة تحوي كل الأخطاء (Form Validation)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            let errors = [];

            if (fullname === '') {
                errors.push('- حقل الاسم الكامل مطلوب.');
            }
            if (email === '') {
                errors.push('- حقل البريد الإلكتروني مطلوب.');
            }
            if (password.length < 6) {
                errors.push('- كلمة المرور يجب ألا تقل عن 6 خانات.');
            }

            if (errors.length > 0) {
                alert('تنبيه! يرجى تصحيح الأخطاء التالية:\n' + errors.join('\n'));
            } else {
                alert('تم تسجيل الدخول بنجاح!');
                loginForm.reset();
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {

    // 1. التبديل بين أزرار الطوابق (Floor Switching Logic)
    const floorButtons = document.querySelectorAll('.floor-btn');
    const floorContents = document.querySelectorAll('.floor-content');

    if (floorButtons.length > 0) {
        floorButtons.forEach(button => {
            button.addEventListener('click', function () {
                // إزالة التفعيل من أزرار الطوابق وإخفاء محتواها
                floorButtons.forEach(btn => btn.classList.remove('active'));
                floorContents.forEach(content => content.classList.remove('active-floor'));

                // تفعيل الطابق المحدد
                this.classList.add('active');
                const targetFloorId = this.getAttribute('data-floor');
                const selectedFloor = document.getElementById(targetFloorId);
                
                if (selectedFloor) {
                    selectedFloor.classList.add('active-floor');
                }
            });
        });
    }

    // 2. التبديل بين أزرار المحلات داخل الطابق المختار (Shop Switching Logic)
    const shopButtons = document.querySelectorAll('.shop-btn');

    if (shopButtons.length > 0) {
        shopButtons.forEach(button => {
            button.addEventListener('click', function () {
                // العثور على الطابق الحالي الذي يحتوي على هذا الزر
                const parentFloor = this.closest('.floor-content');
                
                // إزالة التفعيل عن باقي أزرار المحلات والمحتوى داخل هذا الطابق فقط
                const currentShopButtons = parentFloor.querySelectorAll('.shop-btn');
                const currentShopContents = parentFloor.querySelectorAll('.shop-content');

                currentShopButtons.forEach(btn => btn.classList.remove('active'));
                currentShopContents.forEach(content => content.classList.remove('active-shop'));

                // تفعيل المحل المحدد
                this.classList.add('active');
                const targetShopId = this.getAttribute('data-shop');
                const selectedShop = parentFloor.querySelector('#' + targetShopId);

                if (selectedShop) {
                    selectedShop.classList.add('active-shop');
                }
            });
        });
    }

    // 3. التفاعل مع أزرار الإضافة للسلة (Click Events)
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.textContent = 'تمت الإضافة!';
            this.style.backgroundColor = '#27ae60';
        });
    });
});