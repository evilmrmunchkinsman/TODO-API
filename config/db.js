const mongoose = require('mongoose');

const connectDB= async () => {
try {
	console.log("connecting to mongodb...")
await mongoose.connect("mongodb+srv://larry:TODOAPI@clusteryt.q9y3gfa.mongodb.net/?appName=Clusteryt");
console.log("mongodb connected successfully");
} catch(error){
	console.log(error);
	process.exit(1);
}
};
connectDB();
module.exports= connectDB;