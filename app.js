"use strict";

const RoonApi = require("node-roon-api"),
  RoonApiTransport = require("node-roon-api-transport"),
  RoonApiSettings  = require("node-roon-api-settings"),
  InputEvent = require('input-event'),
  os = require("os");

var core;

const roon = new RoonApi({
  extension_id:        os.hostname().split('.')[0],
  display_name:        'Roon Bridge Remote: ' + os.hostname().split('.')[0],
  display_version:     '1.0.0',
  publisher:           'Dan Ward',
  email:               '',
  website:             'https://github.com/danward79/roon-extension-linuxkeyboardremote',
  log_level:           'none',
  
  core_paired: function(core_) {
    core = core_;

    let transport = core.services.RoonApiTransport;
    transport.subscribe_zones(function(cmd, data) {
      /* console.log(core.core_id,
        core.display_name,
        core.display_version,
        "-",
        cmd,
        JSON.stringify(data, null, '  ')
      );*/

    });
  },
  core_unpaired: function(core_) {
    core = core_;
    console.log(core.core_id,
      core.display_name,
      core.display_version,
      "-",
      "LOST"
    );
    core = undefined;
  },
});

var mysettings = roon.load_config("settings") || {
  zone: null,
  devicePath: "/dev/input/event0",
};

var keyboard = new InputEvent.Keyboard(mysettings.devicePath);
keyboard.on('keypress', keyboardEvent);

const svc_settings = new RoonApiSettings(roon, {
  get_settings: function(cb) {
    cb(makelayout(mysettings));
  },
  save_settings: function(req, isdryrun, settings) {
    let l = makelayout(settings.values);
    req.send_complete(l.has_error ? "NotValid" : "Success", { settings: l });

    if (!isdryrun && !l.has_error) {
      mysettings = l.values;
      svc_settings.update_settings(l);
      roon.save_config("settings", mysettings);

      keyboard.removeAllListeners('keypress');
      keyboard = new InputEvent.Keyboard(mysettings.devicePath);
      keyboard.on('keypress', keyboardEvent);
    }
  }
});

roon.init_services({
    required_services: [ RoonApiTransport ],
    provided_services:   [ svc_settings ],
});

roon.start_discovery();

function makelayout(settings) {
  var l = {
    values:    settings,
    layout:    [],
    has_error: false
  };

  l.layout.push({
    type:    "zone",
    title:   "Zone",
    setting: "zone",
  });

  l.layout.push({
    type:    "string",
    title:   "Keyboard Device Path",
    setting: "devicePath",
  });

  return l;
}

function keyboardEvent(e) {
  console.log("Key press registered: " + e.code);
  if (!core) return;
  if(e.code == 207) core.services.RoonApiTransport.control(mysettings.zone, 'play');
  if(e.code == 119) core.services.RoonApiTransport.control(mysettings.zone, 'pause');
  // if(e.code == 119) core.services.RoonApiTransport.control(mysettings.zone, 'playpause');
  if(e.code == 128) core.services.RoonApiTransport.control(mysettings.zone, 'stop');
  if(e.code == 407) core.services.RoonApiTransport.control(mysettings.zone, 'next');
  if(e.code == 412) core.services.RoonApiTransport.control(mysettings.zone, 'previous');
  // if(e.code == 115) core.services.RoonApiTransport.change_volume(mysettings.zone, 'relative', 1);
  // if(e.code == 103) core.services.RoonApiTransport.change_volume(mysettings.zone, 'relative', 1);
  // if(e.code == 114) core.services.RoonApiTransport.change_volume(mysettings.zone, 'relative', -1);
  // if(e.code == 108) core.services.RoonApiTransport.change_volume(mysettings.zone, 'relative', -1);
  // if(e.code == 172) core.services.RoonApiTransport.convenience_switch(mysettings.zone, {});
  // if(e.code == 116) core.services.RoonApiTransport.convenience_switch(mysettings.zone, {});
}