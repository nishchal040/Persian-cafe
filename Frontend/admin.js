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

// ADD item
async function addItem() {
    console.log("addItem() called");
    
    const itemCategory = document.getElementById('item-category').value.trim();
    const itemName = document.getElementById('item-name').value.trim();
    const itemPrice = document.getElementById('item-price').value.trim();
    const imageFile = document.getElementById('item-img').files[0];

    if (!itemCategory || !itemName || !itemPrice) {
        alert("Please fill all fields.");
        return;
    }

    let uploadedImageUrl = "";

    // STEP 1: upload image
    if (imageFile) {
        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const uploadRes = await fetch("/upload-image", {
                method: "POST",
                body: formData
            });

            const uploadData = await uploadRes.json();
            uploadedImageUrl = uploadData.filename;
   // <-- FIXED

        } catch (err) {
            alert("Image upload failed");
            return;
        }
    }

    // STEP 2: save item
    try {
        const addRes = await fetch("/add-item", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                category: itemCategory,
                name: itemName,
                price: itemPrice,
                image: uploadedImageUrl   // <-- FIXED
            })
        });

        const addData = await addRes.json();

        if (!addRes.ok) {
            alert(addData.message || "Failed to add item");
            return;
        }

        alert("Item Added Successfully!");
        loadMenu();

        document.getElementById('item-name').value = "";
        document.getElementById('item-price').value = "";
        document.getElementById('item-img').value = "";

    } catch (err) {
        alert("Error adding item");
    }
}



document.addEventListener("DOMContentLoaded", loadMenu);

function loadMenu() {
    fetch("/menu")
        .then(res => res.json())
        .then(menu => {
            const container = document.getElementById("menu-container");
            container.innerHTML = "";

            menu.forEach(category => {
                const catDiv = document.createElement("div");
                catDiv.classList.add("category");

                catDiv.innerHTML = `<h2>${category.category}</h2>`;

                category.items.forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.classList.add("item");

                    itemDiv.innerHTML = `
                        <img src="${item.image}" class="item-img-preview"/>
                        <span>${item.name} - ₹${item.price}</span>
                        <div>
                            <button onclick="editItem(${item.id})">Edit</button>
                            <button onclick="deleteItem(${item.id})">Delete</button>
                        </div>
                    `;
                    catDiv.appendChild(itemDiv);
                });

                container.appendChild(catDiv);
            });
        });
}

// Delete item
function deleteItem(id) {
    fetch(`/delete-item/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
            alert("Item Deleted");
            loadMenu(); // Reload menu
        });
}

// Edit item (simple prompt popup)
function editItem(id) {
    const newName = prompt("New name:");
    const newPrice = prompt("New price:");

    fetch(`/edit-item/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: newName,
            price: newPrice
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Updated");
        loadMenu();
    });
}





function uploadfile() {

    let avatar = document.getElementById("avatar");
    const newFile = avatar.files[0];

    if (newFile) {
        const formData = new FormData();
        formData.append("file", newFile);

        fetch("https://persian-cafe.onrender.com", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log("Upload success:", data);
        })
        .catch(err => {
            console.error("Upload error:", err);
        });
    }
}
