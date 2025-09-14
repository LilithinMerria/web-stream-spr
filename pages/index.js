import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import sampleData from '../src/sample-data';
import styles from '../styles/Home.module.css'

export default function Home(){
  const [materials, setMaterials] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{
    const saved = typeof window !== 'undefined' ? localStorage.getItem('materials') : null
    if(saved){
      setMaterials(JSON.parse(saved))
    } else {
      setMaterials(sampleData)
      if(typeof window !== 'undefined') localStorage.setItem('materials', JSON.stringify(sampleData))
    }
  },[])

  const results = materials.filter(m=>{
    if(!q) return true
    return (m.title + ' ' + (m.author||'')).toLowerCase().includes(q.toLowerCase())
  })

  return (
    <div>
      <Head>
        <title>Stream App - Accueil</title>
      </Head>

      <div className={styles.page}>
        <header className={styles.topRow}>
          <div className={styles.logo}>LOGO</div>

          <div className={styles.searchWrap}>
            <input aria-label="Recherche" placeholder="" className={styles.searchInput} value={q} onChange={e=>setQ(e.target.value)} />
          </div>

          <button className={styles.connexion}>CONNEXION</button>
        </header>

        <nav className={styles.menuRow}>
          <div className={styles.menuItem}>ACCUEIL</div>
          <div className={`${styles.menuItem} ${styles.explorer}`}>EXPLORER
            <div className={styles.explorerDropdown}>
              <div>FILMS</div>
              <div>SERIES</div>
              <div>MUSIQUES</div>
              <div>DESSINS ANIMES</div>
              <div>DOCUMENTAIRES</div>
              <div>BANDE DESSINEES</div>
              <div>OUVRAGES</div>
            </div>
          </div>
          <div className={styles.menuItem}>COMMUNAUTE</div>
          <div className={styles.menuItem}>PROFIL</div>
          <div className={styles.menuItem}>PARAMETRES</div>
          <div className={styles.menuItem}>CONTACT</div>
        </nav>

        <section className={styles.hero}>

          <div className={styles.heroBg}></div>

          <div className={styles.heroOverlay}>
            <div className={styles.emailRow}>
              <input placeholder="Adresse - mail" className={styles.emailInput} />
              <button className={styles.connexionSmall}>CONNEXION</button>
            </div>

            <div className={styles.contentRow}>
              <div className={styles.leftCol}>
                <h3>TENDANCES ACTUELLES</h3>
                <div className={styles.trendingGrid}>
                  {results.slice(0,4).map(m => (
                    <div key={m.id} className={styles.trendCard}>
                      {m.cover ? <img src={m.cover} alt={m.title} /> : <div className={styles.emptyCover}>{m.title}</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.rightCol}>
                <h3>SUGGESTIONS</h3>
                <div className={styles.suggestionsGrid}>
                  {results.slice(0,12).map(m => (
                    <div key={m.id} className={styles.suggestionCard}>
                      {m.cover ? <img src={m.cover} alt={m.title} /> : <div className={styles.emptyCoverSmall}>{m.title}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
