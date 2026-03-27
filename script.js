/* 1) Put the current year in the footer */
var yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

/* 2) Dark / Light Mode Button */
var themeButton = document.getElementById("themeToggle");
var htmlTag = document.documentElement;

/* Keep saved theme if user changed it before */
var savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    htmlTag.setAttribute("data-theme", savedTheme);

    if (savedTheme === "dark") {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }
}

if (themeButton) {
    themeButton.addEventListener("click", function () {
        var currentTheme = htmlTag.getAttribute("data-theme");

        if (currentTheme === "dark") {
            htmlTag.setAttribute("data-theme", "light");
            themeButton.textContent = "🌙";
            localStorage.setItem("theme", "light");
        } else {
            htmlTag.setAttribute("data-theme", "dark");
            themeButton.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        }
    });
}

/* 3) Contact Form Validation */
var contactForm = document.getElementById("contactForm");
var statusText = document.getElementById("formStatus");

if (contactForm && statusText) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = contactForm.elements["name"].value.trim();
        var email = contactForm.elements["email"].value.trim();
        var message = contactForm.elements["message"].value.trim();

        if (name === "" || email === "" || message === "") {
            statusText.textContent = "Please fill in all fields.";
            statusText.style.color = "crimson";
            return;
        }

        statusText.textContent = "✅ Message sent successfully!";
        statusText.style.color = "green";
        contactForm.reset();

        setTimeout(function () {
            statusText.textContent = "";
        }, 3000);
    });
}

/* 4) Project Filtering Feature */
var filterButtons = document.querySelectorAll(".filter-btn");
var projectCards = document.querySelectorAll(".project-card");
var emptyMessage = document.getElementById("emptyMessage");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var selected = button.getAttribute("data-filter");
        var visibleCount = 0;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(function (card) {
            var category = card.getAttribute("data-category");

            if (selected === "all" || category === selected) {
                card.style.display = "block";
                visibleCount = visibleCount + 1;
            } else {
                card.style.display = "none";
            }
        });

        if (visibleCount === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display = "none";
        }
    });
});