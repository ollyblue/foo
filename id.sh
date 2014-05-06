#!/bin/bash

##########################################################
# module: for generatoion select sql by item_id
# version: v0.0
# author: ollyblue
# date: 2014-05-06
##########################################################

#process itemid for mysql sql statement
#1 master db, 3 slave db
declare -a g_mArrDB=('10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10')
declare -a g_s0ArrDB=('10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10')
declare -a g_s1ArrDB=('10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10')
declare -a g_s2ArrDB=('10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10' '10.10.10.10')
declare g_uin=0
declare g_commodity_id=0

function htonl()
{
	if [[ -z ${1} ]];then
		return 1
	fi

	local _ret
	let "byte_1=${1} & 0xFF000000"
	let "byte_1>>=24"
	let "byte_2=${1} & 0x00FF0000"
	let "byte_2>>=16"
	let "byte_3=${1} & 0x0000FF00"
	let "byte_3>>=8"
	let "byte_4=${1} & 0x000000FF"

	let "_ret|=${byte_4}<<24"
	let "_ret|=${byte_3}<<16"
	let "_ret|=${byte_2}<<8"
	let "_ret|=${byte_1}"
	echo "${_ret}"
	return 0
}

function get_commdyid_and_uin()
{
	if [[ -z ${1} ]];then
		return 2
	fi
	local str_item_id=${1}
	local str_uin_hex=${str_item_id:0:8}
	local str_commodity_id=${str_item_id:16:16}

	local str_uin_oct=$(echo "ibase=16; ${str_uin_hex}" |bc)
	g_uin=$(htonl ${str_uin_oct})
	g_commodity_id=$(echo "ibase=16; ${str_commodity_id}" |bc)

	echo "uin: ${g_uin}"
	echo "id: ${g_commodity_id}"

	return 0
}

function generate_sql()
{
	local ret=$?
	if [[ ${ret} != 0 ]];then
		return 4
	fi

	declare -r db_num=8
	declare -r table_num=1024
	let "db_index=${g_uin}%${db_num}"
	let "_table_index=${g_uin}%${table_num}"
	local table_index=$(printf %04d ${_table_index})
	local table_commodity="t_commodity_"${table_index}
	local table_stock="t_stock_"${table_index}

	declare -r db_conn_sql_pref="mysql -utest -test testdb -A -h"
	echo "db_index ${db_index}"
	echo "table_index ${table_index}"
	echo "commodity_table ${table_commodity}"

	echo -e "\033[33m\nmaster: \n${db_conn_sql_pref}${g_mArrDB[${db_index}]}"
	echo -e "slave 0: \n${db_conn_sql_pref}${g_s0ArrDB[$db_index]}"
	echo -e "slave 1: \n${db_conn_sql_pref}${g_s1ArrDB[$db_index]}"
	echo -e "slave 2: \n${db_conn_sql_pref}${g_s2ArrDB[$db_index]}"

	echo -e "\033[31mselect commodity: \nselect * from ${table_commodity} where Fcommodity_id=${g_commodity_id} and Fid=${g_uin}\G"
	echo -e "\033[32mselect stock: \nselect * from ${table_stock} where Fitem_id=${g_commodity_id} and Fid=${g_uin}\G"
	echo -e "\033[0m"

	return 0
}

function usage()
{
cat << EOF
${0} itemid
eg: ${0} 1234567890
EOF
}

function main()
{
	if [[ $# -lt 1 ]] ;then
		usage
	fi
	get_commdyid_and_uin $@
	generate_sql
}

main $@

