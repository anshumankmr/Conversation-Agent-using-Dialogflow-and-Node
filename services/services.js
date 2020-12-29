  const insertOne  = async (model,data) => 
  {
    try 
    {
      const doc = await model.create(data);
      return doc;
    } 
    catch (e) 
    {
      console.error(e)
      return "";
    }
  }
const getOne  = async (model,data) => {
    try 
    {
      // console.log("Hello");
      const doc = await model.findOne(data).lean().exec()
      // console.log(doc);
      return doc;
    } 
    catch (e) 
    {
      console.log("sds");
      console.error(e)
      return "";
    }
  }
  
const getMany  = async (model,data) => 
  {
    try 
    {
      const docs = await model.find(data).lean().exec();
      return docs;
    } 
    catch (e) 
    {
      console.error(e)
      return "";
    }
  }
const updateOne = async (model,data) => 
{
    try 
    {
      const updatedDoc = await model.findOneAndUpdate(data,{ new: true }).lean().exec()
      return updatedDoc;  
    } 
    catch (e) 
    {
      console.error(e)
      return "";
    }
}
const removeOne  = async (model,data) => 
{
    try 
    {
      const removed = await model.findOneAndRemove(data);
      if (!removed) 
      {
        return "";
      }
      return data;
    }
    catch (e) 
    {
      console.error(e)
      return "";
    }
}
let crud = ({
    removeOne: removeOne ,
    updateOne: updateOne ,
    getMany: getMany ,
    getOne: getOne ,
    insertOne: insertOne 
});
// console.log(typeof crud,typeof removeOne);
module.exports = crud;