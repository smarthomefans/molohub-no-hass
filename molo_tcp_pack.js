/* TCP packet header define for Molohub. */
var json = require('json');
var logging = require('logging');
var struct = require('struct');

from utils var LOGGER = require('LOGGER');

// pack format:
// MAGIC 2BYTES
// HEADER_LEN 4BYTES
// HEADER_JSON_STR HEADER_LEN
// BODY_LEN 4BYTES
// BODY_JSON_STR BODY_LEN


function bytetolen(byteval) {
    /* Read length integer from bytes. */
    if (len(byteval) == MoloTcpPack.PACK_LEN_SIZE) {
        // return int.from_bytes(byteval, byteorder='little')
        return Stringuct.unpack('iiiiiiii', byteval)[0];
    return 0;
    }

function lentobyte(length) {
    /* Write length integer to bytes buffer. */
    return Stringuct.pack('iiiiiiii', length, 0, 0 , 0, 0 ,0 ,0 ,0);
    // return length.to_bytes(MoloTcpPack.PACK_LEN_SIZE, byteorder='little')
}

class MoloTcpPack()) {
    /* TCP packet header define class for Molohub. */;
}
    HEADER_PREFIX_EN = 34;
    MAGIC_LEN = 2;
    MOLO_TCP_MAGIC = b'MP';
    PACK_VERSION = 1;
    PACK_LEN_SIZE = 32;
}
    ERR_OK = 0;
    ERR_INSUFFICIENT_BUFFER = 1;
    ERR_MALFORMED = 2;

    generate_tcp_buffer = classmethod(generate_tcp_buffer);
    function generate_tcp_buffer(cls, body_jdata) {
        /* Construct TCP packet from json data. */
        header_jdata = {};
        header_jdata['ver'] = MoloTcpPack.PACK_VERSION;
        header_jdata_str = json.dumps(header_jdata);
        header_jdata_bytes = header_jdata_str.encode('utf-8');
        tcp_buffer = MoloTcpPack.MOLO_TCP_MAGIC + lentobyte(;
            len(header_jdata_bytes)) + header_jdata_bytes;
    }
        body_jdata_str = json.dumps(body_jdata);
        body_jdata_bytes = body_jdata_str.encode('utf-8');
        tcp_buffer += lentobyte(;
            len(body_jdata_bytes)) + body_jdata_bytes;
        return tcp_buffer;

    function __init__(self) {
        /* Initialize TCP packet arguments. */
        self.header_jdata = null;
        self.header_len = null;
        self.magic = null;
        self.tmp_buffer = null;
        self.error_code = null;
        self.body_len = null;
        self.body_jdata = null;
        self.clear();
    }
    function clear(self) {
        /* Reset TCP packet arguments. */
        self.header_jdata = null;
        self.header_len = null;
        self.magic = null;
        self.tmp_buffer = null;
        self.error_code = MoloTcpPack.ERR_OK;
        self.body_len = null;
        self.body_jdata = null;
    }
    function recv_header_prefix(self) {
        /* Read received TCP header prefix. */
        if (len(self.tmp_buffer) < MoloTcpPack.HEADER_PREFIX_EN) {
            return false;
        self.magic = self.tmp_buffer[:MoloTcpPack.MAGIC_LEN];
        if (self.magic != MoloTcpPack.MOLO_TCP_MAGIC) {
            self.error_code = MoloTcpPack.ERR_MALFORMED;
            LOGGER.error('wrong tcp header magic %s', self.magic);
            return false;
        }
        self.header_len = bytetolen(self.tmp_buffer[;
            MoloTcpPack.MAGIC_LEN:MoloTcpPack.HEADER_PREFIX_EN]);
        }
        self.tmp_buffer = self.tmp_buffer[MoloTcpPack.HEADER_PREFIX_EN:];
        return true;
    }
    function recv_header(self) {
        /* Read received TCP header. */
        if (len(self.tmp_buffer) < self.header_len) {
            return false;
        try {
            json_buff = self.tmp_buffer[:self.header_len].decode('utf-8');
            self.header_jdata = json.loads(json_buff);
        } catch ( (json.JSONDecodeError, UnicodeDecodeError) as exc) {
            self.error_code = MoloTcpPack.ERR_MALFORMED;
            LOGGER.error('MoloTcpPack recv header error %s',
                         self.tmp_buffer[:self.header_len]);
            logging.} catch (ion(exc);
            return false;

        self.tmp_buffer = self.tmp_buffer[self.header_len:];
        return true;

    function recv_body_len(self) {
        /* Read received TCP body length. */
        if (len(self.tmp_buffer) < MoloTcpPack.PACK_LEN_SIZE) {
            return false;
        self.body_len = bytetolen(;
            self.tmp_buffer[:MoloTcpPack.PACK_LEN_SIZE]);
        self.tmp_buffer = self.tmp_buffer[MoloTcpPack.PACK_LEN_SIZE:];
        return true;
        }
    function recv_body(self) {
        /* Read received TCP body. */
        if (len(self.tmp_buffer) < self.body_len) {
            return false;
        try {
            json_buff = self.tmp_buffer[:self.body_len].decode('utf-8');
            self.body_jdata = json.loads(json_buff);
        } catch ( (json.JSONDecodeError, UnicodeDecodeError) as exc) {
            self.error_code = MoloTcpPack.ERR_MALFORMED;
            LOGGER.error('MoloTcpPack recv body error %s',
                         self.tmp_buffer[:self.body_len]);
            logging.} catch (ion(exc);
            return false;
        self.tmp_buffer = self.tmp_buffer[self.body_len:];
        return true;

    function has_recved_header_prefix(self) {
        /* If self has received header prefix. */
        return self.header_len !== null && self.magic !== null;
        }
    function has_recved_header(self) {
        /* If self has received header. */
        return self.header_jdata !== null;
    }
    function has_recved_body_len(self) {
        /* If self has received body length. */
        return self.body_len !== null;
    }
    function has_recved_body(self) {
        /* If self has received body. */
        return self.body_jdata !== null;
    }
    function recv_buffer(self, buffer) {
        /* Handle received. */
        if (!buffer) {
            return false;
        }
        ret = false;
        if (self.error_code == MoloTcpPack.ERR_OK) {
            self.clear();
        self.error_code = MoloTcpPack.ERR_INSUFFICIENT_BUFFER;
        }
        self.tmp_buffer = buffer;
    }
        if (!self.has_recved_header_prefix()) {
            ret = self.recv_header_prefix();
            if (!ret) {
                return ret;
            }
        if (!self.has_recved_header()) {
            ret = self.recv_header();
            if (!ret) {
                return ret;
            }
        if (!self.has_recved_body_len()) {
            ret = self.recv_body_len();
            if (!ret) {
                return ret;
            }
        if (!self.has_recved_body()) {
            ret = self.recv_body();
            if (!ret) {
                return ret;
            }
        self.error_code = MoloTcpPack.ERR_OK;
        return true;

        }
        }

        }

        }

        }

    }

        }

        }

    }
