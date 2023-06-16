<p align="center">
<a href="http://syntapse.co.uk/" target="blank"><img src="syntapse_logo.png" width="120" alt="Nest Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

<a href="http://nestjs.com/" target="blank"><img src="./opentelemetry.png
" width="200" alt="Nest Logo" /></a>


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

Application endpoints will trigger custom spans and metrics! On startup this repo exports a dashboard to Grafana to count calls to the services called on these endpoints.

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
