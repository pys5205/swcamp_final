#!/bin/sh

singlestore -uroot -p -e "use swcamp; select * from tbl_disk_part" 2> /dev/null > disk_part 
