import React, {memo} from "react";
import FilterButton from "./FilterButton";

const Footer = memo(props =>{
    
    const {status, setStateFilter, mumOfTodosLeft,  clearCompleted } = props
    const filterButtons = [{
        title: "All",
        isActived: status === 'ALL',
        onClick: () => setStateFilter('ALL'),
        link: ''
    },
    {
        title: "Active",
        isActived: status === 'ACTIVE',
        onClick: () => setStateFilter('ACTIVE'),
        link: 'active'
    },
    // {
    //     title: "Completed",
    //     isActived: status === 'COMPLETED',
    //     onClick: () => setStateFilter('COMPLETED'),
    //     link: 'completed'
    // }
]
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{mumOfTodosLeft}</strong>
                <span> </span>
                <span>{mumOfTodosLeft <=1 ? 'item' : 'items'}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                {
                    filterButtons.map(btn => 
                       < FilterButton 
                            key={`btn${btn.title}`}
                            // key={btn.title} 
                            {...btn} 
                       />
                    )
                }
            </ul>
            < button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
    )
})

export default Footer