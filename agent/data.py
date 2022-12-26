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
    data = yaml.load(f)
# disk_list = ["/", "/www", "/data"]

#main info
main_info = {}
main_info["user"] = data.get("main_list")


while(1):
    cpu_info = main_info

    cpu_info["type"]= "cpu"
    cpu_info["info"]=[]
    #cpu 정보
    cpuTime = psutil.cpu_times()

    # cpus["cpu_sys"] = cpuTime.system
    # cpus["cpu_user"] = cpuTime.user
    # cpus["cpu_wait"] = cpuTime.iowait
    # cpus["cpu_irq"] = cpuTime.irq
    # cpus["cpu_softirq"] = cpuTime.softirq

    cpuCount = {"cpu_count":psutil.cpu_count(logical=False)}
    # cpu_info["cpu_count"] = cpuCount

    cpuFreq = psutil.cpu_freq(percpu=True)
    for freq in cpuFreq :
          cpu_frq = {"cpu_frq":{"current":freq.current, "min":freq.min, "max":freq.max}}
          cpu_info["info"].append(cpu_frq)

    # cpus["cpu_frq"] = cpu_frq
    cpuLoadavg = psutil.getloadavg()
    cpus = {"cpu_sys": cpuTime.system,"cpu_user":cpuTime.user,"cpu_wait":cpuTime.iowait, "cpu_irq":cpuTime.irq, "cpu_softirq":cpuTime.softirq,"cpu_count":cpuCount, "cpu_loadavg": cpuLoadavg}
    cpu_info["info"].append(cpus)

    # kafka 사용
    producer.send(
        "test",
        key = hostname,
        value = cpu_info
    )
    producer.flush()

    #memory 정보
    mem_info = main_info
    mem_info["type"] = "memory"
    mem_info["info"] = []
    mem_free={}
    mem = psutil.virtual_memory()
    memSwap = psutil.swap_memory()

    # mem_free["mem_total"] = mem.total
    # mem_free["mem_avail"] = mem.available
    # mem_free["mem_used"] = mem.used
    # mem_free["mem_free"] = mem.free
    # mem_free["mem_buffer"] = mem.buffers
    # mem_free["mem_cached"] = mem.cached
    # mem_free["mem_shared"] = mem.shared
    # mem_free["memSwap_total"] = memSwap.total
    # mem_free["memSwap_used"] = memSwap.used
    # mem_free["memSwap_free"] = memSwap.free
    # mem_free["memSwap_percent"] = memSwap.percent
    # mem_free["memSwap_sin"] = memSwap.sin
    # mem_free["memSwap_sout"] = memSwap.sout
    mem_in={"mem_total": mem.total, "mem_avail": mem.available,"mem_used":mem.used,"mem_free":mem.free,"mem_buffer":mem.buffers,"mem_cached":mem.cached,"mem_shared":mem.shared,"memSwap_total":memSwap.total,"memSwap_used":memSwap.used,"memSwap_free":memSwap.free,"memSwap_percent":memSwap.percent,"memSwap_sin":memSwap.sin,"memSwap_sout":memSwap.sout}
    mem_info["info"].append(mem_in)
    # print(mem_info)

    producer.send(
        "test",
        key = hostname,
        value = mem_info
    )

    producer.flush()

    #process 정보
    procs_info = main_info
    procs_info["type"]="process"
    procs_info["info"]=[]
    procs = psutil.Process()
    procsIter = psutil.process_iter(['pid', 'name', 'username'])
    for p in procsIter:
        procs_info["info"].append(p.info)
    # procs_iter = {p.pid: p.info for p in psutil.process_iter(['name', 'username'])}
    # procss["procs_name"] = procs.name()
    # procss["procs_ppid"] = procs.ppid()

    procs_cpuTimes = procs.cpu_times()
    # procss["procs_cpuT_user"] = procs_cpuTimes.user
    # procss["procs_cpuT_sys"] = procs_cpuTimes.system
    # procss["procs_cpuT_children_user"] = procs_cpuTimes.children_user
    # procss["procs_cpuT_children_sys"] = procs_cpuTimes.children_system
    # procss["procs_cpuT_iowait"] = procs_cpuTimes.iowait
    #
    # procss["procs_percent"] = procs.cpu_percent()
    # procss["procs_createTime"] = procs.create_time()
    # procss["procs_status"] = procs.status()
    # procss["procs_terminal"] = procs.terminal()
    # procss["procs_numTreads"] = procs.num_threads()
    procsMem = procs.memory_full_info()
    procsMemMaps = procs.memory_maps()
    doc_procs = {"procs_name":procs.name(),"procs_ppid":procs.ppid(),"procs_cpuT_user":procs_cpuTimes.user,"procs_cpuT_sys":procs_cpuTimes.system,"procs_cpuT_children_user":procs_cpuTimes.children_user,"procs_cpuT_children_sys":procs_cpuTimes.children_system,"procs_cpuT_iowait":procs_cpuTimes.iowait,"procs_percent":procs.cpu_percent(),"procs_createTime":procs.create_time(),"procs_status":procs.status(),"procs_terminal":procs.terminal(),"procs_numTreads":procs.num_threads(),"procs_mem_full_uss":procsMem.uss,"procs_mem_full_pss":procsMem.pss,"procs_mem_full_swap":procsMem.swap}
    procs_info["info"].append(doc_procs)

    for pmm in procsMemMaps :
        doc_procs_mm = {"path":pmm.path,"rss":pmm.rss,"size":pmm.size,"pss":pmm.pss,"shared_clean":pmm.shared_clean,"private_dirty":pmm.private_dirty,"referenced":pmm.referenced,"anonymous":pmm.anonymous}
        procs_info["info"].append(doc_procs_mm)

    # print(procs_info)

    producer.send(
        "test",
        key = hostname,
        value = procs_info
    )

    producer.flush()

    # DISK 정보
    disk_info = main_info
    disk_info["type"] = "disk"
    disk_info["info"] = []
    # disk partitions 정보
    partitions = psutil.disk_partitions()
    for p in partitions:
        try:
            if p.mountpoint in data.get("disk_list"):
                du = psutil.disk_usage(p.mountpoint)
                disk_part_info = {"device":p.device, "mountpoint":p.mountpoint, "fstype":p.fstype,"opts":p.opts,"total":(du.total),"used":(du.used),"free":(du.free), "percent":du.percent}
                disk_info["info"].append(disk_part_info)
            # print(disk_part_info)
        except:
            pass
    # disk io counters 정보
    disk_io_info = psutil.disk_io_counters(perdisk=True)
    disk_info["info"].append(disk_io_info)

    # kafka 사용
    producer.send(
        "test",
        key = hostname,
        value = disk_info
    )
    producer.flush()
    # print(disk_info)

    # network 정보
    net_info = main_info
    net_info["type"] = "network"
    net_info["info"] = []

    # net io counters 정보
    net_io_info = psutil.net_io_counters(pernic=True)
    # net_info["info"].append(net_io_info)

    for name, name_io in net_io_info.items():
        # print(iface)
        if name in data.get("network_list"):
            net_io_cnt_info = {"name":name, "bytes_sent":name_io.bytes_sent, "bytes_recv":name_io.bytes_recv, "packets_sent":name_io.packets_sent, "packets_recv":name_io.packets_recv, "errin":name_io.errin, "errout":name_io.errout, "dropin":name_io.dropin, "dropout":name_io.dropout}
            # print(net_io_cnt_info)
            net_info["info"].append(net_io_cnt_info)

    # net if addrs 정보
    net_if = psutil.net_if_addrs()
    for name, addrs in net_if.items():
        for addr in addrs:
            if name in data.get("network_list"):
                net_if_info = {"name":name, "family":addr.family, "address":addr.address, "netmask":addr.netmask, "broadcast":addr.broadcast, "ptp":addr.ptp}
                # print(net_if_info)
                net_info["info"].append(net_if_info)

    # net connections 정보
    net_con = psutil.net_connections()
    for x in net_con:
        try:
            if x.status == 'ESTABLISHED':
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
