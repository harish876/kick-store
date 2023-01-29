import { LoadingOutlined } from '@ant-design/icons';
import '../styles.css'
import { Spin } from 'antd';
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
const App = () =>{
  <div className='loading'>
    <Spin />
 </div>
  }
export default App;