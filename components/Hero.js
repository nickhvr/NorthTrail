import Image from "next/image";

export default function Hero({ kicker, title, text, image, actions, breadcrumbs }) {
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
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 960px) 100vw, 50vw"
            style={{ borderRadius: "22px", minHeight: "320px", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}