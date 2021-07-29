import styled from 'styled-components';
import perfume from './Perfume1.png';
import './Pastrecords.css';

const Boarder = styled.div`
background-color: #FFE6FF;
color: palevioletred;
width: 1800px;
min-height: 30px;
margin: 1px auto;
box-sizing: border-box;
border: 1px solid black;
`;

function PastRecords() { 
  const display = () => {
    let table =[]
    const temp = Math.floor(db.length/4)
    for (var i = 0; i < (temp+1); i++){
      let children = [] 
      for (var j = 0; j < 4; j++){
        if((i*4+j)<= (db.length - 1)){          
          children.push(
          <td className = "filterpadding" key = {i*4 + j}>
            <br/><br/>
            {<img className = "perfume" src={perfume}></img>}
            <br/><br/>
            <div className = "perfumename">{db[i*4 + j].user}</div>
            <div className = "perfumebrand">{db[i*4 + j].date}</div>
            <br/>
            {/* {db[i*4 + j].ingredient.map((value, index) => {
              if (index < 3){
                return(
                  <span className = {"filtertag" + value} key = {index}>
                  #{value}
                  </span>
                )
              }
              else{
                return(null)
              }
            })} */}
            <br/><br/>
            </td>)
        }
        else{
          children.push(<td className = "filterpadding" width = '50%' key = {i*4 + j}></td>)
        }
      }
      table.push(<tr key = {i}>{children}</tr>)
    }
    return table
  }

    const db = [
      {
        user: 'user',
        image: 'url',
        date: '2021-07-27'
      },
      {
        user: 'user2',
        image: 'url2',
        date: '2021-07-27'
      },
      {
        user: 'user3',
        image: 'url3',
        date: '2021-07-27'
      },
      {
        user: 'user4',
        image: 'url4',
        date: '2021-07-27'
      },
      {
        user: 'user5',
        image: 'url5',
        date: '2021-07-27'
      },
      {
        user: 'user',
        image: 'url',
        date: '2021-07-27'
      },
      {
        user: 'user2',
        image: 'url2',
        date: '2021-07-27'
      },
      {
        user: 'user3',
        image: 'url3',
        date: '2021-07-27'
      },
      {
        user: 'user4',
        image: 'url4',
        date: '2021-07-27'
      },
      {
        user: 'user5',
        image: 'url5',
        date: '2021-07-27'
      },
      {
        user: 'user',
        image: 'url',
        date: '2021-07-27'
      },
      {
        user: 'user2',
        image: 'url2',
        date: '2021-07-27'
      },
      {
        user: 'user3',
        image: 'url3',
        date: '2021-07-27'
      },
      {
        user: 'user4',
        image: 'url4',
        date: '2021-07-27'
      },
      {
        user: 'user5',
        image: 'url5',
        date: '2021-07-27'
      }
    ]

    const show = db.map(item => 
    <div>
      <Boarder>
      <h2> 
        {item.user}, {item.date}, {item.image} 
      </h2> 
      </Boarder>
    </div>)
    

    return  <div>
              <table className = "filtertable" width = "80%">
                <tbody>
                {/* {show} */}
                {display()}
                </tbody>
              </table>
            </div>
  }


  export default PastRecords