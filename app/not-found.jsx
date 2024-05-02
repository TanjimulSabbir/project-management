import { Button, Result } from 'antd';
import Link from 'next/link';

const NotFound = () => (
    <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Link type="primary" href="/projects">Back Home</Link>}
    />
);

export default NotFound;