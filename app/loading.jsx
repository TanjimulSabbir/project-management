import { Alert, Flex, Spin } from 'antd';
const Loading = () => <div className='flex items-center justify-center'>
    <Spin tip="Loading...">
    </Spin>
</div>;
export default Loading;