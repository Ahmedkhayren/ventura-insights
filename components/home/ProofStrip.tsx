const names = ["Northline", "Meridian", "Fieldwork", "Atlas", "Signal"];

export function ProofStrip() {
  return (
    <section className="proof" aria-label="Fictional demonstration brands">
      <div className="shell">
        <p>Experience across communications, media and strategy</p>
        <div className="proof-names">{names.map((name) => <span key={name}>{name}</span>)}</div>
        <small>Fictional decorative brands</small>
      </div>
    </section>
  );
}
