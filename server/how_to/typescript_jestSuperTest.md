# TypeScript Jest SuperTest

## Install Jest & SuperTest

- `npm install --save-dev jest ts-jest @types/jest supertest @types/supertest`

## Environment in _package.json_:

- add development environment for dev and make test environment
- add to scripts in _package.json_:

```json
  "scripts": {
    "tsc": "tsc",
    "dev": "NODE_ENV=develpment ts-node-dev index.ts",
    "test": "NODE_ENV=test jest --verbose"
  },
```

## Jest config

- Create config file `npx ts-jest config:init` and change file name to _jest.config.ts_ and add this to the file:

```
/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globalTeardown: "<rootDir>/tests/teardown.ts",
};

export default config;
```

- make _teardown.ts_ file in the tests folder:

```ts
module.exports = () => {
  process.exit(0);
};
```

## Test database

- add test database to .env file:

```
MONGO_URI=mongodb+srv://...mongodb.net/dbNORMAL?retryWrites=true&w=majority
TEST_MONGO_URI=mongodb+srv://...mongodb.net/dbTEST?retryWrites=true&w=majority
```

- add to _config.ts_ or whatever your file is where you have your config

```ts
import dotenv from "dotenv";
import { Config } from "./types";

dotenv.config();

const PORT = Number(process.env.PORT);

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

export const config: Config = {
  PORT,
  MONGO_URI,
};
```

## Simple test to check that Jest is working

- `mkdir tests` `cd tests` `touch simple.test.ts`
- add to _simple.test.ts_:

```ts
const sum = (a: number, b: number) => {
  return a + b;
};

test("1 + 2 = 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

- run the test `npm run test`

## Official test with SuperTest

- make a new test file `touch user_api.test.ts`

```ts
import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../app";

const api = supertest(app);

test("users are returned as json", async () => {
  await api.get("/users").expect(200);
  // .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
```

- If test timeouts make a teardown file to tests folder `touch teardown.ts`

```ts
module.exports = () => {
  process.exit(0);
};
```

# IMPORTANT

- be sure that your app connects to MongoDB in **app.ts** file not in index.ts etc
