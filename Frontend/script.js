fetch("/menu")
  .then(res => res.json())
  .then(menu => {
      document.getElementById("menu").innerHTML = "";
      menu.forEach(block => {
          block.items.forEach(item => {
              container.innerHTML += `
                <div class="card">
                    <img src="${item.image}">
                    <h4>${item.name}</h4>
                    <small>${item.price}</small>
                </div>
              `;
          });
      });
  });



/*menu function*/
var x=document.getElementsByClassName("fullscreen-nav")[0];
function showMenu(){
    

    if(x.style.display=='none' || x.style.display==''){
        x.style.display="block";
    }
    else{
        x.style.display='none';
    }
}

// Hide Menu

function closeMenu() {
    if(x.style.display=="block"){
        x.style.display='none';
    }
}
