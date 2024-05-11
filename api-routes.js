const router = require('express').Router();
const { MongoClient, ObjectId } = require('mongodb'); 


const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url //This is the connection string
const client = new MongoClient(url) 


// This route function should return a list of all tasks in the "To Do" list.
const getCollection = async (dbName, collectionName) => {
	await client.connect()
	return client.db(dbName).collection(collectionName)
}

//**ENDPOINTS**


// GET /api/todos //Read all todos, This route should return a list of all tasks in the "To Do" list.
router.get('/', async (_, response) => {
    const collection = await getCollection('todo-api', 'todos')
    const todos = await collection.find().toArray()
	response.json(todos) 
})

// POST /api/todos // Create a todos, This route should allow users to add a new task to the "To Do" list.
router.post('/', async (request, response) => {
    const { body } = request
    const { item, complete} = body
    const todo = { item, complete: false}

    const collection = await getCollection('todo-api', 'todos')
    const result = await collection.insertOne(todo)
    response.json(result)
}) 

// PUT /api/todos/:id // Update a todos, This route should allow users to mark a task as complete.
router.put('/:id', async (request, response) => {

    const { id } = request.params
     const collection = await getCollection('todo-api', 'todos')
	 const todo = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete: true } })  
	 //todo.complete = !todo.complete 
	 response.json(todo)

}) 


// Assignment 8 endpoints


module.exports = router


// const todos = [
// 	{ id: 1, item: 'Learn JavaScript', complete: false },
// 	{ id: 2, item: 'Learn Express', complete: false },
// 	{ id: 3, item: 'Build a To Do App', complete: false }
// ]

   // const { body, params } = request
    // const { id } = params
    // const { complete } = body
    // const todo = todo.find(todo => todo.id === id)
    // todo.complete = !todo.complete

    // const collection = await getCollection('todo-api', 'todos')
    // const result = await collection.updateOne({ _id: ObjectID(id) }, { $set: todo })
    // response.json(result)



	//const id = parseInt(request.params.id)
	// const todo = todo.find(todo => todo.id === id)
	// todo.complete = !todo.complete
	// response.json(todo)



    