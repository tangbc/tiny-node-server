#!/usr/bin/env node

const fs = require('fs')
const http = require('http')
const path = require('path')

const cwd = path.resolve(process.cwd())

let tinyNodeServer
try {
    const packageString = fs.readFileSync(`${cwd}/package.json`, 'utf8')
    tinyNodeServer = JSON.parse(packageString).tinyNodeServer
} catch (e) {
    throw e
}

if (!tinyNodeServer) {
    throw Error('No tinyNodeServer config found in package.json')
}

const root = tinyNodeServer.root || ''
const suffix = tinyNodeServer.suffix || ''
const port = Number(tinyNodeServer.port) || 8088
const logLevel = Number(tinyNodeServer.logLevel) || 2

const MIME = {
    css : 'text/css',
    gif : 'image/gif',
    html: 'text/html',
    ico : 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg : 'image/jpeg',
    js  : 'text/javascript',
    json: 'application/json',
    pdf : 'application/pdf',
    png : 'image/png',
    svg : 'image/svg+xml',
    swf : 'application/x-shockwave-flash',
    tiff: 'image/tiff',
    txt : 'text/plain',
    wav : 'audio/x-wav',
    wma : 'audio/x-ms-wma',
    wmv : 'video/x-ms-wmv',
    xml : 'text/xml'
}

const server = http.createServer((req, res) => {

    if (logLevel > 1) {
        console.log('\033[33m ['+ (new Date()).toLocaleTimeString() +'] request:\033[0m', req.url)
    }

    let url = req.url.split('?', 1).shift()
    if (url.slice(-1) == '/') {
        url += 'index.html'
    }

    let path = `${cwd}/${root}${url}`

    if (fs.existsSync(path)) {
        if (!fs.statSync(path).isFile()) {
            res.writeHead(302, {
                'Location': url + '/'
            })
            res.end()
        } else {
            let ext = path.split('.')
            ext = ext.length > 1 ? ext.pop().toLowerCase() : ''
            if (ext && MIME[ext]) {
                res.setHeader('content-type', MIME[ext])
            }
            const stream = fs.createReadStream(path)
            stream.pipe(res)
        }
    } else {
        // 404
        res.writeHead(404, 'FILE NOT FOUND')
        res.end('FILE NOT FOUND: ' + path)
    }
})

server.listen(port)

const localip = (() => {
    const os = require('os')
    const interfaces = os.networkInterfaces()
    const envs = interfaces.en0 || interfaces.eth0 || []
    const env = envs.find(env => env.family === 'IPv4') || {}
    return env.address || 'localhost'
})()

const conosoleColor = (string) => console.log('\033[32m ' + string + '\033[0m')

console.log('\n')
conosoleColor('    TinyNodeServer serving on: ')
console.log('')
conosoleColor(`        http://localhost:${port}${suffix}`)
conosoleColor(`        http://${localip}:${port}${suffix}`)
console.log('')
console.log('\n')
