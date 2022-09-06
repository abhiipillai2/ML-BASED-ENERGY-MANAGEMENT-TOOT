#!/bin/bash


server_file_path=/home/elektronDevops/deployments/morouter/ELEKTRON

pid=`pidof app.js`

echo 'Start killing process'

kill -9 $pid

echo "killing completed"

cd $server_file_path

echo "Restarting ...."

pm2 start app.js

echo "Restarted successfully"


