const socialIcons = document.querySelectorAll('.social-icon');  
    if (socialIcons.length>0){
    socialIcons.forEach(icon => {  
        icon.addEventListener('mouseenter', () =>{  
            this.style.transform = 'scale(1.2)';  
        });  
        
        icon.addEventListener('mouseleave', ()=> {  
            this.style.transform = 'scale(1)';  
        });  
    });  
}

const header = document.querySelector('.header');  
    
    // Scroll header effect  
    window.addEventListener('scroll', () => {  
        if (window.scrollY > 50) {  
            header.classList.add('scrolled');  
        } else {  
            header.classList.remove('scrolled');  
        }  
    });  

    // Dropdown hover effect for desktop  
    const dropdowns = document.querySelectorAll('.dropdown');  
    dropdowns.forEach(dropdown => {  
        dropdown.addEventListener('mouseenter', function() {  
            this.classList.add('show');  
            this.querySelector('.dropdown-menu').classList.add('show');  
        });  

        dropdown.addEventListener('mouseleave', function() {  
            this.classList.remove('show');  
            this.querySelector('.dropdown-menu').classList.remove('show');  
        });  
    });  
