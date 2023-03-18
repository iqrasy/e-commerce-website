const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const axios = require("axios");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  try {
    const response = await axios.get(
      "https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=0&limit=6"
    );
    const data = response.data;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("products");

    const newData = data.data.products.map((item) => ({
      _id: item._id,
      images: item.imageURLs,
      fulhausCategory: item.fulhausCategory,
      weight: item.weight,
      length: item.length,
      width: item.width,
      height: item.height,
      material: item.material,
      retailPrice: item.retailPrice,
      fulhausProductName: item.fulhausProductName,
      fulhausColorName: item.fulhausColorName,
      fulhausDescription: item.fulhausDescription,
      rentalPrice: item.rentalPrice,
    }));

    const result = await db.collection("furniture").insertOne({ newData });
    console.log(result);
    client.close();
  } catch (error) {
    console.log(error);
  }
};

batchImport();
