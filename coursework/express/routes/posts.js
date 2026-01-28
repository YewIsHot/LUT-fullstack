import express from 'express';

const router = express.Router();

let posts = [
    {id: 0, name: "John"},
    {id: 1, name: "Jane"},
    {id: 2, name: "Joe"}
]

router.get('/', (req, res, next) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0)
    {
        res.status(200).json(posts.slice(0, limit));
        return;
    }

    res.json(posts);

});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || !posts.find(post => post.id == id))
    {
        const err = new Error('Post not found!');
        err.status = 404;
        next(err);
    }

    res.send(posts[id]);
});

router.post('/', (req, res, next) => {
    const newPost = {
        id: posts.length,
        name: req.body.name
    };

    if (!newPost.name)
    {
        const err = new Error('No name specified!');
        err.status = 400;
        return next(err);
    }   

    posts.push(newPost);
    res.status(201).json(newPost);
})

router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    let post = posts.find(post => post.id === id);

    if (!post)
    {
        const err = new Error('Post not found!');
        err.status = 404;
        return next(err);
    }

    post.name = req.body.name;
    res.status(200).json(posts);
})

router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    let post = posts.find(post => post.id === id);

    if (!post)
    {
        const err = new Error('Post not found!');
        err.status = 404;
        return next(err);
    }
    posts = posts.filter(post => post.id !== id);
    res.status(200).json(posts);
});

export default router;
