
function blobReader () {

    function blobSlice(blob, start, length) {
        if (blob.slice) {
            return blob.slice(start, length);
        } else if (blob.webkitSlice) {
            return blob.webkitSlice(start, length);
        } else if (blob.mozSlice) {
            return blob.mozSlice(start, length);
        } else {
            return null;
        }
    }

    function initReader(type, index, step, file, callback) {
        let start = 0;
        let Reader = this;

        function resolveProcess(event) {
            Reader.loadedMap[index] = step * start * 1024 + event.loaded;
            Reader.loaded = 0;
            Reader.loadedMap.forEach(function (loaded) {
                Reader.loaded += loaded;
            }, this);
            Reader.allProgress[index] = (Reader.loadedMap[index] / Reader.sizeMap[index] * 100).toFixed(2);
            Reader.progress = Reader.progressBar.value = (Reader.loaded / Reader.total * 100).toFixed(2);
            console.log("total: " + Reader.total);
            console.log("loaded: " + Reader.loaded);
            console.log(index + ": " + Reader.allProgress[index] + "%");
            console.log("\n");
        }

        function readBlob(type, index, step, file) {
            var blob = Reader.blobSlice(file, start * step * 1024, (start + 1) * step * 1024);
            if (type === Reader.READ_AS_TEXT) {
                Reader.reader[index].readAsText(blob);
            }
            else if (type === Reader.READ_AS_BINARY_STRING) {
                Reader.reader[index].readAsBinaryString(blob);
            }
            else if (type === Reader.READ_AS_ARRAY_BUFFER) {
                Reader.reader[index].readAsArrayBuffer(blob);
            }
        }

        Reader.reader[index].onload = function (event) {
            //process every line of the read content if it's text
            if (type === this.READ_AS_TEXT) {
                var view = event.target.result,
                    charCount = 0;
                for (var i = 0; i < view.length; ++i) {
                    if (view[i] === '\n' || view[i] === '\r' || i === view.length - 1) {
                        callback(view.slice(charCount, i));
                        charCount = i;
                    }
                }
            } else {
                callback(event.target.result);
            }

            resolveProcess(event);
            if (step === 0) {
                return;
            }

            if (Reader.loadedMap[index] < Reader.sizeMap[index]) {
                start++;
            } else {
                delete Reader.reader[index];
                Reader.fileCount--;
                return;
            }

            readBlob(type, index, step, file);
        };

        Reader.reader[index].onprogress = function (event) {
            resolveProcess(event);
        };
    }
}

