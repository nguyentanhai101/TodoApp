import React, {memo} from "react";

const FilterButton = memo(props =>{
    const{title, onClick, link, isActived}=props
    return (
        <li>
            <a
                href={`#/${link}`}
                className = {isActived ? 'selected' : ''}
                // className={'${isActived ? selected : ''}'}
                onClick={onClick} >
                {title}
            </a>
        </li>
    )
})

export default FilterButton