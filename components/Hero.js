import Image from "next/image";

export default function Hero({
  kicker,
  title,
  text,
  image,
  actions,
  breadcrumbs,
  priority = false,
}) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          {breadcrumbs ? <div className="hero-breadcrumbs">{breadcrumbs}</div> : null}

          {kicker ? <p className="section-kicker hero-kicker">{kicker}</p> : null}

          <h1>{title}</h1>
          <p>{text}</p>

          {actions ? <div className="inline-actions">{actions}</div> : null}
        </div>

        <div className="hero-card">
          <div className="hero-image-wrap">
            <Image
              src={image}
              alt={title}
              width={640}
              height={420}
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 960px) 100vw, 40vw"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}