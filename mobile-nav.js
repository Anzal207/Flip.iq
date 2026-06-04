const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const sidebar = document.querySelector(".sidebar");

if(menuBtn && sidebar){

    menuBtn.addEventListener("click", () => {

        sidebar.classList.add("open");

    });

}

if(closeMenu && sidebar){

    closeMenu.addEventListener("click", () => {

        sidebar.classList.remove("open");

    });

}


