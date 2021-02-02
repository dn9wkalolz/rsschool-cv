const hamburgerBtn = document.querySelector('.hamburger');

hamburgerBtn.addEventListener('click', (e) => {
    if(e.target.classList.contains('rotate')) {
        removeClassRotate();
        removeClassMobile();
    } else {
        addClassRotate();
        addClassMobile();
    }
});

const removeClassRotate = () => {
    hamburgerBtn.classList.remove('rotate');
}

const addClassRotate = () => {
    hamburgerBtn.classList.add('rotate');
}

const removeClassMobile = () => {
    const classMenu = document.querySelector('.mobile');
    if (!classMenu) {
        return;
    }
    classMenu.classList.remove('mobile');
    classMenu.classList.add('header-wrapper');
}

const addClassMobile = () => {
    let classMenu = document.querySelector('.header-wrapper');
    classMenu.classList.remove('header-wrapper');
    classMenu.classList.add('mobile');
}

document.querySelector('.navigation-container__row').addEventListener('click', (e) => {
    if(e.target.classList.contains('navigation-container__list-item')) {
        removeClassRotate();
        removeClassMobile();
    }
})
