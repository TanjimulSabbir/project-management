import { Alert, Flex, Spin } from 'antd';
const Loading = () => <div className='flex items-center justify-center h-screen'>
    <Spin tip="Loading...">
    </Spin>
</div>;
export default Loading;