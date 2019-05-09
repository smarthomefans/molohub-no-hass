"""Utils for Molohub."""
import logging
import random
import socket
import uuid
import yaml
import json

try:
    FileNotFoundError
except NameError:
    FileNotFoundError = IOError

from const import TCP_PACK_HEADER_LEN

LOGGER = logging.getLogger(__package__)
LOGGER.setLevel(level = logging.INFO)


handler = logging.FileHandler("log.txt")
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)


ch = logging.StreamHandler()
ch.setLevel(logging.INFO)
ch.setFormatter(formatter)


LOGGER.addHandler(handler)
LOGGER.addHandler(ch)

def get_mac_addr():
    """Get local mac address."""
    import uuid
    node = uuid.getnode()
    mac = uuid.UUID(int=node).hex[-12:]
    return mac


def dns_open(host):
    """Get ip from hostname."""
    try:
        ip_host = socket.gethostbyname(host)
    except socket.error:
        return None

    return ip_host


def len_to_byte(length):
    """Write length integer to bytes buffer."""
    return length.to_bytes(TCP_PACK_HEADER_LEN, byteorder='little')


def byte_to_len(byteval):
    """Read length integer from bytes."""
    if len(byteval) == TCP_PACK_HEADER_LEN:
        return int.from_bytes(byteval, byteorder='little')
    return 0


def get_rand_char(length):
    """Generate random string by length."""
    _chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"
    return ''.join(random.sample(_chars, length))


def fire_molohub_event(host_str, data):
    """Send hass Event message."""
    LOGGER.info("============================================================")
    LOGGER.info("Update nofiy str token %s", data['token'])
    LOGGER.info("[google](https://%s/login/google?token=%s)", host_str, data['token'])
    LOGGER.info("[wxxcx](https://%s/login/wxxcx?token=%s)", host_str, data['token'])
    LOGGER.info("[github](https://%s/login/github?token=%s)", host_str, data['token'])
    LOGGER.info("============================================================")

def get_local_seed(config_file):
    """Read seed from local file."""
    local_seed = ""
    try:
        with open(config_file, 'r') as file_obj:
            config_data = yaml.load(file_obj)
            if config_data and 'molohub' in config_data:
                if 'localseed' in config_data['molohub']:
                    local_seed = config_data['molohub']['localseed']
    except (EnvironmentError, yaml.YAMLError):
        pass
    return local_seed


def save_local_seed(config_file, local_seed):
    """Save seed to local file."""
    config_data = None
    try:
        with open(config_file, 'r') as rfile:
            config_data = yaml.load(rfile)
    except (EnvironmentError, yaml.YAMLError):
        pass

    if not config_data:
        config_data = {}
        config_data['molohub'] = {}
    try:
        with open(config_file, 'w') as wfile:
            config_data['molohub']['localseed'] = local_seed
            yaml.dump(config_data, wfile, default_flow_style=False)
    except (EnvironmentError, yaml.YAMLError):
        pass


def load_uuid(hass, filename='local.uuid'):
    """Load UUID from a file or return None."""
    jsonf = None

    try:
        with open(filename, 'r') as fptr:
            jsonf = json.loads(fptr.read())
    except (ValueError, AttributeError, FileNotFoundError):
        pass

    if jsonf and jsonf['uuid']:
        return jsonf['uuid']

    node = uuid.getnode()
    mac = uuid.UUID(int=node).hex[-12:]
    try:
        with open(filename, 'w') as wfile:
            wfile.write(json.dumps({'uuid': mac}, indent=1))
    except (EnvironmentError, FileNotFoundError):
        pass
    return mac;



if __name__ == '__main__':
    import struct
    import urllib
    print(struct.pack('iii', 1, 0, 0))

    urllib.pathname2url('abc def/foo?bar=baz')
