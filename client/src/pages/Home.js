import axios from 'axios'
import React,{useEffect,useState} from 'react'

import Header from '../component/Header'
import './Home.css'
import { getLocalStorage } from './storage'
import { GoPlus } from 'react-icons/go'

import SingleTodo from '../component/SingleTodo'

import Pusher from 'pusher-js'


function Home() {
    const [username,setUsername]=useState('')
    const [newTodo,setNewTodo]=useState('')
    const [todos,setTodos]=useState([])
    const [idConnect,setIdConnect]=useState('')
    const [search,setSearch]=useState('')
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    // pagination and skip

    // const paginateRight=()=> {
    //     // if (todos.length===todos[todos.length-1]) {
    //     //     console.log('last');
    //     // }
    //     setPagination(pagination=>pagination + 1);
    //     console.log('todos length > ', todos[todos.length - 1]);
    //     // alert('a hi')
    //     console.log('pagination > ',pagination);
    // }
    useEffect(()=>{
        Pusher.logToConsole = true;

        var pusher = new Pusher('2c69971a8b4b25de0222', {
            cluster: 'us2'
        });

        const channel = pusher.subscribe('todo');
        channel.bind('inserted', function (data) {
            setTodos([...todos,data])
        });
        return ()=>{
            channel.unbind_all()
         pusher.unsubscribe()

        }
    },[todos])


    
    async function getFetch() {

        try {
            let res = await axios.get(`http://localhost:8000`, {
                headers: {
                    'content-type': 'application/json',
                    auth: getLocalStorage('login')
                }})
            console.log(res.data);
            console.log('id connected > ',res.data.userConnected._id);
            setIdConnect(res.data.userConnected._id)
            setUsername(res.data.username);
            setTodos(res.data.todos)
           
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {

        getFetch()

    }, [])

   


    const changeTodo=(e)=>{
        setNewTodo(e.target.value)
    }

    const data={ todo: newTodo };
    const headers={
        'content-type': 'application/json',
        auth: getLocalStorage('login')
    };
    let newResponse;
    const submitTodo=async(e)=>{
        e.preventDefault();
        try {
            newResponse = await axios.post('http://localhost:8000',data,{"headers":headers})
            console.log(' item added> ',newResponse.data);
            setTodos([newResponse.data,...todos])
        
            setNewTodo('')
    } catch (error) {
        console.log(error);
    }
        }
    // console.log('added outside', newResponse);
    const handleUpdate=async(id)=>{
        
        try {
            const findById=todos.find(itemFinded=>{
                return itemFinded._id===id;
            });
            setNewTodo(findById.todo)
           console.log(" item finded by id> ",findById.todo);
            const updateItem = await axios.patch(`http://localhost:8000/${id}`, { todo: newTodo}, { "headers": headers })
           console.log('updated by server',updateItem.data.todo);
            // setTodos([...todos, updateItem.data])
       } catch (error) {
           console.log(error);
       }
    }

    const handleDelet = async (id) => {
           const filterDelete=todos.filter(itemFilter=>{
               return itemFilter._id!==id
           })
        setTodos(filterDelete)
        try {
            const deleteItem = await axios.delete(`http://localhost:8000/${id}`, { "headers": headers });
            console.log(deleteItem);
        } catch (error) {
            console.log(error);
        }
    }
    /// handle Search

const handleSearch=async(e)=>{
    e.preventDefault();
    try {
        let searchfind=await axios.get(`http://localhost:8000/posts?search=${search}`);
        console.log(searchfind);
            setTodos(searchfind.data)
            
    } catch (error) {
        console.log(error);
    }

}
   
    return (<>
        <Header username={username}/>

        <div className="home">
            <div className="search">
                        {/*  */}
           <form onSubmit={handleSearch}>
                <input type="search" name="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search ...' />
            
            </form>

            </div>
           <div className="todoContainer">
               
               <form >
                   <input type="text" name="todo" value={newTodo} onChange={changeTodo} placeholder='todo ...' />
                    <button className='btn' onClick={submitTodo}> <GoPlus/></button>
                   
               </form>
               
                <div className='result'>
                    {
                        todos.map(Todo=>{ 
                           
                             
                            return <SingleTodo {...Todo} key={Todo._id} idConnect={idConnect} handleDelet={handleDelet} handleUpdate={handleUpdate}/>
                   
                        })
                    }
                    
                    
                    
               </div>
           </div>
            {/* <div className="pagination">
              <div className="left">
                            <IoIosArrowRoundBack className='left-arrow'/>
              </div>
              <div className="right">
                            <IoIosArrowRoundForward className='right-arrow' onClick={paginateRight}/>
              </div>
                </div> */}
        </div>



    </>
    )
}

export default Home
