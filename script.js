function calculateAge() {
    const birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        document.getElementById('result').innerHTML = "<p>الرجاء إدخال تاريخ الميلاد!</p>";
        return;
    }

    const today = new Date();
    const birthDate = new Date(birthdate);

    // حساب العمر بالسنوات والأشهر والأيام
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // حساب العمر بالهجري
    const hijriYear = Math.floor((today.getFullYear() - 622) * (33 / 32));
    const hijriAge = hijriYear - Math.floor((birthDate.getFullYear() - 622) * (33 / 32));

    // حساب الأيام المتبقية لعيد الميلاد القادم
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    // حساب يوم الأسبوع لعيد الميلاد القادم
    const daysOfWeek = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const nextBirthdayDay = daysOfWeek[nextBirthday.getDay()];

    // عرض النتيجة
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>عمرك هو: <strong>${years}</strong> سنة، <strong>${months}</strong> شهر، و <strong>${days}</strong> يوم</p>
        <p>عمرك بالهجري: <strong>${hijriAge}</strong> سنة</p>
        <p>الأيام المتبقية لعيد ميلادك القادم: <strong>${daysUntilBirthday}</strong> يوم</p>
        <p>عيد ميلادك القادم سيكون يوم: <strong>${nextBirthdayDay}</strong></p>
    `;
}