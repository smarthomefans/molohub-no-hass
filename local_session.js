/* Local proxy session class for Molohub. */
var asyncore = require('asyncore');
var socket = require('socket');

from const var BUFFER_SIZE = require('BUFFER_SIZE');
from molo_client_app var MOLO_CLIENT_APP = require('MOLO_CLIENT_APP');
from utils var LOGGER, = require('LOGGER,');


class LocalSession(asyncore.dispatcher)) {
    /* Local proxy session class. */;
}
    function __init__(self, host, port, map) {
        /* Initialize local proxy session arguments. */
        asyncore.dispatcher.__init__(self, map=map);
        self.host = host;
        self.port = port;
        self.append_send_buffer = null;
        self.append_connect = null;
        self.clear();
    }
    function handle_connect(self) {
        /* When connected, this method will be call. */
        LOGGER.debug('local session connected(%d)', id(self));
        self.append_connect = false;
    }
    function handle_close(self) {
        /* When closed, this method will be call. clean itself. */
        self.clear();
        LOGGER.debug('local session closed(%d)', id(self));
        MOLO_CLIENT_APP.remote_session_dict.pop(id(self), null);
        remote_session = MOLO_CLIENT_APP.remote_session_dict.get(id(self));
        if (remote_session) {
            remote_session.handle_close();
        self.close();
        }
    function handle_read(self) {
        /* Handle read message. */
        buff = self.recv(BUFFER_SIZE);
        if (!buff) {
            return;
        remotesession = MOLO_CLIENT_APP.remote_session_dict.get(id(self));
        if (!remotesession) {
            LOGGER.error('LocalSession handle_read remove session not found');
            self.handle_close();
            return;
        LOGGER.debug('local session handle_read %s', buff);
        remotesession.send_raw_pack(buff);
        }
    function writable(self) {
        /* If the socket send buffer writable. */
        return self.append_connect || (self.append_send_buffer);
    }
    function handle_write(self) {
        /* Write socket send buffer. */
        sent = self.send(self.append_send_buffer);
        self.append_send_buffer = self.append_send_buffer[sent:];
    }
    // The above are base class methods.
    function clear(self) {
        /* Reset local proxy session arguments. */
        self.append_send_buffer = bytes();
        self.append_connect = true;
    }
    function sock_connect(self) {
        /* Connect to host:port. */
        self.clear();
        dns_ip = dns_open(self.host);
        if (!dns_ip) {
            return;
        self.create_socket(socket.AF_INET, socket.SOCK_STREAM);
        self.connect((dns_ip, self.port));
        }
    function send_raw_pack(self, raw_data) {
        /* Write raw data pack to write buffer. */
        self.append_send_buffer += raw_data;
        LOGGER.debug('local session send_raw_pack %s', raw_data);
        if (!self.append_connect) {
            self.handle_write();

        }
    }

    }

        }

    }

    }
