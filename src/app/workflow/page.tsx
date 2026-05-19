import { permanentRedirect } from "next/navigation";

export default function WorkflowRedirect() {
  permanentRedirect("/cookbook#workflow");
}
