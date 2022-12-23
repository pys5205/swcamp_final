import psutil
import time
import socket
from kafka import KafkaProducer
from kafka.errors import KafkaError

producer = KafkaProducer(bootstrap_servers="localhost:9092")
hostname = str.encode(socket.gethostname())

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
    mem_info = {}

    data["cpu_info"]=[]
    data["mem_info"]=[]
    cpuTime = psutil.cpu_times()
    cpuCount = psutil.cpu_count(logical=False)
    cpu_info["cpu_sys"] = cpuTime.system
    cpu_info["cpu_user"] = cpuTime.user
    cpu_info["cpu_wait"] = cpuTime.iowait
    cpu_info["cpu_irq"] = cpuTime.irq
    cpu_info["cpu_softirq"] = cpuTime.softirq
    cpu_info["cpu_count"] = cpuCount
    cpu_info["cpu_freq"] = psutil.cpu_freq()

    mem = psutil.virtual_memory()
    memSwap = psutil.swap_memory()

    data["cpu_info"].append(cpu_info)

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
    producer.send(
    "test",
    key=hostname,
    value="hello".encode('utf-8')
    )
    producer.flush()
    print(data)
    time.sleep(5)
