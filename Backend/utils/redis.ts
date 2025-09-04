import { createClient } from "redis";

export const client = createClient();

export async function connectRedis(): Promise<void> {
  try {
    await client.connect();
    console.log("connected to redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
}

client.on("error", (err: Error) => {
  console.log("Redis connection error: ", err);
});

client.on("connect", () => {
  console.log("Redis client connecting ...");
});

client.on("ready", () => {
  console.log("Redis client ready");
});

