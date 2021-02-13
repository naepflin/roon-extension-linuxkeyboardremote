# Remote Control Roon with a Linux Keyboard

Program your Linux keyboard to act as a Roon remote. It supports play / pause, volume control and convenience switch.

## Requirements

- Node.js 7.0
- NPM
- git
- Linux

## Installation

```
git clone https://github.com/naepflin/roon-extension-linuxkeyboardremote.git
cd roon-extension-linuxkeyboardremote
npm install
```

## Before you run the extension

The event codes are hard-coded. Change them in the app.js before running. See [linux event codes](https://github.com/torvalds/linux/blob/master/include/uapi/linux/input-event-codes.h).


## How to run

### Run in console:

`node .`

### Run in console with recovery after crash:

`bash node-recovery.sh`

### Run in the background:

`nohup bash node-recovery.sh >/dev/null 2>&1 &`

### Run as a systemd service:

`bash run-daemon.sh`

### Run a second instance of the systemd service on the same host:

1. Install the extension again in a separate location
2. Change `servicename` in run-daemon.sh to a unique value 
3. Run as described above


## Configuration

Open Roon and enable the extension. Then, pick the zone and keyboard device in the extension settings.

## License

Apache 2.0
