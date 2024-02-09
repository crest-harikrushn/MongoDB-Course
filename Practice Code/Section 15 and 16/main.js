// ? =============================================================================
//!  Capped Collection:
// ? =============================================================================
//  - Used for caching the collection records, which are frequently fetched may be.
// LIMIT: 4 byte default, you can change

// size: size if multiply of 256. => e.g: (256 * 10000)
// max: allowed size, which is measured in no. of documents.
db.createCollection("colname", { capped: true, size: 10000, max: 3 });
db.createCollection("capped", { capped: true, size: 10000, max: 3 });

// By Default when fetch data from capped collectio then, it'll be insertion order of documents in collection.
// can provide sorting option using: $natural
db.capped.find().sort({ $natural: -1 }).pretty();

// when insert new data which excedes document limit(max) then oldest document will be removed and new document is added

// ? =============================================================================
//! Replica Set: replica of Node which is connected to MongoDB Sever.
// ? =============================================================================
// can create Multiple Node
// instruction from Primary Node to Secondary Node will be replicated asynchronously, behind the scene

// * Fault Tolerance: When Primary Node goes down
// * When Primary Node goes down, then an election will occur to select Secondary Node as Primary Node

// ? =============================================================================
//! Sharding (Horizontal Scaling):
// ? =============================================================================
// * We have multiple MongoDB Servers, which means our MongoDB Server Data is shared among multiple server,
// ? Data are NOT DUPLICATED among these SERVERS, but instead SPLITTED among these servers
// and these servers work together and split up available data

// * Mongos is Router which is used when we're using sharding to route to different servers
// responsible to forward operations(insert, update, delete, select) to the right shards.
// *  In order to manage this, "SHARD KEY" is needed, which is added to each docuement, to understand in which shard the document is inserted
