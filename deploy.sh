#!/bin/bash
gulp vendor-production-js
gulp vendor-css
gulp js
zip -r archive.zip 128.png 16.png 48.png blank.html css/ eventPage.js js/ manifest.json styles.css
