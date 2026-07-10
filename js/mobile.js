document.addEventListener("DOMContentLoaded", function () {
    // Prevent double injection
    if (document.querySelector(".custom-mobile-burger")) return;

    const navbarWr = document.querySelector(".navbar-wr");
    if (!navbarWr) return;

    // Create and append custom hamburger button
    const burgerBtn = document.createElement("button");
    burgerBtn.className = "custom-mobile-burger";
    burgerBtn.setAttribute("aria-label", "Toggle Menu");
    burgerBtn.style.display = "none";
    burgerBtn.innerHTML = "<span></span><span></span><span></span>";
    navbarWr.appendChild(burgerBtn);

    // Create and append custom overlay and menu drawer to body
    const overlay = document.createElement("div");
    overlay.className = "custom-mobile-overlay";
    overlay.style.display = "none";
    document.body.appendChild(overlay);

    const menuDrawer = document.createElement("div");
    menuDrawer.className = "custom-mobile-menu";
    menuDrawer.style.display = "none";
    menuDrawer.innerHTML = `
        <ul class="mobile-nav-list">
            <li class="mobile-nav-item">
                <a href="index.html" class="mobile-nav-link">Home</a>
            </li>
            <li class="mobile-nav-item">
                <div class="mobile-nav-link" data-toggle="services">
                    Services <span class="mobile-arrow">▶</span>
                </div>
                <ul class="mobile-submenu" id="submenu-services">
                    <li><a href="services.html#cyber-security" class="mobile-submenu-link">• Cyber Security</a></li>
                    <li><a href="services.html#support-services" class="mobile-submenu-link">• Support Services</a></li>
                    <li><a href="services.html#cloud-services" class="mobile-submenu-link">• Cloud Services</a></li>
                </ul>
            </li>
            <li class="mobile-nav-item">
                <div class="mobile-nav-link" data-toggle="solutions">
                    Solutions <span class="mobile-arrow">▶</span>
                </div>
                <ul class="mobile-submenu" id="submenu-solutions">
                    <li><a href="solutions.html#internet-voip" class="mobile-submenu-link">• Internet &amp; VOIP</a></li>
                    <li><a href="solutions.html#it-consulting" class="mobile-submenu-link">• IT Consulting</a></li>
                    <li><a href="solutions.html#operational-resilience" class="mobile-submenu-link">• Operational Resilience</a></li>
                    <li><a href="solutions.html#cx-test-automation" class="mobile-submenu-link">• CX Test Automation</a></li>
                    <li><a href="solutions.html#conversational-ai" class="mobile-submenu-link">• Conversational AI</a></li>
                </ul>
            </li>
            <li class="mobile-nav-item">
                <div class="mobile-nav-link" data-toggle="industries">
                    Industries <span class="mobile-arrow">▶</span>
                </div>
                <ul class="mobile-submenu" id="submenu-industries">
                    <li><a href="industries.html#financial" class="mobile-submenu-link">• Professional Services</a></li>
                    <li><a href="industries.html#healthcare" class="mobile-submenu-link">• Healthcare &amp; NDIS</a></li>
                    <li><a href="industries.html#legal" class="mobile-submenu-link">• Law Firm</a></li>
                    <li><a href="industries.html#all-industries" class="mobile-submenu-link">• Co-Managed IT</a></li>
                </ul>
            </li>
            <li class="mobile-nav-item">
                <a href="compliance-privacy.html" class="mobile-nav-link">Compliance</a>
            </li>
            <li class="mobile-nav-item">
                <a href="about.html" class="mobile-nav-link">About Us</a>
            </li>
            <li class="mobile-nav-item">
                <a href="contact.html" class="mobile-nav-link">Contact</a>
            </li>
        </ul>
    `;
    document.body.appendChild(menuDrawer);

    // Toggle Menu Open/Closed
    function toggleMenu() {
        const isActive = burgerBtn.classList.toggle("is-active");
        overlay.classList.toggle("is-active");
        menuDrawer.classList.toggle("is-active");

        if (isActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    burgerBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);

    // Close menu when a link inside is clicked
    const allLinks = menuDrawer.querySelectorAll("a");
    allLinks.forEach(link => {
        link.addEventListener("click", function () {
            burgerBtn.classList.remove("is-active");
            overlay.classList.remove("is-active");
            menuDrawer.classList.remove("is-active");
            document.body.style.overflow = "";
        });
    });

    // Accordion Toggle logic
    const toggles = menuDrawer.querySelectorAll("[data-toggle]");
    toggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            const targetId = `submenu-${this.getAttribute("data-toggle")}`;
            const submenu = document.getElementById(targetId);
            if (!submenu) return;

            const isExpanded = submenu.classList.toggle("is-expanded");
            this.classList.toggle("is-active");

            // Option to close other open submenus (accordion behavior)
            toggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.classList.remove("is-active");
                    const otherTargetId = `submenu-${otherToggle.getAttribute("data-toggle")}`;
                    const otherSubmenu = document.getElementById(otherTargetId);
                    if (otherSubmenu) {
                        otherSubmenu.classList.remove("is-expanded");
                    }
                }
            });
        });
    });
});
