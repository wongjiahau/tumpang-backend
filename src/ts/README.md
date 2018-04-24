
## How to transpile ts into js?
Before that, you need to install `tsc`.
```
npm install -g typescript
```
Then, run the following command
```
./transpile
```

# How to run the server?
```
npm run start
```
This will run the development server in watch mode, that is whenever there are changes in the file, the server will be restarted automatically.  
This is done using `nodemon`.

# How to run test?
```
cd src
npm run test
```

# How to load test data into neo4j?
Start the neo4jdb docker
```
docker start neo4jdb
docker exec --interactive --tty neo4jdb cypher-shell
```
Then, copy all the code in `tumpang.cypher` to the neo4j instance.

# How to open Neo4j in browser?
Go to the following link.
```
http://localhost:7474/browser/
```

# How to trigger the server to run match making?
```
curl http://localhost:8080/runMatchMaking
```