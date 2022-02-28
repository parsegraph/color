DIST_NAME = color

SCRIPT_FILES = \
	src/index.ts \
	src/demo/ColorForm.ts \
	src/demo/premultiply.ts \
	src/demo/ColorChannel.ts \
	src/demo/interpolate.ts \
	src/demo/colorwheel.ts \
	src/demo/lch.ts \
	src/w3c.ts \
	src/demo.ts \
	test/test.ts

EXTRA_SCRIPTS =

include ./Makefile.microproject
