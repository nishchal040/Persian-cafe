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