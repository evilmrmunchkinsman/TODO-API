const Todo= require("./models.Todo")
const express = require('express');
const connectDB= require("./config/db");
const app= express()

const port =3000
// let todos=[]
app.use(express.json());
app.use((req,res,next) =>{
console.log(req.method,req.url)
next()
})

function validateTodo(req,res,next) {
if( !req.body.text){
return res.status(404).json({message:"Text is required"})
}
next()
}

app.get('/',(req,res) => {
		 res.send('todo api')
})

// add new GET routine 
app.get('/todos', async (req,res) => {
try{
	const allTodos= await Todo.find();
	res.json(allTodos);
} catch(error) {
	res.status(500) .json({message: "server error"})
}
})

// create post
app.post('/todos',validateTodo,async(req,res) =>{
	try{
	const newTodo= await Todo.create({
		text: req.body.text
	})
res.json(newTodo)
} catch(error){
	res.status(500).json({message: "server error"})
}
});

//addig an id
app/get('/todos/:id', async(req,res) => {
	try{
		const todo= await Todo.findById(req.params.id);
		if(!todo) {
			return res.status(400).json({message: "TODO NOT FOUND"})
		} 
		res.json(todo)

	} catch(error) {
		res.status(500).json({message: "server error"})
	}
})

//delete todo
app.delete('/toodos/:id', async(req,res) => {
	try{
		const todo = await Todo.findByIdAndDelete(req.params.id)
		if(!todo){
			return res.status(404).json({message: "TODO NOT FOUND"})
		}
		res.json({message: "TODO DELETED"})
	} catch(error) {
		res.status(500).json({message:"server error"})
	}
})

//update the todo
app.put('/todos/:id',validateTodo,async(req,res) => {
	try{
		const todo= await Todo.findByIdAndUpdate(req.params.id, {text : req.body.text},
			{new: true}
		)
		if(!todo) {
			return res.status(404).json({message: "TODO NOT FOUND"})
		} 
		res.json(todo)
	} catch(error){
		res.status(500).json({message: "server error"})
	}

})
connectDB();
 
app.listen(port,() => {
 console.log(`the app is listening at ${port}`)
})
