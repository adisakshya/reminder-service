[![Version](https://img.shields.io/docker/v/adisakshya/reminder-service/latest?logo=docker&logoColor=white)](https://hub.docker.com/r/adisakshya/reminder-service)
[![Travis Badge](https://img.shields.io/travis/com/adisakshya/reminder-service/master?logo=travis)](https://travis-ci.com/github/adisakshya/reminder-service)
[![MIT License](https://img.shields.io/github/license/adisakshya/reminder-service)](https://github.com/adisakshya/reminder-service/blob/master/LICENSE)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://github.com/adisakshya/reminder-service/pulls)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat)](https://continuous-improvement.readthedocs.io/en/latest/md/community/code_of_conduct.html)  


## Overview

Reminder Service manages CRUD operations on the reminder entity. Clients can interact with API endpoints provided by this service to perform these operations. This service interfaces with PostgreSQL database to store the reminders created by various users. The most recent state of the reminder entity is maintained in the reminders database.

All the operations that are being performed on the reminder entity by the user are packed as an event-object and published to an AWS SNS topic which then forwards the event-message to the AWS SQS event-queue from where this event-message is consumed by the [event-service](https://github.com/adisakshya/event-service).

## Operating Instructions

### Fork

- Fork this repository
	- "Forking" adds a copy of [adisakshya/reminder-service](https://github.com/adisakshya/reminder-service/) repository to your GitHub account as `https://github.com/YourGitHubUserName/reminder-service`
- Or you can download or clone this repository
	- You can clone the repository executing below command in a location of your choice in your system
	- ```$ git clone https://github.com/adisakshya/reminder-service.git```
- Source code for the reminder-service can be found at ```/src```
- All CI/CD resources are located in ```.travis``` directory
- ```requirements.txt``` contain the python packages required for the CI/CD process
- ```.env.example``` is a template env file

### Local Development

#### Prerequisites

- Make sure you have
    - Installed Docker (when running using docker)
    - PostgreSQL ```reminders-database``` running and is accessible using host-url, username and password
    - AWS SNS ```event-topic``` setup and is accessible using ARN

#### Using Docker

- In source directory ```src/``` run the following command
	- ```$ yarn install``` - install required dependencies
	- ```$ yarn build``` - build source code
	- ```$ yarn test``` - run test (optional)
	- ```$ docker build -t reminder-service .``` - build docker image
- With successful execution of above commands you will have a docker-image for the reminder-service
- The docker-image can be run using the following command
    - ```docker run -p 3000:3000 --env-file ./.env reminder-service```
- On successful start, the API documentaion (built using Swagger) for the service will be accssible on ```http://<DOCKER_HOST>:3000/docs```

#### Without Docker

- Replace the env-variables at ```/src/src/common/api-config.service.ts```
- Use the following commands to start the service
    - ```$ yarn install``` - install required dependencies
    - ```$ yarn test``` - run test (optional)
    - ```$ yarn start``` - start reminder-service
- On successful start, the API documentaion (built using Swagger) for the service will be accssible on ```http://localhost:3000/docs```

## Architecture

![Reminder Service Architecture](https://raw.githubusercontent.com/adisakshya/reminder-service/master/assets/reminder-service-architecture.png) Fig 1 - Reminder Service Architecture

Clients can interact with the service using HTTP/HTTPs requests (interfaced by API Gateway). The reminder-service module has 3 components namely:

1. Reminder Controller - Handles incoming requests and returning responses to the client
2. Reminder Service - Defines the logic to serve incoming requests
3. Event Module - Module to handle publishing of events to AWS SNS event-topic

## CI/CD and Deployment Guide

A brief description of the deployment strategy is described in [documentation of continuous-improvement project](https://continuous-improvement.readthedocs.io).

## Contributing

There are multiple ways to contribute to this project, read about them [here](https://continuous-improvement.readthedocs.io/en/latest/md/community/contributing.html).

## License

All versions of the app are open-sourced, read more about this [LICENSE](https://github.com/adisakshya/reminder-service/blob/master/LICENSE).
