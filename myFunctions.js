// بيانات التطبيقات المخزنة
const appsData = [
    {
        name: "ChatGPT",
        company: "OpenAI",
        category: "Education",
        pricing: "مجاني",
        website: "https://chat.openai.com",
        description: "ChatGPT هو روبوت محادثة ذكي يستخدم الذكاء الاصطناعي للرد على الأسئلة والمساعدة في المهام المختلفة. يمكنه الكتابة والترجمة والبرمجة وحل المشكلات.",
        logo: "🖼️ شعار ChatGPT",
        audio: "🔊 ملف صوتي توضيحي",
        video: "🎬 فيديو تعريفي"
    },
    {
        name: "Midjourney",
        company: "Midjourney Inc",
        category: "Design",
        pricing: "غير مجاني",
        website: "https://www.midjourney.com",
        description: "أداة ذكاء اصطناعي متقدمة لإنشاء الصور الفنية والرسومات من خلال الأوصاف النصية. تستخدم تقنيات التعلم العميق لإنتاج أعمال فنية مذهلة.",
        logo: "🖼️ شعار Midjourney",
        audio: "🔊 ملف صوتي توضيحي", 
        video: "🎬 فيديو تعريفي"
    },
    {
        name: "Google Bard",
        company: "Google",
        category: "Education",
        pricing: "مجاني",
        website: "https://bard.google.com",
        description: "مساعد ذكي من جوجل يعتمد على الذكاء الاصطناعي للمساعدة في الإبداع وحل المشكلات والبحث المتقدم. يدعم العديد من اللغات including العربية.",
        logo: "🖼️ شعار Google Bard",
        audio: "🔊 ملف صوتي توضيحي",
        video: "🎬 فيديو تعريفي"
    },
    {
        name: "Alexa",
        company: "Amazon",
        category: "E-Commerce",
        pricing: "مجاني",
        website: "https://developer.amazon.com/alexa",
        description: "مساعد افتراضي ذكي للتحكم بالمنزل الذكي والتسوق عبر الإنترنت. يتفهم الأوامر الصوتية وينفذ المهام المختلفة تلقائياً.",
        logo: "🖼️ شعار Alexa",
        audio: "🔊 ملف صوتي توضيحي",
        video: "🎬 فيديو تعريفي"
    },
    {
        name: "IBM Watson",
        company: "IBM", 
        category: "Healthcare",
        pricing: "غير مجاني",
        website: "https://www.ibm.com/watson",
        description: "منصة ذكاء اصطناعي متقدمة للمؤسسات تحلل البيانات الضخمة لاتخاذ قرارات أفضل في مجالات الصحة والتمويل والتجارة.",
        logo: "🖼️ شعار IBM Watson",
        audio: "🔊 ملف صوتي توضيحي",
        video: "🎬 فيديو تعريفي"
    }
];

// دالة التهيئة عند تحميل الصفحة
$(document).ready(function() {
    console.log("تم تحميل الموقع بنجاح - SmartScope");
    
    // التعامل مع صفحة التطبيقات
    if (window.location.pathname.includes('apps.html') || window.location.pathname.endsWith('apps.html')) {
        initAppsPage();
    }

    // التعامل مع صفحة إضافة التطبيق
    if (window.location.pathname.includes('add_app.html') || window.location.pathname.endsWith('add_app.html')) {
        initAddAppPage();
    }

    // التعامل مع الصفحة الرئيسية
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        initHomePage();
    }

    // إضافة تأثيرات التنقل
    initNavigationEffects();
});

// تهيئة صفحة التطبيقات
function initAppsPage() {
    console.log("تهيئة صفحة التطبيقات...");
    
    // إضافة حدث للتحديدات
    $('.show-details').off('change').on('change', function() {
        const appIndex = $(this).data('app');
        const row = $(this).closest('tr');
        const detailsId = 'app-details-' + appIndex;
        
        if (this.checked) {
            // إخفاء جميع التفاصيل الأخرى أولاً
            $('.app-details-row').remove();
            // إظهار التفاصيل المطلوبة
            showAppDetails(appIndex, row);
        } else {
            // إخفاء التفاصيل
            $('#' + detailsId).remove();
        }
    });
    
    // أزرار التحكم
    $('#showAllDetails').on('click', showAllDetails);
    $('#hideAllDetails').on('click', hideAllDetails);
    
    // تحميل أي بيانات مخزنة محلياً
    loadStoredApps();
}

