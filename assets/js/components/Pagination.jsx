import React from 'react'

/*<Pagination currentPage={currentPage} 
                        itemPerPage={itemPerPage} 
                        length={customers.length} 
                        onPageChanged={handleChangePage}/>*/
            
const Pagination = ({currentPage, itemPerPage, length, onPageChanged}) => {
    
    const countPage = Math.ceil(length / itemPerPage);
    const pages = []
    for (let i = 1; i <= countPage; i++) {
        pages.push(i)
    }
    
    return ( 
        <>
            <div>
                <ul className="pagination pagination-sm">
                    <li className={"page-item" +(currentPage == 1 &&" disabled")}>
                        <button onClick={() => onPageChanged(currentPage - 1)}
                            className="page-link"
                        >&laquo;</button>
                    </li>
                    {
                        pages.map( (pageNumber) => 
                            <li key={pageNumber} 
                                className={"page-item " +(pageNumber === currentPage && " active")}>
                                <button 
                                    onClick={() => onPageChanged(pageNumber) }
                                    className="page-link" 
                                    >{pageNumber}</button>
                            </li>
                        )
                    }
                    <li className={"page-item "+(currentPage === countPage && " disabled")}>
                        <button 
                            className="page-link" 
                            onClick={() => onPageChanged(currentPage + 1)}>&raquo;</button>
                    </li>
                </ul>
            </div>
        </>
     );
}

Pagination.getData = (item, currentPage, itemsPerPage) => {
    //d'ou on part(start) pendant combien(itemPerPage)
    const start = (currentPage * itemsPerPage) - itemsPerPage
    //                4        * 10 - 10 = 30

    return item.slice(start, start + itemsPerPage)
}
 
export default Pagination;