# SPA Customer Packages

## Setup

### Install dependencies with yarn

`yarn`

### Start the webpack dev server

`yarn start`

This will start the dev server for packages accessible at `http://localhost:4004`.

### [Local Gateway] Start the webpack dev server, using the local gateway

`yarn start:local-gateway`

This will start the dev server for packages accessible at `http://localhost:4004` and passes the option, `BASE_API_URL=https://localhost:7777` to the good_job client. This should be used with __[Local Gateway] Start https proxy__

### [Local Gateway] Start https proxy

`yarn start:proxy`

This will start an https proxy client which listens on port `7777`. It will proxy all requests to the local gateway at `localhost:8888`. This is __required__ by good_job, and aligns with the rest of our stack (i.e., dev, qa, prod environments use https). If you are connecting to a remote gateway (dev, prod, qa) you do not need this.

### Start good_job server

`yarn start:api`

This will start the good_job server. If you have `good_job` installed globally (which is recommended) you can instead just call `good_job`.

#### Options

BASE_API_URL=https://localhost:7777

This will configure the good_job server to use `https://localhost:7777` as the gateway URL to use.


### [Local Gateway] Start good_job server, using the local gateway

`yarn start:api-local-gateway`

This will start the good_job server, and pass the `BASE_API_URL=https://localhost:7777` option.

