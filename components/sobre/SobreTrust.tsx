const TRUST_ITEMS = [
  {
    title: "Atendimento personalizado",
    description:
      "Equipe pronta para entender sua necessidade e indicar o veículo certo.",
  },
  {
    title: "Veículos selecionados",
    description:
      "Estoque com seminovos escolhidos, com informações claras para você comparar.",
  },
  {
    title: "Negociação transparente",
    description:
      "Processo de contato direto com a loja, sem surpresas na comunicação.",
  },
] as const

export function SobreTrust() {
  return (
    <section className="sobre-section" aria-labelledby="sobre-trust-title">
      <h2 id="sobre-trust-title" className="sobre-section__title">
        Por que escolher esta loja
      </h2>
      <ul className="sobre-trust__grid">
        {TRUST_ITEMS.map((item) => (
          <li key={item.title} className="sobre-trust__card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
