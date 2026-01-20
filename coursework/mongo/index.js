const { MongoClient, ServerApiVersion } = require('mongodb');
const PWD = encodeURIComponent(process.env.MONGO_PWD);
const USER = encodeURIComponent('vitwandrol_db_user');
const uri = `mongodb+srv://${USER}:${PWD}@exercise.4fwc8sj.mongodb.net/?appName=Exercise`;

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const pipeline = [
  {
    $match:{ runtime: {$lt: 50}, genres: {$nin: ['Short']}}
  },
  {
    $project:{ title: 1, runtime: 1, genres: 1}
  },
  {
    $sort: {runtime: 1}
  },
  {
    $limit: 3
  }
];

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    let collection = await client.db('sample_mflix').collection('movies');

    // collection.insertOne(
    //   {runtime: -2, title: "Me rn"}
    // );

    const res = await collection.aggregate(pipeline).toArray()
    console.log(res)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}



run().catch(console.dir);
