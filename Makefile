releases: chrome.zip firefox.zip

chrome.zip: DETEY.jpg DETEY_128_128.png background.js content.js manifest_v3.json
	ln manifest_v3.json manifest.json
	zip chrome.zip DETEY.jpg DETEY_128_128.png background.js content.js manifest.json -FS
	rm manifest.json

firefox.zip: DETEY.jpg background.js content.js manifest_v2.json
	ln manifest_v2.json manifest.json
	zip firefox.zip DETEY.jpg background.js content.js manifest.json -FS
	rm manifest.json

clean:
	- rm chrome.zip firefox.zip
