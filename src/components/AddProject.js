import React from 'react'

function AddProject(props) {
    const {onAdd} = props
    return (
        <div>
            <form onSubmit={onAdd}>
            <input name="title" type="text" placeholder="Enter name"/>
            <input name="type" type="text" placeholder="Enter desc"/>
            <input name="description" type="text" placeholder="Enter desc"/>
            <input name="image" type="file" accept="image/jpeg, image/png" />
            <button type="submit" >Add project</button>
            </form>
        </div>
    )
}

export default AddProject