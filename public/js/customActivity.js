define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
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

            console.log('templateName', templateName);
        });
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }

        console.log('data', data);

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
    }

    function onGetEndpoints(endpoints) {
        console.log('endpoints', endpoints);
    }

    function save() {
        console.log('templateName', templateName);

        payload.name = "Send Whatsapp HSM";
        payload['arguments'].execute.inArguments = [{ "message": templateName }];
        payload['metaData'].isConfigured = true;

        console.log('payload', payload);

        connection.trigger('updateActivity', payload);
    }
});