pre-build:
	rm -rf build

build: pre-build
	./node_modules/.bin/webpack;

lint:
	./node_modules/.bin/eslint ./src