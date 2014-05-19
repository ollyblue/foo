
TARGET		:=main
CC			:=gcc
CFLAGS		:=-g -Wall

INCLUDE		:=-I./
LIB			:=-lpthread

SOURCES		:=$(wildcard *.c)
OBJECTS		:=$(patsubst %.c,%.o,$(SOURCES))
#OBJECTS		:=	main.o	\
				thread_pool.o

all:$(TARGET)

%.o:%.c
	$(CC) $(CFLAGS) $(INCLUDE) -c -o $@ $^
	
# 编译多个可执行文件
#.cpp:
#	$(CXX) (CPPFLAGS) $(INCLUDE) -o $@ $^ $(LIB)

$(TARGET):$(OBJECTS)
	$(CC) $(CFLAGS) -o $@ $^ $(LIB)

clean:
	rm -rf $(OBJECTS) $(TARGET)

