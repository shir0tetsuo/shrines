//
// MIT License
// 
// Copyright (c) 2024 Shadowsword
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//

// npm imports
const express = require('express')
const bparse = require('body-parser')
const cookies = require('cookie-parser')
const NodeCache = require('node-cache')
const MobileDetect = require('mobile-detect')

// .env
require("dotenv").config()

// system_module imports
const db = require('./system_module/db.js')

// filesystem
const ff = require('fs')
const fs = require('fs').promises
const path  = require('path')

// server declarations
const server = express()
const port = 9393

// include json
server.use(bparse.urlencoded({ extended: true }))
server.use(bparse.json())
server.use(express.json())

// cookies
server.use(cookies())

//////////////
// extended //
//////////////

// mobile detection (req.isMobile)
server.use((req, res, next) => {
    const md = new MobileDetect(req.headers['user-agent']);
    req.isMobile = !!md.mobile();  // Set a flag for mobile devices
    next();
})

// logging
server.use((req, res, next) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    requested_url = req.originalUrl || req.url
    user_agend = req.header['user-agent']

    console.log(`[Req] (${ip}) ${user_agent} ${requested_url} (isMobile ${req.isMobile})`)

    next();
})

// authentication sequence
server.use((req, res, next) => {

    // push cookies and return req.AuthCtl
    // req.AuthCtl.user_authorized
    // req.AuthCtl.user_uuid
    // req.AuthCtl.user_privhash
    next();
})

// serve static content
server.use('/distribution', express.static(path.resolve('./distribution')))
server.use('/robots.txt', express.static(path.resolve('./distribution/metadata/robots.txt')))

// main start
server.listen(
    port,
    () => console.log(`[Server] OK [localhost:${port}] ${new Date()}`)
)
