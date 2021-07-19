import React,{useState} from 'react'
import moment from 'moment'
import { AiTwotoneLike } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { MdModeEdit } from 'react-icons/md'
import axios from 'axios'
import { getLocalStorage } from '../pages/storage'
function SingleTodo({ _id, todo, owner, likes, createdAt, idConnect, handleDelet, handleUpdate}) {
    const [isLike, setIsLike] = useState(false);
    const [liked, setLiked] = useState(likes)
 

    const headers = {
        'content-type': 'application/json',
        auth: getLocalStorage('login'),
        "Access-Control-Allow-Origin": "*",
         "Accept": "application/json"
    };
    const handleLike = async(id) => {
   
        try {
            const likedres = await axios.patch(`http://localhost:8000/${id}/like`, {}, { "headers": headers });
            console.log(likedres.data.likes);
                  
            setLiked(likedres.data.likes)
        } catch (error) {
            
        }
    }
  

    return (
        <div className='todoFetch' >
            <p>{owner.username}</p>
            <p>{todo}</p>
            <p>completed</p>
            <div className="like"><AiTwotoneLike onClick={() => handleLike(_id)} className={`${isLike ? 'aime' : 'nePas'}`} />{liked}</div>
            <div className="update">
                {
                    idConnect === owner._id && <MdModeEdit  className='update' onClick={() => handleUpdate(_id)} />
                }
               </div>
            <div className="delet">
                     {
                    idConnect === owner._id && <BsTrash className='trash' onClick={()=>handleDelet(_id)}/>
                     }
               

            </div>
            <div className="time">{moment(createdAt).fromNow()}</div>
        </div>
    )
}

export default SingleTodo
