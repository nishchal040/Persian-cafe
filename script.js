fetch("menu-items.json")
    .then(res=>res.json())
    .then(data => {
        localStorage.setItem("menuData",JSON.stringify(data));

        let stored=JSON.parse(localStorage.getItem("menuData"));
        let html="";
        stored.forEach (block =>{
            html+=`<h2 class="category-title">${block.category}</h2>`;
            block.items.forEach(item =>{
                html+=`
                <div class="card">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Price:₹${item.price}</p>
                    </div>
                    <img src="${item.image}">
                </div>
                <hr>
             `;
            })
            
        });
        document.getElementById("menu").innerHTML=html;
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


// login

function login(e){
    e.preventDefault();
    
    let mobile = document.getElementById('mobile').value;
    let pass   = document.getElementById('pass').value;

    const crctmobile = "8919";
    const crctpass   = "admin123";

    if(mobile == crctmobile && pass == crctpass){
        document.getElementsByClassName("login-card")[0].style.display="none";
        document.getElementsByClassName("admin-container")[0].style.display="flex";
    }
    else {
        console.log("invalid");
        alert("Incorrect mobile or password!");
    }
}
