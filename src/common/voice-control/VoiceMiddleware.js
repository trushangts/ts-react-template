import { config } from "../../config/config";
import { mute, soundOn, playAudio } from "../utils/functions/sound";
import { smallBox } from "../utils/functions/message";
import { onCollapseMenu } from "../layout/LayoutActions";
import {
  bodyRemoveClass,
  bodyAddClass
} from "../utils/functions/rootContainers";

import * as actions from "./VoiceActions";
import { VoiceRecognition } from "./VoiceRecognition";
import { voiceControlStart } from "./VoiceActions";

let voiceRecognition; // private instance

export const VoiceMiddleware = store => next => action => {
  const result = next(action);

  switch (action.type) {
    case actions.VOICE_CONTROL_ON:
      playAudio("voice_on");

      bodyAddClass("voice-command-active");

      if (voiceRecognition) {
        voiceRecognition = null;
      }

      voiceRecognition = new VoiceRecognition();
      voiceRecognition.start();
      store.dispatch(voiceControlStart());

      break;

    case actions.VOICE_CONTROL_OFF:
      playAudio("voice_off");
      voiceRecognition.abort();
      smallBox({
        title: "VOICE COMMAND OFF",
        content:
          "Your voice commands has been successfully turned off. Click on the <i class='fa fa-microphone fa-lg fa-fw'></i> icon to turn it back on.",
        color: "#40ac2b",
        sound_file: "voice_off",
        timeout: 8000,
        icon: "fa fa-microphone-slash"
      });
      bodyRemoveClass("voice-command-active");
      break;
    case actions.VOICE_CONTROL_START:
      bodyRemoveClass("service-not-allowed");
      bodyAddClass("service-allowed");
      break;
    case actions.VOICE_CONTROL_ERROR:
      bodyRemoveClass("service-allowed");
      bodyAddClass("service-not-allowed");
      break;
    case actions.VOICE_CONTROL_MATCH:
      smallBox({
        title: action.payload,
        content: "loading...",
        color: "#333",
        sound_file: config.sound_on ? "voice_alert" : null,
        timeout: 2000
      });
      break;
    case actions.VOICE_CONTROL_NO_MATCH:
      smallBox({
        title:
          "Error: <strong>" +
          ' " ' +
          action.payload +
          ' " ' +
          "</strong> no match found!",
        content: "Please speak clearly into the microphone",
        color: "#a90329",
        timeout: 5000,
        icon: "fa fa-microphone"
      });
      break;

    case actions.VOICE_CONTROL_ACTION:
      const event = respondToAction(action);
      if (event) {
        store.dispatch(event);
      }
      break;

    default:
      break;
  }

  return result;
};

export function respondToAction(action) {
  switch (action.actionType) {
    case "voice":
      switch (action.payload) {
        case "help on":
          return actions.voiceControlShowHelp();
        case "help off":
          return actions.voiceControlHideHelp();
        case "stop":
          return actions.voiceControlOff();
        default:
          return;
      }
    case "navigate":
      const hash = window.location.hash;
      if (hash !== action.payload) {
        window.location.hash = action.payload;
      }
      break;

    case "layout":
      switch (action.payload) {
        case "show navigation":
          return onCollapseMenu(false);
        case "hide navigation":
          return onCollapseMenu(true);
        default:
          return;
      }
    case "sound":
      switch (action.payload) {
        case "mute":
          mute();
          break;
        case "sound on":
          soundOn();
          break;
        default:
          break;
      }
      break;

    default:
      break;
  }
}
