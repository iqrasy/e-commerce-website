const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFurniture = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("products");

    const result = await db.collection("furniture").find().toArray();

    console.log(result);

    if (result) {
      res.status(200).json({ status: 200, data: result, message: "All items" });
    } else {
      res.status(404).json({ status: 404, message: "No Item found" });
    }

    client.close();
  } catch (error) {
    console.log(error);
  }
};

const postItems = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("products");

    const { item, definition } = req.body;

    const result = await db
      .collection("furniture")
      .insertOne({ item, definition });

    if (result) {
      res
        .status(200)
        .json({ status: 200, data: result, message: "Item added" });
    } else {
      res.status(400).json({ status: 400, message: "Failed to add item" });
    }

    client.close();
  } catch (error) {
    console.log(error);
  }
};

const updateItem = async (req, res) => {
  const { _id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("products");

    const { fulhausProductName, fulhausDescription } = req.body;

    const item = await db.collection("furniture").findOne({ _id });

    if (!item) {
      return res.status(404).json({ status: 404, message: "item not found" });
    }

    const query = { _id };
    const update = { $set: { fulhausProductName, fulhausDescription } };
    const result = await db.collection("furniture").updateOne(query, update);
    console.log(result);

    if (result) {
      res
        .status(200)
        .json({ status: 200, data: result, message: "Item updated" });
    } else {
      res.status(404).json({ status: 404, message: "Item not found" });
    }

    client.close();
  } catch (error) {
    console.log(error);
  }
};

const deleteItem = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("products");
    const { _id } = req.params._id;

    const result = await db.collection("furniture").deleteOne({ _id });

    if (result.deletedCount === 1) {
      res.status(200).json({ status: 200, message: "Item deleted" });
    } else {
      res.status(404).json({ status: 404, message: "Item not found" });
    }

    client.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getFurniture, postItems, updateItem, deleteItem };
