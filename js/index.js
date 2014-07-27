//var pandaAddress = "D7ALhFR4mZ4FcKL3r3vjA8BrqX9aGCut4g";

var permanentStorage = window.localStorage;
var pandaAddress = window.localStorage.getItem("panda");

angular.module('ionicApp', ['ionic'])

if (pandaAddress == null){pandaAddress = "";$('#sHash').html('Go to Wallet');}

$('#pandaForm').val(pandaAddress);

$('#sInfo').show();
$('#xInfo').hide();
$('#pSInfo').hide();
$('#pXInfo').hide();
$('#wInfo').hide();

$('#sButton').on('click',function(){
    $('#sInfo').show();
    $('#xInfo').hide();
    $('#pSInfo').hide();
    $('#pXInfo').hide();
    $('#wInfo').hide();
});

$('#xButton').on('click',function(){
    $('#sInfo').hide();
    $('#xInfo').show();
    $('#pSInfo').hide();
    $('#pXInfo').hide();
    $('#wInfo').hide();
});

$('#pButton').on('click',function(){
    $('#sInfo').hide();
    $('#xInfo').hide();
    $('#pSInfo').show();
    $('#pXInfo').hide();
    $('#wInfo').hide();
});

$('#wButton').on('click',function(){
    $('#sInfo').hide();
    $('#xInfo').hide();
    $('#pSInfo').hide();
    $('#pXInfo').hide();
    $('#wInfo').show();
});

$('.cardHead').on('click',function(){
        pandaAddress = $('#pandaForm').val();
        window.localStorage.setItem("panda", pandaAddress);
        updateScrypt();
        updateX11();
        updateWallet();
});

$('.OPEN').on('click',function(){
    window.open("https://play.google.com/store/apps/details?id=com.mikekreiser.pandatracker");
});

$('.sPButton').on('click',function(){
    $('#pSInfo').show();
    $('#pXInfo').hide();
});

$('.xPButton').on('click',function(){
    $('#pSInfo').hide();
    $('#pXInfo').show();
});


var currentRound = 0;
var currentRound2 = 0;
var dogeBTCrate = 0;
var btcUSDprice = 0;
var dogeThousand = 0;
var addressBalance = 0;

updateScrypt();
updateX11();
updateWallet();

function updateScrypt(){

$('#sHash').html('Loading...');
$('#sDPD').html('');
$('#sPPD').html('');
$('#sPayouts').html('');

var url = "http://multi.pandapool.info/api.php?q=userinfo&user=" + pandaAddress;

$.ajax({
    url: url,
    dataType: 'json',
    success: function(results){

        if(results.result.workers === undefined)
        {
            $('#sHash').html('No data');

            if(results.result.history == undefined){
                for(var i = 0; i < 6; i++){
                    $('#sPay' + i).html("No data");
                }
            }

            else if (results.result.history.length > 5){
                if(pandaAddress.charAt(0) == "P"){
                    for(var i = 0; i < 6; i++){
                        $('#sPay' + i).html("<div>Round " + results.result.history[i].round + " - " + roundToTwo(results.result.history[i].payout) + " Panda</div>");
                    }
                }

                else{
                    for(var i = 0; i < 6; i++){
                        $('#sPay' + i).html("<div>Round " + results.result.history[i].round + " - " + roundToTwo(results.result.history[i].payout) + " Doge</div>");
                    }
                }
            }
        }

        else{
            var totalHash = 0;
            for(var i = 0; i < results.result.workers.length;i++)
            {
                totalHash += parseInt(results.result.workers[i][2]);
            }
            $('#sHash').html(totalHash + " KH/s");

            currentRound = results.result.history[0].round;
            getDogePerDay(currentRound);

            if(pandaAddress.charAt(0) == "P"){
                for(var i = 0; i < 6; i++){
                    $('#sPay' + i).html("<div>Round " + results.result.history[i].round + " - " + roundToTwo(results.result.history[i].payout) + " Panda</div>");
                }
            }

            else{
                for(var i = 0; i < 6; i++){
                    $('#sPay' + i).html("<div>Round " + results.result.history[i].round + " - " + roundToTwo(results.result.history[i].payout) + " Doge</div>");
                }
            }
        }
    }
    });
}

function updateX11(){

$('#xHash').html('Loading...');
$('#xDPD').html('');
$('#xPPD').html('');
$('#xPayouts').html('');

var url = "http://multi.pandapool.info/api.php?q=userinfo&user=" + pandaAddress + "&algo=x11";

$.ajax({
    url: url,
    dataType: 'json',
    success: function(results){

        if(results.result.workers === undefined)
        {
            $('#xHash').html('No data');
            
            if(results.result.history == undefined){
                for(var i = 0; i < 6; i++){
                    $('#xPay' + i).html("No data");
                }
            }

            else if (results.result.history.length > 5) {
                if(pandaAddress.charAt(0) == "P"){
                    for(var i = 0; i < 6; i++){
                        $('#xPay' + i).html("<div>Round " + results.result.history[i].round + " - " + roundToTwo(results.result.history[i].payout) + " Panda</div>");
                    }
                }

                else{
                    for(var i = 0; i < 6; i++){
                        $('#xPay' + i).html("<div>Round " + results.result.history[i].round + " - " + roundToTwo(results.result.history[i].payout) + " Doge</div>");
                    }
                }
            }
        }

        else{
            var totalHash2 = 0;
            for(var i = 0; i < results.result.workers.length;i++)
            {
                totalHash2 += parseInt(results.result.workers[i][2]);
            }
            $('#xHash').html(totalHash2.toString() + " KH/s");

            currentRound2 = results.result.history[0].round;
            getDogePerDayX(currentRound2);

            if(pandaAddress.charAt(0) == "P"){
                for(var i = 0; i < 6; i++){
                    $('#xPay' + i).html("<div>Round " + results.result.history[i].round + " - " + roundToTwo(results.result.history[i].payout) + " Panda</div>");
                }
            }

            else{
                for(var i = 0; i < 6; i++){
                    $('#xPay' + i).html("<div>Round " + results.result.history[i].round + " - " + roundToTwo(results.result.history[i].payout) + " Doge</div>");
                }
            }
        }
    }
    });
}