// تهيئة صفحة إضافة التطبيق
function initAddAppPage() {
    console.log("تهيئة صفحة إضافة التطبيق...");
    
    $('#appForm').off('submit').on('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    $('#resetBtn').off('click').on('click', function() {
        resetForm();
    });
    
    $('#testBtn').off('click').on('click', fillTestData);
    
    // إضافة التحقق الفوري للحقول
    $('#appName').on('blur', validateAppName);
    $('#companyName').on('blur', validateCompanyName);
    $('#website').on('blur', validateWebsite);
    $('#description').on('blur', validateDescription);
}

// تهيئة الصفحة الرئيسية
function initHomePage() {
    console.log("تهيئة الصفحة الرئيسية...");
    // يمكن إضافة أي دوال خاصة بالصفحة الرئيسية هنا
}

// تهيئة تأثيرات التنقل
function initNavigationEffects() {
    $('nav a').hover(
        function() {
            $(this).css('transform', 'translateY(-3px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
}

// إظهار تفاصيل التطبيق
function showAppDetails(appIndex, row) {
    if (appIndex < 0 || appIndex >= appsData.length) {
        console.error('رقم التطبيق غير صحيح:', appIndex);
        return;
    }
    
    const app = appsData[appIndex];
    const detailsId = 'app-details-' + appIndex;
    
    const detailsHTML = `
        <tr id="${detailsId}" class="app-details-row">
            <td colspan="5">
                <div class="app-details-content">
                    <h3>📱 تفاصيل تطبيق ${app.name}</h3>
                    <div class="details-grid">
                        <div class="detail-item">
                            <strong>🌐 الموقع الإلكتروني:</strong>
                            <a href="${app.website}" target="_blank" style="color: #ffeaa7;">${app.website}</a>
                        </div>
                        <div class="detail-item">
                            <strong>📝 الشرح المختصر:</strong>
                            <p>${app.description}</p>
                        </div>
                        <div class="detail-item">
                            <strong>📁 الوسائط المتعددة:</strong>
                            <div class="media-container">
                                <span class="media-item">${app.logo}</span>
                                <span class="media-item">${app.audio}</span>
                                <span class="media-item">${app.video}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `;
    
    $(detailsHTML).insertAfter(row);
    
    // إضافة تأثير الظهور
    $('#' + detailsId).hide().fadeIn(500);
}

// إظهار كل التفاصيل
function showAllDetails() {
    $('.app-details-row').remove();
    $('.show-details').each(function() {
        const appIndex = $(this).data('app');
        const row = $(this).closest('tr');
        $(this).prop('checked', true);
        showAppDetails(appIndex, row);
    });
}

// إخفاء كل التفاصيل
function hideAllDetails() {
    $('.app-details-row').remove();
    $('.show-details').prop('checked', false);
}

// التحقق من صحة النموذج
function validateForm() {
    let isValid = true;
    const errorMessages = [];

    // التحقق من اسم التطبيق
    if (!validateAppName()) {
        isValid = false;
        errorMessages.push('اسم التطبيق غير صحيح');
    }

    // التحقق من اسم الشركة
    if (!validateCompanyName()) {
        isValid = false;
        errorMessages.push('اسم الشركة غير صحيح');
    }

    // التحقق من الموقع الإلكتروني
    if (!validateWebsite()) {
        isValid = false;
        errorMessages.push('الموقع الإلكتروني غير صحيح');
    }

    // التحقق من اختيار التسعير
    const pricing = $('input[name="pricing"]:checked').val();
    if (!pricing) {
        isValid = false;
        errorMessages.push('الرجاء اختيار نوع التسعير');
        $('#free').addClass('error');
    } else {
        $('#free, #paid').removeClass('error');
    }

    // التحقق من مجال الاستخدام
    const category = $('#category').val();
    if (!category) {
        isValid = false;
        errorMessages.push('الرجاء اختيار مجال الاستخدام');
        $('#category').addClass('error');
    } else {
        $('#category').removeClass('error');
    }

    // التحقق من الشرح المختصر
    if (!validateDescription()) {
        isValid = false;
        errorMessages.push('الشرح المختصر غير صحيح');
    }

    // عرض جميع الأخطاء معاً
    if (!isValid) {
        showError('يرجى تصحيح الأخطاء التالية:<br>' + errorMessages.join('<br>'));
    }

    return isValid;
}

// التحقق من اسم التطبيق
function validateAppName() {
    const appName = $('#appName').val().trim();
    const nameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
    
    if (appName === '') {
        $('#appName').removeClass('error').removeClass('success');
        return false;
    }
    
    if (!nameRegex.test(appName)) {
        $('#appName').addClass('error').removeClass('success');
        showError('اسم التطبيق يجب أن:<br>- يبدأ بحرف إنجليزي<br>- يحتوي على أحرف وأرقام إنجليزية فقط<br>- بدون فراغات أو رموز خاصة');
        return false;
    }
    
    $('#appName').removeClass('error').addClass('success');
    hideMessages();
    return true;
}

// التحقق من اسم الشركة
function validateCompanyName() {
    const companyName = $('#companyName').val().trim();
    const nameRegex = /^[A-Za-z][A-Za-z0-9\s]*$/;
    
    if (companyName === '') {
        $('#companyName').removeClass('error').removeClass('success');
        return false;
    }
    
    if (!nameRegex.test(companyName)) {
        $('#companyName').addClass('error').removeClass('success');
        showError('اسم الشركة يجب أن:<br>- يبدأ بحرف إنجليزي<br>- يحتوي على أحرف وأرقام إنجليزية فقط<br>- يمكن أن يحتوي على فراغات');
        return false;
    }
    
    $('#companyName').removeClass('error').addClass('success');
    hideMessages();
    return true;
}

// التحقق من الموقع الإلكتروني
function validateWebsite() {
    const website = $('#website').val().trim();
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    
    if (website === '') {
        $('#website').removeClass('error').removeClass('success');
        return false;
    }
    
    if (!urlRegex.test(website)) {
        $('#website').addClass('error').removeClass('success');
        showError('الرجاء إدخال عنوان موقع إلكتروني صحيح<br>مثال: https://www.example.com');
        return false;
    }
    
    $('#website').removeClass('error').addClass('success');
    hideMessages();
    return true;
}

// التحقق من الشرح المختصر
function validateDescription() {
    const description = $('#description').val().trim();
    
    if (description === '') {
        $('#description').removeClass('error').removeClass('success');
        return false;
    }
    
    if (description.length < 10) {
        $('#description').addClass('error').removeClass('success');
        showError('الشرح المختصر يجب أن يكون على الأقل 10 أحرف');
        return false;
    }
    
    $('#description').removeClass('error').addClass('success');
    hideMessages();
    return true;
}

// ملء بيانات تجريبية
function fillTestData() {
    $('#appName').val('TestApp');
    $('#companyName').val('Test Company');
    $('#website').val('https://www.testapp.com');
    $('#free').prop('checked', true);
    $('#category').val('Education');
    $('#description').val('هذا تطبيق تجريبي لاختبار وظائف الموقع. يحتوي على مميزات متعددة للذكاء الاصطناعي.');
    
    // تطبيق التنسيق الناجح
    $('input, textarea, select').removeClass('error').addClass('success');
    
    showSuccess('تم ملء البيانات التجريبية بنجاح!');
}

// إرسال النموذج
function submitForm() {
    // جمع البيانات من النموذج
    const formData = {
        name: $('#appName').val().trim(),
        company: $('#companyName').val().trim(),
        website: $('#website').val().trim(),
        pricing: $('input[name="pricing"]:checked').val(),
        category: $('#category').val(),
        description: $('#description').val().trim(),
        timestamp: new Date().toISOString()
    };
    
    // حفظ البيانات محلياً
    const saveResult = saveAppData(formData);
    
    if (saveResult) {
        // عرض رسالة النجاح
        showSuccess('تم إضافة التطبيق بنجاح!<br>جاري التوجيه إلى صفحة التطبيقات...');
        
        // الانتقال إلى صفحة التطبيقات بعد ثانيتين
        setTimeout(function() {
            window.location.href = 'apps.html';
        }, 2000);
    } else {
        showError('حدث خطأ في حفظ البيانات. يرجى المحاولة مرة أخرى.');
    }
}

// إعادة تعيين النموذج
function resetForm() {
    $('#appForm')[0].reset();
    $('input, select, textarea').removeClass('error').removeClass('success');
    hideMessages();
    console.log("تم إعادة تعيين النموذج");
}

// حفظ بيانات التطبيق
function saveAppData(appData) {
    try {
        // الحصول على التطبيقات المخزنة مسبقاً
        let storedApps = JSON.parse(localStorage.getItem('smartscope_apps')) || [];
        
        // إضافة التطبيق الجديد
        storedApps.push(appData);
        
        // حفظ في localStorage
        localStorage.setItem('smartscope_apps', JSON.stringify(storedApps));
        
        console.log('تم حفظ التطبيق:', appData);
        return true;
    } catch (error) {
        console.error('خطأ في حفظ البيانات:', error);
        return false;
    }
}

// تحميل التطبيقات المخزنة
function loadStoredApps() {
    try {
        const storedApps = JSON.parse(localStorage.getItem('smartscope_apps')) || [];
        
        if (storedApps.length > 0) {
            console.log('تم تحميل التطبيقات المخزنة:', storedApps.length);
            displayStoredApps(storedApps);
        }
        
        return storedApps;
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        return [];
    }
}

// عرض التطبيقات المخزنة
function displayStoredApps(storedApps) {
    const container = $('#dynamicAppsContainer');
    let html = '';
    
    storedApps.forEach((app, index) => {
        const appNumber = appsData.length + index;
        html += `
            <tr>
                <td>${app.name}</td>
                <td>${app.company}</td>
                <td>${app.category}</td>
                <td>${app.pricing}</td>
                <td><input type="checkbox" class="show-details" data-app="${appNumber}"></td>
            </tr>
        `;
        
        // إضافة إلى appsData للعرض
        appsData.push({
            name: app.name,
            company: app.company,
            category: app.category,
            pricing: app.pricing,
            website: app.website,
            description: app.description,
            logo: "🖼️ شعار التطبيق",
            audio: "🔊 ملف صوتي",
            video: "🎬 فيديو"
        });
    });
    
    if (html) {
        $(html).appendTo('#appsTable tbody');
        // إعادة ربط الأحداث للتطبيقات الجديدة
        $('.show-details').off('change').on('change', function() {
            const appIndex = $(this).data('app');
            const row = $(this).closest('tr');
            
            if (this.checked) {
                $('.app-details-row').remove();
                showAppDetails(appIndex, row);
            } else {
                $('#app-details-' + appIndex).remove();
            }
        });
    }
}

// عرض رسالة الخطأ
function showError(message) {
    hideMessages();
    
    const errorHTML = `
        <div class="message error-message">
            <span class="message-icon">❌</span>
            <div class="message-content">${message}</div>
            <button class="message-close" onclick="hideMessages()">×</button>
        </div>
    `;
    
    $('main').prepend(errorHTML);
    $('.error-message').hide().fadeIn(300);
}

// عرض رسالة النجاح
function showSuccess(message) {
    hideMessages();
    
    const successHTML = `
        <div class="message success-message">
            <span class="message-icon">✅</span>
            <div class="message-content">${message}</div>
            <button class="message-close" onclick="hideMessages()">×</button>
        </div>
    `;
    
    $('main').prepend(successHTML);
    $('.success-message').hide().fadeIn(300);
}

// إخفاء جميع الرسائل
function hideMessages() {
    $('.message').fadeOut(300, function() {
        $(this).remove();
    });
}

// دالة مساعدة لعرض البيانات (لتسهيل debugging)
function debugData() {
    console.log('=== SmartScope Debug Info ===');
    console.log('التطبيقات الأساسية:', appsData);
    console.log('التطبيقات المخزنة:', loadStoredApps());
    console.log('============================');
}

// جعل الدوال متاحة globally للاستدعاء من HTML
window.validateAppName = validateAppName;
window.validateCompanyName = validateCompanyName;
window.validateWebsite = validateWebsite;
window.validateDescription = validateDescription;
window.hideMessages = hideMessages;
window.debugData = debugData;
window.fillTestData = fillTestData;
window.showAllDetails = showAllDetails;
window.hideAllDetails = hideAllDetails;
