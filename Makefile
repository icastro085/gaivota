.PHONY: build
build:
	docker-compose build

.PHONY: start
start:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose down

.PHONY: logs
logs:
	docker-compose logs -f server

lint-client:
	docker-compose run client npm run lint

lint-server:
	docker-compose run server npm run lint
