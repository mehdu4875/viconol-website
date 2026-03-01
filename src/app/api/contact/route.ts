import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 1. Configuration de la connexion à ta boîte mail
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true pour 465, false pour 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 2. Préparation du contenu de l'e-mail
    const mailOptions = {
      from: process.env.SMTP_USER, // L'e-mail part de ta propre adresse...
      to: 'info@viconol.com',      // ...pour arriver sur ta propre adresse
      replyTo: email,              // Si tu cliques sur "Répondre", ça répondra au client
      subject: `Nouveau message de ${name} (Site Web VICONÖL)`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #d4af37;">Nouveau message depuis le site web</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    // 3. Envoi de l'e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email envoyé avec succès" }, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}