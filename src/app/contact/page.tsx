import { redirect } from "next/navigation";

export const metadata = {
  title: "Contact | vibeprompt",
  description: "Get in touch about vibeprompt, email or GitHub.",
};

export default function ContactPage() {
  redirect("/about");
}
