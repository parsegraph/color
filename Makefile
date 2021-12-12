DIST_NAME = color

SCRIPT_FILES = \
	src/$(DIST_NAME).ts \
	src/w3c.ts \
	src/demo/interpolate.ts \
	src/demo/lch.ts \
	src/demo/colorwheel.ts \
	src/demo/ColorChannel.ts \
	src/demo/ColorForm.ts \
	src/demo/premultiply.ts

DEMOS = \
	dist/parsegraph-$(DIST_NAME).lch.js \
	dist/parsegraph-$(DIST_NAME).colorwheel.js \
	dist/parsegraph-$(DIST_NAME).interpolate.js \
	dist/parsegraph-$(DIST_NAME).premultiply.js

LIBRARIES = dist/parsegraph-$(DIST_NAME).lib.js

OUTPUTS = \
	$(LIBRARIES) \
	$(DEMOS)

all: build lint test coverage esdoc

build: $(OUTPUTS)
.PHONY: build

build-prod: dist-prod/parsegraph-$(DIST_NAME).js
.PHONY: build-prod

demo: $(DEMOS)
	npm run demo
.PHONY: demo

check:
	npm run test
.PHONY: check

test: check
.PHONY: test

coverage:
	npm run coverage
.PHONY: coverage

prettier:
	npx prettier --write src test demo
.PHONY: prettier

lint:
	npx eslint --fix $(SCRIPT_FILES)
.PHONY: lint

esdoc:
	npx esdoc
.PHONY: esdoc

doc: esdoc
.PHONY: doc

$(OUTPUTS): package.json package-lock.json $(SCRIPT_FILES)
	npm run build
	test ! -e dist-types/src/demo || (mkdir -p dist/demo && mv -v dist-types/src/demo/* dist/demo)
	rm -rf dist-types/src/demo
	mv -v dist-types/src/* dist/
	mv dist/$(DIST_NAME).d.ts dist/parsegraph-$(DIST_NAME).d.ts
	mv dist/$(DIST_NAME).d.ts.map dist/parsegraph-$(DIST_NAME).d.ts.map

dist-prod/parsegraph-$(DIST_NAME).js: package.json package-lock.json $(SCRIPT_FILES)
	npm run build-prod
	mv -v dist-types/src/* dist-prod/
	mv dist-prod/$(DIST_NAME).d.ts dist-prod/parsegraph-$(DIST_NAME).d.ts
	mv dist-prod/$(DIST_NAME).d.ts.map dist-prod/parsegraph-$(DIST_NAME).d.ts.map

tar: parsegraph-$(DIST_NAME)-dev.tgz
.PHONY: tar

tar-prod: parsegraph-$(DIST_NAME)-prod.tgz
.PHONY: tar

parsegraph-$(DIST_NAME)-prod.tgz: $(LIBRARIES)
	rm -rf parsegraph-$(DIST_NAME)
	mkdir parsegraph-$(DIST_NAME)
	cp -r README.md LICENSE parsegraph-$(DIST_NAME)
	cp -r dist-prod/ parsegraph-$(DIST_NAME)/dist
	cp -r package-prod.json parsegraph-$(DIST_NAME)/package.json
	tar cvzf $@ parsegraph-$(DIST_NAME)/
	rm -rf parsegraph-$(DIST_NAME)

parsegraph-$(DIST_NAME)-dev.tgz: $(OUTPUTS)
	rm -rf parsegraph-$(DIST_NAME)
	mkdir parsegraph-$(DIST_NAME)
	cp -r package.json package-lock.json README.md demo/ LICENSE dist/ parsegraph-$(DIST_NAME)
	tar cvzf $@ parsegraph-$(DIST_NAME)/
	rm -rf parsegraph-$(DIST_NAME)

clean:
	rm -rf dist dist-prod dist-types .nyc_output parsegraph-$(DIST_NAME)-dev.tgz parsegraph-$(DIST_NAME)-prod.tgz
	rm -rf parsegraph-$(DIST_NAME)
.PHONY: clean
