import Image from "next/image";

export default function Hero({ kicker, title, text, image, actions, breadcrumbs, priority=false }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          {breadcrumbs ? <div className="hero-breadcrumbs">{breadcrumbs}</div> : null}
          {kicker ? (
            <p className="section-kicker" style={{ color: "rgba(190,240,195,0.9)" }}>
              {kicker}
            </p>
          ) : null}
          <h1>{title}</h1>
          <p>{text}</p>
          {actions ? <div className="inline-actions">{actions}</div> : null}
        </div>

        <div className="hero-card">
          <Image
            src={image}
            alt={title}
            width={640}
            height={420}
            priority={priority}
            sizes="(max-width: 960px) 100vw, 40vw"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "420px",
              objectFit: "cover",
              borderRadius: "22px",
              display: "block"
            }}
          />
        </div>
      </div>
    </section>
  );
}