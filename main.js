const buttonPressesLogFile = ('./' + process.argv[2]);
require('log-timestamp');
const fs = require('fs');
var _ = require("lodash");
let i = 1;
var OldResult = [];
var result = new Object();
var arr = [];
gift = 'git commit -m "Some message"';
write();
if (process.argv[4] == "serve") {
    serve();
}

function write() {
    OldResult = new Object();
    result = new Object();
    const fileContents = fs.readFileSync(process.argv[2], 'utf8')
    try {
        arr = JSON.parse(fileContents)
    } catch (err) {
        console.error(err)
    }
    console.log(arr);
    for (i = 0; i < arr.length; i++) {
        result = [];
        OldResult = [];
        let c = 0;
        while (c < arr[i].answers.length) {
            if (arr[i].answers[c].id == 1) {
                result = OldResult + "<a href=" + "index.html>" + arr[i].answers[c].text + "</a><br>";
            } else {
                result = OldResult + "<a href=" + "index" + arr[i].answers[c].id + ".html>" + arr[i].answers[c].text + "</a><br>";
            }
            OldResult = result;
            // console.log(OldResult);
            c++;
        }
        //console.log("--------------")
        CreateFile();
    }
}
  /*  var execProcess = require("./exec_process.js");
    execProcess.result("git add -A", function (err, response) {
        if (!err) {
            console.log(response);
        } else {
            console.log(err);
        }
    });
    execProcess.result(gift, function (err, response) {
        if (!err) {
            console.log(response);
        } else {
            console.log(err);
        }
    });
    execProcess.result("git push", function (err, response) {
        if (!err) {
            console.log(response);
        } else {
            console.log(err);
        }
    });
}*/

function CreateFile() {
    let filename;
    if (arr[i].id == 1) {
        filename1 = process.argv[3] + "/index.html"
    } else {
        filename1 = process.argv[3] + "/index" + arr[i].id + ".html"
    }
    fs.writeFile(filename1, arr[i].question + "<br>" + result, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Файл создан");
            console.log(arr);
        }
    });
}

function serve() {

    let fsWait = false;
    fs.watch(process.argv[2], (event, filename) => {
        if (fsWait) return;
        fsWait = setTimeout(() => fsWait = false, 1000);
        console.log("filechange" + filename);
        write();
    });
}