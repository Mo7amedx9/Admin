var ws = null;
var توقعاتسابقة = [];
var currentIndex = 0;

function openWebSocket() {
    var url = 'wss://coincharger.icu/games-frame/sockets/crash?whence=114&fcountry=66&ref=233&gr=790&appGuid=00000000-0000-0000-0000-000000000000&lng=ar';
    ws = new WebSocket(url);
    ws.onopen = function() {
        console.log('WebSocket opened');
        ws.send('{"protocol":"json","version":1}\x1e');
        ws.send('{"arguments":[{"activity":30,"currency":119}],"invocationId":"0","target":"Guest","type":1}\x1e');
    };
    ws.onclose = function() {
        console.log('WebSocket closed');
        ws = null;
    };
    ws.onmessage = function(event) {
        var data = JSON.parse(event.data.slice(0, -1));
        if (data.target === 'OnCrash') {
            توقعاتسابقة.push(data.arguments[0].f);
            document.getElementById('loadingSpinner').style.display = 'none';
            عرضالتوقعالتالي();
        }
    };
    ws.onerror = function(event) {
        console.error('WebSocket error:', event);
    };
}

function عرضالتوقعالتالي() {
    if (currentIndex < توقعاتسابقة.length) {
        var crashValueElement = document.getElementById('crashValue');
        crashValueElement.innerText = توقعاتسابقة[currentIndex];
        currentIndex++;
    }
}

openWebSocket();

document.getElementById('loadingSpinner').style.display = 'block';
