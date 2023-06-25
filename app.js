const myitem = document.getElementById('myitem');

setInterval(() => {    
    myitem.value = Math.random() * 100;
}, 1000);