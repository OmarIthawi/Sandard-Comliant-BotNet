/*
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

require('sugar');
var fs = require('fs');
var http = require('http');
var url = require('url');

var LHOST = 'httpcnc.jit.su';
var LPORT = 44050; // Moved to 80 on the cloud

var currentCommand = null;
var latestSocket = null;

var HttpCodes = {
    NOT_FOUND: 404,
    FORBIDDEB: 403,
    OK: 200,
    CREATED: 201
};

var app = http.createServer(function (req, res) {
    var urlparsed = url.parse(req.url, true);
    
    if (urlparsed.pathname === '/') {
        fs.readFile(__dirname + '/index.html', 'utf-8',
        function (err, data) {
            if (err) {
                res.writeHead(HttpCodes.NOT_FOUND);
                return res.end('Error loading index.html');
            }

            res.writeHead(HttpCodes.OK);
            var commandString = JSON.stringify(currentCommand);
            res.write(data.replace('{{currentCommand}}', commandString))
            res.end();
        });
    } else if (urlparsed.pathname === '/hllowc.js') {
        fs.readFile(__dirname + '/hllowc.js', 'utf-8',
        function (err, data) {
            if (err) {
                res.writeHead(HttpCodes.NOT_FOUND);
                return res.end('Error loading hllowc.js');
            }

            res.writeHead(HttpCodes.OK);
            res.write(data);
            res.end();
        });
    } else if (urlparsed.pathname === '/o') {
        var command = urlparsed.query.c || '';
        var args = urlparsed.query['a[]'];
                
        if (!Object.isArray(args)) {
            var arg = urlparsed.query.a;
            console.log('arg', arg);
            
            if (arg) {
                args = [arg];
            } else {
                args = [];
            }
        }
        
        console.log('args', args);
        
        currentCommand = {
            command: command,
            args: args
        };
        
        io.sockets.emit('command', command, args);
        res.writeHead(HttpCodes.OK);
        res.write('Yes Sir!\n');
        res.end();
    } else {
        res.writeHead(HttpCodes.NOT_FOUND);
        res.write('Not found\n');
        res.end();
    }
});

var io = require('socket.io').listen(app);

app.listen(LPORT);

//~ io.sockets.on('connection', function (socket) {
//~ });
