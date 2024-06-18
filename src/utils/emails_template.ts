
export interface EmailMessages {
    readonly title: string
    readonly subtitle: string
    readonly password_reset_text: string
    readonly password_reset_link: string
    readonly policy_text: string
    readonly terms_text: string
    readonly locale: string
    readonly styles: string
}

export const ResetPasswordEmailHtmlTemplate = ( data: EmailMessages ) => {

    const header = `
        <!DOCTYPE html>
        <html lang="${data.locale}">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email</title>
            <style>
            ${ data.styles ? data.styles : 
                `body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                h1 { color: #333; }
                a {
                    background-color: #333;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                }
                `
            }  
            </style>
        </head>
        <body>
    `

    const body = `
    <div style="background-color: #f4f4f4; padding: 20px;">
        <h1>${data.title}</h1>
        <p>${data.subtitle}</p>
        <a href="${data.password_reset_link}">
            ${data.password_reset_text}
        </a>
    </div>
    `

    const footer = `
        <footer style="margin-top: 20px;">
            <p>
                <a href="${process.env.user_service_domain_url}/${data.locale}/policy">
                    ${data.policy_text}
                </a>
                <a href="${process.env.user_service_domain_url}/${data.locale}/terms">
                    ${data.terms_text}
                </a>
            </p>
            <p>
                &copy; All Rights Reserved ${new Date().getFullYear()} 
                ${process.env.COMPANY_NAME}
            </p>
        </footer>
    </body>
    `

    return `${header}${body}${footer}`

}
