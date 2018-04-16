function handleRequest(method, url, data,resolve,reject) {
    var config = {
        method: method,
        url: url,
        dataType: 'text',
        success:resolve,
        error:reject
    };

    if ("POST" === method) {
        config.data = data
    } else if ('GET' === method) {
        config.params = data;
    }
    $.ajax(config);

}

function listRequst(s,e) {
     handleRequest('GET', 'http://localhost:3000/news', '',s,e);
}

function saveRequst(data,s,e) {
     handleRequest('POST', 'http://localhost:3000/news',data, s,e);
}

function detail(id,s,e) {
     handleRequest('GET', 'http://localhost:3000/news/' + id,s,e);
}