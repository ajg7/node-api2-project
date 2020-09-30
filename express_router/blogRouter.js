const express = require("express");
const router = express.Router;
const Database = require("../data/db");


router.get("/", (request, response) => {
    Database.find(request.query)
        .then(db => {
            response.status(200).json(dataBase)
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

router.get("/:id", (request, response) => {
    Database.findById(request.params.id)
        .then(db => {
            if(db.length !== 0){
                response.status(200).json(dataBase)
            } else {
                response.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ error: "The post information could not be retrieved" })
        })
})

router.get("/:id/comments", (request, response) => {
    Database.findPostComments(request.params.id)
        .then(db => {
            if(!db) {
                return response.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                return response.status(200).json(db)
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).json({ error: "The post could not be retrieved" })
        })
})

router.post("/", (request, response) => {
    Database.insert(request.body)
        .then(db => {
            response.status(201).json({ message: `A post with id ${db.id} is added to the posts.`})
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ error: "There was an error while saving the post to the database" })
        })
})



module.exports = router;