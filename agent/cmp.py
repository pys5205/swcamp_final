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


# main_info["system"] = "system"
# main_info["service"] = "service"
# main_info["company"] = "company"
# main_info["os"] = "os"
# main_info["ts_db_insert"] = "ts_db_insert"
# main_info["ts_db_create"] = "ts_db_create"
#

with open('whitelist.yaml') as f:
    data = yaml.load(f)

main_info = {}
main_info["user"] = data.get("main_list")

while(1) :

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
    # print(cpu_info)
    producer.send(
        "test",
        key = hostname,
        value = cpu_info
    )

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

    doc_procs = {"procs_name":procs.name(),"procs_ppid":procs.ppid(),"procs_cpuT_user":procs_cpuTimes.user,"procs_cpuT_sys":procs_cpuTimes.system,"procs_cpuT_children_user":procs_cpuTimes.children_user,"procs_cpuT_children_sys":procs_cpuTimes.children_system,"procs_cpuT_iowait":procs_cpuTimes.iowait,"procs_percent":procs.cpu_percent(),"procs_createTime":procs.create_time(),"procs_status":procs.status(),"procs_terminal":procs.terminal(),"procs_numTreads":procs.num_threads()}

    procs_info["info"].append(doc_procs)
    # print(procs_info)

    producer.send(
        "test",
        key = hostname,
        value = procs_info
    )

    producer.flush()

    # print(data)

    time.sleep(5)
