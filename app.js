const express = require('express')
const apiRoutes = require('./api-routes')
const app = express()

app.use(express.json())
app.use('/api/todos', apiRoutes)

const port = process.env.PORT || 3000

// **Middleware to serve static files from the 'public' directory**
const path = require('path')
const root = path.join(__dirname, 'public')
app.use(express.static('public'))

app.get('/', ( request, response) => {
    response.sendFile('index.html', { root }) //
})


app.listen(port, () => console.log(`Server running: http://localhost:${port}`))


//Practice

