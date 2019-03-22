let nodemailer=require('nodemailer')

module.exports=function (email,tmpPsw,callback) {
    let transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: 'jessezhu_official@qq.com',//邮箱账号
            pass: 'pyuppuixezkbebaa'//邮箱密码
        }
    });
    let mailOptions = {
        from: 'jessezhu_official@qq.com', // sender address
        to:email, // list of receivers
        subject: '临时密码', // Subject line
        text: '', // plaintext body
        html: `<h2>${tmpPsw}</h2>
<p>您正在申请使用临时密码登录，请不要将这个临时密码告诉其他人，您可以使用这个密码在登录页正常登录，密码三分钟内有效。登录成功后请尽快在修改密码页面更改自己的密码。</p>
<p>如果您没有申请临时密码，请无视这封邮件。</p>`
    };
    transporter.sendMail(mailOptions, function(error){
        if(!error){
            callback&&callback('发送成功')
        }else{
            callback&&callback('发送失败')
        }
    });
}
