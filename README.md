# tumpang-backend
## Initialization
```
cd src
npm install
```

# How to start mysql?
```
# Refer https://stackoverflow.com/questions/32360687/connect-to-docker-mysql-container-from-localhost 
docker-composer up
mysql -h 127.0.0.1 -P 3306 -u root
```

# How to connect to gcloud vm instance?
```
gcloud compute ssh server2
```
# How to send query to neo4j in shell?
```
curl -H "Content-Type: application/json" -X POST -d \
'{"statements":[{"statement":"match (n) return n"}]}' \
http://localhost:7474/db/data/transaction/commit 
```

# How to open neo4j Cypher shell?
```
docker exec --interactive --tty <container_id> bin/cypher-shell
```

# How to run neo4j in docker?
```
 sudo docker run \                                                             
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    --volume=$HOME/neo4j/logs:/logs \
    --env NEO4J_AUTH=none \
    neo4j
```

# What to do if deploy fails?
You probably haven't logined.
```
# https://stackoverflow.com/questions/39594478/do-not-have-permission-to-access-app-while-deploying-google-service-account
gcloud auth login
```

# How to redirect port in Apache2?
https://stackoverflow.com/questions/8541182/apache-redirect-to-another-port

# How to run the app?
```
cd app/
nodejs app.js
```