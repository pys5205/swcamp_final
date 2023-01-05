import os
import sys
import re
# import pandas as pd
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
main_info["user"] = data.get("main_list")


while(1):
    cpu_info = main_info
    cpu_info["type"]= "cpu"
    cpu_info["info"]=[]
    #cpu 정보
    cpuTime = psutil.cpu_times()

    cpuCount = psutil.cpu_count(logical=False)
    # cpu_info["cpu_count"] = cpuCount

    cpuFreq = psutil.cpu_freq(percpu=True)
    for freq in cpuFreq :
          cpu_frq = {"cpu_frq":{"current":freq.current, "min":freq.min, "max":freq.max}}
        #print(cpu_frq)
          cpu_info["info"].append(cpu_frq)

    # cpus["cpu_frq"] = cpu_frq
    cpuLoadavg = psutil.getloadavg()
    cpus = {"cpu_sys": cpuTime.system,"cpu_user":cpuTime.user,"cpu_wait":cpuTime.iowait, "cpu_irq":cpuTime.irq, "cpu_softirq":cpuTime.softirq, "cpu_count":cpuCount, "cpu_loadavg": cpuLoadavg}
    cpu_info["info"].append(cpus)

    #kafka 사용
    producer.send(
        "test1",
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


    mem_in={"mem_total": mem.total, "mem_avail": mem.available,"mem_used":mem.used,"mem_free":mem.free,"mem_buffer":mem.buffers,"mem_cached":mem.cached,"mem_shared":mem.shared,"memSwap_total":memSwap.total,"memSwap_used":memSwap.used,"memSwap_free":memSwap.free,"memSwap_percent":memSwap.percent,"memSwap_sin":memSwap.sin,"memSwap_sout":memSwap.sout}
    mem_info["info"].append(mem_in)
    # print(mem_info)

    producer.send(
        "test1",
        key = hostname,
        value = mem_info
    )

    producer.flush()

    #process 정보
    procs_info = main_info
    procs_info["type"]="process"
    procs_info["info"]=[]

    procs = psutil.Process()
    # with procs.oneshot():
    #     print(procs.name())
    # with procs.oneshot():
    #     for p in procs:
    #         print(p.name())
    # for t in procs:
    #     print(t.name())
    # procsIter = psutil.process_iter(['pid', 'name', 'username','ppid','cpu_times','memory_full_info','memory_maps','cmdline'])
    # procsIter = psutil.process_iter()
    procs_cpuTimes = procs.cpu_times()
    procsMem = procs.memory_full_info()
    procsMemMaps = procs.memory_maps()

    for proc in psutil.process_iter():
        doc_procs = {"procs_username":proc.username(), "procs_name":proc.name(),"procs_pid":proc.pid,"procs_ppid":proc.ppid(),"procs_cpuT_user":procs_cpuTimes.user,"procs_cpuT_sys":procs_cpuTimes.system,"procs_cpuT_children_user":procs_cpuTimes.children_user,"procs_cpuT_children_sys":procs_cpuTimes.children_system,"procs_cpuT_iowait":procs_cpuTimes.iowait,"procs_percent":procs.cpu_percent(),"procs_createTime":procs.create_time(),"procs_status":procs.status(),"procs_terminal":procs.terminal(),"procs_numTreads":procs.num_threads(),"procs_mem_full_uss":procsMem.uss,"procs_mem_full_pss":procsMem.pss,"procs_mem_full_swap":procsMem.swap,"procs_cmdline":procs.cmdline()}
        # procName = re.findall(proc.name(),data.get('procs_list'))
        # print(procName)
        # print(proc.name(),)
        # df = pd.DataFrame(doc_procs)
        # df[df["procs_name"].str.contains(data.get('procs_list'))]
        # print(type(data.get('procs_list')))
        str = ''.join(data.get('procs_list'))
        # print(type(str))
        procName = re.findall(str,proc.name())
        
        print(procName)
        # if procName in proc.name():
        if proc.name() in data.get('procs_list'):
            procs_info["info"].append(doc_procs)
            # print(data.get('procs_list'))
        elif data.get('procs_list') == [None]:
            procs_info["info"].append(doc_procs)
           
    
    for pmm in procsMemMaps :
        doc_procs_mm = {"procs_mem_path":pmm.path,"procs_mem_rss":pmm.rss,"procs_mem_size":pmm.size,"procs_mem_pss":pmm.pss,"procs_mem_shared_clean":pmm.shared_clean,"procs_mem_private_dirty":pmm.private_dirty,"procs_mem_referenced":pmm.referenced,"procs_mem_anonymous":pmm.anonymous}
        # print(pmm.path)
        if pmm.path in data.get('procs_mem_list'):
            procs_info["info"].append(doc_procs_mm)
        elif data.get('procs_mem_list') == [None]:
            procs_info["info"].append(doc_procs_mm)

            # print(p.info)
    # pptt = procs.as_dict(['pid', 'name', 'username'])
    # print(pptt)
    # for a in pptt.items() :
    #     print(a)
    # for p in pptt :
    #     print(p)
    # doc_procs = {"procs_cpuT_user":procs_cpuTimes.user,"procs_cpuT_sys":procs_cpuTimes.system,"procs_cpuT_children_user":procs_cpuTimes.children_user,"procs_cpuT_children_sys":procs_cpuTimes.children_system,"procs_cpuT_iowait":procs_cpuTimes.iowait,"procs_percent":procs.cpu_percent(),"procs_createTime":procs.create_time(),"procs_status":procs.status(),"procs_terminal":procs.terminal(),"procs_numTreads":procs.num_threads(),"procs_mem_full_uss":procsMem.uss,"procs_mem_full_pss":procsMem.pss,"procs_mem_full_swap":procsMem.swap,"procs_cmdline":procs.cmdline()}
        # procs_info["info"].append(doc_procs)



    # print(procs_info)

    producer.send(
        "test1",
        key = hostname,
        value = procs_info
    )

    producer.flush()

    # print(data)

    time.sleep(5)
