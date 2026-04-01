import Link from 'next/link';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import { getAllPosts, getPillarSummaries } from '@/lib/posts';
import { imageConfig } from '@/lib/image';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const pillars = getPillarSummaries();

  return (
    <>
      <Hero
        kicker="Alles was du wissen musst!"
        title="Dein Outdoor Blog"
        text="Draußen sein ist einfach. Aber es wirklich zu genießen, braucht oft ein bisschen Erfahrung. Genau dabei hilft dir dieser Blog. Hier teilen wir Wissen aus der Praxis, vermeiden typische Anfängerfehler und geben dir konkrete Tipps für Wandern, Angeln und Camping."
        image={imageConfig.home}
        actions={
          <>
            <Link href="/blog" className="btn">Erkunde den Blog</Link>
            <Link href="#newposts" className="btn secondary" style={{color:'white', borderColor:'rgba(255,255,255,0.25)'}}>
            Neuste Posts</Link>
            </>
        }
      />

      <section className="section">
  <div className="container">
    <p className="section-kicker">Warum dieser Blog?</p>
    <h2 className="section-title">Praxisnah statt theoretisch</h2>
    <p className="section-copy">
      Viele Outdoor Inhalte klingen gut, helfen dir draußen aber kaum weiter.
      Hier findest du keine allgemeinen Ratgeber, sondern Erfahrungen aus der Praxis.
      Der Fokus liegt darauf, typische Fehler zu vermeiden und dir genau die Informationen zu geben,
      die du wirklich brauchst.
    </p>

    <div className="grid-3">
      {[
        [
          'Echte Praxiserfahrung',
          'Tipps basieren auf echten Situationen und nicht nur auf Theorie.'
        ],
        [
          'Für Einsteiger verständlich',
          'Klare Erklärungen ohne Fachjargon. Ideal für den Einstieg.'
        ],
        [
          'Direkt umsetzbar',
          'Konkrete Hinweise statt allgemeiner Aussagen.'
        ]
      ].map(([title, text]) => (
        <div className="card" key={title}>
          <div className="card-body">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <p className="section-kicker">Themen Seiten</p>
          <h2 className="section-title">Suche nach Beiträgen über das Thema.</h2>
          <div className="grid-2">
            {pillars.map((pillar) => (
              <article className="card" key={pillar.slug}>
                <img src={pillar.image} alt={pillar.title} style={{height:'250px', width:'100%', objectFit:'cover'}} />
                <div className="card-body">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                  <div style={{marginTop:16}}>
                    <Link href={`/blog/${pillar.slug}`} className="btn secondary">Thema Öffnen</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <p className="section-kicker">Neuste Beiträge</p>
          <h2 className="section-title">Die neusten Beiträge - Auf einen Blick</h2>
          <div id='newposts'>
          <div className="grid-3">
            {latestPosts.map((post) => <PostCard key={post.url} post={post} />)}
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
