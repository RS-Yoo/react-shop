import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeCount } from './../store/itemSlice';

function Cart() {

    let s = useSelector((state) => {
        return state;
    });

    let i = useSelector((state) => state.item);

    let dispatch = useDispatch();

    return (
        <div>
              <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>추가하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        i.map((item, i) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                    <td>
                                        <button onClick={() => {
                                            dispatch(changeCount(i))
                                        }}>+</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>          
        </div>
    )
}

export default Cart;