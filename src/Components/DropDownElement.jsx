import React from 'react';
import '../App.css';

export default function DropDownElement(props) {
  return (
    
    <div className="sub-BG" onClick={()=>{}}>
                        <div className="sub-Rectangle">
                                <p className="id-style">{props.id}</p>
                        </div>
                            <p className="identifier">{props.text}</p>
                    </div>
  );
}
