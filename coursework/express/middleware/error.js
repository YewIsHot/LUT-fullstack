const errorHandler = (err, req, res, next) => {
    err.status ? res.status(err.status) : res.status(500);
    res.json({msg: err.message });
};

export default errorHandler;
