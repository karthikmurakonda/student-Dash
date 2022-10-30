import ListItem from "./ListItem"

export default function ClassList({handleAdd, classes, setClasses}) {
    return (
        <>
        <h3>Classes</h3>
        <div className="list-group py-2">
            {classes.map(myClass => (
                <ListItem myClass={myClass} classes={classes} setClasses={setClasses} />
            ))}
            <div className="list-group-item text-center">
                <button type="button" className="btn btn-primary" onClick={handleAdd} >Add New Class</button>
            </div>
        </div>
        </>
    )
}