const express = require('express');
const app= express()
const port =3000
let todos=[]
app.use(express.json());


app.get('/',(req,res) => {
		 res.send('todo api')
})

// add new GET routine 
app.get('/todos',(req,res) => {
res.json(todos)
})

// create post
app.post('/todos',(req,res) =>{
	const newTodo= {
		id: Date.now(),
		text: req.body.text
};
  todos.push(newTodo);
  res.json(newTodo)
})

//addig an id

app.get('/todos/:id',(req,res) => {
res.send(req.params)
})
 
app.listen(port,() => {
 console.log(`the app is listening at ${port}`)
})