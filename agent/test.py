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


producer = KafkaProducer(bootstrap_servers="localhost:9092", value_serializer=lambda x: dumps(x).encode("utf-8"))
hostname = str.encode(socket.gethostname())
# rpk topic delete test
# rpk topic consue test

# yaml whitelist
with open('csv.yaml') as f:
    data = yaml.full_load(f)
# disk_list = ["/", "/www", "/data"]

while(1):
    #현재 시간
    main_time = time.strftime('%Y-%m-%d %H:%M:%S')
    main = []
    main = data.get("main_list")
    print(str(main[0]))
    #cpu 정보
    #memory 정보
    mem_info = ''
    mem = psutil.virtual_memory()
    memSwap = psutil.swap_memory()

    mem_in=  str(main[0]) + "||" + str(main_time) + "||" + str(mem.total) + "||" + str(mem.available) + "||" + str(mem.used) + "||" + str(mem.free) + "||" + str(mem.buffers) + "||" + str(mem.cached) + "||" + str(mem.shared) + "||" + str(memSwap.total) + "||" + str(memSwap.used) + "||" + str(memSwap.free) + "||" + str(memSwap.percent) + "||" + str(memSwap.sin) + "||" + str(memSwap.sout)
    #mem_info.append(mem_in)
    print (mem_in)

    time.sleep(5)
