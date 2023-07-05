const myitem = document.getElementById('myitem');
const myitemv = document.getElementById('myitemv');

setInterval(() => {    
    myitem.value = Math.random() * 100;
}, 1000);

setInterval(() => {    
    myitemv.value = Math.random() * 100;
}, 1000);