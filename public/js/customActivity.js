'use strict';

define(function (require) {
    var Postmonger = require('postmonger');
    var connection = new Postmonger.Session();

    var payload = {};
    var authTokens = {};

    var eventDefinitionKey = '';
    var templateName = '';

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedInteraction', requestedInteractionHandler);
    connection.on('clickedNext', save);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

        $('#toggleActive').click(function () {
            document.getElementById('templateCode').disabled = true;
            templateName = $('#templateCode').val();
            document.getElementById('toggleActive').disabled = true;
            document.getElementById('toggleActive').innerHTML = "Ativado";
        });
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }

        templateName = payload['arguments'].templateName;

        if (templateName) {
            document.getElementById('templateCode').disabled = true;
            document.getElementById('templateCode').value = templateName;
            document.getElementById('toggleActive').disabled = true;
            document.getElementById('toggleActive').innerHTML = "Ativado";
        }
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function requestedInteractionHandler(settings) {
        try {
            eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
            // $('#select-entryevent-defkey').val(eventDefinitionKey);
            document.getElementById('select-entryevent-defkey').value = eventDefinitionKey;
            console.log('eventDefinitionKey', eventDefinitionKey);
        } catch (err) {
            console.error(err);
        }
    }

    function save() {
        payload['arguments'].templateName = templateName;

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "contactIdentifier": "{{Contact.Key}}",
            "phoneNumber": `{{Event.${eventDefinitionKey}.\"Phone\"}}`,
            "templateName": templateName
        }];

        payload['metaData'].isConfigured = true;

        console.log(JSON.stringify(payload));

        connection.trigger('updateActivity', payload);
    }
});