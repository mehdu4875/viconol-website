import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // 1. On récupère toutes les données, y compris le champ "company_website" caché (Honeypot)
    const { name, email, message, locale, company_website } = await request.json();

    // 2. SÉCURITÉ HONEYPOT (ANTI-SPAM)
    // Si un robot a rempli ce champ caché, on arrête le processus sans envoyer d'e-mail.
    if (company_website && company_website !== "") {
      console.warn(`Spam bot bloqué silencieusement. Tentative d'envoi depuis l'email : ${email}`);
      // On renvoie un "succès" (Status 200) pour tromper le bot, pour qu'il ne cherche pas à contourner une erreur.
      return NextResponse.json({ message: "Emails envoyés avec succès" }, { status: 200 });
    }

    // 3. Configuration de la connexion SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 4. E-mail pour l'ADMINISTRATEUR (VICONÖL)
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@viconol.com',
      replyTo: email,
      subject: `Nouveau message de ${name} [${locale.toUpperCase()}]`,
      text: `Nom: ${name}\nEmail: ${email}\nLangue: ${locale}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #d4af37;">Nouveau message (Langue : ${locale.toUpperCase()})</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <hr />
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    // 5. Gestion des traductions pour l'e-mail automatique du CLIENT
    const isDe = locale === 'de';

    const translations = {
      subject: isDe ? `Bestätigung Ihrer Anfrage - VICONÖL` : `Confirmation de votre demande - VICONÖL`,
      greeting: isDe ? `Guten Tag ${name},` : `Bonjour ${name},`,
      intro: isDe 
        ? `Wir bestätigen den Eingang Ihrer Nachricht und danken Ihnen für Ihr Interesse an <strong>VICONÖL</strong>.` 
        : `Nous vous confirmons la bonne réception de votre message et vous remercions de l'intérêt que vous portez à <strong>VICONÖL</strong>.`,
      outro: isDe 
        ? `Unser Team wird Ihr Anliegen schnellstmöglich bearbeiten und sich in Kürze bei Ihnen melden.` 
        : `Notre équipe prendra connaissance de votre demande dans les plus brefs délais et reviendra vers vous très prochainement.`,
      reminderTitle: isDe ? `Erinnerung an Ihre Nachricht:` : `Rappel de votre message :`,
      footer1: isDe ? `© ${new Date().getFullYear()} VICONÖL. Alle Rechte vorbehalten.` : `© ${new Date().getFullYear()} VICONÖL. Tous droits réservés.`,
      footer2: isDe ? `Diese E-Mail wurde automatisch gesendet, bitte antworten Sie nicht direkt darauf.` : `Cet e-mail a été envoyé automatiquement, merci de ne pas y répondre directement.`
    };

    // 6. E-mail de CONFIRMATION pour le CLIENT (Auto-répondeur Premium)
    const customerMailOptions = {
      from: `"VICONÖL" <${process.env.SMTP_USER}>`, // Le nom d'expéditeur apparaîtra comme "VICONÖL"
      to: email,
      subject: translations.subject,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px 20px; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d4af37; letter-spacing: 4px; margin: 0; font-size: 28px;">VICONÖL</h1>
          </div>
          
          <div style="background-color: #111111; padding: 30px; border-radius: 8px; border: 1px solid #333333;">
            <h2 style="color: #ffffff; margin-top: 0;">${translations.greeting}</h2>
            <p style="color: #cccccc; line-height: 1.6;">${translations.intro}</p>
            <p style="color: #cccccc; line-height: 1.6;">${translations.outro}</p>
            
            <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
            
            <h3 style="color: #888888; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">${translations.reminderTitle}</h3>
            <p style="color: #aaaaaa; font-style: italic; background: #0a0a0a; padding: 15px; border-left: 3px solid #d4af37; border-radius: 4px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666666; font-size: 12px;">
            <p>${translations.footer1}</p>
            <p>${translations.footer2}</p>
          </div>
        </div>
      `,
    };

    // 7. Envoi des deux e-mails simultanément
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    return NextResponse.json({ message: "Emails envoyés avec succès" }, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}