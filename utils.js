/* Utils for Molohub. */
var logging = require('logging');
var random = require('random');
var socket = require('socket');
var uuid = require('uuid');
var yaml = require('yaml');
var json = require('json');

try {
    FileNotFoundError;
} catch ( NameError) {
    FileNotFoundError = IOError;
}
from const var TCP_PACK_HEADER_LEN = require('TCP_PACK_HEADER_LEN');

LOGGER = logging.getLogger(__package__);
LOGGER.setLevel(level = logging.INFO);


handler = logging.FileHandler('log.txt');
handler.setLevel(logging.INFO);
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s');
handler.setFormatter(formatter);


ch = logging.StreamHandler();
ch.setLevel(logging.INFO);
ch.setFormatter(formatter);


LOGGER.addHandler(handler);
LOGGER.addHandler(ch);

function get_mac_addr() {
    /* Get local mac address. */
    var uuid = require('uuid');
    node = uuid.getnode();
    mac = uuid.UUID(int=node).hex[-12:];
    return mac;
}

function dns_open(host) {
    /* Get ip from hostname. */
    try {
        ip_host = socket.gethostbyname(host);
    } catch ( socket.error) {
        return null;
    }
    return ip_host;
}

function len_to_byte(length) {
    /* Write length integer to bytes buffer. */
    return length.to_bytes(TCP_PACK_HEADER_LEN, byteorder='little');
}

function byte_to_len(byteval) {
    /* Read length integer from bytes. */
    if (len(byteval) == TCP_PACK_HEADER_LEN) {
        return Number.from_bytes(byteval, byteorder='little');
    return 0;
    }

function get_rand_char(length) {
    /* Generate random string by length. */
    _chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    return ''.join(random.sample(_chars, length));
}

function fire_molohub_event(host_str, data) {
    /* Send hass Event message. */
    LOGGER.info('============================================================');
    LOGGER.info('Update nofiy str token %s', data['token']);
    LOGGER.info('[google](https://%s/login/google?token=%s)', host_str, data['token']);
    LOGGER.info('[wxxcx](https://%s/login/wxxcx?token=%s)', host_str, data['token']);
    LOGGER.info('[github](https://%s/login/github?token=%s)', host_str, data['token']);
    LOGGER.info('============================================================');
}
function get_local_seed(config_file) {
    /* Read seed from local file. */
    local_seed = '';
    try {
        with open(config_file, 'r') as file_obj) {
            config_data = yaml.load(file_obj);
            if (config_data && 'molohub' in config_data) {
                if ('localseed' in config_data['molohub']) {
                    local_seed = config_data['molohub']['localseed'];
    } catch ( (EnvironmentError, yaml.YAMLError)) {

    return local_seed;
                }

function save_local_seed(config_file, local_seed) {
    /* Save seed to local file. */
    config_data = null;
    try {
        with open(config_file, 'r') as rfile) {
            config_data = yaml.load(rfile);
    } catch ( (EnvironmentError, yaml.YAMLError)) {


    if (!config_data) {
        config_data = {};
        config_data['molohub'] = {};
    try {
        with open(config_file, 'w') as wfile) {
            config_data['molohub']['localseed'] = local_seed;
            yaml.dump(config_data, wfile, default_flow_style=false);
    } catch ( (EnvironmentError, yaml.YAMLError)) {


        }
function load_uuid(hass, filename='local.uuid') {
    /* Load UUID from a file or return None. */
    jsonf = null;
}
    try {
        with open(filename, 'r') as fptr) {
            jsonf = json.loads(fptr.read());
    } catch ( (ValueError, AttributeError, FileNotFoundError)) {


    if (jsonf && jsonf['uuid']) {
        return jsonf['uuid'];
    }
    node = uuid.getnode();
    mac = uuid.UUID(int=node).hex[-12:];
    try {
        with open(filename, 'w') as wfile) {
            wfile.write(json.dumps({'uuid': mac}, indent=1));
    } catch ( (EnvironmentError, FileNotFoundError)) {

    return mac;
        }
    }

if (__name__ == '__main__') {
    var struct = require('struct');
    var urllib = require('urllib');
    console.log(struct.pack('iii', 1, 0, 0));
}
    urllib.pathname2url('abc def/foo?bar=baz');

        }
    }

    }

    }

        }

    }

}

            }

        }

    }

}

}
