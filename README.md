# Color

This module provides a Color primitive object and associated methods
for manipulation, querying, and output.

    import Color from 'parsegraph-color';

    for(let i = 0; i < 10; ++i) {
        console.log(Color.random(0.1).asRGBA());
    }

Fundamentally, Color is stored by red, green, blue, and alpha values using
4 floating-point channels in the range [0, 1].
