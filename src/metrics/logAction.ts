import { AnyAction } from "redux";

export function logAction(action: AnyAction) {
  console.log('ACTION: ', action.type)
}