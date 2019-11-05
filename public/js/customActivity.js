define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var eventDefinitionKey = '';
    var templateName = '';
    var payload = {};

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

    function requestedInteractionHandler(settings) {
        try {
            eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
            $('#select-entryevent-defkey').val(eventDefinitionKey);

            if (settings.triggers[0].type === 'SalesforceObjectTriggerV2' &&
                settings.triggers[0].configurationArguments &&
                settings.triggers[0].configurationArguments.eventDataConfig) {

                // This workaround is necessary as Salesforce occasionally returns the eventDataConfig-object as string
                if (typeof settings.triggers[0].configurationArguments.eventDataConfig === 'stirng' ||
                    !settings.triggers[0].configurationArguments.eventDataConfig.objects) {
                    settings.triggers[0].configurationArguments.eventDataConfig = JSON.parse(settings.triggers[0].configurationArguments.eventDataConfig);
                }

                settings.triggers[0].configurationArguments.eventDataConfig.objects.forEach((obj) => {
                    deFields = deFields.concat(obj.fields.map((fieldName) => {
                        return obj.dePrefix + fieldName;
                    }));
                });

                deFields.forEach((option) => {
                    $('#select-id-dropdown').append($('<option>', {
                        value: option,
                        text: option
                    }));
                });

                $('#select-id').hide();
                $('#select-id-dropdown').show();
            } else {
                $('#select-id-dropdown').hide();
                $('#select-id').show();
            }
        } catch (e) {
            console.error(e);
            $('#select-id-dropdown').hide();
            $('#select-id').show();
        }
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
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