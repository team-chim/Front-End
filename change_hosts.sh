#!/bin/bash

# This script is used to change the host file for linking with db-backend container
HOSTS=hosts.config.js
echo "module.exports = {API: \"http://db-backend:3145\"} " > $HOSTS