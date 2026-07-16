const welcomeEmailTemplate = (username,emailVerificationToken) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
</head>
<body style="margin:0;padding:40px 20px;background:#f6f8fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

                    <tr>
                        <td style="padding:24px 32px;border-bottom:1px solid #f3f4f6;">
                            <div style="font-size:18px;font-weight:600;color:#111827;">
                                Etos by Bhaskar
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:32px;">

                            <p style="margin:0 0 20px;color:#111827;font-size:15px;">
                                Hi, <strong>${username}</strong>,
                            </p>

                            <p style="margin:0 0 16px;color:#4b5563;font-size:15px;line-height:1.8;">
                                Welcome to <strong>Etos by Bhaskar</strong>.
                                Your account has been successfully created and is ready to use.
                            </p>

                            <p style="margin:0 0 16px;color:#4b5563;font-size:15px;line-height:1.8;">
                                We're glad to have you on board and hope you enjoy the experience.
                            </p>

                            <p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.8;">
                                Please click the button below to verify your email.
                            </p>

                            <a href='http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}'

                            style=" background:#8B6CF1; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block; font-size:14px; font-weight:400; " > Verify Email </a>

                        </td>
                    </tr>

                    <tr>
                        <td style="padding:24px 32px;border-top:1px solid #f3f4f6;">

                            <p style="margin:0;color:#6b7280;font-size:14px;">
                                Best regards,
                            </p>

                            <p style="margin:6px 0 0;color:#111827;font-size:14px;font-weight:600;">
                                Bhaskar Mishra
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`;

module.exports = {
    welcomeEmailTemplate
};