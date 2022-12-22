docker-up:
	docker-compose -f .docker/docker-compose.yml up -d
docker-down:
	docker-compose -f .docker/docker-compose.yml down -v
