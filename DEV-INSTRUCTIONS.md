## REQUIREMENTS

#### Node

Install using Node Version Manager for Windows
https://github.com/coreybutler/nvm-windows/releases

```
nvm list avilable
nvm install v14.16.0
nvm use v14.16.0
node -v
npm -v
```

## Build and Deploy

#### Force Service Worker Cache Update

Update change names to date published

```javascript
var contentAssetCache = 'witnsl-content-assets-20210303';
var contentImgsCache = 'witnsl-content-imgs-20210303';
```

#### Git Hub Pages

```
npm install
npm run deploy
```
