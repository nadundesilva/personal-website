#!/usr/bin/env bash

# Nadun De Silva - All Rights Reserved
#
# This source code and its associated files are the
# property of Nadun De Silva. Any unauthorized use,
# reproduction, or distribution is strictly prohibited.
#
# Website: https://nadundesilva.com
#
# © 2023 Nadun De Silva. All rights reserved.

ROOT_CA_KEY="/tmp/rootCA.key"
ROOT_CA_CERT="/tmp/rootCA.crt"

SERVER_KEY="/tmp/server.key"
SERVER_CSR="/tmp/server.csr"
SERVER_CERT="/tmp/server.crt"

CADDYFILE="/tmp/Caddyfile"

validate_inputs() {
    if [[ -z "${WEBSITE_BUILD_DIR}" ]]; then
        echo "Error: WEBSITE_BUILD_DIR is not set" >&2
        exit 1
    fi

    echo
    echo "Website build directory: ${WEBSITE_BUILD_DIR}"
    echo "Website build directory content:"
    ls -lha "${WEBSITE_BUILD_DIR}"
}

generate_tls_cert() {
    echo
    echo "Generating certs for the website server"

    # Generate Root CA
    openssl req \
        -newkey rsa:4096 \
        -x509 \
        -sha256 \
        -days 3650 \
        -nodes \
        -subj "/C=AU/ST=NSW/L=Sydney/O=nadunrds/OU=nadun/CN=nadundesilva.com Test Root CA/emailAddress=nadunrds@gmail.com" \
        -keyout "${ROOT_CA_KEY}" \
        -out "${ROOT_CA_CERT}"

    # Served leaf certs
    openssl req \
        -newkey rsa:4096 \
        -sha256 -nodes \
        -subj "/C=AU/ST=NSW/L=Sydney/O=nadunrds/OU=nadun/CN=nadundesilva.com/emailAddress=nadunrds@gmail.com" \
        -keyout "${SERVER_KEY}" \
        -out "${SERVER_CSR}"
    openssl x509 \
        -req \
        -in "${SERVER_CSR}" \
        -CA "${ROOT_CA_CERT}" \
        -CAkey "${ROOT_CA_KEY}" \
        -CAcreateserial \
        -days 3650 \
        -sha256 \
        -extfile <(printf 'basicConstraints=critical,CA:FALSE\nsubjectAltName=DNS:nadundesilva.com') \
        -out "${SERVER_CERT}"
}

generate_caddyfile() {
    {
        echo "{"
        echo "    admin off"
        echo "    auto_https off"
        echo "}"
        echo ""
        echo "nadundesilva.com:443 {"
        echo "    tls /etc/caddy/server.crt /etc/caddy/server.key"
        echo "    root * /srv"
        echo "    try_files {path} {path}.html {path}/index.html"
        echo "    file_server"
        echo "    encode zstd gzip"
        # Cloudflare CDN handles long-lived cache headers in production; add them
        # here so Lighthouse's cache-insight rule passes against the local Caddy server.
        echo "    header /_next/static/* Cache-Control \"public, max-age=31536000, immutable\""
    } >"${CADDYFILE}"

    local headers_file="${WEBSITE_BUILD_DIR}/_headers"
    if [ -f "${headers_file}" ]; then
        echo
        echo "Reading response headers from ${headers_file}"
        local in_catch_all=false
        while IFS= read -r line; do
            if [[ "${line}" =~ ^[^[:space:]] ]]; then
                in_catch_all=false
                [[ "${line}" == "/*" ]] && in_catch_all=true
            elif [[ "${in_catch_all}" == true && "${line}" =~ ^[[:space:]]+([^:]+):[[:space:]](.*) ]]; then
                echo "    header \"${BASH_REMATCH[1]}\" \"${BASH_REMATCH[2]}\"" >>"${CADDYFILE}"
            fi
        done <"${headers_file}"
    fi

    echo "}" >>"${CADDYFILE}"
}

start_server() {
    echo
    echo "Starting website server"
    sudo echo "127.0.0.1 nadundesilva.com" | sudo tee -a /etc/hosts
    echo
    echo
    cat /etc/hosts
    echo
    echo
    docker run -d \
        --name caddy-server \
        --network=host \
        -v "${CADDYFILE}:/etc/caddy/Caddyfile" \
        -v "${SERVER_CERT}:/etc/caddy/server.crt" \
        -v "${SERVER_KEY}:/etc/caddy/server.key" \
        -v "$(realpath "${WEBSITE_BUILD_DIR}"):/srv" \
        caddy:alpine
    npx wait-on -t 10000 -i 1000 --verbose https://nadundesilva.com
}

trust_tls_cert() {
    # Node.js (wait-on)
    export NODE_EXTRA_CA_CERTS="${ROOT_CA_CERT}"

    # System trust store (lychee, Chrome/Chromium)
    sudo apt install -y ca-certificates
    sudo cp "${ROOT_CA_CERT}" /usr/local/share/ca-certificates
    sudo update-ca-certificates
}

validate_inputs
generate_tls_cert
generate_caddyfile
start_server
trust_tls_cert
