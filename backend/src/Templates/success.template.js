const emailVerificationSuccess = () => `

<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified</title>
</head>

<body style="
    margin:0;
    background:#f9fafb;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
">


<div style="
    max-width:640px;
    margin:80px auto;
    background:#ffffff;
    border:1px solid #e5e7eb;
    border-radius:12px;
    overflow:hidden;
">

    <div style="
        padding:24px 32px;
        border-bottom:1px solid #f3f4f6;
    ">
        
    </div>

    <div style="
        padding:48px 40px;
        text-align:center;
    ">

        <div style="
            width:64px;
            height:64px;
            margin:0 auto 24px;
            border-radius:50%;
            background:#f0fdf4;
            border:1px solid #bbf7d0;
            line-height:64px;
            font-size:28px;
            color:#16a34a;
            font-weight:700;
        ">
            ✓
        </div>

        <h1 style="
            margin:0 0 16px;
            color:#111827;
            font-size:30px;
            font-weight:400;
        ">
            Email Verified Successfully
        </h1>

        <p style="
            margin:0 auto 32px;
            max-width:450px;
            color:#6b7280;
            font-size:16px;
            line-height:1.7;
        ">
            Your email address has been successfully verified.
            Your account is now active and ready to use.
        </p>

        <a
            href="http://localhost:5173/login"
            style="
                display:inline-block;
                background:#111827;
                color:#ffffff;
                text-decoration:none;
                padding:12px 24px;
                border-radius:8px;
                font-size:14px;
                font-weight:500;
            "
        >
            Continue to Login
        </a>

    </div>

    <div style="
        padding:20px 32px;
        border-top:1px solid #f3f4f6;
        text-align:center;
        color:#9ca3af;
        font-size:13px;
    ">
        © 2026 Perplexity by Bhaskar
    </div>

</div>
</body>
</html>
`;

module.exports=
{
    emailVerificationSuccess
}