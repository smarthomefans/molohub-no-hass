/*
Support for Molohub.

For more details about this component, please refer to the documentation at
https://home-assistant.io/components/molohub/
 */

var os = require('os');

// from homeassistant.const import (EVENT_HOMEASSISTANT_START,
//                                  EVENT_HOMEASSISTANT_STOP, EVENT_STATE_CHANGED)

from molo_client_config var MOLO_CONFIGS = require('MOLO_CONFIGS');
from notify_state var NOTIFY_STATE = require('NOTIFY_STATE');
from utils var LOGGER = require('LOGGER');

try {
    raw_input;
} catch ( NameError) {
    raw_input = input;
}
DOMAIN = 'molohub';
NOTIFYID = 'molo_notify_';
DISMISSABLE = false;

function setup(hass, config) {
    global DOMAIN;
    global NOTIFYID;
    global DISMISSABLE;
    /* Set up molohub component. */
    LOGGER.info('Begin setup molohub!');
}
    dir_path = os.path.dirname(os.path.realpath(__file__));
    path_list = null;
    if ('/' in dir_path) {
        path_list = dir_path.split('/');
    } else if ('\\' in dir_path) {
        path_list = dir_path.split('\\');
    DOMAIN = path_list[len(path_list) - 1];
    NOTIFYID += DOMAIN;
    }
    // Load config mode from configuration.yaml.
    // cfg = config[DOMAIN]
    // if 'mode' in cfg:
    //     MOLO_CONFIGS.load(cfg['mode'])
    // else:
    MOLO_CONFIGS.load('release');
    tmp_haweb = MOLO_CONFIGS.get_config_object()['server']['haweb'];
    NOTIFY_STATE.set_context(null, tmp_haweb);

    // DISMISSABLE = cfg.get('dismissable', False)
    // if type(DISMISSABLE) != bool:
    DISMISSABLE = false;
    MOLO_CONFIGS.get_config_object()['domain'] = DOMAIN;

    // if 'http' in config and 'server_host' in config['http']:
    //     tmp_host = config['http']['server_host']
    //     MOLO_CONFIGS.get_config_object()['ha']['host'] = tmp_host
    // if 'http' in config and 'server_port' in config['http']:
    //     tmp_port = config['http']['server_port']
    //     MOLO_CONFIGS.get_config_object()['ha']['port'] = tmp_port

    // def send_notify(notify_str):
    //     """Update UI."""
    //     global NOTIFYID
    //     LOGGER.debug("Send notify: %s", notify_str)
    //     hass.components.persistent_notification.async_create(
    //         notify_str, "Molo Hub Infomation", NOTIFYID)

    // async def stop_molohub(event):
    //     """Stop Molohub while closing ha."""
    //     LOGGER.info("Begin stop molohub!")
    //     from .molo_hub_main import stop_proxy
    //     stop_proxy()

    // async def start_molohub(event):
    //     """Start Molohub while starting ha."""
    //     LOGGER.debug("molohub started!")
    //     hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, stop_molohub)

    // async def handle_event(event):
    //     """Handle Molohub event."""
    //     send_notify(NOTIFY_STATE.get_notify_str())

    // async def on_state_changed(event):
    //     """Disable the dismiss button if needed."""
    //     global NOTIFYID
    //     if DISMISSABLE:
    //         return
    //     state = event.data.get('new_state')
    //     entity_id = event.data.get('entity_id')
    //     if not state and entity_id and entity_id.find(NOTIFYID) != -1:
    //         send_notify(NOTIFY_STATE.get_notify_str())

    from molo_hub_main var run_proxy = require('run_proxy');
    run_proxy(hass);

    // hass.bus.async_listen_once(EVENT_HOMEASSISTANT_START, start_molohub)
    // hass.bus.async_listen(EVENT_STATE_CHANGED, on_state_changed)
    // hass.bus.async_listen('molohub_event', handle_event)
    // send_notify(NOTIFY_STATE.get_notify_str())

    return true;


setup({}, {});

loop = true;

while (loop) {
    result = raw_input(('input quit or q to close channel: '));
    if (result == 'q' || result == 'quit') {
        from molo_hub_main var stop_proxy = require('stop_proxy');
        stop_proxy();
        loop = false;

    }
}
