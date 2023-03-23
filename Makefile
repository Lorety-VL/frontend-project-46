install:
	npm ci

test:
	npx jest

test-coverage:
	npx jest --coverage

publish:
	npm publish --dry-run

lint:
	npx eslint .
