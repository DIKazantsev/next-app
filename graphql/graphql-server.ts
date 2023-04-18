import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { typeDefs } from './schema'
import * as dotenv from 'dotenv'
dotenv.config()
import { resolvers } from './resolvers/resolvers'
import cors from "cors";




async function listen(port: number) {

    const app = express()
    app.use("*", cors());
    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

    })
    await server.start()

    server.applyMiddleware({ app })

    return new Promise((resolve, reject) => {
        httpServer.listen(port).once('listening', resolve).once('error', reject)
    })
}

async function main() {
    try {
        await listen(4000)
        console.log('🚀 Server is ready at http://localhost:4000/graphql')
    } catch (err) {
        console.error('💀 Error starting the node server', err)
    }
}

void main()