#!/usr/bin/env bash

# Nadun De Silva - All Rights Reserved
#
# This source code and its associated files are the
# property of Nadun De Silva. Any unauthorized use,
# reproduction, or distribution is strictly prohibited.
#
# Website: https://nadundesilva.github.io
#
# © 2023 Nadun De Silva. All rights reserved.

echo
echo "Generating certs for the website server"
openssl req -newkey rsa:4096 \
    -x509 \
    -sha256 \
    -days 3650 \
    -nodes \
    -out "${PWD}/server.crt" \
    -subj "/C=AU/ST=NSW/L=Sydney/O=nadunrds/OU=nadun/CN=nadundesilva.github.io/emailAddress=nadunrds@gmail.com" \
    -keyout "${PWD}/server.key"
export NODE_EXTRA_CA_CERTS="${PWD}/server.crt"

echo
echo "Website build directory: ${WEBSITE_BUILD_DIR}"
echo "Website build directory content:"
ls -lha "${WEBSITE_BUILD_DIR}"

echo
echo "Starting website server"
sudo echo "127.0.0.1 nadundesilva.github.io" | sudo tee -a /etc/hosts
echo
echo
cat /etc/hosts
echo
echo
npx serve "${WEBSITE_BUILD_DIR}" \
    --no-port-switching \
    --debug \
    --ssl-cert "${PWD}/server.crt" \
    --ssl-key "${PWD}/server.key" \
    --listen tcp://nadundesilva.github.io:8080 </dev/null &
echo "SERVE_PID=${!}" >>"${GITHUB_ENV}"
export SERVE_PID="${!}"
sudo iptables -t nat -A OUTPUT -o lo -p tcp --dport 443 -j REDIRECT --to-port 8080
npx wait-on -t 10000 -i 1000 --verbose https://nadundesilva.github.io

sudo apt install -y ca-certificates
sudo cp "${NODE_EXTRA_CA_CERTS}" /usr/local/share/ca-certificates
sudo update-ca-certificates
