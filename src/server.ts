import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: 'Hello World' }));

const port = process.env.PORT || 3333;
const executionMessage = () => console.log(`Server running on port ${port}.`);
app.listen(port, executionMessage);
