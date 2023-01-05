#!/bin/sh

rpk topic delete cpu_frq
rpk topic delete cpu_cpus

rpk topic delete memory

rpk topic delete procs_doc
rpk topic delete procs_mem

rpk topic delete disk_part
rpk topic delete disk_io

rpk topic delete net_io
rpk topic delete net_if
rpk topic delete net_con