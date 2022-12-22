import os
import sys

import psutil
from time import sleep
import time

main_info = {}

main_info["system"] = "system"
main_info["service"] = "service"
main_info["company"] = "company"
main_info["os"] = "os"
main_info["ts_db_insert"] = "ts_db_insert"
main_info["ts_db_create"] = "ts_db_create"

disk_list = ["/", "/www", "/data"]

while(1):
    # DISK 정보
    disk_info = main_info
    disk_info["type"] = "disk"
    disk_info["info"] = []
    # disk partitions 정보
    partitions = psutil.disk_partitions()
    for p in partitions:
        try:
            if p.mountpoint in disk_list:
                du = psutil.disk_usage(p.mountpoint)
                disk_part_info = {"device":p.device, "mountpoint":p.mountpoint, "fstype":p.fstype,"opts":p.opts,"total":(du.total),"used":(du.used),"free":(du.free), "percent":du.percent}
            # print(disk_part_info)
        except:
            pass
    # disk io counters 정보
    disk_io_info = psutil.disk_io_counters(perdisk=True)

    # disk info append
    disk_info["info"].append(disk_part_info)
    disk_info["info"].append(disk_io_info)

    print(disk_info)

    # network 정보
    net_info = main_info
    net_info["type"] = "network"
    net_info["info"] = []

    # net io counters 정보
    net_io_info = psutil.net_io_counters(pernic=True)

    # net if addrs 정보
    net_if = psutil.net_if_addrs()
    for name, addrs in net_if.items():
        for addr in addrs:
            net_if_info = {"family":addr.family, "address":addr.address, "netmask":addr.netmask, "broadcast":addr.broadcast, "ptp":addr.ptp}
            #print(net_if_info)

    # net connections 정보
    net_con = psutil.net_connections()
    for x in net_con:
        try:
            if x.status == 'ESTABLISHED':
                net_con_info = {"fd":x.fd, "family":x.family, "type":x.type, "laddr":x.laddr, "raddr":x.raddr, "status":x.status, "pid":x.pid}
                #print(net_con_info)
        except:
            pass

    # net info append
    net_info["info"].append(net_io_info)
    net_info["info"].append(net_if_info)
    net_info["info"].append(net_con_info)

    # print(net_info)
    time.sleep(5)
