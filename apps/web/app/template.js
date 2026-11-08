import { RouteTransition } from "@/components/shell/RouteTransition.js";

export default function Template({ children }) {
  return <RouteTransition>{children}</RouteTransition>;
}
