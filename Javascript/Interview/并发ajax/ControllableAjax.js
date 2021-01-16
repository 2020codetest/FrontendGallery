const fetch = require("node-fetch");
var nextInx = 0
var runningCnt = 0
var urlSet = []
function selectNextUrl(maxNum) {
    if (runningCnt >= maxNum) {
        return undefined
    }

    if (nextInx >= urlSet.length) {
        console.log("no further request and running request ", runningCnt)
        return undefined
    }

    return urlSet[nextInx++]
}

function nextRequest(maxNum) {
    var url = selectNextUrl(maxNum)
    if (url) {
        ++runningCnt
        fetch(url)
        .then(function(response){
            --runningCnt
            console.log('request done for ', url)
            nextRequest(maxNum)
        })
        .catch(function(error){
            --runningCnt
            console.log("get fetch error", error)
            nextRequest(maxNum)
        })
    }
}

function multiRequest(urls, maxNum) {
    urlSet = urls
    for (var inx = 0; inx < maxNum; ++inx) {
        nextRequest(maxNum)
    }
}


var urls = [
    'https://www.baidu.com',
    'https://www.ifeng.com',
    'https://www.sohu.com',
    'https://www.mtime.com',
    'https://www.sina.com.cn'
]
multiRequest(urls, 3)