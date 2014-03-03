#!/usr/bin/env expect

############################################################################
# description: auto login expect shell code
# author: bluezheng
# version: 1.0
# company: tencent
# usage: ./go file index
#      file format like:
#      +---------------------------------+
#      +# the ao_icsonboss idc ip		 +
#      +index | ip | user | pwd			 +
#      +---------------------------------+
############################################################################

set file_name [ lindex $argv 0 ]
set cmd_index [ lindex $argv 1 ]

if { [ string length $file_name ] == 0 } {
    puts "\033\[33musage: go file_name \[index\]"
	puts "\033\[33mfile format like: index ip user password"
	puts "\033\[m"
	exit
}

#set the cmd_index defalut to 1
if {  [ string length $cmd_index] == 0 } {
    set cmd_index 1
}

#the array index is begin from zero
set cmd_index [ expr $cmd_index - 1]

global file
if [ catch { set file [ open $file_name r ] } result ] {
    puts "Warning:$result"
	exit
} 
close $file

set index 0
set timeout 200
global line_list
set file [ open $file_name r ] 
array set ip { }
while { [gets $file line] >= 0 } {
#pass over the blank line or begin with "#"
    if { [ string length $line ] > 0  && [ string compare -length 1 "#" $line ] != 0  } {
		set line_list($index) $line
	    set split_word [regexp -inline -all -- {\S+} $line]
	    set svr_index($index) [ lindex $split_word 0]
	    set ip($index) [ lindex $split_word 1]
	    set user($index) [ lindex $split_word 2]
	    set pwd($index) [ lindex $split_word 3]

	    if {  $index == $cmd_index  } {

		puts "\033\[33mEntering $ip($index) ......"
		    spawn ssh -p 36000 $user($index)@$ip($index)
		    set myid $spawn_id
		    set try_again 0

		    while {[string length $myid] } {

			if {  $try_again == 1 } {
			    spawn ssh -p 36000 $user($index)@$ip($index)
				set myid $spawn_id
				set try_again 0
			}

			set pwd_t $pwd($index)
			#log_user 0
			    expect {
				-nocase "*password*" {
				    set timeout 20
					send "${pwd_t}\n"
					expect  {
					    "*#*" {
						interact; 
						exit
					    } else {
						continue
					    }
					    "*>*" {
						interact; 
						exit
					    } else {
						continue
					    }
					    "*$" {
						interact; 
						exit
					    } else {
						continue
					    }
					}
				}
				"*yes/no*" {
				    send "yes\n"
					continue
				}
				-re ".*#\[^\n\]*$" {
				    log_user 1
					send_user "blue:-> # "
					set timeout 10
					send_log "\n${ip},loginsuccess\n"
					interact;
				    exit
					expect eof {
					    exit
					}
				}
			    }
		    }
	    }
	incr index
    }
}

