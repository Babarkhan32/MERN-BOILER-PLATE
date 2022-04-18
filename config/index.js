
const convict = require("convict");

// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "127.0.0.1",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "database_development",
    },
    username: {
      doc: "db user",
      format: String,
      default: "root",
    },
    password: {
      doc: "db password",
      format: "*",
      default: null,
    },
  },
  auth0_primary: {
    clientId: {
      doc: "Auth0 primary application clientID",
      format: String,
      default: null,
      env: "AUTH0_CLIENT_ID",
    },
    clientSecret: {
      doc: "Auth0 primary application Secret",
      format: String,
      default: null,
      env: "AUTH0_CLIENT_SECRET",
    },
    domain: {
      doc: "Auth0 application Domain name",
      format: String,
      default: null,
      env: "AUTH0_DOMAIN",
    },
    connection: {
      doc: "Auth0 connection/realm identifier",
      format: String,
      default: null,
      env: "AUTH0_CONNECTION",
    },
  },
  auth0_secondary: {
    clientId: {
      doc: "Auth0 secondary application clientID",
      format: String,
      default: null,
      env: "AUTH0_CLIENT_ID_SECONDARY",
    },
    clientSecret: {
      doc: "Auth0 secondary application Secret",
      format: String,
      default: null,
      env: "AUTH0_CLIENT_SECRET_SECONDARY",
    },
  },
});

// Load environment dependent configuration
let env = config.get("env");
if (env) {
  config.loadFile(__dirname + "/environments/" + env + ".json");
}

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;