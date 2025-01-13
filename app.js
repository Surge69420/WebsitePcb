const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
  
      element.classList.add(`${prefix}animated`, animationName);
  
      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        element.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }
  
      element.addEventListener('animationend', handleAnimationEnd, {once: true});
    });


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.target.classList.contains("hidden")) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        } else if (entry.target.classList.contains("animateOnScroll"))
        {
            if (entry.isIntersecting) {
                entry.target.classList.forEach((className) => {
                    if (className.startsWith('anim_')) {
                        const animationName = className.replace(/^anim_/, ''); // Extract the animation name after 'anim_'
                        console.log(animationName); // Logs the animation name, like 'fadeInLeftBig'
                        
                        // Assuming animateCSS is a function that adds the animation classes
                        animateCSS(entry.target, animationName);
                        scrollTo(entry.target);
                    }
                });
            } 
        }
    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const hiddenAnims = document.querySelectorAll('.animateOnScroll');
hiddenAnims.forEach((el) => observer.observe(el));

