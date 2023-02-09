const http = require('http');

const port = 3000;

// Creates a server object
http.createServer(function (request, response) {
    const url = request.url
    const method = request.method
    response.setHeader("Content-type", "text/html")
    console.log("Request made with this method:", request.method)
    const dataChunksArray = []

    request.on("data", (chunk) => {
      dataChunksArray.push(chunk)
    })

    request.on("end", () => {
      const body = JSON.parse(Buffer.concat(dataChunksArray).toString())
      const responseBody = { method, url, body }

      response.write(JSON.stringify(responseBody))
      response.end()
    })

    if (url == "/") {
      response.write("<h1>Home: Silas's pad</h1>")
      response.statusCode = 200
    } else if (url == "/about") {
      response.statusCode = 200
      response.write("About - I am Silas")
    } else if (url == "/contact") {
      response.statusCode = 200
      response.write("<h1>Contact Me: ???</h1>")
    }

    response.end()
  })
  .listen(port, function () {
    console.log("Server listening on port: " + port);
  });

console.log("test")

  