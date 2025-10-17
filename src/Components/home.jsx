import React from "react";
import { useState } from "react";
import "./home.css";
import data from "../Components/data.js"

const Home = () => {
    const [searchTerm , setSerchTerm]= useState('')
    const [Empoly, setEmpoly] = useState(data)
    const [fromdata, setfromdata] = useState(
        {
            id: "",
            name: "",
            age: "",
            Role: "",
            Experiance: "",
        });
    const [editId, setEditId] = useState(null)
    
    
    const handelChange = (e) => {
        const { name, value } = e.target;
        setfromdata({ ...fromdata, [name]: value})
    }
    const handelDelete = (id) => {
        const deleteEmployees = Empoly.filter(emp => emp.id !== id);
        setEmpoly(deleteEmployees);
    }
    const filteredEmployees = Empoly.filter(emp =>
  emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  emp.Role.toLowerCase().includes(searchTerm.toLowerCase())
);


    const handelEdit = (emp) => {
        setfromdata({
            name: emp.name,
            age: emp.age,
            Role: emp.Role,
            Experiance: emp.Experiance,
        })
        if (emp.id === fromdata.id) {
            alert('Enter the new ID its alredy Registared')
        }
        else {
            setEditId(emp.id)
        }
    }

    

    const handleSave = (e) => {
        e.preventDefault();
    

        if (!fromdata.name || !fromdata.age || !fromdata.Role || !fromdata.Experiance) {
            alert('plese fill aii fields');
            return;
        }

        if (editId === null) {
        const idExists = Empoly.some(emp => emp.id.toString() === fromdata.id.toString());
        if (idExists) {
        alert('This ID already exists! Please enter a unique ID.');
        return;
    }
  }

        if (editId !== null) {
            const updatedEmployees = Empoly.map(emp =>
                emp.id === editId ? { ...emp, ...fromdata } : emp
            );
            setEmpoly(updatedEmployees);
            setEditId(null);
        }
        else {
            const newEmployee = {
                id: Empoly.length + 1,
                ...fromdata,
            }

            setEmpoly([...Empoly, newEmployee]);
            
        }

        setfromdata({ id: '', name: "", age: "", Role: "", Experiance: "" });

    }
return (
<div className="container">
        <h1>Welcome To Employee Details Page</h1>
        <input
            className="search-bar"
            type="text"
            name="Search"
            placeholder="Search Your Name"
            onChange={(e)=> setSerchTerm(e.target.value)}
        />

        <div className="main-content">
            
                            
            {/* LEFT SIDE - Employee Details */}
            
            <div className="details-box">
                {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((emp) => (
                        
                    
                
                <div key={emp.id} className="employee-card">
                            <h2>Employee Details</h2>
                            <p ><strong>ID Number :</strong> {emp.id}</p>
                            <p><strong>Name :</strong>{emp.name}</p>
                        <hr/>
                            <p><strong>Age :</strong>{ emp.age}</p>
                            <p><strong>Role :</strong>{ emp.Role}</p>
                            <p><strong>Experience :</strong>{emp.Experiance}</p>
                            <button onClick={()=>handelEdit(emp)} className="edit-btn">Edit</button>
                            <button onClick={()=> handelDelete(emp.id)} className="delete-btn">Delete</button>
                </div>
                    ))
                ) : (
                        <h2>No Employees found </h2>
                    )}
        </div>

    {/* RIGHT SIDE - Add/Update Form */}
    <form className="form-container" onSubmit={handleSave}>
        <h2>Add / Update Employee</h2>

        <div className="input-group">
        <label>Name:</label>
        <input type="text" name="name" value={fromdata.name} onChange={handelChange} placeholder="Enter your name" />
        </div>

        <div className="input-group">
        <label>Age:</label>
        <input type="number" name="age" value={fromdata.age} onChange={handelChange} placeholder="Enter your age" />
        </div>

        <div className="input-group">
        <label>Role:</label>
        <input type="text"name="Role" value={fromdata.Role} onChange={handelChange} placeholder="Enter your role" />
        </div>

        <div className="input-group">
        <label>Experience:</label>
        <input type="text" name="Experiance" value={fromdata.Experiance} onChange={handelChange} placeholder="Enter your experience" />
        </div>

        <div className="input-group">
                    <label>ID:</label>
                    {editId === null ?
                        <input type="text" name="id" value={fromdata.id} onChange={handelChange} placeholder="Enter your ID" />
                    : <h3>Id cont changeable</h3>}
        </div>

                <button className="sub-btn" type="submit">{editId !== null ? "Updating" : "Save"}</button>
    </form>
    </div>
</div>
);
};

export default Home;
