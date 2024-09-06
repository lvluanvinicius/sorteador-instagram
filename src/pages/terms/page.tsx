export function Page() {
  return (
    <>
      <div className="w-full max-w-[95vw] md:max-w-[90vw] py-4">
        <h1 className="text-lg font-bold">Termos de Uso</h1>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-[95vw] md:max-w-[90vw] py-4">
        <div>
          <h2 className="text-md">Termos de Uso</h2>
          <p className="text-justify">
            Estes Termos de Uso regem o uso da nossa aplicação (&quot;nós&quot;,
            &quot;nosso&quot; ou &quot;nossa aplicação&quot;) de sorteio baseada
            em comentários de posts do Instagram. Ao utilizar nosso serviço,
            você concorda com os termos descritos abaixo.
          </p>
        </div>

        <div className="text-justify">
          <h4>1 - Aceitação dos Termos</h4>
          <p>
            Ao acessar ou usar nossa aplicação, você concorda em estar vinculado
            por estes Termos de Uso. Se você não concorda com estes termos, por
            favor, não utilize nosso serviço.
          </p>
        </div>

        <div className="text-justify">
          <h4>2 - Descrição do Serviço</h4>
          <p>
            Nossa aplicação permite que você realize sorteios aleatórios
            baseados nos comentários de posts do Instagram. Nós coletamos os
            nomes de usuários dos comentários e, após a remoção de duplicatas,
            realizamos o sorteio conforme configurado.
          </p>
        </div>

        <div className="text-justify">
          <h4>3 - Requisitos de Uso</h4>
          <p>Para usar nossa aplicação, você deve:</p>
          <ul className="pl-10 mt-2">
            <li className="list-disc ">
              Ser maior de idade em sua jurisdição ou ter permissão de um
              responsável legal para utilizar o serviço.
            </li>
            <li className="list-disc ">
              Possuir uma conta no Instagram e fornecer acesso aos dados
              necessários para a realização dos sorteios.
            </li>
          </ul>
        </div>

        <div className="text-justify">
          <h4>4 - Uso Permitido</h4>
          <p>
            Você concorda em usar nossa aplicação apenas para fins legais e em
            conformidade com todas as leis e regulamentos aplicáveis. Você não
            deve:
          </p>
          <ul className="pl-10 mt-2">
            <li className="list-disc ">
              Usar o serviço para qualquer finalidade fraudulenta ou ilegal.
            </li>
            <li className="list-disc ">
              Tentar burlar qualquer medida de segurança ou autenticação
              implementada em nossa aplicação.
            </li>
            <li className="list-disc ">
              Compartilhar seu acesso ou permitir que terceiros usem sua conta
              sem autorização.
            </li>
          </ul>
        </div>

        <div className="text-justify">
          <h4>5 - Limitação de Responsabilidade</h4>
          <p>
            Nossa aplicação é fornecida &quot;como está&quot;, sem garantias de
            qualquer tipo, expressas ou implícitas. Não nos responsabilizamos
            por qualquer dano direto, indireto, incidental ou consequente
            decorrente do uso ou da incapacidade de usar o serviço.
          </p>
        </div>

        <div className="text-justify">
          <h4>6 - Alterações ao Serviço e aos Termos</h4>
          <p>
            Reservamo-nos o direito de modificar ou descontinuar, temporária ou
            permanentemente, o serviço ou qualquer parte dele, com ou sem aviso
            prévio. Também podemos alterar estes Termos de Uso a qualquer
            momento. O uso continuado do serviço após tais alterações constitui
            sua aceitação dos novos termos.
          </p>
        </div>

        <div className="text-justify">
          <h4>7 - Encerramento de Conta</h4>
          <p>
            Podemos suspender ou encerrar seu acesso ao serviço a qualquer
            momento, sem aviso prévio, se acreditarmos que você violou estes
            Termos de Uso ou está envolvido em atividades fraudulentas ou
            ilegais.
          </p>
        </div>

        <div className="text-justify">
          <h4>8 - Lei Aplicável</h4>
          <p>
            Estes Termos de Uso serão regidos e interpretados de acordo com as
            leis do [seu estado/país], sem levar em conta seus conflitos de
            princípios legais.
          </p>
        </div>

        <div className="text-justify">
          <h4>8 - Lei Aplicável</h4>
          <p>
            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em
            contato conosco em{" "}
            <a href="mailto:atendimento@grupocednet.com.br">
              atendimento@grupocednet.com.br
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
