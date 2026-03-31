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
          <p className="section-kicker">Core structure</p>
          <h2 className="section-title">Ein sauberes System für Homepage, Archiv, Themen Seiten und Beiträge</h2>
          <p className="section-copy">Der Aufbau besteht aus einer strukturierten Homepage, Themen Seiten, die alle Beiträge beinhalten. So kannst du als Nutzer alle wichtigen Informationen zu den Themen die dich interessieren sofort finden.</p>
          <div className="grid-3">
            {[
              ['Blog Seite', 'Hier werden automatisiert alle Blogartikel hohgeladen.'],
              ['Themen Seiten', 'Diese Seiten konzentrieren sich auf die Themen nach denen du suchst!'],
              ['Beiträge', 'Du hast gefunden was du suchst? Dann kannst du dir hier alles wichtige zu dem Thema durchlesen.']
            ].map(([title, text]) => (
              <div className="card" key={title}><div className="card-body"><h3>{title}</h3><p>{text}</p></div></div>
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
