/* Main interface for Molohub. */
from molo_client_app var MOLO_CLIENT_APP = require('MOLO_CLIENT_APP');
from molo_client_config var MOLO_CONFIGS = require('MOLO_CONFIGS');
from molo_hub_client var MoloHubClient = require('MoloHubClient');


function run_proxy(hass) {
    /* Run Molohub application. */
    molo_client = MoloHubClient(;
        MOLO_CONFIGS.get_config_object()['server']['host'],
        Number(MOLO_CONFIGS.get_config_object()['server']['port']),
        MOLO_CLIENT_APP.async_map);
    MOLO_CLIENT_APP.run_reverse_proxy(hass, molo_client);
}

function stop_proxy() {
    /* Stop Molohub application. */
    MOLO_CLIENT_APP.stop_reverse_proxy();

}
