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
# rpk topic consume test

# yaml whitelist
with open('whitelist.yaml') as f:
    data = yaml.full_load(f)
# disk_list = ["/", "/www", "/data"]

#main info
main_info = {}

while(1):
    main_info["my_sys"] = data.get("main_list")[0]
    main_time = time.strftime('%Y-%m-%d %H:%M:%S')
    main_info["my_sys"]["ts_db_create"] = main_time
    # print(main_info["common"][0]["ts_db_create"])
    main_info["infos"]=[]
    
    cpu_info = {}
    cpu_info["type"]= "cpu"
    cpu_info["info"]=[]
    #cpu 정보
    cpuTime = psutil.cpu_times()

    cpuCount = psutil.cpu_count(logical=False)
    # cpu_info["cpu_count"] = cpuCount

    cpuFreq = psutil.cpu_freq(percpu=True)
    for freq in cpuFreq :
          cpu_frq = {"cpu_frq":{"cpu_frq_current":freq.current, "cpu_frq_min":freq.min, "cpu_frq_max":freq.max}}
          cpu_info["info"].append(cpu_frq)

    # cpus["cpu_frq"] = cpu_frq
    cpuLoadavg = psutil.getloadavg()
    cpus = {"cpu_sys": cpuTime.system,"cpu_user":cpuTime.user,"cpu_wait":cpuTime.iowait, "cpu_irq":cpuTime.irq, "cpu_softirq":cpuTime.softirq, "cpu_count":cpuCount, "cpu_loadavg": cpuLoadavg}
    cpu_info["info"].append(cpus)
    
    main_info["infos"].append(cpu_info)
    
    # kafka 사용
    # producer.send(
    #     "test",
    #     key = hostname,
    #     value = cpu_info
    # )
    # producer.flush()

    #memory 정보
    mem_info = {}
    mem_info["type"] = "memory"
    mem_info["info"] = []
    mem = psutil.virtual_memory()
    memSwap = psutil.swap_memory()

    mem_in={"mem_total": mem.total, "mem_avail": mem.available,"mem_used":mem.used,"mem_free":mem.free,"mem_buffer":mem.buffers,"mem_cached":mem.cached,"mem_shared":mem.shared,"memswap_total":memSwap.total,"memswap_used":memSwap.used,"memswap_free":memSwap.free,"memswap_percent":memSwap.percent,"memswap_sin":memSwap.sin,"memswap_sout":memSwap.sout}
    mem_info["info"].append(mem_in)

    main_info["infos"].append(mem_info)
    
    # print(mem_info)

    # producer.send(
    #     "test",
    #     key = hostname,
    #     value = mem_info
    # )

    # producer.flush()

    #process 정보
    procs_info = {}
    procs_proc = {}
    procs_mem = {}
    
    procs_info["type"]="process"
    
    procs_info["info"]=[]
    procs_proc["procs_doc"]=[]
    procs_mem["procs_mem"]=[]

    procs = psutil.Process()
    procs_cpuTimes = procs.cpu_times()
    procsMem = procs.memory_full_info()
    procsMemMaps = procs.memory_maps()

    for proc in psutil.process_iter():
        doc_procs = {"procs_username":procs.username(), "procs_name":proc.name(),"procs_pid":proc.pid,"procs_ppid":proc.ppid(),"procs_cput_user":procs_cpuTimes.user,"procs_cput_sys":procs_cpuTimes.system,"procs_cput_children_user":procs_cpuTimes.children_user,"procs_cput_children_sys":procs_cpuTimes.children_system,"procs_cput_iowait":procs_cpuTimes.iowait,"procs_percent":procs.cpu_percent(),"procs_createtime":procs.create_time(),"procs_status":procs.status(),"procs_terminal":procs.terminal(),"procs_numtreads":procs.num_threads(),"procs_mem_full_uss":procsMem.uss,"procs_mem_full_pss":procsMem.pss,"procs_mem_full_swap":procsMem.swap,"procs_cmdline":procs.cmdline()}
        if proc.name() in data.get('procs_list'):
            procs_proc["procs_doc"].append(doc_procs)
        elif data.get('procs_list') == [None]:
            procs_proc["procs_doc"].append(doc_procs)
    procs_info["info"].append(procs_proc)        
    
            
    for pmm in procsMemMaps :
        doc_procs_mm = {"procs_mem_path":pmm.path,"procs_mem_rss":pmm.rss,"procs_mem_size":pmm.size,"procs_mem_pss":pmm.pss,"procs_mem_shared_clean":pmm.shared_clean,"procs_mem_private_dirty":pmm.private_dirty,"procs_mem_referenced":pmm.referenced,"procs_mem_anonymous":pmm.anonymous}
        if pmm.path in data.get('procs_mem_list'):
            procs_mem["procs_mem"].append(doc_procs_mm)
        elif data.get('procs_mem_list') == [None]:
            procs_mem["procs_mem"].append(doc_procs_mm)
    procs_info["info"].append(procs_mem)  
    
    main_info["infos"].append(procs_info)
    
    # producer.send(
    #     "test",
    #     key = hostname,
    #     value = procs_info
    # )
    # producer.flush()

    # 현재 시간
    #disk_time = time.strftime('%Y.%m.%d %H:%M:%S')
    # print(today)
    
    # DISK 정보
    disk_info = {}
    disk_part = {}
    disk_io = {}
    #disk_info["ts_db_create"] = disk_time
    # print (disk_info["user"])
    disk_info["type"] = "disk"
    disk_info["info"] = []
    disk_part["disk_part"] = []
    disk_io["disk_io"] = []
    # disk partitions 정보
    partitions = psutil.disk_partitions()
    for p in partitions:
        if p.mountpoint in data.get("disk_mnt_list"):
            du = psutil.disk_usage(p.mountpoint)
            disk_part_info = {"disk_part_device":p.device, "disk_part_mountpoint":p.mountpoint, "disk_part_fstype":p.fstype,"disk_part_opts":p.opts,"disk_part_total":(du.total),"disk_part_used":(du.used),"disk_part_free":(du.free), "disk_part_percent":du.percent}
            disk_part["disk_part"].append(disk_part_info)
            
    disk_info["info"].append(disk_part)
            # print(disk_part_info)

    # disk io counters 정보
    disk_io_info = psutil.disk_io_counters(perdisk=True)
    for name, name_io in disk_io_info.items():
        if name in data.get("disk_info_list"):
            disk_io_cnt = {"disk_io_name":name, "disk_io_read_count":name_io.read_count, "disk_io_write_count":name_io.write_count, "disk_io_read_bytes":name_io.read_bytes, "disk_io_write_bytes":name_io.write_bytes, "disk_io_read_time":name_io.read_time, "disk_io_write_time":name_io.write_time, "disk_io_read_merged_count":name_io.read_merged_count, "disk_io_busy_time":name_io.busy_time}
            disk_io["disk_io"].append(disk_io_cnt)
    disk_info["info"] .append(disk_io)
    
    main_info["infos"].append(disk_info)
    # kafka 사용
    # producer.send(
    #     "test",
    #     key = hostname,
    #     value = disk_info
    # )
    # producer.flush()
    # print(disk_info)

    # network 정보
    #net_time = time.strftime('%Y.%m.%d %H:%M:%S')
    
    net_info = {}
    net_io = {}
    net_if = {}
    net_con = {}
    #net_info["ts_db_create"] = net_time
    net_info["type"] = "network"
    net_info["info"] = []
    net_io["net_io"] = []
    net_if["net_if"] = []
    net_con["net_con"] = []
    # net io counters 정보
    net_io_info = psutil.net_io_counters(pernic=True)
    # net_info["info"].append(net_io_info)

    for name, name_io in net_io_info.items():
        # print(iface)
        if name in data.get("network_name_list"):
            net_io_cnt_info = {"net_name":name, "net_bytes_sent":name_io.bytes_sent, "net_bytes_recv":name_io.bytes_recv, "net_packets_sent":name_io.packets_sent, "net_packets_recv":name_io.packets_recv, "net_errin":name_io.errin, "net_errout":name_io.errout, "net_dropin":name_io.dropin, "net_dropout":name_io.dropout}
            # print(net_io_cnt_info)
            net_io["net_io"].append(net_io_cnt_info)
    net_info["info"].append(net_io)

    # net if addrs 정보
    net_if_i = psutil.net_if_addrs()
    for name, addrs in net_if_i.items():
        for addr in addrs:
            if name in data.get("network_name_list"):
                net_if_info = {"net_if_name":name, "net_if_family":addr.family, "net_if_address":addr.address, "net_if_netmask":addr.netmask, "net_if_broadcast":addr.broadcast, "net_if_ptp":addr.ptp}
                # print(net_if_info)
                net_if["net_if"].append(net_if_info)
    net_info["info"].append(net_if)

    # net connections 정보
    net_con_i = psutil.net_connections()
    for x in net_con_i:
        if x.status in data.get("network_conn_list"):
            net_con_info = {"net_con_fd":x.fd, "net_con_family":x.family, "net_con_type":x.type, "net_con_laddr":x.laddr, "net_con_raddr":x.raddr, "net_con_status":x.status, "net_con_pid":x.pid}
            net_con["net_con"].append(net_con_info)
    net_info["info"].append(net_con)
            # print(net_con_info)

    main_info["infos"].append(net_info)
    #print(main_info)
    print(main_info["infos"][0]["type"])
    print(main_info["infos"]["info"])
    # producer.send(
    #     "metrics",
    #     key = hostname,
    #     value = main_info
    # )
    # producer.flush()
    
    time.sleep(5)
