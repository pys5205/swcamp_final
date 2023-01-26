#!/bin/bash

kill -9 $(ps -ef | grep start.sh | awk '{print $2}')
sudo kill -9 $(sudo ps -ef | grep data1_1.py | awk '{print $2}')
