#!/bin/sh
URL_SHORTENER_BASE=~/Documents/workspace/openfaas-mongodb-urlshortener
PUBLIC_DOCKER_HUB_REPO=dockermau
#Build shortener function and push to repo
echo "Building URL Shortnener"
cd $URL_SHORTENER_BASE/openfaas/build/openfaas-mongodb-urlshortener
docker build -t openfaas-mongodb-urlshortener .
docker tag openfaas-mongodb-urlshortener $PUBLIC_DOCKER_HUB_REPO/openfaas-mongodb-urlshortener:1.0
docker push $PUBLIC_DOCKER_HUB_REPO/openfaas-mongodb-urlshortener

echo "Building URL Resolver"
cd $URL_SHORTENER_BASE/openfaas/build/openfaas-mongodb-urlresolver
docker build -t openfaas-mongodb-urlresolver .
docker tag openfaas-mongodb-urlresolver $PUBLIC_DOCKER_HUB_REPO/openfaas-mongodb-urlresolver:1.0
docker push $PUBLIC_DOCKER_HUB_REPO/openfaas-mongodb-urlresolver

cd $URL_SHORTENER_BASE
./deploy_stack.sh
