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

echo "Shutting down website server"
sleep 5s
sudo kill -9 "${SERVE_PID}"
