#!/bin/bash
certstrap init --common-name myCA
certstrap request-cert --common-name postgresdb  --domain localhost
certstrap sign postgresdb --CA myCA