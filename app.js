
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))

const todos = [
	{ id: 1, item: 'Learn JavaScript', complete: false },
	{ id: 2, item: 'Learn Express', complete: false },
	{ id: 3, item: 'Build a To Do App', complete: false }
]

app.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})




// GET /api/todos //Read all todos, This route should return a list of all tasks in the "To Do" list.
app.get('/api/todos', (_, response) => {
	response.json(todos) 
})

// POST /api/todos // Create a todos, This route should allow users to add a new task to the "To Do" list.
app.post('/api/todos', (request, response) => {
	const { item } = request.body
	const id = todos.length + 1
	todos.push({ id, item, complete: false })
	response.json({ id, item, complete: false })
}) 

// PUT /api/todos/:id // Update a todos, This route should allow users to mark a task as complete.
app.put('/api/todos/:id', (request, response) => {
	const id = parseInt(request.params.id)
	const todo = todos.find(todo => todo.id === id)
	todo.complete = !todo.complete
	response.json(todo)
}) 


const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))


//Practice

