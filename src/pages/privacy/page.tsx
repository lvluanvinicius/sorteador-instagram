export function Page() {
  return (
    <>
      <div className="w-full max-w-[95vw] md:max-w-[90vw] py-4">
        <h1 className="text-lg font-bold">Política de Privacidade</h1>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-[95vw] md:max-w-[90vw] py-4">
        <div>
          <h2 className="text-md">Política de Privacidade</h2>
          <p className="text-justify">
            Esta Política de Privacidade descreve como sua aplicação
            (&quot;nós&quot;, &quot;nosso&quot; ou &quot;nossa aplicação&quot;)
            coleta, usa, compartilha e protege as informações pessoais dos
            usuários (&quot;você&quot; ou &quot;seu&quot;) ao utilizar nosso
            serviço de sorteio baseado em comentários de posts do Instagram.
          </p>
        </div>

        <div className="text-justify">
          <h4>1 - Informações que Coletamos</h4>
          <p>
            Ao utilizar nosso serviço, podemos coletar as seguintes informações:
          </p>
          <ul className="pl-10 mt-2">
            <li className="list-disc ">
              <b>Dados de Comentários do Instagram</b>: Coletamos e armazenamos
              os nomes de usuários e comentários feitos em posts do Instagram
              que você escolhe para participar do sorteio.
            </li>
            <li className="list-disc ">
              <b>Informações de Identificação Pessoal</b>: Apenas coletamos os
              nomes de usuários do Instagram, que são considerados informações
              públicas. Não coletamos e não temos acesso a informações pessoais
              privadas, como endereço de e-mail ou dados de contato, a menos que
              você forneça explicitamente.
            </li>
            <li className="list-disc ">
              <b>Dados de Sorteios</b>: Armazenamos os resultados de cada
              sorteio realizado, incluindo o nome de usuários vencedores, para
              garantir que um nome de usuário não seja sorteado mais de uma vez
              em sorteios futuros para o mesmo post.
            </li>
          </ul>
        </div>

        <div className="text-justify">
          <h4>2 - Como Usamos Suas Informações</h4>
          <p>
            Utilizamos as informações coletadas para as seguintes finalidades:
          </p>
          <ul className="pl-10 mt-2">
            <li className="list-disc ">
              <b>Realização de Sorteios</b>: Para realizar sorteios aleatórios
              com base nos comentários dos posts do Instagram que você escolher.
            </li>
            <li className="list-disc">
              <b>Prevenção de Fraude e Abuso</b>: Remover usuários duplicados
              antes do sorteio e garantir que um nome de usuário não seja
              sorteado mais de uma vez para o mesmo post.
            </li>
            <li className="list-disc">
              <b>Melhoria do Serviço</b>: Para entender melhor como os usuários
              interagem com nossa aplicação e aprimorar nossos serviços.
            </li>
          </ul>
        </div>

        <div className="text-justify">
          <h4>3 - Compartilhamento de Informações</h4>
          <p>
            Não compartilhamos suas informações pessoais com terceiros, exceto
            nos seguintes casos:
          </p>
          <ul className="pl-10 mt-2">
            <li className="list-disc ">
              <b>Cumprimento Legal</b>: Se formos obrigados a divulgar
              informações por lei, como em resposta a uma intimação ou outro
              processo legal.
            </li>
            <li className="list-disc ">
              <b>Com Consentimento</b>: Com o seu consentimento explícito para
              qualquer finalidade específica.
            </li>
          </ul>
        </div>

        <div className="text-justify">
          <h4>4 - Segurança das Informações</h4>
          <p>
            Implementamos medidas de segurança apropriadas para proteger suas
            informações contra acesso não autorizado, alteração, divulgação ou
            destruição. Embora nos esforcemos para proteger suas informações,
            não podemos garantir a segurança de todas as informações
            transmitidas para ou por meio de nossa aplicação.
          </p>
        </div>

        <div className="text-justify">
          <h4>5 - Retenção de Dados</h4>
          <p>
            Retemos suas informações apenas pelo tempo necessário para cumprir
            as finalidades descritas nesta Política de Privacidade, a menos que
            seja exigido ou permitido por lei um período de retenção mais longo.
          </p>
        </div>

        <div className="text-justify">
          <h4>6 - Seus Direitos e Opções</h4>
          <p>Você tem o direito de:</p>
          <ul className="pl-10 mt-2">
            <li className="list-disc ">
              Solicitar o acesso às informações que coletamos sobre você.
            </li>
            <li className="list-disc ">
              Pedir para corrigir ou excluir suas informações pessoais.
            </li>
            <li className="list-disc ">
              Retirar seu consentimento a qualquer momento para o uso de suas
              informações.
            </li>
          </ul>
        </div>

        <div className="text-justify">
          <h4>7 - Alterações a Esta Política de Privacidade</h4>
          <p>
            Reservamo-nos o direito de modificar esta Política de Privacidade a
            qualquer momento. Qualquer alteração será publicada nesta página e a
            data de revisão será atualizada.
          </p>
        </div>

        <div className="text-justify">
          <h4>8 - Contato</h4>
          <p>
            Se você tiver alguma dúvida ou preocupação sobre esta Política de
            Privacidade, entre em contato conosco em{" "}
            <a href="mailto:atendimento@grupocednet.com.br">
              atendimento@grupocednet.com.br
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
