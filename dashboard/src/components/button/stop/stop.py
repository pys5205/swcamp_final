import os
import subprocess

# subprocess.run(["./stop.sh", "arguments"], shell=True)
# subprocess.call('sudo ps -ef | grep data1_1.py | awk '{print $2}'', shell=True);
os.system('sudo sh ./stop.sh');
# os.popen('sudo kill -9 $(sudo ps -ef | grep data1_1.py | awk '{print $2}')');
