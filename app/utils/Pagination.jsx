import React from 'react';
import { Pagination } from 'antd';
import useProjectsStore from '../store';
import toast from 'react-hot-toast';

const ShowPage = ({ length, pageItems,currentPage,setCurrentPage }) => {

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
