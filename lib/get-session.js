import nextSession from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";
import RedisStoreFactory from "connect-redis";
import Redis from "ioredis";

const RedisStore = RedisStoreFactory(expressSession);
export const getSession = nextSession({
  store: promisifyStore(
    new RedisStore({
      client: new Redis({ host: "localhost", port: 6379 }), // we can have a `ttl` here as well
    })
  ),
  cookie: {
    maxAge: 10, // seconds
  },
});
