import psutil
import time
import socket
# from kafka import KafkaProducer
# from kafka.errors import KafkaError
#
# producer = KafkaProducer(bootstrap_servers="localhost:9092", value_serializer=lambda x: dumps(x).encode("utf-8"))
# hostname = str.encode(socket.gethostname())

data = {}

# main_info["system"] = "system"
# main_info["service"] = "service"
# main_info["company"] = "company"
# main_info["os"] = "os"
# main_info["ts_db_insert"] = "ts_db_insert"
# main_info["ts_db_create"] = "ts_db_create"
#



while(1) :
    cpu_info = {}
    data["cpu_info"]=[]

    #cpu 정보
    cpuTime = psutil.cpu_times()
    cpu_info["cpu_sys"] = cpuTime.system
    cpu_info["cpu_user"] = cpuTime.user
    cpu_info["cpu_wait"] = cpuTime.iowait
    cpu_info["cpu_irq"] = cpuTime.irq
    cpu_info["cpu_softirq"] = cpuTime.softirq

    cpuCount = psutil.cpu_count(logical=False)
    cpu_info["cpu_count"] = cpuCount

    cpuFreq = psutil.cpu_freq(percpu=True)
    for freq in cpuFreq :
          cpu_frq = {"current":freq.current, "min":freq.min, "max":freq.max}
    cpu_info["cpu_frq"] = cpu_frq

    cpuLoadavg = psutil.getloadavg()
    cpu_info["cpu_loadavg"] = cpuLoadavg

    data["cpu_info"].append(cpu_info)

    #memory 정보
    mem_info = {}
    data["mem_info"]=[]
    mem = psutil.virtual_memory()
    memSwap = psutil.swap_memory()

    mem_info["mem_total"] = mem.total
    mem_info["mem_avail"] = mem.available
    mem_info["mem_used"] = mem.used
    mem_info["mem_free"] = mem.free
    mem_info["mem_buffer"] = mem.buffers
    mem_info["mem_cached"] = mem.cached
    mem_info["mem_shared"] = mem.shared
    mem_info["memSwap_total"] = memSwap.total
    mem_info["memSwap_used"] = memSwap.used
    mem_info["memSwap_free"] = memSwap.free
    mem_info["memSwap_percent"] = memSwap.percent
    mem_info["memSwap_sin"] = memSwap.sin
    mem_info["memSwap_sout"] = memSwap.sout

    data["mem_info"].append(mem_info)

    #process 정보
    procs_info = {}
    data["procs_info"]=[]
    data["procs_iter"]=[]
    procs = psutil.Process()
    procsIter = psutil.process_iter(['pid', 'name', 'username'])
    for p in procsIter:
        data["procs_iter"].append(p.info)
    # procs_iter = {p.pid: p.info for p in psutil.process_iter(['name', 'username'])}
    procs_info["procs_name"] = procs.name()
    procs_info["procs_ppid"] = procs.ppid()

    procs_cpuTimes = procs.cpu_times()
    procs_info["procs_cpuT_user"] = procs_cpuTimes.user
    procs_info["procs_cpuT_sys"] = procs_cpuTimes.system
    procs_info["procs_cpuT_children_user"] = procs_cpuTimes.children_user
    procs_info["procs_cpuT_children_sys"] = procs_cpuTimes.children_system
    procs_info["procs_cpuT_iowait"] = procs_cpuTimes.iowait

    procs_info["procs_percent"] = procs.cpu_percent()
    procs_info["procs_createTime"] = procs.create_time()
    procs_info["procs_status"] = procs.status()
    procs_info["procs_terminal"] = procs.terminal()
    procs_info["procs_numTreads"] = procs.num_threads()
    data["procs_info"].append(procs_info)


    # producer.send(
    #     "test",
    #     key = hostname,
    #     value = data
    # )
    #
    # producer.flush()

    print(data)

    time.sleep(5)
