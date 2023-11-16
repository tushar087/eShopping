# ASP.NET Core Micro Services

This is an e-commerce microservices project with different microservice for diferent domain defined as per its scope:

- Catalog
- Basket
- Discount
- Ordering

Each microservice is using other own database including SQL Server , PostgreSQL, Redis and MongoDB and is containerized using docker so that it can be easily deployable on any other system.

### Technology Used
 - ASP.NET Core
 - C#
 - Docker
 - Relational and Non-Relational Database
  
### Catalog MicroService include below :
 - ASP.Net Core Web API application.
 - Rest API Principles and CRUD operation.
 - MongoDB NOSQL database connection on docker containerization.
 - N-layer implementation with Repository pattern.
 - Swagger Open API implemenation.
 - Docker File and docker-compose implementation.


### Basket Microservices include below :
- ASP.NET Core Web API application.      
- Rest API principles, CRUD operation.
- Redis database connection on docker containerization.
- Consume Discount Grpc service for inter-service sync communication to calculate product final price.
- Publish BasketCheckout Queue using MassTransit and RabbitMQ.
- Swagger Open API implemenation.
- Docker File and docker-compose implementation.


### Ordering Microservices include below:
- ASP.NET Core Web API application.
- Implement Domain Driven Design,CQRS and Clean Architecture.
- Developing CQRS using MediatR,FluentValidation and AutoMapper nuget packages.
- Consuming RabbitMQ BasketCheckout event queue using MassTransit-RabbitMQ Configuration.
- SQLServer database and containerization.
- Swagger Open API implemenation.
- Docker File and docker-compose implementation.

### API Gateway Ocelot microservice include below:
- Implement API Gateway with Ocelot.
- Run multiple different API Gateway / BFF container types.
- The Gateway aggregator pattern in Shopping.Aggregator.
- Docker File and docker-compose implementation.
