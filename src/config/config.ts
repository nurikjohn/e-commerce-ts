import dotenv from "dotenv"

dotenv.config({
    path: "../../.env"
})

interface Config {
    HttpPort: string
    MongoHost: string
    MongoPort: number
    MongoDatabase: string
    MongoPassword: string
    MongoUser: string
    MongoAuthDisable: boolean
    NodeEnv: string
    JwtSecret: string
    JwtExpiresIn: number
}

let config: Config = {
    HttpPort: getConf("HTTP_PORT", "3000"),
    MongoHost: getConf("MONGO_HOST", "localhost"),
    MongoPort: parseInt(getConf("MONGO_PORT", "27017")),
    MongoDatabase: getConf("MONGO_DATABASE", "sample_project"),
    MongoPassword: getConf("MONGO_PASSWORD", ""),
    MongoUser: getConf("MONGO_USER", ""),
    NodeEnv: getConf("NODE_ENV", "development"),
    JwtSecret: getConf("JWT_SECRET", "jwt-secret"),
    JwtExpiresIn: +getConf("JWT_EXPIRES_IN", `${24 * 3600 * 1000}`),
    MongoAuthDisable: true
}

function getConf(name: string, def: string = ""): string {
    if (process.env[name]) {
        return process.env[name] || ""
    }

    return def
}

export default config
