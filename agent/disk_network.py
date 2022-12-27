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
with open('whitelist.yaml') as f:
    data = yaml.full_load(f)
# disk_list = ["/", "/www", "/data"]

#main info
main_info = {}
main_info["user"] = data.get("main_list")

while(1):
    # 현재 시간
    disk_time = time.strftime('%Y.%m.%d %H:%M:%S')
    # print(today)
    
    # DISK 정보
    disk_info = main_info
    disk_info["user"][0]["ts_db_create"] = disk_time
    print (disk_info["user"])
    disk_info["type"] = "disk"
    disk_info["info"] = []
    # disk partitions 정보
    partitions = psutil.disk_partitions()
    for p in partitions:
        try:
            if p.mountpoint in data.get("disk_mnt_list"):
                du = psutil.disk_usage(p.mountpoint)
                disk_part_info = {"device":p.device, "mountpoint":p.mountpoint, "fstype":p.fstype,"opts":p.opts,"total":(du.total),"used":(du.used),"free":(du.free), "percent":du.percent}
                disk_info["info"].append(disk_part_info)
            # print(disk_part_info)
        except:
            pass
    # disk io counters 정보
    disk_io_info = psutil.disk_io_counters(perdisk=True)
    for name, name_io in disk_io_info.items():
        if name in data.get("disk_info_list"):
            disk_io_cnt = {"name":name, "read_count":name_io.read_count, "write_count":name_io.write_count, "read_bytes":name_io.read_bytes, "write_bytes":name_io.write_bytes, "read_time":name_io.read_time, "write_time":name_io.write_time, "read_merged_count":name_io.read_merged_count, "busy_time":name_io.busy_time}
            # print(disk_io_cnt)
            disk_info["info"].append(disk_io_cnt)

    # kafka 사용
    producer.send(
        "test",
        key = hostname,
        value = disk_info
    )
    producer.flush()
    # print(disk_info)

    # network 정보
    net_time = time.strftime('%Y.%m.%d %H:%M:%S')
    
    net_info = main_info
    net_info["user"][0]["ts_db_create"] = net_time
    net_info["type"] = "network"
    net_info["info"] = []

    # net io counters 정보
    net_io_info = psutil.net_io_counters(pernic=True)
    # net_info["info"].append(net_io_info)

    for name, name_io in net_io_info.items():
        # print(iface)
        if name in data.get("network_name_list"):
            net_io_cnt_info = {"name":name, "bytes_sent":name_io.bytes_sent, "bytes_recv":name_io.bytes_recv, "packets_sent":name_io.packets_sent, "packets_recv":name_io.packets_recv, "errin":name_io.errin, "errout":name_io.errout, "dropin":name_io.dropin, "dropout":name_io.dropout}
            # print(net_io_cnt_info)
            net_info["info"].append(net_io_cnt_info)

    # net if addrs 정보
    net_if = psutil.net_if_addrs()
    for name, addrs in net_if.items():
        for addr in addrs:
            if name in data.get("network_name_list"):
                net_if_info = {"name":name, "family":addr.family, "address":addr.address, "netmask":addr.netmask, "broadcast":addr.broadcast, "ptp":addr.ptp}
                # print(net_if_info)
                net_info["info"].append(net_if_info)

    # net connections 정보
    net_con = psutil.net_connections()
    for x in net_con:
        try:
            if x.status in data.get("network_conn_list"):
                net_con_info = {"fd":x.fd, "family":x.family, "type":x.type, "laddr":x.laddr, "raddr":x.raddr, "status":x.status, "pid":x.pid}
                net_info["info"].append(net_con_info)
                # print(net_con_info)
        except:
            pass

    producer.send(
        "test",
        key = hostname,
        value = net_info
    )
    producer.flush()

    # print(net_info)
    time.sleep(5)
