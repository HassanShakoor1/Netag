import React from 'react'
import '../App.css'
import f1 from '../images/f1.jpeg';
import f2 from '../images/f2.jpeg';
import f3 from '../images/f3.jpeg';
function Photos() {
  return (
    <div className='profile-design'>

<div className="p-vContainer">
            <div className="data" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 className='head' style={{ fontSize: '22px', fontWeight: '100', color: 'rgb(238, 2, 0)' }}>Photos:</h2>
              <button className='pnk-btn'>Edit Profile</button>
            </div>

            <br /><br />
            <div className="rows">
              <div className="column">
                <img src={f1} alt="f1" />
              </div>
              <div className="column">
                <img src={f2} alt="f2" />
              </div>
              <div className="column">
                <img src={f3} alt="f3" />
              </div>
            </div>
          </div>
    </div>
  )
}

export default Photos