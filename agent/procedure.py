#!/usr/bin/python3
import os
import sys

import yaml
from json import dumps

import psutil
from time import sleep
import time

import socket
from kafka import KafkaProducer
from kafka.errors import KafkaError

producer = KafkaProducer(bootstrap_servers="ec2-15-165-51-112.ap-northeast-2.compute.amazonaws.com:9092", value_serializer=lambda x: dumps(x).encode("utf-8"))
hostname = str.encode(socket.gethostname())
# rpk topic delete test
# rpk topic consume test
test = "shutdown -r now"
# kafka 사용
producer.send(
"services",
key = hostname,
    value = test
)
producer.flush()