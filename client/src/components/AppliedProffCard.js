import "./AppliedProffCard.css"
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { BsArrowUpCircle } from 'react-icons/bs';
function AppliedProffCard(props){
    return (
        <div className='card in'>
         <span>
         <span> {props.slNo} </span> &nbsp;&nbsp;
           <span> {props.text} </span>
         </span>
          <span><BsArrowUpCircle style={{fontSize:"25px" ,color: "green" ,cursor:"pointer"}} onClick={()=> props.func2(props.text)}></BsArrowUpCircle>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<IoMdRemoveCircleOutline style={{fontSize:"25px" ,color: "red" ,cursor:"pointer"}} onClick={()=> props.func(props.text)}></IoMdRemoveCircleOutline></span>
            </div>
    );
}

export default AppliedProffCard; 