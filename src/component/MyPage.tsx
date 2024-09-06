import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MemberInfo } from '../interface/MemberInfo';

const MyPage = () => {
    const { email } = useParams<{ email: string}>();
    const [member,setMember] = useState<MemberInfo>();


    useEffect(() => {
        fetch(`http://localhost:8080/api/member?email=${email}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{if(res.ok){return res.json();}})
        .then(res=>{setMember(res);})
        .catch(e=>{
            alert(e);
        })},[]);

  return (
    <div>
        <h1>아이디 : {member?.email}</h1>
        <h1>이름 : {member?.name}</h1>
        <h1>나이 : {member?.age}</h1>
    </div>
  )
}

export default MyPage
