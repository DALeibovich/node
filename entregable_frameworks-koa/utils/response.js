const success = (res, message, statusCode) => {
    res.status(statusCode || 200).send({message})

}

const error = (res, error, statusCode) => {
    res.status(statusCode || 500).send({error})

}

module.exports ={
    success, error
}