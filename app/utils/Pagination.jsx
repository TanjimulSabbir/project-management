import React from 'react';
import { Pagination } from 'antd';

const ShowPage = ({ length, pageItems, currentPage, setCurrentPage, type }) => {

    const handlePageChange = (pageNumber) => {
        setCurrentPage({ data: pageNumber, type });
        console.log({ data: pageNumber, type })
    };

    return (
        <div className='flex items-center justify-center py-5'>
            <Pagination
                current={currentPage}
                defaultCurrent={1}
                pageSize={pageItems}
                total={length}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default ShowPage;
