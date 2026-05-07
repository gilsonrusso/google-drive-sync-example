import Fastify from "fastify";
import cors from "@fastify/cors";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { fileRoutes } from "./routes/files.js";
import { prisma } from "./lib/prisma.js";

const server = Fastify({ logger: false });

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(cors, { origin: "*" });
server.register(fileRoutes);

const start = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
    await server.listen({ port: 3333, host: "0.0.0.0" });
    console.log("Server listening on http://localhost:3333");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const shutdown = async () => {
  console.log("Shutting down...");
  await server.close();
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
