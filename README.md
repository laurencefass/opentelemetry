![image info](./opentelemetry.png)


## Description

Suite of docker containers to for a ready-made Opentelemetry observability suite. Just run, and enjoy the views.

Suite consists of:

Prometheus
Jaeger
Grafana
OpenTelemetry Collector
Simple Observable application

Once startup has completed

View prometheus UI at http://localhost:9090/
View Jaeger UI at http://localhost:16686/
View Grafana UI at http://localhost:3030/

Application endpoints will trigger custom spans and metrics!

```
localhost:9000/hello
localhost:9000/world
```
## Installation and startup

```bash
$ npm install
$ docker compose up -d
```

## Running the standalone app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
