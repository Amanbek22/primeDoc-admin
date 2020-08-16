import React from 'react'
import css from './pagination.module.css'
import next from "../../img/next.png";
import prev from '../../img/prev.png'
import ReactPaginate from "react-paginate";

type Props = {
    pageCount: number
    setPage: (page: number) => void
}
const Pagination: React.FC<Props> = (props) => {

    return (
        <div className={css.wrapper}>
            <ReactPaginate
                previousLabel={
                    <img src={prev} alt="next"/>
                }
                nextLabel={
                    <img src={next} alt="next"/>
                }
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(selectedItem:{selected: number})=>{
                    console.log(selectedItem)
                    props.setPage(selectedItem.selected + 1)
                }}
                containerClassName={css.pagination}
                activeClassName={css.active}
            />
        </div>
    )
}

export default Pagination