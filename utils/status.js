module.exports = (res,doc) => 
{
    if (!doc)
    {
     return res.status(400).end()
    }
    else
    {
     return res.status(201).json({ data: doc });
    }
}