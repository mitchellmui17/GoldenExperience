import React, {useEffect, useState } from 'react';
import Footer from '../Footer/Footer.js'
import Topic from '../Topic/Topic';
import Fire from '../../firebaseConfig';
import './DiscussionPage.css'
import { useAuth } from "../../contexts/AuthContext"

export default function DiscussionPage() {
    const { currentUser, logout } = useAuth()
    const [topics, setTopics] = useState('');
    let database = Fire.db;

    const getData = async() =>{
        database.getCollection("Topics").get().then(snapshot => {
            const localTopics = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                localTopics.push([data, doc.id]);

            })
            setTopics(localTopics);
        }).catch(error => console.log(error))
        }       
        useEffect(() =>{
            getData()
        },[])
    if(currentUser == null){
        return(<div>Please log in to view this page</div>)
    }
    return(
        <div>
        <div className="discussion-background">
            <div>
                <h1>Welcome to the discussion forum</h1>
                {topics && topics.map((topic, i) => {
                return(
                <Topic key={i} name={topic[0].name} data={topic[0]} id={topic[1]}></Topic> 
                )})}
            </div>
        
        </div>
        <Footer/>
        </div>
        
    )
    
}
