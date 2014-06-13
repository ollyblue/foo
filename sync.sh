#!/bin/bash

#可以进行机器间文件同步的脚本 

test_tmp_dir=/tmp/bluezheng/so

function sync_from_dev_to_test()
{
	#get a rand dir
	rand_num1=$RANDOM
	rand_num2=`date +%s`
	date_str=`date '+%y-%m-%d'`
	rand_dir="/tmp/"${date_str}"_"${rand_num1}"_"${rand_num2}
	file_name=${1##*/}

	mkdir -p ${rand_dir}

	if [ "${2}" != "" ];then
		test_dir=${2}
	else
		test_dir=${test_tmp_dir}
	fi

	expect -c "set timeout 3600;\
	spawn rsync -azvP 这个是你的账号@10.10.10.10:${1} ${rand_dir};\
	expect "*assword*" ;\
	send -- \"在这里写你的密码\n\" ;\
	expect eof ;\
	spawn rsync -azvP ${rand_dir}/${file_name} IDC账号@10.10.223.107:${test_dir} ;\
	expect "*assword*";\
	send -- \"在这里写IDC账号的密码\n\" ;\
	expect "*100%*";\
	expect eof;\
	exit;\
	"
	# after sync succeed,delete the temporary dir & file
	file=${rand_dir}/${file_name}
	if [ -f ${file} ];then
		rm -rf ${file}
	fi
}

function help()
{
	echo "./sync dev_dir [test_dir]"
}

function main()
{
	if [ $# -lt 1 ];then
		help
		exit
	fi

	dev_sub_dir=$1
	if [ $# -gt 1 ];then
		test_sub_dir=$2
	fi

	sync_from_dev_to_test "${dev_sub_dir}" "${test_sub_dir}"
}

main $*
