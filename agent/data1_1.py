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

# 전송하기 위한 pipeline 주소
producer = KafkaProducer(bootstrap_servers="ec2-15-165-51-112.ap-northeast-2.compute.amazonaws.com:9092", value_serializer=lambda x: dumps(x).encode("utf-8"))
# pipeline의 hostname은 리눅스 호스트이름
hostname = str.encode(socket.gethostname())

# whitelist.yaml파일을 읽어서 원하는 데이터만 수집하거나 공통데이터 정보 확인
with open('../../agent/whitelist.yaml') as f:
    data = yaml.full_load(f)

#####################
## 공통데이터 데이터 수집 
#####################
main_info = {}
# main_info["my_sys"]에 whitelist에 적은 공통 데이터 입력
main_info["my_sys"] = data.get("main_list")[0]
while(1):
    # 데이터 수집 시간 확인
    main_time = time.strftime('%Y-%m-%d %H:%M:%S')
    main_info["my_sys"]["ts_create"] = main_time
    
    #####################
    ## CPU 데이터 수집 
    #####################
    cpu_info = {}
    # whitelist에서 시스템 이름 입력
    cpu_info["my_sys"] = data.get("main_list")[0]
    cpu_info["type"]= "cpu"
    cpu_info["infos"]={}
    cpu_info["infos"]["cpu_frq"]=[]
    cpu_info["infos"]["cpus"]={}
    
    #cpu 정보
    cpuTime = psutil.cpu_times()

    cpuCount = psutil.cpu_count(logical=False)
    main_info["my_sys"]["cpu_cnt"] = cpuCount
    
    cpuFreq = psutil.cpu_freq(percpu=True)
    for freq in cpuFreq :
        cpu_frq_i = {"cpu_frq_current":freq.current, "cpu_frq_min":freq.min, "cpu_frq_max":freq.max}
        cpu_info["infos"]["cpu_frq"].append(cpu_frq_i)
    
    cpu_per = psutil.cpu_percent()
    cpuLoadavg = psutil.getloadavg()
    cpus = {"cpu_per":cpu_per, "cpu_sys": cpuTime.system,"cpu_user":cpuTime.user,"cpu_wait":cpuTime.iowait, "cpu_irq":cpuTime.irq, "cpu_softirq":cpuTime.softirq, "cpu_count":cpuCount, "cpu_loadavg": cpuLoadavg}
    cpu_info["infos"]["cpus"] = cpus
    
    # pipeline에 CPU 데이터전송
    producer.send(
        "metrics",
        key = hostname,
        value = cpu_info
    )
    producer.flush()

    ########################
    ## 메모리 데이터 수집 
    ########################
    mem_info = {}
    # whitelist에서 시스템 이름 입력
    mem_info["my_sys"] = data.get("main_list")[0]
    mem_info["type"] = "memory"
    mem_info["infos"] = []
    mem = psutil.virtual_memory()
    memSwap = psutil.swap_memory()
    
    main_info["my_sys"]["mem_total"] = mem.total
    mem_in={"mem_total": mem.total, "mem_avail": mem.available,"mem_used":mem.used,"mem_free":mem.free,"mem_buffer":mem.buffers,"mem_cached":mem.cached,"mem_shared":mem.shared,"memswap_total":memSwap.total,"memswap_used":memSwap.used,"memswap_free":memSwap.free,"memswap_percent":memSwap.percent,"memswap_sin":memSwap.sin,"memswap_sout":memSwap.sout}
    mem_info["infos"] = mem_in
    
    # pipeline에 memory 데이터 전송
    producer.send(
        "metrics",
        key = hostname,
        value = mem_info
    )
    producer.flush()

    ##########################
    ## 프로세스 데이터 수집 
    ##########################
    procs_info = {}
    # whitelist에서 시스템 이름 입력
    procs_info["my_sys"] = data.get("main_list")[0]
    procs_proc = {}
    procs_mem = {}
    
    procs_info["type"]="process"
    procs_info["infos"]={}
    procs_info["infos"]["procs_doc"]=[]
    procs_info["infos"]["procs_mem"]=[]

    procs = psutil.Process()
    procs_cpuTimes = procs.cpu_times()
    procsMem = procs.memory_full_info()
    procsMemMaps = procs.memory_maps()
    
    for proc in psutil.process_iter():
        doc_procs = {"procs_username":procs.username(), "procs_name":proc.name(),"procs_pid":proc.pid,"procs_ppid":proc.ppid(),"procs_cput_user":procs_cpuTimes.user,"procs_cput_sys":procs_cpuTimes.system,"procs_cput_children_user":procs_cpuTimes.children_user,"procs_cput_children_sys":procs_cpuTimes.children_system,"procs_cput_iowait":procs_cpuTimes.iowait,"procs_percent":procs.cpu_percent(),"procs_createtime":procs.create_time(),"procs_status":procs.status(),"procs_terminal":procs.terminal(),"procs_numtreads":procs.num_threads(),"procs_mem_full_uss":procsMem.uss,"procs_mem_full_pss":procsMem.pss,"procs_mem_full_swap":procsMem.swap,"procs_cmdline":procs.cmdline()}
        # whitelist의 procs_list에 적어 놓은 데이터만 수집
        if proc.name() in data.get('procs_list'):
            procs_info["infos"]["procs_doc"].append(doc_procs)
        # 아니면 전부 수집
        elif data.get('procs_list') == [None]:
            procs_info["infos"]["procs_doc"].append(doc_procs)
            
    for pmm in procsMemMaps :
        doc_procs_mm = {"procs_mem_path":pmm.path,"procs_mem_rss":pmm.rss,"procs_mem_size":pmm.size,"procs_mem_pss":pmm.pss,"procs_mem_shared_clean":pmm.shared_clean,"procs_mem_private_dirty":pmm.private_dirty,"procs_mem_referenced":pmm.referenced,"procs_mem_anonymous":pmm.anonymous}
        # whitelist의 procs_list에 적어 놓은 데이터만 수집
        if pmm.path in data.get('procs_mem_list'):
            procs_info["infos"]["procs_mem"].append(doc_procs_mm)
        # 아니면 전부 수집
        elif data.get('procs_mem_list') == [None]:
            procs_info["infos"]["procs_mem"].append(doc_procs_mm)
    
    # pipeline에 process 데이터 전송
    producer.send(
        "metrics",
        key = hostname,
        value = procs_info
    )
    producer.flush()
    
    ########################
    ## 디스크 데이터 수집 
    ########################
    disk_info = {}
    # whitelist에서 시스템 이름 입력
    disk_info["my_sys"] = data.get("main_list")[0]
    disk_part = {}
    disk_io = {}
    disk_info["type"] = "disk"
    disk_info["infos"] = {}
    disk_info["infos"]["disk_part"] = []
    disk_info["infos"]["disk_io"] = []
    
    # disk partitions 정보
    partitions = psutil.disk_partitions()
    for p in partitions:
        du = psutil.disk_usage(p.mountpoint)
        disk_part_info = {"disk_part_device":p.device, "disk_part_mountpoint":p.mountpoint, "disk_part_fstype":p.fstype,"disk_part_opts":p.opts,"disk_part_total":(du.total),"disk_part_used":(du.used),"disk_part_free":(du.free), "disk_part_percent":du.percent}
        # whitelist의 disk_mnt_list에 적어 놓은 데이터만 수집
        if p.mountpoint in data.get("disk_mnt_list"):
            disk_info["infos"]["disk_part"].append(disk_part_info)
        # 아니면 전부 수집
        elif data.get("disk_mnt_list") == [None]:
            disk_info["infos"]["disk_part"].append(disk_part_info)

    # disk io counters 정보
    disk_io_info = psutil.disk_io_counters(perdisk=True)
    for name, name_io in disk_io_info.items():
        disk_io_cnt = {"disk_io_name":name, "disk_io_read_count":name_io.read_count, "disk_io_write_count":name_io.write_count, "disk_io_read_bytes":name_io.read_bytes, "disk_io_write_bytes":name_io.write_bytes, "disk_io_read_time":name_io.read_time, "disk_io_write_time":name_io.write_time, "disk_io_read_merged_count":name_io.read_merged_count, "disk_io_busy_time":name_io.busy_time}
        # whitelist의 disk_info_list에 적어 놓은 데이터만 수집
        if name in data.get("disk_info_list"):
            disk_info["infos"]["disk_io"].append(disk_io_cnt)
        # 아니면 전부 수집
        elif data.get("disk_info_list") == [None]:
            disk_info["infos"]["disk_io"].append(disk_io_cnt)
    
    # pipeline에 disk 데이터 전송
    producer.send(
        "metrics",
        key = hostname,
        value = disk_info
    )
    producer.flush()

    ##########################
    ## 네트워크 데이터 수집 
    ##########################
    net_info = {}
    # whitelist에서 시스템 이름 입력
    net_info["my_sys"] = data.get("main_list")[0]
    net_io = {}
    net_if = {}
    net_con = {}
    net_info["type"] = "network"
    net_info["infos"] = {}
    net_info["infos"]["net_io"] = []
    net_info["infos"]["net_if"] = []
    net_info["infos"]["net_con"] = []
    
    # net io counters 정보
    net_io_info = psutil.net_io_counters(pernic=True)
    for name, name_io in net_io_info.items():
        net_io_cnt_info = {"net_name":name, "net_bytes_sent":name_io.bytes_sent, "net_bytes_recv":name_io.bytes_recv, "net_packets_sent":name_io.packets_sent, "net_packets_recv":name_io.packets_recv, "net_errin":name_io.errin, "net_errout":name_io.errout, "net_dropin":name_io.dropin, "net_dropout":name_io.dropout}
        # whitelist의 network_name_list에 적어 놓은 데이터만 수집
        if name in data.get("network_name_list"):
            net_info["infos"]["net_io"].append(net_io_cnt_info)
        # 아니면 전부 수집
        elif data.get("network_name_list") == [None]:
            net_info["infos"]["net_io"].append(net_io_cnt_info)

    # net if addrs 정보
    net_if_i = psutil.net_if_addrs()
    for name, addrs in net_if_i.items():
        for addr in addrs:
            net_if_info = {"net_if_name":name, "net_if_family":addr.family, "net_if_address":addr.address, "net_if_netmask":addr.netmask, "net_if_broadcast":addr.broadcast, "net_if_ptp":addr.ptp}
            # whitelist의 network_name_list에 적어 놓은 데이터만 수집
            if name in data.get("network_name_list"):
                net_info["infos"]["net_if"].append(net_if_info)
            elif data.get("network_name_list") == [None]:
                net_info["infos"]["net_if"].append(net_if_info)

    # net connections 정보
    net_con_i = psutil.net_connections()
    for x in net_con_i:
        net_con_info = {"net_con_fd":x.fd, "net_con_family":x.family, "net_con_type":x.type, "net_con_laddr_port":x.laddr.port,"net_con_laddr_ip":x.laddr.ip, "net_con_raddr":x.raddr, "net_con_status":x.status, "net_con_pid":x.pid}
        # whitelist의 network_conn_list에 적어 놓은 데이터만 수집
        if x.status in data.get("network_conn_list"):
            net_info["infos"]["net_con"].append(net_con_info)
        # 아니면 전부 수집
        elif data.get("network_conn_list") == [None]:
            net_info["infos"]["net_con"].append(net_con_info)

    # pipeline에 network 데이터 전송
    producer.send(
        "metrics",
        key = hostname,
        value = net_info
    )
    producer.flush()
    
    # while문 2초마다 반복
    time.sleep(2)
