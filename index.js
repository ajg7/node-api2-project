const express = require("express");

const server = express();
server.use(express.json());

const blogRouter = require("./express_router/blogRouter");
server.use("/api/posts", blogRouter);

server.get("/", (request, response) => {
    response.status(200).send("API is running");
})

const port = 8000;

server.listen(8000, () => console.log(`Server is running on ${port}`))
