.PHONY: build
build:
	docker-compose build

.PHONY: start
start:
	docker-compose up

.PHONY: stop
stop:
	docker-compose down

.PHONY: logs
logs:
	docker-compose logs -f server

.PHONY: lint-client
lint-client:
	docker-compose run client npm run lint

.PHONY: lint-server
lint-server:
	docker-compose run server npm run lint
