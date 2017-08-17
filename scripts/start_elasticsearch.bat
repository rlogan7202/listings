@echo off
title %~n0

REM edit .\kibana-*.*.*-windows\config\kibana.yml
REM     Set the elasticsearch_url to point at your Elasticsearch instance
REM         elasticsearch.url: "http://localhost:9200"
REM http://localhost:5601/
REM
REM       grok {
REM             patterns_dir => "D:\\elk\\dmi_grok_patterns"
REM
REM  JAVA_HOME C:\Program Files (x86)\Java\jre1.8.0_73
REM
REM  node process hangs...
call master_parameters.bat

pushd %ELASTIC_ROOT%
start elasticsearch.bat
popd

