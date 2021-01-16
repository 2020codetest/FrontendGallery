const fetch = require("node-fetch");
var nextInx = 0

var nextGroup = []

function selectNextUrl(urls) {
    if (nextInx >= urls.length) {
        return undefined
    }

    return urls[nextInx++]
}


function nextRequest(urls, maxNum) {
    return new Promise(async function (resolve, reject){
        var url = selectNextUrl(urls)
        if (!url) {
            resolve(true)
            return
        }

        fetch(url)
        .then(function(response){
            console.log("request done successfully for ", url)
            nextGroup.push(nextRequest(urls, maxNum))
            resolve(true)
        })
        .catch(function(err){
            console.log("request failed for ", url)
            nextGroup.push(nextRequest(urls, maxNum))
            resolve(true)
        })
    })
}

async function multiRequests(urls, maxNum) {
    var promises = []
    for (var inx = 0; inx < maxNum; ++inx) {
        promises.push(nextRequest(urls, maxNum))
    }

    await Promise.all(promises)
    while(nextGroup.length > 0){
        var pro = nextGroup.splice(0, 1)[0]
        await pro;
    }

    console.log("request done for all requests")
}

var urls = [
    'https://www.baidu.com',
    'https://www.ifeng.com',
    'https://www.sohu.com',
    'https://www.mtime.com',
    'https://www.sina.com.cn'
]
multiRequests(urls, 1)