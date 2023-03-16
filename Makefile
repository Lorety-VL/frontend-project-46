install:
	npm ci

test:
	npx jest

test-coverage:
	npx jest --coverage

publish:
	npm publish --dry-run

make lint:
	npx eslint .
