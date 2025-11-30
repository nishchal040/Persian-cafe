// Serve index



// ====================================
// UPLOAD IMAGE (NOW RETURNS FULL URL)
// ====================================



// ====================================
// GET MENU
// ====================================



// ====================================
// ADD ITEM
// ====================================



// ====================================
// EDIT ITEM
// ====================================



// ====================================
// DELETE ITEM
// ====================================



// ====================================
// START SERVER
// ====================================




const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Uploads folder created.");
}

// Multer storage
const ds = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: ds });

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        message: "Uploaded successfully",
        filename: req.file.filename,
        path: "/uploads/" + req.file.filename
    });
});

// delete


app.delete("/delete-item/:id", (req, res) => {
    const itemId = parseInt(req.params.id);

    let data = readMenu();
    let found = false;

    data.forEach(category => {
        const before = category.items.length;
        category.items = category.items.filter(item => item.id !== itemId);
        if (category.items.length < before) found = true;
    });

    if (!found) return res.status(404).json({ message: "Item not found" });

    saveMenu(data);
    res.json({ message: "Item deleted" });
});


// edit 

app.put("/edit-item/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const { name, price, image } = req.body;

    let data = readMenu();
    let found = false;

    data.forEach(category => {
        category.items = category.items.map(item => {
            if (item.id === itemId) {
                found = true;
                return {
                    ...item,
                    name: name || item.name,
                    price: price || item.price,
                    image: image || item.image
                };
            }
            return item;
        });
    });

    if (!found) return res.status(404).json({ message: "Item not found" });

    saveMenu(data);
    res.json({ message: "Item updated" });
});



// add

app.post("/add-item", (req, res) => {
    const { category, name, price, image } = req.body;

    let data = readMenu();
    let cat = data.find(c => c.category === category);

    if (!cat)
        return res.status(400).json({ message: "Category not found" });

    const newItem = {
        id: Date.now(),
        name,
        price,
        image: image || ""   // <-- now full URL comes from frontend
    };

    cat.items.push(newItem);
    saveMenu(data);

    res.json({ message: "Item added", item: newItem });
});

// get menu


app.get("/menu", (req, res) => {
    res.json(readMenu());
});

// Read JSON
function readMenu() {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Save JSON
function saveMenu(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}