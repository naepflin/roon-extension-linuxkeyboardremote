#!/bin/bash

servicename=roon-extension-linuxkeyboardremote.service

# copy to /lib/systemd/system for Debian/Ubuntu, use /usr/lib/systemd/system for CentOS
sed "s?{{WorkingDirectory}}?$(printf "%q\n" "$(pwd)")?g" roon-extension-linuxkeyboardremote.service > /lib/systemd/system/$servicename

sudo systemctl daemon-reload
sudo systemctl start $servicename
sudo systemctl enable $servicename
sudo systemctl status $servicename
