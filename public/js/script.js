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

