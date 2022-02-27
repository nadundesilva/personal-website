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

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# shellcheck source=.github/scripts/utils.sh
source "${SCRIPT_DIR}/utils.sh"

startServer

echo
echo "Running e2e tests"
docker run \
    --network host \
    --rm \
    -t \
    -v "${PWD}:/test" \
    -w /test \
    -e CYPRESS_BASE_URL=https://nadundesilva.github.io \
    cypress/included:7.4.0 run \
    --headless \
    --browser "${TEST_BROWSER}" \
    --reporter cypress-image-snapshot/reporter

stopServer

if [ -d "coverage" ]; then
    echo
    echo "Update coverage report premissions"
    RUNNER_USER="$(id -u):$(id -g)"
    sudo chown -R "${RUNNER_USER}" coverage
else
    echo
    echo "Coverage directory does not exist"
fi
