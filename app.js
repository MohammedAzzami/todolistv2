const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb+srv://admin-mizo:test1994@cluster0.lzdaxhl.mongodb.net/todolistDB');

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemsSchema);

const itemOne = new Item ({name: "Welcome to your todolist!"});
const itemTwo = new Item ({name: "Hit the + button to add a new item"});
const itemThree = new Item ({name: "<--- Hit this to delete an item"});

const defaultItems = [itemOne, itemTwo, itemThree];

const listSchema = new mongoose.Schema({
    name: String,
    itemsSchemaList: [itemsSchema]
})

const List = new mongoose.model("List", listSchema);

async function insertItems() {
    try {
        await Item.insertMany(defaultItems);
        console.log("Successfully saved default items.");
    } catch (error) {
        console.error("Error couldn't add the documents");
    }
};

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    async function findItems() {
        try {
            const allItems = await Item.find({});
            if (allItems.length === 0) {
                insertItems();
                res.redirect("/");
            } else {
                res.render("list", { listTitle: "Today", newListItems: allItems});
            }
        } catch (error) {
            console.error("Error, coudln't find any documents.");
        }
    };
    findItems();
})

app.get("/about", function(req, res) {
    res.render("about");
})

app.get("/:customListName", function(req, res) {
    const customListName = _.capitalize(req.params.customListName);

    async function findLists() {
        try {
            const findCustomListName = await List.findOne({name: customListName});

            if (!findCustomListName) {
                console.log("Dosen't exist, saving new document.");

                const list = new List ({
                    name: customListName,
                    itemsSchemaList: defaultItems
                });
            
                list.save();
                console.log("New document saved.")
                res.redirect("/" + customListName)

            } else {
                console.log("Exist no worries.");
                res.render("list", {listTitle: findCustomListName.name, newListItems: findCustomListName.itemsSchemaList});
            }
        } catch (error) {
            console.error("Error couldn't find documents.");
        }
    }

    findLists();
})

app.post("/", function(req, res) {
    let newItem = req.body.newItem;
    let listButton = req.body.listButton;

    const addNewItem = new Item ({
        name: newItem
    });

    if (listButton === "Today") {
        addNewItem.save();
        res.redirect("/");
    } else {
        async function addItemExsistingList() {
            try {
                const foundList = await List.findOne({name: listButton});
                foundList.itemsSchemaList.push(addNewItem);
                foundList.save();
                res.redirect("/" + listButton);
            } catch (error) {
                console.log("Error couldn't find the list.");
            }
        }
        addItemExsistingList();
    }


  
})

app.post("/delete", function(req, res) {
    console.log(req.body.checkbox);
    const checkedItem = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        async function deleteItem() {
            try {
                    await Item.deleteOne({_id: checkedItem});
                    console.log("Successfully deleted.");
                    res.redirect("/");
            } catch (error) {
                console.log("Error, couldn't delete the item.");
            }
        };
        deleteItem();
    } else {
        async function deleteCurrentPageItem() {
            try {
                await List.findOneAndUpdate({name: listName}, {$pull: {itemsSchemaList: {_id: checkedItem}}});
                res.redirect("/" + listName);
            } catch (error) {   
                console.log("Error, couldn't delete currenct page item.");
            }
        }
        deleteCurrentPageItem();
    }
})

app.post("/work", function(req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})



app.listen(port, function () {
    console.log("Server started on port 3000");
})

