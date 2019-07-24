FROM openjdk:8-jre-alpine

RUN apk update && apk add bash

COPY ./atd_distribution081310.tgz /server/atd_server.tgz

RUN cd /server && tar zxvf atd_server.tgz

env ATD_HOME=.
env LOG_DIR=$ATD_HOME/logs

CMD cd /server/atd && java -server -Datd.lowmem=true -Dsleep.pattern_cache_size=8192 -Dserver.port=1049 -Xmx3840M -XX:+AggressiveHeap -XX:+UseParallelGC -Dsleep.classpath=$ATD_HOME/lib:$ATD_HOME/service/code -Dsleep.debug=24 -classpath "$ATD_HOME/lib/*" httpd.Moconti atdconfig.sl
