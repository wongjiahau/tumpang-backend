
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
./run
```

# How to load test data into neo4j?
Start the neo4jdb docker
```
docker start neo4jdb
docker exec --interactive --tty neo4jdb bin/cypher-shell
```
Then, copy all the code in tumpang.cypher to the neo4j instance.
