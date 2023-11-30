# TypeScript backend

## Init folder & add .gitignore

- `mkdir server` `cd server` `npm init -y`
- `touch .gitignore` add to .gitignore:

```
node_modules
.DS_Store
```

## Init TypeScript

- `npm install typescript --save-dev`
- add to package.json:

```.json
  "scripts": {
    "tsc": "tsc"
  },
```

- `npm run tsc -- --init` makes _tsconfig.json_ file
- comment everything out from tsconfig.json and add this:

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
