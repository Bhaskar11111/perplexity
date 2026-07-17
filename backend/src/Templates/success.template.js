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
    min-height:100vh;
    background:#111111;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
    color:#ffffff;
">

<div style="
    min-height:100vh;
    padding:32px 18px;
    box-sizing:border-box;
    display:flex;
    align-items:center;
    justify-content:center;
    
">

<div style="
    width:100%;
    max-width:680px;
    background:rgba(24,22,26,0.86);
    border:1px solid rgba(255,255,255,0.10);
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 30px 90px rgba(0,0,0,0.48);
">

    <div style="
        padding:22px 28px;
        border-bottom:1px solid rgba(255,255,255,0.08);
        background:rgba(48,40,61,0.22);
    ">
        <div style="
            display:flex;
            align-items:center;
            gap:8px;
            color:#ffffff;
            font-size:22px;
            font-weight:300;
            letter-spacing:0;
        ">
            <span style="font-size:30px;line-height:1;font-weight:200;">&xi;</span>
            <span>Etos</span>
        </div>
    </div>

    <div style="
        padding:58px 40px 54px;
        text-align:center;
    ">

        <div style="
            width:72px;
            height:72px;
            margin:0 auto 24px;
            border-radius:50%;
            background:rgba(123,91,230,0.16);
            border:1px solid rgba(139,108,241,0.45);
            line-height:72px;
            font-size:32px;
            color:#d8d0ff;
            font-weight:700;
            box-shadow:0 0 36px rgba(139,108,241,0.24);
        ">
            &#10003;
        </div>

        <h1 style="
            margin:0 0 16px;
            color:#ffffff;
            font-size:32px;
            line-height:1.2;
            font-weight:300;
            letter-spacing:0;
        ">
            Email Verified Successfully
        </h1>

        <p style="
            margin:0 auto 32px;
            max-width:450px;
            color:rgba(255,255,255,0.64);
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
                background:#7b5be6;
                color:#ffffff;
                text-decoration:none;
                padding:13px 24px;
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
        border-top:1px solid rgba(255,255,255,0.08);
        text-align:center;
        color:rgba(255,255,255,0.36);
        font-size:13px;
        background:rgba(17,17,17,0.34);
    ">
        &copy; 2026 Etos by Bhaskar
    </div>

</div>
</div>
</body>
</html>
`;

module.exports=
{
    emailVerificationSuccess
}
