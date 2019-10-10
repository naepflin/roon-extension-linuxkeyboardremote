# Remote Control Roon with a Linux Keyboard

Program your Linux keyboard to act as a Roon remote. It supports play / pause, volume control and convenience switch.

## Requirements

- Node.js 7.0
- NPM
- git
- Linux

## Installation

```
git clone https://github.com/naepflin/roon-extension-linux-keyboard.git
cd roon-extension-linux-keyboard
npm install
```

## How to run

Run in console:

`bash node-recovery.sh`

Run in the background:

`nohup bash node-recovery.sh >/dev/null 2>&1 &`

Open Roon and enable the extension. Then, pick the zone and device path (e.g. "/dev/input/event0") in the extension settings.

Note that the event codes are hard-coded, so change them in the code before running.

## License

Apache 2.0
