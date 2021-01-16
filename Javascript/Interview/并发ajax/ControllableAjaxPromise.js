const fetch = require("node-fetch");
var nextInx = 0

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
        .then(async function(response){
            console.log("request done successfully for ", url)
            await nextRequest(urls, maxNum)
            resolve(true)
        })
        .catch(async function(err){
            console.log("request failed for ", url)
            await nextRequest(urls, maxNum)
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
    console.log("request done for all requests")
}

var urls = [
    'https://www.baidu.com',
    'https://www.ifeng.com',
    'https://www.sohu.com',
    'https://www.mtime.com',
    'https://www.sina.com.cn'
]
multiRequests(urls, 3)