import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.client.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  }
}
