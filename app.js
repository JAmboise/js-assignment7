
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

//

// GET /api/todos
app.get('/api/todos', (_, response) => {
	response.json(todos)
})

// POST /api/todos
app.post('/api/todos', (request, response) => {
	const { item } = request.body
	const id = todos.length + 1
	todos.push({ id, item, complete: false })
	response.json({ id, item, complete: false })
})

// PUT /api/todos/:id 
app.put('/api/todos/:id', (request, response) => {
	const id = parseInt(request.params.id)
	const todo = todos.find(todo => todo.id === id)
	todo.complete = !todo.complete
	response.json(todo)
})


const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))