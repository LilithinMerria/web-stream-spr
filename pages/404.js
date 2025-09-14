import Link from 'next/link'
export default function Page(){
  return (<div style={{padding:40}}>
    <h1>Page non trouvée</h1>
    <p>Cette page est en construction ou n'existe pas.</p>
    <p><Link href="/">Retour à l'accueil</Link></p>
  </div>)
}
