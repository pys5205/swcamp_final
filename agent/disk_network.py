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
    disk_info = {}
    disk_info["ts_db_create"] = disk_time
    # print (disk_info["user"])
    disk_info["type"] = "disk"
    disk_info["info"] = []
    # disk partitions 정보
    partitions = psutil.disk_partitions()
    for p in partitions:
        try:
            if p.mountpoint in data.get("disk_mnt_list"):
                du = psutil.disk_usage(p.mountpoint)
                disk_part_info = {"disk_part_device":p.device, "disk_part_mountpoint":p.mountpoint, "disk_part_fstype":p.fstype,"disk_part_opts":p.opts,"disk_part_total":(du.total),"disk_part_used":(du.used),"disk_part_free":(du.free), "disk_part_percent":du.percent}
                disk_info["info"].append(disk_part_info)
            # print(disk_part_info)
        except:
            pass
    # disk io counters 정보
    disk_io_info = psutil.disk_io_counters(perdisk=True)
    for name, name_io in disk_io_info.items():
        if name in data.get("disk_info_list"):
            disk_io_cnt = {"disk_io_name":name, "disk_io_read_count":name_io.read_count, "disk_io_write_count":name_io.write_count, "disk_io_read_bytes":name_io.read_bytes, "disk_io_write_bytes":name_io.write_bytes, "disk_io_read_time":name_io.read_time, "disk_io_write_time":name_io.write_time, "disk_io_read_merged_count":name_io.read_merged_count, "disk_io_busy_time":name_io.busy_time}
            # print(disk_io_cnt)
            disk_info["info"].append(disk_io_cnt)
    print(disk_info)
    main_info["data"].append(disk_info)
    # kafka 사용
    # producer.send(
    #     "test",
    #     key = hostname,
    #     value = disk_info
    # )
    # producer.flush()
    # print(disk_info)

    # network 정보
    net_time = time.strftime('%Y.%m.%d %H:%M:%S')
    
    net_info = {}
    net_info["ts_db_create"] = net_time
    net_info["type"] = "network"
    net_info["info"] = []

    # net io counters 정보
    net_io_info = psutil.net_io_counters(pernic=True)
    # net_info["info"].append(net_io_info)

    for name, name_io in net_io_info.items():
        # print(iface)
        if name in data.get("network_name_list"):
            net_io_cnt_info = {"net_name":name, "net_bytes_sent":name_io.bytes_sent, "net_bytes_recv":name_io.bytes_recv, "net_packets_sent":name_io.packets_sent, "net_packets_recv":name_io.packets_recv, "net_errin":name_io.errin, "net_errout":name_io.errout, "net_dropin":name_io.dropin, "net_dropout":name_io.dropout}
            # print(net_io_cnt_info)
            net_info["info"].append(net_io_cnt_info)

    # net if addrs 정보
    net_if = psutil.net_if_addrs()
    for name, addrs in net_if.items():
        for addr in addrs:
            if name in data.get("network_name_list"):
                net_if_info = {"net_if_name":name, "net_if_family":addr.family, "net_if_address":addr.address, "net_if_netmask":addr.netmask, "net_if_broadcast":addr.broadcast, "net_if_ptp":addr.ptp}
                # print(net_if_info)
                net_info["info"].append(net_if_info)

    # net connections 정보
    net_con = psutil.net_connections()
    for x in net_con:
        try:
            if x.status in data.get("network_conn_list"):
                net_con_info = {"net_con_fd":x.fd, "net_con_family":x.family, "net_con_type":x.type, "net_con_laddr":x.laddr, "net_con_raddr":x.raddr, "net_con_status":x.status, "net_con_pid":x.pid}
                net_info["info"].append(net_con_info)
                # print(net_con_info)
        except:
            pass
    
    # main_info["data"].append(net_info)
    
    #print(main_info)
    
    producer.send(
        "test",
        key = hostname,
        value = main_info
    )
    producer.flush()

    # print(net_info)

    time.sleep(5)
