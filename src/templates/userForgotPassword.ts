export function passwordResetTemplate(name: string, code: string) {
  return `
  <mjml>
    <mj-body background-color="#f4f4f4">
      <mj-section>
        <mj-column>

            <mj-image width="300px" src="https://res.cloudinary.com/dh4qa0rmt/image/upload/v1764032152/ChatGPT_Image_24_de_nov._de_2025_19_55_10_jxalry.png"></mj-image>

            <mj-text font-size="20px" font-weight="bold" color="#333">
              Olá, ${name}.
            </mj-text>

            <mj-text font-size="16px" color="#555">
              Recebemos uma solicitação para redefinir sua senha.  
              Utilize o código abaixo para continuar o processo:
            </mj-text>

          <mj-text
            font-size="28px"
            font-weight="bold"
            color="#1C5281"
            align="center"
            padding="20px 0"
          >
            ${code}
          </mj-text>

          <mj-text font-size="16px" color="#555">
            Esse código é válido por <strong>10 minutos</strong>.  
            Caso você não tenha solicitado a redefinição de senha, pode ignorar este email.
          </mj-text>

          <mj-button
            background-color="#1C5281"
            color="white"
            href="https://atribuna-geren.vercel.app/reset-password"
            padding="20px 0"
            border-radius="8px"
          >
            Redefinir senha
          </mj-button>

        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `;
}
