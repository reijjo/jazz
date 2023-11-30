# TypeScript Backend

## Init folder & add _.gitignore_

- `mkdir server` `cd server` `npm init -y`
- `touch .gitignore` add to _.gitignore_:

```
**/node_modules
**/.DS_Store
**/.env
```

## Init TypeScript

- `npm install typescript --save-dev`
- add to _package.json_:

```json
"scripts": {
  "tsc": "tsc",
}
```

- `npm run tsc -- --init` makes _tsconfig.json_ file
- comment everything out from _tsconfig.json_ and add this:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./build/",
    "module": "commonjs",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  }
}
```

## Install Express and 'nodemon'

- `npm install express` `npm install --save-dev @types/express`
- `npm install --save-dev ts-node-dev`
- add to _package.json_:

```json
"scripts": {
  "tsc": "tsc",
  "dev": "ts-node-dev index.ts",
}
```

## Create _index.ts_ file

- `touch index.ts` and add to _index.ts_:

```ts
import express from "express";
const app = express();
app.use(express.json());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

- `npm run dev` to start server.
- Go to `http://localhost:3001/ping` to check that everything works.

## Production build by TypeScript compilier

Since we have defined the outdir in our tsconfig.json, nothing's left but to run the script npm run tsc.

Just like magic, a native runnable JavaScript production build of the Express backend is created in file index.js inside the directory build.

Currently, if we run ESlint it will also interpret the files in the build directory. We don't want that, since the code there is compiler-generated. We can prevent this by creating a .eslintignore file that lists the content we want ESlint to ignore, just like we do with git and .gitignore.

Let's add an npm script for running the application in production mode in package.json file:

```json
{
  "scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev index.ts",
    "start": "node build/index.js"
  }
}
```

When we run the app with npm start, we can verify that the production build also works
