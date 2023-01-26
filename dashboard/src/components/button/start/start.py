import os

stream = os.popen('sudo ps -ef | grep data1_1.py');
output = stream.read();
print(output);