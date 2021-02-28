import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

class SendmailService
{
    private client: Transporter;

    constructor()
    {
        nodemailer.createTestAccount().then(acc =>
            {
                const transporter = nodemailer.createTransport(
                    {
                        host: acc.smtp.host,
                        port: acc.smtp.port,
                        secure: acc.smtp.secure,
                        auth:
                        {
                            user: acc.user,
                            pass: acc.pass
                        }
                    })

                    this.client = transporter;
            })   
    }

    async execute(to: string, subject: string, vars: object, path: string)
    {
       
        const templateFileContent = fs.readFileSync(path).toString('utf8')

        const mailTemplateParse = handlebars.compile(templateFileContent)

        const html = mailTemplateParse(vars)
        
        const msg = await this.client.sendMail(
            {
                to,
                subject,
                html,
                from: "NPS <noreply@NPS.com.br>"
            })

        console.log(`Message sent: ${msg.messageId}`)
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(msg)}`)
    }
}

export default new SendmailService();