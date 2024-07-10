const menu = document.getElementById('burger-men') 
const setVis = document.querySelector('.container-responsive')
const closeMenu = document.getElementById('close')

callToggle(menu, setVis);
callToggle(closeMenu, setVis);

function callToggle(control, show) {
control.addEventListener('click', (e) => {
    e.preventDefault();
    show.classList.toggle('visible')
    
})
}