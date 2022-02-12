#!/usr/bin/env bash

# Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#   http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

TEST_BROWSER=${TEST_BROWSER:-"chrome"}
TEST_SITE_DIR=${TEST_SITE_DIR:-"_site"}

openssl req -newkey rsa:4096 \
    -x509 \
    -sha256 \
    -days 3650 \
    -nodes \
    -out $PWD/server.crt \
    -subj "/C=AU/ST=NSW/L=Sydney/O=nadunrds/OU=nadun/CN=nadundesilva.github.io/emailAddress=nadunrds@gmail.com" \
    -keyout $PWD/server.key
export NODE_EXTRA_CA_CERTS=$PWD/server.crt

sudo echo "127.0.0.1 nadundesilva.github.io" | sudo tee -a /etc/hosts
npx serve ./out \
    --no-port-switching \
    --debug \
    --single \
    --ssl-cert $PWD/server.crt \
    --ssl-key $PWD/server.key \
    --listen tcp://nadundesilva.github.io:8080 </dev/null &
SERVE_PID=${!}
sudo iptables -t nat -A OUTPUT -o lo -p tcp --dport 443 -j REDIRECT --to-port 8080
npx wait-on -t 10000 -i 1000 --verbose https://nadundesilva.github.io

docker run \
    --network host \
    --rm \
    -t \
    -v $PWD:/test \
    -w /test \
    -e CYPRESS_BASE_URL=https://nadundesilva.github.io \
    cypress/included:7.4.0 run \
    --headless \
    --browser ${TEST_BROWSER} \
    --reporter cypress-image-snapshot/reporter

sleep 5s
sudo kill -9 ${SERVE_PID}

RUNNER_USER="$(id -u):$(id -g)"
sudo chown -R ${RUNNER_USER} coverage
