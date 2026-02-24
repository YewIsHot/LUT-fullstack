# Vít Wandrol

## Project setup
1. Run `npm i` in `./project` and `./project/frontend` folder to install project dependencies.
2. Create `./project/.env` file and add 4 values:
   1. **NODE_ENV** - \[developement/production] *developement* is recommended to use. If you use *production* the app will require compiled frontend assets,
   2. **PORT** - \[5000] Port on which the backend will run,
      - [!] Please note, that if you change this value, you must also change a proxy in `./project/frontend/vite.config.js`,
   3. **MONGO_URI** - Connection string provided by MongoDB to connect to a database,
      -  It can be obtained at MongoDB website.
   4. **JWT_SECRET** - An arbitrary string that will be used by authentication process.
3. In `./project` folder run `npm run dev` and the app will start. The frontend url will be printed into the console. The default address should be `http://localhost:5173/`.
4. Enjoy the app!