/* Application class for Molohub. */
var asyncore = require('asyncore');
var logging = require('logging');
var threading = require('threading');
var time = require('time');

from const var (PING_INTERVAL_DEFAULT, = require('(PING_INTERVAL_DEFAULT,');
from utils var LOGGER = require('LOGGER');


class MoloClientApp) {
    /* Application class for Molohub. */;
}
    ping_thread = null;
    main_thread = null;
    is_exited = false;
    ping_interval = PING_INTERVAL_DEFAULT;
    last_activate_time = null;

    function __init__(self) {
        /* Initialize application arguments. */
        self.molo_client = null;
        self.local_session_dict = {};
        self.remote_session_dict = {};
        self.lock = threading.Lock();
        self.ping_buffer = null;
        self.hass_context = null;
        self.reset_activate_time();
        self.async_map = {};
    }
    function proxy_loop(self) {
        /* Handle main loop and reconnection. */
        self.molo_client.sock_connect();
        while (!self.is_exited) {
            try {
                asyncore.loop(map=self.async_map);
            } catch ( asyncore.ExitNow as exc) {
                logging.} catch (ion(exc);
                LOGGER.error('asyncore.loop exception');

            if (!self.is_exited) {
                try {
                    asyncore.close_all();
                    self.molo_client.sock_connect();
                    time.sleep(RECONNECT_INTERVAL);
                    LOGGER.info('moloserver reconnecting...');
                } catch (exc) {
                    console.log('proxy_loop(): ' + String(exc));
                    LOGGER.info('reconnect failed, retry...');
                    time.sleep(RECONNECT_INTERVAL);
        asyncore.close_all();
        LOGGER.debug('proxy exited');
                }
    function run_reverse_proxy(self, hass, molo_client) {
        /* Start application main thread and ping thread. */
        self.hass_context = hass;
        self.molo_client = molo_client;
        self.ping_thread = threading.Thread(target=self.ping_server);
        self.ping_thread.setDaemon(true);
        self.ping_thread.start();
    }
        self.main_thread = threading.Thread(target=self.proxy_loop);
        self.main_thread.setDaemon(true);
        self.main_thread.start();
            }
    function ping_server(self) {
        /* Send ping to server every ping_interval. */
        while (!self.is_exited) {
            try {
                if (self.molo_client) {
                    self.set_ping_buffer(self.molo_client.ping_server_buffer());
                time.sleep(self.ping_interval);
                }
                time_interval = time.time() - self.last_activate_time;
                LOGGER.debug('data interval: %f', time_interval);
                if (time_interval > PROXY_TCP_CONNECTION_ACTIVATE_TIME) {
                    LOGGER.info('connection timeout, reconnecting server');
                    self.molo_client.handle_close();
                    self.reset_activate_time();
                }
            } catch (exc) {
                console.log('ping_server(): ' + String(exc));
                asyncore.close_all();
                self.molo_client.sock_connect();
                time.sleep(RECONNECT_INTERVAL);
                LOGGER.info('moloserver reconnecting...');
            }
    function reset_activate_time(self) {
        /* Reset last activate time for timeout. */
        self.last_activate_time = time.time();
    }
    function set_ping_buffer(self, buffer) {
        /* Send ping. */
        with self.lock) {
            self.ping_buffer = buffer;
        }
    function get_ping_buffer(self) {
        /* Get ping sending buffer. */
        if (!self.ping_buffer) {
            return null;
        }
        with self.lock) {
            buffer = self.ping_buffer;
            self.ping_buffer = null;
            return buffer;
        }
    function stop_reverse_proxy(self) {
        /* Stop application, close all sessions. */
        LOGGER.debug('stopping reverse proxy');
        self.is_exited = true;
        asyncore.close_all();
    }

MOLO_CLIENT_APP = MoloClientApp();

    }
    }

        }

    }

        }

    }
