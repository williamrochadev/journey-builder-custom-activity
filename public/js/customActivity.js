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

        $('#toggleActive').click(function() {
            templateName = $('#templateCode').val();
            $('#templateCode').readOnly = true;
            $('#toggleActive').readOnly = true;
            $('#toggleActive').text = 'Ativado';
            console.log(templateName);
        });
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }

        var message;

        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                if (key === 'message') {
                    message = val;
                }
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        var templateCode = $('#templateCode').val();
        console.log(templateCode)

        payload.name = "whatsapphsm";
        payload['arguments'].execute.inArguments = [{ "message": templateCode }];
        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    }
});