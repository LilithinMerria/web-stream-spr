import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const style = {position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'#fff',color:'#000',padding:20,borderRadius:8,minWidth:320}

export default function AdminPanel({materials=[],onChange}){
  const [open,setOpen] = useState(false)
  const [authOpen,setAuthOpen] = useState(false)
  const [password,setPassword] = useState('')

  const [edit, setEdit] = useState(null)

  const isLogged = typeof window !== 'undefined' && !!localStorage.getItem('admin-logged')

  const login = ()=>{
    if(password==='admin'){ localStorage.setItem('admin-logged','1'); setAuthOpen(false); setPassword(''); }
    else alert('Mot de passe incorrect (utilisez: admin)')
  }

  const logout = ()=>{ localStorage.removeItem('admin-logged'); window.location.reload() }

  const addNew = ()=>{ setEdit({id:Date.now(),title:'',author:'',cover:'',downloadable:false}); setOpen(true)}

  const save = ()=>{
    const next = materials.slice();
    const idx = next.findIndex(x=>x.id===edit.id);
    if(idx>=0) next[idx]=edit; else next.unshift(edit);
    onChange(next); setOpen(false); setEdit(null)
  }

  const remove = (id)=>{ if(confirm('Supprimer ce matériel ?')){ onChange(materials.filter(m=>m.id!==id)) }}

  return (
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      {!isLogged ? (
        <>
          <Button size="small" variant="contained" onClick={()=>setAuthOpen(true)}>CONNEXION</Button>
          <Modal open={authOpen} onClose={()=>setAuthOpen(false)}>
            <Box sx={style}>
              <h3>Connexion administrateur</h3>
              <TextField label="Mot de passe" type="password" fullWidth value={password} onChange={e=>setPassword(e.target.value)} />
              <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:12}}>
                <Button onClick={()=>setAuthOpen(false)}>Annuler</Button>
                <Button variant="contained" onClick={login}>Se connecter</Button>
              </div>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <Button size="small" variant="outlined" onClick={addNew}>Ajouter</Button>
          <Button size="small" color="error" variant="contained" onClick={logout}>Déconnexion</Button>
          <Button size="small" onClick={()=>{const json=JSON.stringify(materials, null, 2); navigator.clipboard.writeText(json); alert('Copié dans le presse-papier')}}>Exporter</Button>
        </>
      )}

      <Modal open={open} onClose={()=>setOpen(false)}>
        <Box sx={style}>
          <h3>{edit && edit.id ? 'Éditer' : 'Ajouter'}</h3>
          {edit && (
            <div style={{display:'grid',gap:8}}>
              <TextField label="Titre" value={edit.title} onChange={e=>setEdit({...edit,title:e.target.value})} />
              <TextField label="Auteur" value={edit.author} onChange={e=>setEdit({...edit,author:e.target.value})} />
              <TextField label="URL couverture" value={edit.cover} onChange={e=>setEdit({...edit,cover:e.target.value})} />
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <label>Téléchargeable</label>
                <input type="checkbox" checked={!!edit.downloadable} onChange={e=>setEdit({...edit,downloadable:e.target.checked})} />
              </div>
              <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
                <Button onClick={()=>setOpen(false)}>Annuler</Button>
                <Button variant="contained" onClick={save}>Sauvegarder</Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>

    </div>
  )
}
