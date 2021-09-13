# Production stage - includes ssl certification
FROM postgres:13-alpine

COPY ./certs/out/postgresdb.key /var/lib/postgresql/server.key
COPY ./certs/out/postgresdb.crt /var/lib/postgresql/server.crt

COPY ./certs/out/myCA.crt /var/lib/postgresql
COPY ./certs/out/myCA.crl /var/lib/postgresql

COPY ./init-user-db.sh /docker-entrypoint-initdb.d/
COPY ./ssl-conf.sh /usr/local/bin

RUN chown 0:70 /var/lib/postgresql/server.key && chmod 640 /var/lib/postgresql/server.key
RUN chown 0:70 /var/lib/postgresql/server.crt && chmod 640 /var/lib/postgresql/server.crt

RUN chown 0:70 /var/lib/postgresql/myCA.crt && chmod 640 /var/lib/postgresql/myCA.crt
RUN chown 0:70 /var/lib/postgresql/myCA.crl && chmod 640 /var/lib/postgresql/myCA.crl

ENTRYPOINT ["docker-entrypoint.sh"] 

CMD [ \
  "-c", "ssl=on" , "-c", "ssl_cert_file=/var/lib/postgresql/server.crt", \
  "-c", "ssl_key_file=/var/lib/postgresql/server.key", \
  "-c", "ssl_ca_file=/var/lib/postgresql/myCA.crt", \
  "-c", "ssl_crl_file=/var/lib/postgresql/myCA.crl" ]
