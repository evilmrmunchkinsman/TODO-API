const express = require('express');
const app= express()
const port =3000
let todos=[]
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
app.get('/todos',(req,res) => {
res.json(todos)
})

// create post
app.post('/todos',validateTodo,(req,res) =>{
	const newTodo= {
		id: Date.now(),
		text: req.body.text
};
  todos.push(newTodo);
  res.json(newTodo)
})

//addig an id

app.get('/todos/:id',(req,res) => {
//  const id2=res.send(req.params)
const id = Number(req.params.id);
const todo= todos.find(todo => todo.id ==id);
if(!todo){
	 return res.status(404).json({message:"TODO NOT FOUND"});
}
	res.json(todo);

})

//delete todo
app.delete('/todos/:id',(req,res) => {
const id= Number(req.params.id)
const todo = todos.find(todo => todo.id===id);
if(!todo){
return res.status(404).json({message:"todo not found"})
}
todos= todos.filter(todo => todo.id !==id);
res.json({message:"TODO DELETED"})
});

//update the todo
app.put('/todos/:id',validateTodo,(req,res) =>{
const id= Number(req.params.id)
const todo= todos.find(todo => todo.id===id );
if(!todo){
return res.status(404).json({message:"INVALID TODO "})
}
const read= req.body.text;
todo.text= read;
res.json(todo)

})
 
app.listen(port,() => {
 console.log(`the app is listening at ${port}`)
})