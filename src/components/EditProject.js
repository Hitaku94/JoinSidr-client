import React from 'react'

function EditProject(props) {

    const { onEdit, projects }  = props

    let projectId = props.match.params.id

    return (
        <div>
            <form onSubmit={(e) => onEdit(e, projectId)}>
            <input name="title" type="text" placeholder="Enter name"/>
            <input name="type" type="text" placeholder="Enter type"/>
            <input name="description" type="text" placeholder="Enter desc"/>
            <input name="image" type="file" accept="image/jpeg, image/png" />
            <button type="submit" >Save</button>
            </form>
        </div>
    )
}

export default EditProject
