import os
import sys

import psutil
from time import sleep
import time

while(1):
 today = time.strftime('%y/%m/%d %H:%M:%S')
 #DISK 정보
 partitions = psutil.disk_partitions()
 for p in partitions:
  try:
   du = psutil.disk_usage(p.mountpoint)
   cnt = psutil.disk_io_counters(p.mountpoint)
   if (p.mountpoint == '/'):
    info = {"type":'disk', "device":p.device, "mountpoint":p.mountpoint, "fstype":p.fstype,"opts":p.opts,"total":(du.total),"used":(du.used),"free":(du.free), "percent":du.percent}
    print(info)
  except:
   pass
 time.sleep(5)
