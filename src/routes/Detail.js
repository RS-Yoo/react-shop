import './../App.css';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';

import { Context1 } from './../App.js';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/itemSlice';

function Detail(props) {

    let { stock, shoes } = useContext(Context1);

    let [show, setShow] = useState(true);
    let [input, setInput] = useState('');
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('');

    let dispatch = useDispatch();

    useEffect(() => {
        let timer = setTimeout(() => {
            setShow(false);
        }, 2000)

        return () => {
        {/* useEffect 코드 전에 실행됨(unmount할때) ex)기존 타이머 제거 */}
            clearTimeout(timer);
        }
    }, [])

    useEffect(() => {
        setFade2('end')
        return () => {
            setFade2('')
        }
    }, [])

    useEffect(() => {
        if(isNaN(input)) {
            alert("Please enter a number");
        }
    }, [input])

    let {id} = useParams();

    let shoe = props.shoes.find( s => s.id == id);
    let shoeNum = shoe.id + 1;

    return(
        <div className={"container start " + fade2}>
        {
            show ? 
            <div className="alert alert-warning">
                2초 이내 구매 시 할인
            </div>
            : null
        }
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+shoeNum+".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{shoe.title}</h4>
                    <p>수량 입력</p>
                    <input placeholder="Enter a number" onChange={(e) => {
                        setInput(e.target.value);
                    }}></input>
                    <p>{shoe.content}</p>
                    <p>{shoe.price}</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({
                            id: shoe.id,
                            name: shoe.title,
                            count: 1
                            }));
                    }}>주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
            <Nav.Link eventKey="link0" onClick={() => setTab(0)}>버튼0</Nav.Link>
            </Nav.Item>
                <Nav.Item>
            <Nav.Link eventKey="link1" onClick={() => setTab(1)}>버튼1</Nav.Link>
            </Nav.Item>
                <Nav.Item>
            <Nav.Link eventKey="link2" onClick={() => setTab(2)}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <TabContent tab={tab}/>
        </div> 
    )
}

function TabContent(props) {

    let [fade, setFade] = useState('');

    useEffect(() => {
        let t = setTimeout(() => {setFade('end')}, 100)

        return () => {
            setFade('');
            clearTimeout(t);
        }
    }, [props.tab]);

    return (
        <div className={"start " + fade}>
            {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]}
        </div>
    )
}


export default Detail;