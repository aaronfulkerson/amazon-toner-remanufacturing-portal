import { createElement } from "react";
import { Resend } from "resend";

import type { FunctionComponent, ReactElement } from "react";

export const resend = new Resend(process.env.RESEND_API_KEY);

export function getEmailTemplate<P extends object>(
  component: FunctionComponent<P>,
  props: P
): ReactElement<P, FunctionComponent<P>> {
  return createElement(component, props);
}
