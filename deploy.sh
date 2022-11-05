#! /usr/bin/sh
BASE_DIR=/home/ec2-user/recustomer-frontend

cd $BASE_DIR

git stash
git pull -r
git stash pop

docker build . -t recustomer:latest
docker stop recustomer_frontend
docker rm recustomer_frontend
docker run -d -p 0.0.0.0:3000:3000 --name recustomer_frontend recustomer:latest

