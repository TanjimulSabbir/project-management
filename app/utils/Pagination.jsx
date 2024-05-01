import React from 'react';
import { Pagination } from 'antd';
import useProjectsStore from '../store';
import toast from 'react-hot-toast';

const ShowPage = ({ length, pageItems = 5 }) => {
    const { projects, currentPage, setCurrentPage } = useProjectsStore();


    const handlePageChange = (pageNumber) => {
        toast.success(pageNumber)
        setCurrentPage(pageNumber);
        console.log(projects)
    };

    return (
        <div className='flex items-center justify-center py-5'>
            <Pagination
                current={curPage}
                defaultCurrent={1}
                pageSize={pageItems}
                total={length}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default ShowPage;
