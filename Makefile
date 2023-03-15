install:
	npm ci

test:
	npx jest

publish:
	npm publish --dry-run

make lint:
	npx eslint .
