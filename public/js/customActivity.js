define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    var templateName = "";
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);

    function onRender() {
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

        $('#toggleActive').click(function () {
            document.getElementById('templateCode').disabled = true;
            templateName = $('#templateCode').val();
            document.getElementById('toggleActive').disabled = true;
            document.getElementById('toggleActive').innerHTML = "Ativado";

            console.log('[onRender] templateName', templateName);
        });
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }

        templateName = payload['arguments'].templateName;

        console.log('data', data);
        console.log('[initialize] templateName', templateName);
        console.log('arguments', payload['arguments'])

        if (templateName) {
            document.getElementById('templateCode').disabled = true;
            document.getElementById('templateCode').value = templateName;
            document.getElementById('toggleActive').disabled = true;
            document.getElementById('toggleActive').innerHTML = "Ativado";
        }

        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log('inArguments', inArguments);

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log('tokens', tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log('endpoints', endpoints);
    }

    function save() {
        console.log('[save] templateName', templateName);

        payload.name = "Send Whatsapp HSM";

        payload['arguments'] = payload['arguments'] || {};
        payload['arguments'].templateName = templateName;
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "templateName": templateName
        }];
        
        payload['metaData'].isConfigured = true;

        console.log('payload', payload);
        console.log('payload arguments', payload['arguments']);

        connection.trigger('updateActivity', payload);
    }
});