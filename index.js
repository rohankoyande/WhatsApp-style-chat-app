const mongoose = require('mongoose');


//npm i mongoose
main() 
 .then(() => {
    console.log("connection successful");
 })
 .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User",userSchema);  //collection, no plural

const User1 = new User({ name: "Surabhi", 
    email: "sur_raa_bhi@gmail.com",
    age: 22 
    });

User1.save()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

User.insertMany([
    {name: "Rohan", email:"rohan@gmail.com", age: 21 },
    {name: "Husky", email:"husky@gmail.com", age: 2 },
    {name: "Kylo", email:"kylo@gmail.com", age: 9 },
]).then((data) => {
    console.log(data);
});


User.find({age: {$gt: 20}})   
    .then((res) => {
        console.log(res[0].name);
    })
    .catch((err) => {
        console.log(err);
    });


User.updateOne({name: "Surabhi"}, {age: 23})
      .then((res) => {
        console.log(res[0].name);
    })
    .catch((err) => {
        console.log(err);
    });


User.updateMany(
  { age: { $gt: 20 } },        // filter condition
  { $inc: { age: 1 } }         // increment age by 1
)
.then((res) => {
  console.log(res);  // res contains info about matched/modified docs
})
.catch((err) => {
  console.log(err);
});



User.findOneAndUpdate({name: "Kylo"}, {age: 10}, {new: true}) 
  //options to update in output.
      .then((res) => {
        console.log(res[0].name);
    })
    .catch((err) => {
        console.log(err);
    });


User.deleteOne({name: "Surabhi"}).then((res) => {
     console.log(res);
    })  


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100,

    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [0, "Price is too low for selling"]
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["fiction", "non-fiction"],
    },
});

const Book = mongoose.model("Book", bookSchema);

let book1 = new Book({ 
    title: "Steve Jobs",
    author: "walter issacson",
    price: 1200,
    category: "fiction"
})


book1.save()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });


User.updateOne({title: "Steve Jobs"}, {price: 1100}, 
    {runValidators: true}  //to validate bookschema parameters ie max min
)
      .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err.errors);
        
    });