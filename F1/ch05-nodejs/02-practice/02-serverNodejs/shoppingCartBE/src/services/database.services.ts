import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/User.schema'
import RefreshToken from '~/models/RefreshTokens.schema'
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qeetifw.mongodb.net/?appName=Cluster0`

//Create
class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  //method
  async connect() {
    try {
      //kết nối với server mongo
      // Connect the client to the server	(optional starting in v4.7)
      // await client.connect()
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
  get refeshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_USERS_REFESH_TOKENS_COLLECTION as string)
  }
}
//tạo instance dependency injection pattern tránh hiện tượng
//tạo nhiều instance cùng chức năng
let databaseServices = new DatabaseServices()
export default databaseServices
