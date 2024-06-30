export interface BotAction {
  id: string;
  type: ActionType;
  content: any;
  sent?: boolean;
}

export enum ActionType {
  SEND_MESSAGE = "send-message",
  SEND_QUIZ = "send-quiz",
  SEND_PRESET = "send-preset",
  CHECK_IMAGE = "check-image"
}
