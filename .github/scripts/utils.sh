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

WEBSITE_BUILD_DIR=${WEBSITE_BUILD_DIR:-"_site"}

function startServer() {
    echo
    echo "Generating certs for the website server"
    openssl req -newkey rsa:4096 \
        -x509 \
        -sha256 \
        -days 3650 \
        -nodes \
        -out ${PWD}/server.crt \
        -subj "/C=AU/ST=NSW/L=Sydney/O=nadunrds/OU=nadun/CN=nadundesilva.github.io/emailAddress=nadunrds@gmail.com" \
        -keyout ${PWD}/server.key
    export NODE_EXTRA_CA_CERTS=${PWD}/server.crt

    echo
    echo "Starting website server"
    sudo echo "127.0.0.1 nadundesilva.github.io" | sudo tee -a /etc/hosts
    npx serve ${WEBSITE_BUILD_DIR} \
        --no-port-switching \
        --debug \
        --single \
        --ssl-cert ${PWD}/server.crt \
        --ssl-key ${PWD}/server.key \
        --listen tcp://nadundesilva.github.io:8080 </dev/null &
    export SERVE_PID=${!}
    sudo iptables -t nat -A OUTPUT -o lo -p tcp --dport 443 -j REDIRECT --to-port 8080
    npx wait-on -t 10000 -i 1000 --verbose https://nadundesilva.github.io
}

function stopServer() {
    echo
    echo "Shutting down website server"
    sleep 5s
    sudo kill -9 ${SERVE_PID}
}
