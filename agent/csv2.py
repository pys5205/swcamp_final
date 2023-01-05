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
    #cpu 정보
    
    cpuTime = psutil.cpu_times()
    cpuCount = psutil.cpu_count(logical=False)
    # cpu_info["cpu_count"] = cpuCount

    cpuFreq = psutil.cpu_freq(percpu=True)
    for freq in cpuFreq :
        cpu_info_frq = str(main[0]) + "||" + str(main_time) + "||" + str(freq.current) + "||" + str(freq.min) + "||" + str(freq.max) + "\n"
        producer.send(
            "cpu_frq",
            key = hostname,
            value = cpu_info_frq
        )
    # cpus["cpu_frq"] = cpu_frq
    
    cpuLoadavg = psutil.getloadavg()
    cpus = str(main[0]) + "||" + str(main_time) + "||" + str(cpuTime.system) + "||" + str(cpuTime.user) + "||" + str(cpuTime.iowait) + "||" + str(cpuTime.irq) + "||" + str(cpuTime.softirq) + "||" + str(cpuCount) + "||" + str(cpuLoadavg) + "\n"
    producer.send(
        "cpu_cpus",
        key = hostname,
        value = cpus
    )
    
    #memory 정보
    mem_info = []
    mem = psutil.virtual_memory()
    memSwap = psutil.swap_memory()

    mem_in=str(main[0]) + "||" + str(main_time) + "||" + str(mem.total) + "||" + str(mem.available) + "||" + str(mem.used) + "||" + str(mem.free) + "||" + str(mem.buffers) + "||" + str(mem.cached) + "||" + str(mem.shared) + "||" + str(memSwap.total) + "||" + str(memSwap.used) + "||" + str(memSwap.free) + "||" + str(memSwap.percent) + "||" + str(memSwap.sin) + "||" + str(memSwap.sout)

    producer.send(
        "memory",
        key = hostname,
        value = mem_in
    )
    
    #process 정보
    procs = psutil.Process()
    procs_cpuTimes = procs.cpu_times()
    procsMem = procs.memory_full_info()
    procsMemMaps = procs.memory_maps()
    
    for proc in psutil.process_iter():
        doc_procs = str(main[0]) + "||" + str(main_time) + "||" + str(procs.username()) + "||" + str(proc.name()) + "||" + str(proc.pid) + "||" + str(proc.ppid()) + "||" + str(procs_cpuTimes.user) + "||" + str(procs_cpuTimes.system) + "||" + str(procs_cpuTimes.children_user) + "||" + str(procs_cpuTimes.children_system) + "||" + str(procs_cpuTimes.iowait) + "||" + str(procs.cpu_percent()) + "||" + str(procs.create_time()) + "||" + str(procs.status()) + "||" + str(procs.terminal()) + "||" + str(procs.num_threads()) + "||" + str(procsMem.uss) + "||" + str(procsMem.pss) + "||" + str(procsMem.swap) + "||" + str(procs.cmdline()) + "\n"
        if proc.name() in data.get('procs_list'):
            producer.send(
                "procs_doc",
                key = hostname,
                value = doc_procs
            );
        else:
            producer.send(
                "procs_doc",
                key = hostname,
                value = doc_procs
            );
            
    for pmm in procsMemMaps :
        doc_procs_mm = str(main[0]) + "||" + str(main_time) + "||" + str(pmm.path) + "||" + str(pmm.rss) + "||" + str(pmm.size) + "||" + str(pmm.pss) + "||" + str(pmm.shared_clean) + "||" + str(pmm.private_dirty) + "||" + str(pmm.referenced) + "||" + str(pmm.anonymous) + "\n"
        if pmm.path in data.get('procs_mem_list'):
            producer.send(
                "procs_mem",
                key = hostname,
                value = doc_procs_mm
            );
        else :
            producer.send(
                "procs_mem",
                key = hostname,
                value = doc_procs_mm
            );
    
    
    
    
    # disk 정보
    # disk partitions 정보
    partitions = psutil.disk_partitions()
    for p in partitions:
            if p.mountpoint in data.get("disk_mnt_list"):
                du = psutil.disk_usage(p.mountpoint)
                disk_part_info = str(main[0]) + "||" + str(main_time) + "||" + str(p.device) + "||" + str(p.mountpoint) + "||" + str(p.fstype) + "||" + str(du.total) + "||" + str(du.used) + "||" + str(du.free) + "||" + str(du.percent) + "\n"
                #print(disk_info)
                producer.send(
                "disk_part",
                key = hostname,
                value = disk_part_info
            )
                
    # print(disk_part)
    disk_io_info = psutil.disk_io_counters(perdisk=True)
    for name, name_io in disk_io_info.items():
        if name in data.get("disk_info_list"):
            disk_io_cnt = str(main[0]) + "||" + str(main_time) + "||" +  name + "||" + str(name_io.read_count) + "||" + str(name_io.write_count) + "||" + str(name_io.read_bytes) + "||" + str(name_io.write_bytes) + "||" + str(name_io.read_time) + "||" + str(name_io.write_time) + "||" + str(name_io.read_merged_count) + "||" + str(name_io.busy_time)  + "\n"
            # print(disk_io_cnt)
            producer.send(
                "disk_io",
                key = hostname,
                value = disk_io_cnt
            )
    
    #print(disk_info)
    
    
    #network 정보
    # net io counters 정보
    net_io_info = psutil.net_io_counters(pernic=True)
    for name, name_io in net_io_info.items():
        if name in data.get("network_name_list"):
            net_io_cnt_info = str(main[0]) + "||" + str(main_time) + "||" + name + "||" + str(name_io.bytes_sent) + "||" + str(name_io.bytes_recv) + "||" + str(name_io.packets_sent) + "||" + str(name_io.packets_recv) + "||" + str(name_io.errin) + "||" + str(name_io.errout) + "||" + str(name_io.dropin) + "||" + str(name_io.dropout) + "\n"
            # print(net_io_cnt_info)
            producer.send(
                "net_io",
                key = hostname,
                value = net_io_cnt_info
            )
            producer.flush()

    # net if addrs 정보
    net_if_data = psutil.net_if_addrs()
    for name, addrs in net_if_data.items():
        for addr in addrs:
            if name in data.get("network_name_list"):
                net_if_info = str(main[0]) + "||" + str(main_time) + "||" + str(name) + "||" + str(addr.family) + "||" + str(addr.address) + "||" + str(addr.netmask) + "||" + str(addr.broadcast) + "||" + str(addr.ptp) + "\n"
                # print(net_if_info)
                producer.send(
                    "net_if",
                    key = hostname,
                    value = net_if_info
                )

    # net connections 정보
    net_con_data = psutil.net_connections()
    for x in net_con_data:
        if x.status in data.get("network_conn_list"):
            net_con_info = str(main[0]) + "||" + str(main_time) + "||" + str(x.fd) + "||" + str(x.family) + "||" + str(x.type) + "||" + str(x.laddr.ip) + "||" + str(x.laddr.port) + "||" + str(x.raddr.ip) + "||" + str(x.raddr.port) + "||" + str(x.status) + "||" + str(x.pid) + "\n"
            # print(net_con_info)
            producer.send(
                "net_con",
                key = hostname,
                value = net_con_info
            )
    time.sleep(5)
