import React, { useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddExperience() {
const [isLoaded,setIsloded] = useState(true);
  const [data, setData] = useState({
    experience:"",
    appsdeveloped:"",
    consultants:"",
    awardswon:"",
    employee:""
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloded(false);

    try {
      const response = await axios.post(
        `https://logodesignshowcasebackend-5.onrender.com/admin/addexperience`,
        data
      );
      if (response.data.success) {
        toast.success("experience Added Successfully!!", {
          autoClose: 1500,
          onClose: () => navigate("/viewexp"),
        });
      } else {
        toast.error("experience Not Added!!", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    } finally{
        setIsloded(true);
    }
  };

  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Add experience</h3>
          </div>
          <div className="page-content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <form
                      className="card-body"
                      onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-lg-12 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                             experience
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="experience"
                              aria-label="title"
                              name="experience"
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                             Projects completed
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="appsdeveloped"
                              aria-label="title"
                              name="appsdeveloped"
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                             consultants
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="consultants"
                              aria-label="title"
                              name="consultants"
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                             awardswon
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="awardswon"
                              aria-label="title"
                              name="awardswon"
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                             employee
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="employee"
                              aria-label="title"
                              name="employee"
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 w-50 d-block mx-auto"
                        disabled={!isLoaded}
                      >
                        {isLoaded ? "Submit" : "Loading..."}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddExperience;
