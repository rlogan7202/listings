elasticsearch-6.0.0-beta1\bin

https://github.com/elastic/elasticsearch/issues/26261

    es won't start:
    
    elasticsearch-env.bat
    
    
    
    rem do not let JAVA_TOOL_OPTIONS slip in (as the JVM does by default)
    if not "%JAVA_TOOL_OPTIONS%" == "" (
        echo "warning: ignoring JAVA_TOOL_OPTIONS=$JAVA_TOOL_OPTIONS"
        set JAVA_TOOL_OPTIONS=
    )

    REM do not let JAVA_TOOL_OPTIONS slip in (as the JVM does by default)
    REM if not "%JAVA_TOOL_OPTIONS%" == "" (
    REM     echo "warning: ignoring JAVA_TOOL_OPTIONS=$JAVA_TOOL_OPTIONS"
    REM     set JAVA_TOOL_OPTIONS=
    REM )