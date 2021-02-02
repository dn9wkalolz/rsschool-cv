window.onload = function() {
    addTagsClickHandler();
}

const addTagsClickHandler = () => {
    document.querySelector('.portfolio__tags').addEventListener('click', (e) => {
        if (e.target.classList.contains('tag__link')) {
            let clickedTag = e.target;
            removeActiveTags();
            addActiveTag(clickedTag);
            if (clickedTag.innerText === 'All') {
                showAllImages();
            } else {
                filterImagesBySelectedTag(clickedTag.innerText);
            }
        }
    })
}

const removeActiveTags = () => {
    let tags = document.querySelectorAll('.tag__link');
    tags.forEach(tag => {
        tag.classList.remove('active');
    })
}

const addActiveTag = (clickedTag) => {
    clickedTag.classList.add('active');
}

const showAllImages = () => {
    let images = document.querySelectorAll('.portfolio__images div');
    images.forEach(image => {
        image.classList.remove('order');
    })
}

const filterImagesBySelectedTag = (selectedTeg) => {
    let images = document.querySelectorAll('.portfolio__images div');
    images.forEach(image => {
        image.classList.remove('order');
        if(image.id === selectedTeg) {
            image.classList.add('order');
        }
    })
}

// navigation scroll
document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const curPos = window.scrollY;
    const wrapId = document.querySelectorAll('body > .wrapper');
    const link = document.querySelectorAll('#menu a');
    
    wrapId.forEach((el) => {
        if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
            link.forEach((a) => {
                a.classList.remove('active');
                a.classList.add('passive');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)){
                    a.classList.remove('passive')
                    a.classList.add('active');
                }
            })
        }
    })
}