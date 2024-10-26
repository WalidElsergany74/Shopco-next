import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/app/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [body.email],
      subject: "Orders From ShopCo.",
      react: EmailTemplate({ body }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