function updateWallet(){
    $('#exchange').html('Loading...');
    $('#usdAm').html("");

    if(pandaAddress.charAt(0) === 'P'){
        getPandaAd();
    }

    else{
        
        var url4 = 'http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=132';
        url4 = encodeURIComponent(url4);
        url4 = 'http://jsonp.guffa.com/Proxy.ashx?url=' + url4;
        $.ajax({
        url: url4,
        dataType: 'jsonp',
        success: function(results){
        dogeBTCrate = results.return.markets.DOGE.lasttradeprice;

        var url5 = 'coinbase.com/api/v1/currencies/exchange_rates';
        url5 = encodeURIComponent(url5);
        url5 = 'http://jsonp.guffa.com/Proxy.ashx?url=' + url5;

            $.ajax({
            url: url5,
            dataType: 'jsonp',
            success: function(data){
                btcUSDprice = data.btc_to_usd;
                btcUSDprice = roundToTwo(btcUSDprice);
                dogeThousand = dogeBTCrate * btcUSDprice;
                $('#exchange').html('DOGE/BTC: ' + Math.ceil(dogeBTCrate*100000000) + " Satoshi")
                $('#thous').html('1000 DOGE/USD: ' + "$" + roundToThree(dogeBTCrate * 1000 * btcUSDprice));
                getDogeAd(dogeBTCrate,btcUSDprice);
            }   
            });
        }   
        });
    }
}

function getDogeAd(dogeBTCrate,btcUSDprice){
    $.ajax({
        url: 'https://chain.so/api/v2/get_address_balance/DOGE/' + pandaAddress,
        dataType: 'jsonp',
        success: function(results){
            addressBalance = results.data.confirmed_balance;
            $('#amount').html("Balance: " + roundToTwo(addressBalance));
            $('#usdAm').html("$" + roundToTwo(dogeBTCrate * btcUSDprice * addressBalance));
        }
    });
}

function getPandaAd(){
    url5 = 'http://pandachain.net/chain/PandaCoin/q/addressbalance/' + pandaAddress;   
    url5 = encodeURIComponent(url5);
    url5 = 'http://jsonp.guffa.com/Proxy.ashx?url=' + url5;

    $.ajax({
        url: url5,
        dataType: 'jsonp',
        success: function(results){
            $('#thous').html('Pandacoin!');
            $('#amount').html('Balance: ' + roundToTwo(results));
            getPandaAm(parseInt(results));
        }
    });
}

function getPandaAm(amount){
    
    var url7 = 'btc-e.com/api/2/ltc_usd/trades';
    url7 = encodeURIComponent(url7);
    url7 = 'http://jsonp.guffa.com/Proxy.ashx?url=' + url7;

    //Litecoin-USD Price
    $.ajax({
    url: url7,
    dataType: 'jsonp',
    success: function(results){
        ltcUSDprice = results[0].price;
        getPandaConvert(amount,ltcUSDprice);
    }
    });
}

function getPandaConvert(amount,ltcUSD){
    url6 = 'http://api.mintpal.com/v1/market/stats/PND/LTC'; 
    url6 = encodeURIComponent(url6);
    url6 = 'http://jsonp.guffa.com/Proxy.ashx?url=' + url6;

    $.ajax({
        url: url6,
        dataType: 'jsonp',
        success: function(results){
            var usdEq = amount * ltcUSD * results[0].last_price;
            $('#usdAm').html("$" + roundToTwo(usdEq));
            $('#exchange').html("PND/LTC: " + results[0].last_price);
        }
    });
    
}

function getDogePerDay(cRound){
    var url2 = 'http://multi.pandapool.info/api.php?q=roundinfo&round=' + cRound;

    $.ajax({
        url: url2,
        dataType: 'json',
        success: function(results){
            $('#sDPD').html(roundToTwo(results.result.doge_mhs_day));
            $('#sPPD').html(roundToTwo(results.result.pnd_mhs_day));
        }
    });
}

function getDogePerDayX(cRound){
    var url2 = 'http://multi.pandapool.info/api.php?q=roundinfo&round=' + cRound + "&algo=x11";

    $.ajax({
        url: url2,
        dataType: 'json',
        success: function(results){
            $('#xDPD').html(roundToTwo(results.result.doge_mhs_day));
            $('#xPPD').html(roundToTwo(results.result.pnd_mhs_day));
        }
    });
}

//Rounding
function roundToTwo(num) { return +(Math.round(num + "e+2")  + "e-2"); }
function roundToThree(num) { return +(Math.round(num + "e+3")  + "e-3"); }
function roundToSix(num) { return +(Math.round(num + "e+6")  + "e-6"); }
function roundToEight(num) { return +(Math.round(num + "e+8")  + "e-8"); }