const mongoose = require('mongoose');

const connectDB= async () => {
try {
await mongoose.connect("mongodb+srv://larry:todoapi@clusteryt.q9y3gfa.mongodb.net/todoapp");
console.log("mongodb connected successfully");
} catch(error){
	console.log(error);
	process.exit(1);
}
};

module.exports= connectDB;