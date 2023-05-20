import {useEffect, useState} from 'react'
import {db} from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc, query } from 'firebase/firestore'

const Formulario = () => {
  const [nombreLibro, setNombreLibro] = useState ('')
  const [nombreAutor, setNombreAutor] = useState ('') 
  const [listbooks, setListBooks] = useState([])
  const [id, setId] = useState(0)
  const [modoEdit, setmodoEdit] = useState(false)

  useEffect(()=>{
    const obtenerDatos = async ()=>{
      try {
        await onSnapshot(collection(db, 'libros'), (query)=>{
          setListBooks(query.docs.map((doc)=>({...doc.data(), id:doc.id})))
        })
        
      } catch (error) {
        console.log(error);
      }
    }
    obtenerDatos();
  }, [])

  const guardarLibros = async (e) =>{
    e.preventDefault()
    try {
      const data = await addDoc(collection(db, 'libros'),{
        nombreLibro: nombreLibro,
        nombreAutor: nombreAutor
      })

      setListBooks([...listbooks,
        {
          nombreLibro: nombreLibro,
          nombreAutor: nombreAutor,
          id:data.id
        }])

      setNombreAutor('')
      setNombreLibro('')
    } catch (error) {
      console.log(error);
    }
  }

  const Delete = async id=>{
    try {
      await deleteDoc(doc(db, 'libros', id))
      
    } catch (error) {
      console.log(error);
    }
  }

  const editBooks = async e =>{
    e.preventDefault();
    try {
      const docRef = doc(db, 'libros', id);
      await updateDoc(docRef, {
        nombreLibro:nombreLibro,
        nombreAutor:nombreAutor
      })
      const newArray = listbooks.map(
        item => item.id === id ? {id:id, nombreLibro:nombreLibro, nombreAutor:nombreAutor}:item
      )
      setListBooks(newArray)
      setNombreAutor('')
      setNombreLibro('')
      setId('')
      setmodoEdit(false)
      
    } catch (error) {
      console.log(error);
    }
  }

  const Edit = async item =>{
    setNombreAutor(item.nombreAutor)
    setNombreLibro(item.nombreLibro)
    setId(item.id)
    setmodoEdit(true)
  }

  const Cancel = ()=>{
    setmodoEdit(false)
    setNombreLibro('')
    setNombreAutor('')
    setId('')
  }


  return (
    <div className="container-mt5">
      <h1 className='text-center'> CRUD OF BOOKS </h1> <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Listado de libros</h4>
          <ul className="list-group">
            {
            listbooks.map(item =>(
              <li className="list-group-item" key={item.id}>
                <span className="lead">{item.nombreLibro} - {item.nombreAutor}</span>
                <button className="btn btn-danger btn-sm float-end mx-2" onClick={()=>Delete(item.id)}>Delete</button>
                <button className="btn btn-warning btn-sm float-end" onClick={()=>Edit(item)}>Edit</button>
              </li>
            ))
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">{modoEdit ? 'ADD BOOKS' : 'AGREGATE BOOKS'}</h4>
            <form action="" onSubmit={modoEdit ? editBooks: guardarLibros}>
              <input className="form-control mb-2"
              placeholder='enter the name of the book'
              type='text'
              value={nombreLibro} 
              onChange={(e)=>setNombreLibro(e.target.value)}/>
              <input className="form-control mb-2"
              placeholder='enter the autor of the book'
              type='text'
              value={nombreAutor} 
              onChange={(e)=>setNombreAutor(e.target.value)}/>
              {
                modoEdit ? 
                (
                  <>
                  <button className="btn btn-warning btn-block">Edit</button>
                  <button className="btn btn-dark btn-block mx-2" onClick={()=>Cancel()}>Cancel</button>
                  </>
                ):
                <button className="btn btn-primary btn-block">ADD</button>
              }  
            </form>          
        </div>
      </div>
    </div>
  )
}

export default Formulario