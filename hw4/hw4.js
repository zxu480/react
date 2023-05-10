
function myFetch(url, options = {}) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      const { method, body, headers } = options
      xhr.open(method ?? 'GET', url);
  
      xhr.onload = function() {
        const responseHeaders = xhr.getAllResponseHeaders();
        const response = {
          url: xhr.responseURL,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: responseHeaders,
          text: function() {
            return Promise.resolve(xhr.responseText);
          },
          json: function() {
            return Promise.resolve(JSON.parse(xhr.responseText));
          }
        };
        resolve(response);
      };
  
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
  
      for (const header in headers) {
        if (headers.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }
  
      xhr.send(body);
    });
  }


myFetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));


myFetch('https://jsonplaceholder.typicode.com/posts', {
method: 'POST',
body: JSON.stringify({
  title: 'post',
  body: 'postBody',
  userId: 1,
}),
headers: {
  'Content-type': 'application/json; charset=UTF-8',
},
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));


myFetch('https://jsonplaceholder.typicode.com/posts/1', {
method: 'PUT',
body: JSON.stringify({
  title: 'put',
  body: 'putBody',
  userId: 1,
}),
headers: {
  'Content-type': 'application/json; charset=UTF-8',
},
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));


myFetch('https://jsonplaceholder.typicode.com/posts/1', {
method: 'DELETE',
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));