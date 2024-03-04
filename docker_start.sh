#!/bin/bash

cd /home/porcellino && npm run webpack-prod
cp -r /home/porcellino/public/* /usr/share/nginx/html
nginx -g 'daemon off;'
